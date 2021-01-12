<template>
  <div class="setting_box my-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 0 }"
                @click="settingIndex = 0"
                >壁纸</span
              >
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 1 }"
                @click="settingIndex = 1"
                >搜索</span
              >
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 2 }"
                @click="settingIndex = 2"
                >导入 / 导出</span
              >
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 3 }"
                @click="settingIndex = 3"
                >备份</span
              >
            </li>
          </ul>
          <button type="button" class="close" @click="hideBox">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="tab-pane" v-show="settingIndex == 0">
            <div class="form-group">
              <label>壁纸类型：</label>
              <select class="form-control" v-model="state.background.type">
                <option :value="1">使用必应官方地址（每日更换）</option>
                <option :value="2">使用网络图片地址</option>
              </select>
            </div>
            <div class="networkImage" v-show="state.background.type == 2">
              <div class="form-group">
                <label>网络图片地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="state.background.url"
                  placeholder="请填写网络图片地址"
                />
              </div>
            </div>
            <div class="blur_range">
              <div class="form-group">
                <label for="customRange1"
                  >模糊度：{{ state.background.blur }}</label
                >
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  v-model="state.background.blur"
                  class="custom-range"
                  id="customRange1"
                />
              </div>
            </div>
          </div>
          <div class="tab-pane" v-show="settingIndex == 1">
            <div class="form-group switcher_box">
              <label for="switcher">是否开启搜索：</label>
              <input
                id="switcher"
                type="checkbox"
                v-model="state.search.show"
              />
            </div>
            <div class="search_settings">
              <div class="form-group">
                <label>搜索名称：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="state.search.title"
                  placeholder="请填写搜索名称"
                />
              </div>
              <div class="form-group">
                <label>搜索地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="state.search.url"
                  placeholder="请填写搜索地址（例如：https://www.baidu.com/s?wd=）"
                />
              </div>
              <div class="form-group">
                <label>图标地址：</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="state.search.icon"
                  placeholder="请填写图标地址（例如：https://www.baidu.com/favicon.ico）"
                />
              </div>
            </div>
          </div>
          <div class="tab-pane" v-show="settingIndex == 2">
            <textarea
              name="migrateData"
              id="migrateData"
              class="form-control"
              cols="30"
              rows="10"
              style="margin-bottom: 10px"
              v-model="migrateData"
            ></textarea>
            <button type="button" class="btn btn-primary" @click="exportData">
              导出
            </button>
            <button type="button" class="btn btn-danger" @click="importData">
              导入
            </button>
          </div>
          <div class="tab-pane history-pane" v-show="settingIndex == 3">
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
                <tr v-for="(item, index) in backupList" :key="item.key">
                  <th scope="row">{{ index }}</th>
                  <td>{{ item.key }}</td>
                  <td>
                    {{ (item.value.list && item.value.list.length) || 0 }}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteHistory(item.key)"
                    >
                      删除
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="recoveryHistory(item.key)"
                    >
                      恢复
                    </button>
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
import axios from "axios";
import {
  getData,
  setData,
  getHistory,
  deleteHistory,
  recoveryHistory,
} from "../../../services/data";

export default {
  props: ["onShow", "onClose"],
  data() {
    return {
      settingIndex: 0,
      migrateData: "",
      backupList: [],
    };
  },
  async created() {
    this.backupList = await getHistory();
    console.log("TR: created -> this.backupList", this.backupList.reverse());
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  mounted() {
    this.onShow();
  },
  methods: {
    hideBox() {
      this.onClose();
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
        await setData(data);
        this.hideBox();
        window.location.reload();
      }
    },
    async onBgTypeChange() {
      if (Number(this.state.background.type) < 2) {
        await this.getBingImage();
      } else {
        this.state.background.lastCheckDays = 0;
      }
    },
    async getBingImage() {
      if (new Date().getDate() === this.state.background.lastCheckDays) {
        return;
      }
      try {
        const res = await axios.get(this.state.background.bingApi);
        this.state.background.url =
          "https://www.bing.com" + res.data.images[0].url;
      } catch (e) {
        console.log("TR: getBingImage -> e", e);
      }
    },
    async deleteHistory(key) {
      if (window.confirm("删除后将不可恢复，是否确认操作？")) {
        deleteHistory(key);
      }
    },
    async recoveryHistory(key) {
      if (window.confirm("恢复将覆盖现有的数据，是否确认操作？")) {
        recoveryHistory(key);
        window.location.reload();
      }
    },
  },
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
