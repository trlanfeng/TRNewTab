var speedDialData;

function initData() {
    speedDialData = 
    {
        "list":[
        ]
    };
}

function loadData() {
    chrome.storage.sync.get("list",function(result){
        if (typeof result["list"] === "undefined") {
            console.log("未找到设置，将初始化。");
            initData();
        } else {
            speedDialData = result;
            
            renderTemplate();

        }
    });
}

function saveData() {
    chrome.storage.sync.set(speedDialData, function(){
        console.log("保存成功！");
    });
}

function generateTemplate() {
    var source = `
    <div class="container SpeedDialBox">
        <div class="row">
    `;
    if (typeof speedDialData !== "undefined") {
        for (var i = 0; i < speedDialData["list"].length; i++) {
            source += `
                <div id="sd${i}" class="col-xs-12 col-sm-4 col-md-3 speeddial">
                    <a href="${speedDialData["list"][i].url}">
                        <img src="${speedDialData["list"][i].url}/favicon.ico" alt="${speedDialData["list"][i].name}">
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

    $(".close_button").click(function(){
        var id = $(this).attr("id");
        id = id.split('_');
        id = id[id.length-1];
        delete_speeddial(id);
    });
    $(".close_button").mouseover(function(){
        $(this).parent().children("a").addClass("danger-border");
    });
    $(".close_button").mouseout(function(){
        $(this).parent().children("a").removeClass("danger-border");
    });
}

function add_speeddial() {
    speedDialData["list"].push({
        name: $("#new_name").val(),
        url: $("#new_url").val()
    });
    $("#new_name").val("");
    $("#new_url").val("");
    $("#myModal").modal('toggle');
    renderTemplate();
    saveData();
}

function delete_speeddial(id) {
    $("#sd"+id).remove();
    speedDialData["list"].splice(id,1);
    saveData();
}

function add_cancle() {
    $("#new_name").val("");
    $("#new_url").val("");
}

function toggle_delete() {
    $(".close_button").toggle();
}

$(document).ready(function(){
    loadData();
    
    renderTemplate();

    $("#edit_button").click(function(){
        toggle_delete();
    });
    $("#button_add_cancle").click(function(){
        add_cancle()
    });
    $("#button_add_speeddial").click(function(){
        add_speeddial();
    });
});