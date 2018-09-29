import DataManager from "../js/DataManager";
import draggable from "vuedraggable";
import Vue from "vue";

// import sddata from '../testdata'

var defaultSettings = {
    "list": [
    ],
    "isSearchOpen": true,
    "bgType": 1,
    "bingApiUrl": "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
    "bgUrl": "",
    "searchUrl": "https://www.baidu.com/s?wd=",
    "searchIcon": "https://www.baidu.com/favicon.ico",
    "searchTitle": "百度",
    "bgLastCheckDate": 0
};

const Newtab = Vue.extend({
    components: {
        draggable
    },
    data() {
        return {
            keywords: "",
            isSearchBoxShow: false,
            isSettingShow: false,
            isEditMode: false,
            isCreateShow: false,
            draggableOptions: {
                animation: 250,
                handle: ".icon",
                // sort: true,
                disabled: true
            },
            userdata: {},
            create_url: "",
            create_name: ""
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        initData() {
            this.userdata = defaultSettings;
            this.saveData();
        },
        pullFromRemote() {
            chrome.storage.sync.get((result) => {
                if (!result.list) {
                    console.log("未找到设置，将初始化。");
                    this.initData();
                } else {
                    console.log(result);
                    this.userdata = result;
                }
            });
        },
        pushToRemote() {
            chrome.storage.sync.set(this.userdata, function () {
                console.log("保存成功！");
            });
        },
        loadData() {
            chrome.storage.local.get((result) => {
                if (!result.list) {
                    this.pullFromRemote();
                } else {
                    console.log(result);
                    this.userdata = result;
                }
            });
        },
        saveData() {
            chrome.storage.local.set(this.userdata, () => {
                console.log("保存成功！");
                this.pushToRemote();
            });
        },
        createSpeedDial() {
            let newspeeddial = {
                name: this.create_name,
                url: this.create_url,
                order: this.userdata.list.length
            };
            console.log('newspeeddial', newspeeddial);
            this.userdata["list"].push(newspeeddial);
            this.saveData();
            this.create_name = '';
            this.create_url = '';
        },
        search() {
            let searchUrl = DataManager.searchUrl + this.keywords;
            location.href = searchUrl;
        },
        imgLoad(e): void {
            e.target.style.display = "inline-block";
        },
        imgError(e): void {
            e.target.style.display = "none";
        },
        sdMoved(e): void {
            // e.oldIndex;
            // e.newIndex;
            let sd = this.userdata.list.splice(e.oldIndex, 1);
            this.userdata.list.splice(e.newIndex, 0, sd[0]);
            this.saveData();
        },
        toggleEditMode(state) {
            this.isEditMode = !this.isEditMode;
            this.draggableOptions.disabled = !this.isEditMode;
        },
        getDomain(url) {
            var domain = url.split("/");
            domain = domain[0] + "//" + domain[2];
            return domain;
        }
    },
    filters: {
        getFavIconUrl(url: string): string {
            let domainArr = url.split("/");
            let domain = domainArr[0] + "//" + domainArr[2];
            return domain + "/favicon.ico";
        },
        getFirstWord(title: string): string {
            return title.substr(0, 1).toUpperCase();
        }
    }
});

export default Newtab;
