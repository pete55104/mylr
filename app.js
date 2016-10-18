var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');
var config;

var MongoClient = mongodb.MongoClient;




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


function getNotes(){
        var noteSchema = mongoose.Schema({
            notetype: String,
            text: String
        });
    var Note = mongoose.model('note', noteSchema,'note');
    Note.find({'notetype': 'welcome'},function(err,notes){
        if(err) 
            console.log("Error in getNotes: ",err);
       var notetext = notes[0].text;
        console.log("welcome Note: ",notetext);
        return notetext;
    });
/*
        MongoClient.connect(connectionString, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', connectionString);

            // do some work here with the database.
            var notes = db.collection('notes')
            notes.find({notetype: "welcome"}).toArray(function(err,result){
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    resultNote = result[0].text;
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }
            })
            //Close connection
            db.close();
        }}
        );
    return resultNote;
    */
};

var note = getNotes();

function svcGetNotes(request, response){
    var contentType = 'application/json';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end('{"text":"' + note + '"}', 'utf-8');
}

http.createServer(function (request, response) {
    console.log('request starting...');


    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

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

