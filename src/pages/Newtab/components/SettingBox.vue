<template>
  <div class="setting_box my-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{active:settingIndex==0}"
                @click="settingIndex=0"
              >壁纸</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{active:settingIndex==1}"
                @click="settingIndex=1"
              >搜索</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{active:settingIndex==2}"
                @click="settingIndex=2"
              >导入 / 导出</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{active:settingIndex==3}"
                @click="settingIndex=3"
              >备份</span>
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
              <select class="form-control" v-model="bgType">
                <!-- <option value="0">使用第三方壁纸（每日更换）</option> -->
                <option :value="1">使用必应官方地址（每日更换）</option>
                <option :value="2">使用网络图片地址</option>
                <!-- <option :value="3">使用本地图片</option> -->
              </select>
            </div>
            <div class="networkImage" v-show="bgType==2">
              <div class="form-group">
                <label>网络图片地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="bgUrl"
                  placeholder="请填写网络图片地址"
                />
              </div>
            </div>
            <div class="localImage" v-show="bgType==3">
              <div class="form-group">
                <label>选择本地图片：</label>
                <input
                  type="file"
                  @change="localBackground($event)"
                  class="form-control-file"
                />
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
                  v-model="bgBlur"
                  class="custom-range"
                  id="customRange1"
                />
              </div>
            </div>
          </div>
          <div class="tab-pane" v-show="settingIndex==1">
            <div class="form-group switcher_box">
              <label for="switcher">是否开启搜索：</label>
              <input id="switcher" type="checkbox" v-model="isSearchOpen" />
            </div>
            <div class="search_settings">
              <div class="form-group">
                <label>搜索名称：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchTitle"
                  placeholder="请填写搜索名称"
                />
              </div>
              <div class="form-group">
                <label>搜索地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchUrl"
                  placeholder="请填写搜索地址（例如：https://www.baidu.com/s?wd=）"
                />
              </div>
              <div class="form-group">
                <label>图标地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchIcon"
                  placeholder="请填写图标地址（例如：https://www.baidu.com/favicon.ico）"
                />
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
          <div class="tab-pane history-pane" v-show="settingIndex==3">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">时间</th>
                  <th scope="col">数量</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in backupList" :key="item.key">
                  <th scope="row">{{index}}</th>
                  <td>{{item.key}}</td>
                  <td>{{(item.value.list && item.value.list.length) || 0}}</td>
                  <td>
                    <button type="button" class="btn btn-danger btn-sm">删除</button>
                    <button type="button" class="btn btn-primary btn-sm">恢复</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getData, setData, getHistory } from "@/libs/DataManager";
import axios from "axios";
import { CHANGE_SETTING } from '@/store/types';
export default {
  props: ['onShow', 'onClose'],
  data() {
    return {
      settingIndex: 0,
      migrateData: "",
      backupList: []
    };
  },
  async created() {
    this.backupList = await getHistory();
    console.log('TR: created -> this.backupList', this.backupList.reverse());
  },
  computed: {
    isSearchOpen: {
      get() {
        return this.getValue('isSearchOpen')
      },
      set(value) {
        this.setValue('isSearchOpen', value)
      }
    },
    searchTitle: {
      get() {
        return this.getValue('searchTitle')
      },
      set(value) {
        this.setValue('searchTitle', value)
      }
    },
    searchUrl: {
      get() {
        return this.getValue('searchUrl')
      },
      set(value) {
        this.setValue('searchUrl', value)
      }
    },
    searchIcon: {
      get() {
        return this.getValue('searchIcon')
      },
      set(value) {
        this.setValue('searchIcon', value)
      }
    },
    bgType: {
      get() {
        return this.getValue('bgType')
      },
      set(value) {
        this.setValue('bgType', value)
        this.onBgTypeChange()
      }
    },
    bgLastCheckDate: {
      get() {
        return this.getValue('bgLastCheckDate')
      },
      set(value) {
        this.setValue('bgLastCheckDate', value)
      }
    },
    bgBlur: {
      get() {
        return this.getValue('bgBlur')
      },
      set(value) {
        this.setValue('bgBlur', value)
      }
    },
    bgUrl: {
      get() {
        return this.getValue('bgUrl')
      },
      set(value) {
        this.setValue('bgUrl', value)
      }
    },
    bingApiUrl() {
      return this.$store.state.settings.bingApiUrl
    }
  },
  mounted() {
    this.onShow()
  },
  methods: {
    getValue(key) {
      return this.$store.state.settings[key]
    },
    setValue(key, value) {
      this.$store.commit(CHANGE_SETTING, { key, value })
    },
    hideBox() {
      this.onClose()
    },
    async exportData() {
      const data = await getData();
      this.migrateData = JSON.stringify(data);
    },
    async importData() {
      let data = {};
      try {
        data = JSON.parse(this.migrateData);
      } catch (e) {
        window.alert("需要导入的数据有误，请检查");
        return;
      }
      if (window.confirm("导入将覆盖现有的数据，且不可恢复，是否确认操作？")) {
        await setData(data)
        this.hideBox();
        window.location.reload();
      }
    },
    async onBgTypeChange() {
      if (Number(this.bgType) < 2) {
        await this.getBingImage()
      } else {
        this.bgLastCheckDate = 0;
      }
    },
    localBackground(e) {
      var f = e.target.files[0];
      var src = window.URL.createObjectURL(f);
      this.bgUrl = src;
    },
    async getBingImage() {
      if (new Date().getDate() === this.bgLastCheckDate) {
        return;
      }
      try {
        const res = await axios.get(this.bingApiUrl);
        this.bgUrl = "https://www.bing.com" + res.data.images[0].url;
      } catch (e) {
        console.log("TR: getBingImage -> e", e);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tab-pane {
  max-height: 400px;
}
.history-pane {
  overflow: auto;
}
</style>
