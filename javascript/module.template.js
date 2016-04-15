var template = (function () {
    return {
        render: function (templateId, elementId, data) {
	     	var source   = $(templateId).html();
	        var template = Handlebars.compile(source);
	        var html    = template(data);
	        $(elementId).html(html);   
	    }
    };
}());