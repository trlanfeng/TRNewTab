$.extend($.validator.messages, {
    url: "请输入有效的网址"
});

var defaultSettings = {
    "list": [
    ],
    "isSearchOpen": true,
    "searchUrl": "",
    "useBingImage": true,
    "bingApiUrl": "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
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
    speedDialData =
        {
            // "list":[
            // ],
            "isSearchOpen": true,
            "searchUrl": "",
            "useBingImage": true,
            "bingApiUrl": "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
            "bgUrl": "",
            "searchUrl": "https://www.baidu.com/s?wd=",
            "searchIcon": "https://www.baidu.com/favicon.ico",
            "searchTitle": "百度",
            "bgLastCheckDate": 0
        };
    saveData();
}

// initData();

function loadData() {
    chrome.storage.sync.get(function (result) {
        if (typeof result === "undefined") {
            console.log("未找到设置，将初始化。");
            initData();
        } else {
            speedDialData = result;
            checkSettings();
            loadBackgroundImage();
            renderTemplate();
            $(".search_input img").attr("src", speedDialData.searchIcon);
            $(".search_input input").attr("placeholder", "通过 " + speedDialData.searchTitle + " 搜索");
        }
    });
}

function saveData() {
    console.log(speedDialData);
    chrome.storage.sync.set(speedDialData, function () {
        console.log("保存成功！");
    });
}

function loadBackgroundImage() {
    if (speedDialData.bgUrl != "") {
        $("body").css("background-image", 'url(' + speedDialData.bgUrl + ')');
    }
    //检测是否使用Bing壁纸，如果是的话检查是否需要更新URL
    if (speedDialData.useBingImage) {
        if (new Date().getDate() == speedDialData.bgLastCheckDate) return;
        //重新获取图片URL
        $.get(speedDialData.bingApiUrl).then(function (response) {
            // var obj = JSON.parse(response);
            var obj = response;
            // console.log(response);
            speedDialData.bgUrl = "https://www.bing.com" + obj.images[0].url;
            $("body").css("background-image", 'url(' + speedDialData.bgUrl + ')');
            speedDialData.bgLastCheckDate = new Date().getDate();
            saveData();
        });
    }
}

function getDomain(url) {
    var domain = url.split("/");
    domain = domain[0] + "//" + domain[2];
    return domain;
}

function generateTemplate() {
    var source = `
    <div class="container SpeedDialBox">
        <div class="row">
    `;
    if (typeof speedDialData !== "undefined") {
        for (var i = 0; i < speedDialData["list"].length; i++) {
            var domain = getDomain(speedDialData["list"][i].url);
            source += `
                <div id="sd${i}" class="col-xs-12 col-sm-4 col-md-3 speeddial">
                    <a href="${speedDialData["list"][i].url}">
                        <img src="${domain}/favicon.ico" alt="${speedDialData["list"][i].name}">
                        <span>${speedDialData["list"][i].name}</span>
                    </a>
                    <div id="delete_button_${i}" class="close_button">
                        <img src="images/delete.png">
                    </div>
                </div>
            `;
        }
    }
    source += `
        </div>
    </div>
    `;
    return source;
}

function renderTemplate() {
    // $('body').css('background-image','url('+ speedDialData.bgUrl+ ')')

    document.getElementById('SpeedDialContainer').innerHTML = generateTemplate(speedDialData);

    $(".speeddial img").on("error", function () {
        $(this).attr('src', "./images/default.png");
    });

    $(".close_button").click(function () {
        var id = $(this).attr("id");
        id = id.split('_');
        id = id[id.length - 1];
        delete_speeddial(id);
    });
    $(".close_button").mouseover(function () {
        $(this).parent().children("a").addClass("danger-border");
    });
    $(".close_button").mouseout(function () {
        $(this).parent().children("a").removeClass("danger-border");
    });
}

function add_speeddial() {
    //表单验证
    $("#newSD").validate({
        rules: {
            new_url: {
                requured: true,
                url: true
            }
        }
    });
    //获取URL验证结果，动态添加样式
    var isValid = $("#new_url").valid();
    if (isValid === false) {
        $("#new_url").parent().addClass("has-error");
        return;
    } else {
        $("#new_url").parent().removeClass("has-error");
    }

    var name = $("#new_name").val();
    var url = $("#new_url").val();
    if ($("#new_name").val() == "") {
        name = url;
    }
    var newspeeddial = {
        name: name,
        url: url
    };
    speedDialData["list"].push(newspeeddial);
    $("#new_name").val("");
    $("#new_url").val("");
    $("#myModal").modal('toggle');
    renderTemplate();
    saveData();
}

function delete_speeddial(id) {
    speedDialData["list"].splice(id, 1);
    saveData();
    renderTemplate();
    toggle_delete();
}

function add_cancle() {
    $("#new_name").val("");
    $("#new_url").val("");
}

function toggle_delete() {
    $(".close_button").toggle();
}

function selectBackground() {
    $("#setting_button").on('click', function () {

    });
}

function searchKeywords() {
    var su = speedDialData.searchUrl + encodeURIComponent($(".search_input input").val());
    // su = encodeURI(su);
    // console.log(speedDialData);
    // console.log(su);
    // return;
    location.href = su;
}

$(document).ready(function () {

    loadData();

    renderTemplate();

    $("#edit_button").click(function () {
        toggle_delete();
    });
    $("#button_add_cancle").click(function () {
        add_cancle()
    });
    $("#button_add_speeddial").click(function () {
        add_speeddial();
    });

    $("#button_getPageInfo").click(function () {
        var t = $("#iframe");
        console.log(document.getElementById("iframe").contentWindow.document.title);
    });

    $("#bgSelector").on('change', function () {
        console.log("!23");
        var f = $("#bgSelector")[0].files[0];
        var src = window.URL.createObjectURL(f);
        $("body").css("background-image", 'url(' + src + ')');
        speedDialData.bgUrl = src;
        saveData();
    });

    $('.search_input input').on('keydown', function (event) {
        if (event.keyCode == 13) {
            searchKeywords();
        }
    });
    $(".search_button").on('click', function () {
        searchKeywords();
    });
});