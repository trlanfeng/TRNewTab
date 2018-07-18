function getCurrentTabInfo() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs[0].title);
        console.log(tabs[0].url);
        add_speeddial(tabs[0].title, tabs[0].url);
    });
}

function add_speeddial(title, url) {
    var newspeeddial = {
        name: title,
        url: url
    };
    speedDialData["list"].push(newspeeddial);
    saveData();
    window.close();
}

$(document).ready(function () {
    loadData();

    $("#add_to_speedDial").on('click', function () {
        getCurrentTabInfo();
    });
});