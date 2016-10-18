define(function(require) {
	var notesModel = require('./notesModel');
	var notesView = require('./notesView');
	var $ = require('jquery');

	var model = new notesModel({ id: document.location.search.slice(1) });
	model.fetch();

	$(document).ready(function() {
		var hello = new notesView({
			el: $('.notes').first(),
			model: model
		});
	});

});