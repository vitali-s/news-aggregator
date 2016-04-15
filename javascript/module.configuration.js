var configuration = (function () {
    var categories = [
        "EPAM",
        "News",
        "Videos",
        "Conferences",
        "General",
        "Cloud, Infrastructure and Operations",
        "Microservices, SOA and API",
        "Containers and App Portability",
        "IoT",
        "Web",
        "Mobile and Wearables",
        "Security",
        "Data",
        "Processes",
    ];

    return {
        getCategories: function (callback) {
            callback(categories);
        }
    };
}());
