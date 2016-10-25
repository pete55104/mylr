define(function(require) {
	var Backbone = require('Backbone');

	return Backbone.Model.extend({
		urlRoot: 'http://my-lr/getnotes',
		url: function() {
			return this.urlRoot + '';//'?name=' + this.id;
		}
	});
});