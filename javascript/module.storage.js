var storage = (function () {
    return {
        get: function (key, callback) {
	        chrome.storage.sync.get(key, function(data) {
	            callback(data[key]);
	        });
	    },
	    set: function(key, value, callback) {
	        chrome.storage.sync.set({ key: value }, callback);
	    }
    };
}());