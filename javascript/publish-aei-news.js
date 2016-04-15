$(function() {
    $("#publish-news").click(publishNews);
    $("#clean-news").click(cleanNews);

    configuration.getCategories(function(categories) {
        template.render("#tempalte-categories", "#categories", categories);
    });

    chrome.runtime.onConnect.addListener(function(port) {
        var tab = port.sender.tab;

        port.onMessage.addListener(function(info) {
            $("#url").val(content.normalizeUrl(tab.url));
            $("#title").val(content.normalizeTitle(info.title));
            $("#description").val(content.normalizeDescription(info.selection));
        });
    });

    chrome.tabs.executeScript(null, {
        code: "chrome.runtime.connect().postMessage({'title': document.title, 'selection': window.getSelection().toString() });"
    });
});

function publishNews() {
    chrome.storage.sync.get("news", function(data) {
        if (!data.news) {
            data.news = {
                news: []
            };
        }

        var newsRecord = {
            category: $("#category").val(),
            url: $("#url").val(),
            title: $('#title').val(),
            description: $('#description').val()
        };

        for(var index = 0; index < data.news.news.length; index++) {
            if (data.news.news[index].url == newsRecord.url ||
                data.news.news[index].title == newsRecord.title) {

                showMessage($("#error"), "news was already added...");

                return;
            }
        }

        data.news.news.push(newsRecord);

        chrome.storage.sync.set({"news": data.news});

        showMessage($("#success"), "news was added...");
    });
}

function cleanNews() {
    var result = confirm("Do you really want to clean-up all the news");
    if (result == true) {
        chrome.storage.sync.remove("news");
    }
}

function showMessage(element, message) {
    element.text(message).show();

    setTimeout(function () {
        element.hide().text("");
    }, 2000);
}

