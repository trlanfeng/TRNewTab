$.extend($.validator.messages, {
    url: "请输入有效的网址"
});

function loadBackgroundImage() {
    switch (speedDialData.bgType) {
        // 使用第三方壁纸
        case 0:
            $("body").css("background-image", 'url(' + speedDialData.bgThirdPartyUrl + ')');
            break;
        // 使用必应官方地址
        case 1:
            if (new Date().getDate() == speedDialData.bgLastCheckDate) {
                $("body").css("background-image", 'url(' + speedDialData.bgUrl + ')');
                return;
            }
            //重新获取图片URL（从bing加载）
            $.get(speedDialData.bingApiUrl).then(function (response) {
                // var obj = JSON.parse(response);
                var obj = response;
                // console.log(response);
                speedDialData.bgUrl = "https://www.bing.com" + obj.images[0].url;
                $("body").css("background-image", 'url(' + speedDialData.bgUrl + ')');
                speedDialData.bgLastCheckDate = new Date().getDate();
                saveData();
            });
            break;
        // 使用网络图片地址
        case 2:
            $("body").css("background-image", 'url(' + speedDialData.bgUrl + ')');
            break;
        // 使用本地图片
        case 3:
            $("body").css("background-image", 'url(' + localSettings.bgLocalUrl + ')');
            break;
    }
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
                <div id="sd${i}" class="col-md-6 col-lg-4 col-xl-3 speeddial">
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

function toggle_settings() {
    $("#modal_settings").modal('toggle');
}

function save_settings() {

}

function searchKeywords() {
    var su = speedDialData.searchUrl + encodeURIComponent($(".search_input input").val());
    // su = encodeURI(su);
    // console.log(speedDialData);
    // console.log(su);
    // return;
    location.href = su;
}

// 绑定搜索相关事件
function bindSearch() {
    $("#search_title").on('change', function () {
        speedDialData.searchTitle = $(this).val();
        saveData();
    });
    $("#search_url").on('change', function () {
        speedDialData.searchUrl = $(this).val();
        saveData();
    });
    $("#search_icon").on('change', function () {
        speedDialData.searchIcon = $(this).val();
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
    $(".switch-search").on('change', function () {
        var result = $(this)[0].checked;
        speedDialData.isSearchOpen = result;
        saveData();
        if (result) {
            $(".search_settings").show();
            $(".search_box").show();
        } else {
            $(".search_settings").hide();
            $(".search_box").hide();
        }
    });
    $(".switch-search")[0].checked = speedDialData.isSearchOpen;
    $(".switch-search").change();
    $("#search_title").val(speedDialData.searchTitle);
    $("#search_url").val(speedDialData.searchUrl);
    $("#search_icon").val(speedDialData.searchIcon);
    $(".search_input img").attr("src", speedDialData.searchIcon);
    $(".search_input input").attr("placeholder", "通过 " + speedDialData.searchTitle + " 搜索");
    var switch_search = new Switchery($(".switch-search")[0], {
        className: 'switchery float-right'
    });

    if (speedDialData.isSearchOpen) {
        $(".search_box").show();
    } else {
        $(".search_box").hide();
    }
}

// 绑定背景相关事件
function bindBg() {
    $("#bgTypeSelector").on('change', function () {
        speedDialData.bgType = parseInt($(this).val());
        switch (speedDialData.bgType) {
            // 使用第三方壁纸
            case 0:
                $(".networkImage,.localImage").hide();
                break;
            // 使用必应官方地址
            case 1:
                $(".networkImage,.localImage").hide();
                break;
            // 使用网络图片地址
            case 2:
                $(".localImage").hide();
                $(".networkImage").show();
                break;
            // 使用本地图片
            case 3:
                $(".networkImage").hide();
                $(".localImage").show();
                break;
        }
        saveData();
    });
    $("#bgSelector").on('change', function () {
        // console.log("!23");
        var f = $("#bgSelector")[0].files[0];
        var src = window.URL.createObjectURL(f);
        $("body").css("background-image", 'url(' + src + ')');
        localSettings.bgLocalUrl = src;
        saveLocalData();
    });
    $("#networkImageUrl").on('change',function() {
        speedDialData.bgUrl = $(this).val();
        saveData();
    });
    $("#bgTypeSelector").val(speedDialData.bgType).change();
    $("#networkImageUrl").val(speedDialData.bgUrl).change();
}

// 绑定快速拨号相关事件
function bindSpeedDial() {
    $("#button_add_cancle").click(function () {
        add_cancle()
    });

    $("#button_add_speeddial").click(function () {
        add_speeddial();
    });
}

$(document).ready(function () {

    loadLocalData();
    loadData(function () {
        checkSettings();
        loadBackgroundImage();
        // renderTemplate();
        bindSearch();
        bindBg();
        bindSpeedDial();
    });

    $("#edit_button").click(function () {
        toggle_delete();
    });

    $("#setting_button").on('click', function () {
        toggle_settings();
    });

});