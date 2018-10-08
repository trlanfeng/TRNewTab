<template>
    <div class="list-group list-group-flush" style="width:200px;">
        <button @click="getCurrentTabInfo" type="button" class="list-group-item list-group-item-action">
            添加到快速拨号
        </button>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
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
export default Vue.extend({
    data() {
        return {
            userdata: defaultSettings
        };
    },
    mounted() {
        this.loadData();
    },
    watch: {
        userdata: {
            handler(newVal, oldVal) {
                this.saveData();
            },
            deep: true
        }
    },
    methods: {
        getCurrentTabInfo() {
            chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
                // console.log(tabs[0].title);
                // console.log(tabs[0].url);
                this.add_speeddial(tabs[0].title, tabs[0].url);
            });
        },
        add_speeddial(title, url) {
            var newspeeddial = {
                name: title,
                url: url
            };
            this.userdata["list"].push(newspeeddial);
            window.close();
        },
        pullFromRemote() {
            chrome.storage.sync.get(result => {
                if (!result.list) {
                    console.log("未找到设置，将使用默认设置");
                } else {
                    // console.log("下载成功！");
                    this.userdata = result;
                }
            });
        },
        pushToRemote() {
            chrome.storage.sync.set(this.userdata, function() {
                // console.log("上传成功！");
            });
        },
        loadData(callback) {
            chrome.storage.local.get(result => {
                if (!result.list) {
                    this.pullFromRemote();
                } else {
                    // console.log("加载成功！")
                    this.userdata = result;
                }
                if (callback) callback();
            });
        },
        saveData() {
            chrome.storage.local.set(this.userdata, () => {
                // console.log("保存成功！");
                this.pushToRemote();
            });
        }
    }
});
</script>
