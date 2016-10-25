var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var path = require('path');
var config;




function getSecrets() {
    var secretFileName = "./mylr-secrets.json"

    try {
    config = require(secretFileName)
    console.log(config.secretFileMessage);
    console.log(config.mongoDBConnectString)
    }
    catch (err) {
    config = {}
    console.log("could not load secret file at '" + secretFileName + "': ", err)
    console.log(config)
    }
}
getSecrets();


mongoose.connect(config.mongoDBConnectString);
mongoose.connection.on('connected', function () {

    console.log('Mongoose connection open ', config.mongoDBConnectString);

});
mongoose.connection.on('error', function (err) {

    console.log('Mongoose error connecting ', err);

});
var MongoClient = mongodb.MongoClient;

var noteSchema = mongoose.Schema({
    notetype: String,
    text: String
});

function getNotesQuery(notetype){
    var Note = mongoose.model('note', noteSchema,'note');
    var query = Note.find({'notetype': notetype});
    return query;
};

function svcGetNotes(request, response){
    var contentType = 'application/json';
    response.writeHead(200, { 'Content-Type': contentType });
    var welcomeNoteQuery = getNotesQuery('welcome');
    welcomeNoteQuery.exec(function(err,notes){
        if(err) 
            console.log("Error in getNotes: ",err);
        if(notes.length)
        response.end('{"text":"' + notes[0].text + '"}', 'utf-8');
        console.log('svcGetNotes' + notes);
        return;
    })
}

http.createServer(function (request, response) {
    console.log('request starting...');

    var banned = ['./mylr-secrets.json', './README.md', './battleplan.md'];
    banned = banned.map(function(x){return x.toUpperCase()});
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
    else if(banned.indexOf(filePath.toUpperCase()) > -1)
        filePath = './404.html'
    
    
    if(filePath == './getnotes')
        svcGetNotes(request,response);
    else {
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;      
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {//Booya!  render the page!
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        })
    };

}).listen(8081);
console.log('Server now running at http://127.0.0.1:8081/');

