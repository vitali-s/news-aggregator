$(function() {
	$("#copy").click(copy);

	chrome.storage.sync.get("news", function(data) {

		news = {
			categories: {}
		};
		var newsCollection = data.news.news;

		configuration.getCategories(function(categories) {
	        if (!categories) {
	        	showMessage($("#success"), "Categories do not exist.");

	        	return;
	        }

	        for (var i = 0; i < categories.length; i++) {
	        	var category = categories[i];

	        	for (var newsIndex = 0; newsIndex < newsCollection.length; newsIndex++) {
	        		var newsEntity = newsCollection[newsIndex];

	        		if (newsEntity.category == category) {
	        			if (!news.categories[category]) {
	        				news.categories[category] = [];
	        			}
	        			
						news.categories[category].push(newsEntity);
					}
	        	}
	        }

			var source   = $("#tempalte-news").html();
			var template = Handlebars.compile(source);
			var html    = template(news);
			$("#news-container").html(html);
	    });
    });
});

function copy() {
    var divToCopy = document.getElementById("news-container");

    var input = document.createElement('textarea');

    document.body.appendChild(input);

    input.value = divToCopy.innerHTML;

    input.focus();
    input.select();

    document.execCommand("Copy", false, null);

    input.remove();

    showMessage($("#success"), "Content is copied...");
}

function showMessage(element, message) {
    element.text(message).show();

    setTimeout(function () {
        element.hide().text("");
    }, 2000);
}
