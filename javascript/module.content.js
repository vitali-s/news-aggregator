var content = (function () {
    return {
        normalizeUrl: function (url) {

	        var normalizedUrl = url.split("?")[0],
	        	queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";

	    	if (queryString !== "") {
		        var parameters = queryString.split("&");

		        for (var i = parameters.length - 1; i >= 0; i -= 1) {
		            var param = parameters[i].split("=")[0];
		            if (param.indexOf("utm_") === 0) {
		                parameters.splice(i, 1);
		            }
		        }

		        if (parameters.length > 0) {
		        	normalizedUrl = normalizedUrl + "?" + parameters.join("&");	
		        }
		    }

	    	return normalizedUrl;
	    },
	    normalizeTitle: function (title) {
	    	return title;
	    },
	    normalizeDescription: function (description) {
	    	return description;	
	    }
    };
}());