import draggable from "vuedraggable";
import Vue from "vue";
import axios from 'axios'
import vueSlider from 'vue-slider-component'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)

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
    "bgLastCheckDate": 0,
    "bgBlur": 20
};

const Newtab = Vue.extend({
    components: {
        draggable,
        vueSlider
    },
    data() {
        return {
            keywords: "",
            isSettingShow: false,
            isEditMode: false,
            isCreateShow: false,
            draggableOptions: {
                animation: 250,
                handle: ".speeddial",
                // sort: true,
                disabled: true
            },
            userdata: defaultSettings,
            create_url: "",
            create_name: "",
            settingIndex: 0
        };
    },
    mounted() {
        this.loadData(this.loadBackgroundImage);
    },
    watch: {
        userdata: {
            handler(newVal, oldVal) {
                this.saveData();
            },
            deep: true
        }
    },
    computed: {
        bgStyle: {
            get() {
                let inner_width = (-2 * parseInt(this.userdata.bgBlur)) + 'px';
                return {
                    backgroundImage: 'url(' + this.userdata.bgUrl + ')',
                    filter: 'blur(' + this.userdata.bgBlur + 'px)',
                    top: inner_width,
                    bottom: inner_width,
                    left: inner_width,
                    right: inner_width
                }
            }
        }
    },
    methods: {
        pullFromRemote() {
            chrome.storage.sync.get((result) => {
                if (!result.list) {
                    console.log("未找到设置，将使用默认设置");
                } else {
                    // console.log("下载成功！");
                    this.userdata = result;
                }
            });
        },
        pushToRemote() {
            chrome.storage.sync.set(this.userdata, function () {
                // console.log("上传成功！");
            });
        },
        loadData(callback) {
            chrome.storage.local.get((result) => {
                if (!result.list) {
                    this.pullFromRemote();
                } else {
                    // console.log("加载成功！")
                    this.userdata = result;
                }
                if (callback) callback();
                console.log(result);
            });
        },
        saveData() {
            chrome.storage.local.set(this.userdata, () => {
                // console.log("保存成功！");
                this.pushToRemote();
            });
        },
        createSpeedDial() {
            let newspeeddial = {
                name: this.create_name,
                url: this.create_url
            };
            this.userdata["list"].push(newspeeddial);
            this.create_name = '';
            this.create_url = '';
            this.isCreateShow = false;
        },
        search() {
            let searchUrl = this.userdata.searchUrl + encodeURIComponent(this.keywords);
            location.href = searchUrl;
        },
        imgLoad(e) {
            e.target.style.display = "inline-block";
        },
        imgError(e) {
            e.target.style.display = "none";
        },
        moveItem(e) {
        },
        removeItem(index) {
            this.userdata.list.splice(index, 1);
        },
        toggleEditMode(state) {
            this.isEditMode = !this.isEditMode;
            this.draggableOptions.disabled = !this.isEditMode;
        },
        loadBackgroundImage() {
            switch (this.userdata.bgType) {
                // 使用第三方壁纸
                case 0:
                case 1:
                    if (new Date().getDate() == this.userdata.bgLastCheckDate) {
                        return;
                    }
                    //重新获取图片URL（从bing加载）
                    axios.get(this.userdata.bingApiUrl).then((response) => {
                        var obj = response;
                        this.userdata.bgUrl = "https://www.bing.com" + obj.data.images[0].url;
                        this.userdata.bgLastCheckDate = new Date().getDate();
                    });
                    break;
                // 使用网络图片地址
                case 2:
                    break;
                // 使用本地图片
                case 3:
                    break;
            }
        },
        localBackground(e) {
            var f = e.target.files[0];
            var src = window.URL.createObjectURL(f);
            this.userdata.bgUrl = src;
        },
        bgTypeChange() {
            this.userdata.bgLastCheckDate = 0;
        }
    },
    filters: {
        getDomain(url) {
            let domainArr = url.split("/");
            let domain = domainArr[0] + "//" + domainArr[2];
            return domain;
        },
        getFavIconUrl(url) {
            let domainArr = url.split("/");
            let domain = domainArr[0] + "//" + domainArr[2];
            return domain + "/favicon.ico";
        },
        getFirstWord(title) {
            return title.substr(0, 1).toUpperCase();
        }
    }
});

export default Newtab;
