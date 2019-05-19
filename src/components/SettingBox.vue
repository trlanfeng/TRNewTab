<template>
  <div class="setting_box my-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <span class="nav-link" :class="{active:settingIndex==0}" @click="settingIndex=0">壁纸</span>
            </li>
            <li class="nav-item">
              <span class="nav-link" :class="{active:settingIndex==1}" @click="settingIndex=1">搜索</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{active:settingIndex==2}"
                @click="settingIndex=2"
              >导入 / 导出</span>
            </li>
          </ul>
          <button type="button" class="close" @click="hideBox">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="tab-pane" v-show="settingIndex==0">
            <div class="form-group">
              <label>壁纸类型：</label>
              <select class="form-control" v-model="bgType" @change="bgTypeChange">
                <!-- <option value="0">使用第三方壁纸（每日更换）</option> -->
                <option :value="1">使用必应官方地址（每日更换）</option>
                <option :value="2">使用网络图片地址</option>
                <option :value="3">使用本地图片</option>
              </select>
            </div>
            <div class="networkImage" v-show="bgType==2">
              <div class="form-group">
                <label>网络图片地址：</label>
                <input
                  type="text"
                  class="form-control"
                  :value="bgUrl"
                  @change="bgUrlChange($event.target.value)"
                  placeholder="请填写网络图片地址"
                >
              </div>
            </div>
            <div class="localImage" v-show="bgType==3">
              <div class="form-group">
                <label>选择本地图片：</label>
                <input type="file" @change="localBackground($event)" class="form-control-file">
              </div>
            </div>
            <div class="blur_range">
              <div class="form-group">
                <label for="customRange1">模糊度：{{bgBlur}}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  :value="bgBlur"
                  @change="blurChange"
                  class="custom-range"
                  id="customRange1"
                >
              </div>
            </div>
          </div>
          <div class="tab-pane" v-show="settingIndex==1">
            <div class="form-group switcher_box">
              <label for="switcher">是否开启搜索：</label>
              <input id="switcher" type="checkbox" v-model="isSearchOpen">
            </div>
            <div class="search_settings">
              <div class="form-group">
                <label>搜索名称：</label>
                <input type="text" class="form-control" v-model="searchTitle" placeholder="请填写搜索名称">
              </div>
              <div class="form-group">
                <label>搜索地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchUrl"
                  placeholder="请填写搜索地址（例如：https://www.baidu.com/s?wd=）"
                >
              </div>
              <div class="form-group">
                <label>图标地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchIcon"
                  placeholder="请填写图标地址（例如：https://www.baidu.com/favicon.ico）"
                >
              </div>
            </div>
          </div>
          <div class="tab-pane" v-show="settingIndex==2">
            <textarea
              name="migrateData"
              id="migrateData"
              class="form-control"
              cols="30"
              rows="10"
              style="margin-bottom:10px;"
              v-model="migrateData"
            ></textarea>
            <button type="button" class="btn btn-primary" @click="exportData">导出</button>
            <button type="button" class="btn btn-danger" @click="importData">导入</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataManager from "../libs/DataManager";
export default {
  data() {
    const isSearchOpen = this.$store.state.data.isSearchOpen;
    const searchTitle = this.$store.state.data.searchTitle;
    const searchUrl = this.$store.state.data.searchUrl;
    const searchIcon = this.$store.state.data.searchIcon;
    return {
      settingIndex: 0,
      migrateData: "",
      bgType: 1,
      bgUrl: "",
      bgBlur: 20,
      bgLastCheckDate: 0,
      isSearchOpen,
      searchTitle,
      searchUrl,
      searchIcon
    };
  },
  created() {
    this.bgType = this.$store.state.data.bgType;
    this.bgUrl = this.$store.state.data.bgUrl;
    this.bgBlur = this.$store.state.data.bgBlur;
  },
  watch: {
    isSearchOpen(newVal, oldVal) {
      this.$store.commit("SetByObj", {
        isSearchOpen: this.isSearchOpen
      });
    },
    searchTitle(newVal, oldVal) {
      this.$store.commit("SetByObj", {
        searchTitle: this.searchTitle
      });
    },
    searchUrl(newVal, oldVal) {
      this.$store.commit("SetByObj", {
        searchUrl: this.searchUrl
      });
    },
    searchIcon(newVal, oldVal) {
      this.$store.commit("SetByObj", {
        searchIcon: this.searchIcon
      });
    }
  },
  methods: {
    hideBox() {
      this.$emit("update:visible", false);
    },
    exportData() {
      this.isMigrateReadOnly = false;
      DataManager.GetData().then(res => {
        this.migrateData = JSON.stringify(res);
        this.isMigrateShow = true;
      });
    },
    importData() {
      let data = {};
      try {
        data = JSON.parse(this.migrateData);
      } catch (e) {
        window.alert("需要导入的数据有误，请检查");
        return;
      }
      if (window.confirm("导入将覆盖现有的数据，且不可恢复，是否确认操作？")) {
        DataManager.SetRemote(data).then(() => {
          console.log("importToRemote");
        });
      }
    },
    bgTypeChange(evt) {
      this.bgType = evt.target.value;
      if (Number(this.bgType) < 2) {
        this.getBingImage().then(res => {
          this.bgUrlChange(res);
          this.bgLastCheckDate = +new Date();
        });
      } else {
        this.bgLastCheckDate = 0;
      }
    },
    blurChange(evt) {
      this.bgBlur = evt.target.value;
      this.$store.emit("SetByObj", {
        bgBlur: this.bgBlur
      });
    },
    bgUrlChange(url) {
      this.bgUrl = url;
      this.$store.emit("SetByObj", {
        bgUrl: this.bgUrl,
        bgType: this.bgType,
        bgLastCheckDate: this.bgLastCheckDate
      });
      this.$emit("on-command", "bgImage", url);
    },
    localBackground(e) {
      var f = e.target.files[0];
      var src = window.URL.createObjectURL(f);
      this.bgUrlChange(src);
    },
    getBingImage() {
      if (+new Date() == this.$store.state.data.bgLastCheckDate) {
        return;
      }
      return new Promise(function(resolve, reject) {
        try {
          axios.get(this.$store.state.bingApiUrl).then(response => {
            var obj = response;
            let bgUrl = "https://www.bing.com" + obj.data.images[0].url;
            resolve(bgUrl);
          });
        } catch (e) {
          console.log("TCL: getBingImage -> e", e);
          reject(e);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
