define(function(require) {
	var notesModel = require('./notesModel');
	var notesView = require('./notesView');
	var $ = require('jquery');

	var model = new notesModel();
	model.fetch();

	$(document).ready(function() {
		var hello = new notesView({
			el: '#container',
			model: model
		});
	});

});