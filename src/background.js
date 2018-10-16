var defaultSettings = {
    list: [],
    isSearchOpen: true,
    bgType: 1,
    bingApiUrl:
        "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
    bgUrl: "",
    searchUrl: "https://www.baidu.com/s?wd=",
    searchIcon: "https://www.baidu.com/favicon.ico",
    searchTitle: "百度",
    bgLastCheckDate: 0,
    bgBlur: 20
};

var userdata = JSON.parse(JSON.stringify(defaultSettings));

function addToSpeedDial(info, tab) {
    userdata.list.push({
        name: tab.title,
        url: tab.url
    });
    saveData();
}

var contexts = ["page"];

for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "添加到新标签页";
    var id = chrome.contextMenus.create({
        title: title,
        contexts: [context],
        onclick: addToSpeedDial
    });
}

function pullFromRemote() {
    chrome.storage.sync.get(result => {
        if (!result.list) {
            console.log("未找到设置，将使用默认设置");
        } else {
            // console.log("下载成功！");
            userdata = result;
        }
    });
}
function pushToRemote() {
    chrome.storage.sync.set(userdata, function() {
        // console.log("上传成功！");
    });
}
function loadData() {
    chrome.storage.local.get(result => {
        if (!result.list) {
            pullFromRemote();
        } else {
            userdata = result;
        }
    });
}
function saveData() {
    chrome.storage.local.set(userdata, () => {
        pushToRemote();
    });
}

loadData();
