var defaultSettings = {
    "list": [
    ],
    "isSearchOpen": true,
    "searchUrl": "",
    "useBingImage": false,
    "bingApiUrl": "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
    "bgThirdPartyUrl": "https://www.ryongyon.com/bing/",
    "bgUrl": "",
    "searchUrl": "https://www.baidu.com/s?wd=",
    "searchIcon": "https://www.baidu.com/favicon.ico",
    "searchTitle": "百度",
    "bgLastCheckDate": 0
};

var speedDialData;

function checkSettings() {
    for (var key in defaultSettings) {
        if (typeof speedDialData[key] === "undefined") {
            speedDialData[key] = defaultSettings[key];
        }
    }
}

function initData() {
    speedDialData = defaultSettings;
    saveData();
}

// initData();

function loadData(callback) {
    chrome.storage.sync.get(function (result) {
        console.log('---1---');
        console.log(result);
        if (!result.list) {
            console.log("未找到设置，将初始化。");
            initData();
        } else {
            console.log(result);
            speedDialData = result;
        }
        if (callback) {
            callback();
        }
    });
}

function saveData() {
    // console.log(speedDialData);
    chrome.storage.sync.set(speedDialData, function () {
        console.log("保存成功！");
    });
    localStorage.setItem("speedDialData",JSON.stringify(speedDialData));
}

function getDomain(url) {
    var domain = url.split("/");
    domain = domain[0] + "//" + domain[2];
    return domain;
}