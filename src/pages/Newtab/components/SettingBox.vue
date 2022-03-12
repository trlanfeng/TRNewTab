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
              >壁纸</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 1 }"
                @click="settingIndex = 1"
              >搜索</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 2 }"
                @click="settingIndex = 2"
              >导入 / 导出</span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: settingIndex == 3 }"
                @click="settingIndex = 3"
              >备份</span>
            </li>
          </ul>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="hideBox"
          ></button>
        </div>
        <div class="modal-body">
          <div class="tab-pane" v-show="settingIndex == 0">
            <div class="mb-3">
              <label class="form-label">壁纸类型：</label>
              <select
                class="form-control"
                :value="store.background.type"
                @change="
                  mutation('CHANGE_BACKGROUND', 'type', $event.target.value)
                "
              >
                <option :value="1">使用必应官方地址（每日更换）</option>
                <option :value="2">使用网络图片地址</option>
              </select>
            </div>
            <div class="networkImage" v-show="store.background.type == 2">
              <div class="mb-3">
                <label class="form-label">网络图片地址：</label>
                <input
                  type="text"
                  class="form-control"
                  :value="store.background.url"
                  @change="
                    mutation('CHANGE_BACKGROUND', 'url', $event.target.value)
                  "
                  placeholder="请填写网络图片地址"
                />
              </div>
            </div>
            <div class="blur_range">
              <div class="mb-3">
                <label class="form-label" for="customRange1">模糊度：{{ store.background.blur }}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  :value="store.background.blur"
                  @change="
                    mutation('CHANGE_BACKGROUND', 'blur', $event.target.value)
                  "
                  class="form-range"
                  id="customRange1"
                />
              </div>
            </div>
          </div>
          <div class="tab-pane" v-show="settingIndex == 1">
            <div class="mb-3 switcher_box form-check form-switch">
              <label class="form-check-label" for="switcher">是否开启搜索：</label>
              <input
                id="switcher"
                type="checkbox"
                role="switch"
                class="form-check-input"
                :value="store.search.show"
                @change="mutation('CHANGE_SEARCH', 'show', $event.target.value)"
              />
            </div>
            <div class="search_settings">
              <div class="mb-3">
                <label class="form-label">搜索名称：</label>
                <input
                  type="text"
                  class="form-control"
                  :value="store.search.title"
                  @change="
                    mutation('CHANGE_SEARCH', 'title', $event.target.value)
                  "
                  placeholder="请填写搜索名称"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">搜索地址：</label>
                <input
                  type="text"
                  class="form-control"
                  :value="store.search.url"
                  @change="
                    mutation('CHANGE_SEARCH', 'url', $event.target.value)
                  "
                  placeholder="请填写搜索地址（例如：https://www.baidu.com/s?wd=）"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">图标地址：</label>
                <input
                  type="text"
                  class="form-control"
                  :value="store.search.icon"
                  @change="
                    mutation('CHANGE_SEARCH', 'icon', $event.target.value)
                  "
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
            <button type="button" class="btn btn-primary" @click="exportData">导出</button>
            <button type="button" class="btn btn-danger" @click="importData">导入</button>
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
                  <td>{{ (item.value.list && item.value.list.length) || 0 }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteHistory(item.key)"
                    >删除</button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="recoveryHistory(item.key)"
                    >恢复</button>
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
<script setup>
import axios from "axios";
import { onMounted, ref } from 'vue';
import * as services from "../../../services/data";
// import {
//   getData,
//   getHistory,
//   deleteHistory,
//   recoveryHistory,
//   saveData,
// } from "../../../services/data";
import { useStore } from '../../../store';


const props = defineProps(["onShow", "onClose"]);
const store = useStore();
const settingIndex = ref(0);
const migrateData = ref("");
const backupList = ref([]);

onMounted(async () => {
  backupList.value = await services.getHistory();
  backupList.value = backupList.value.reverse();
  props.onShow();
})

function hideBox() {
  props.onClose();
}

async function exportData() {
  const data = await services.getData();
  migrateData.value = JSON.stringify(data);
}

async function importData() {
  let data = {};
  try {
    data = JSON.parse(migrateData.value);
  } catch (e) {
    window.alert("需要导入的数据有误，请检查");
    return;
  }
  if (window.confirm("导入将覆盖现有的数据，且不可恢复，是否确认操作？")) {
    await services.saveData(data);
    hideBox();
    window.location.reload();
  }
}

async function onBgTypeChange() {
  if (Number(store.background.type) < 2) {
    await getBingImage();
  } else {
    store.background.lastCheckDays = 0;
  }
}

async function getBingImage() {
  if (new Date().getDate() === store.background.lastCheckDays) {
    return;
  }
  try {
    const res = await axios.get(store.background.bingApi);
    store.background.url =
      "https://www.bing.com" + res.data.images[0].url;
  } catch (e) {
    console.log("TR: getBingImage -> e", e);
  }
}

async function deleteHistory(key) {
  if (window.confirm("删除后将不可恢复，是否确认操作？")) {
    services.deleteHistory(key);
    this.backupList = await services.getHistory();
    this.backupList = this.backupList.reverse();
  }
}

async function recoveryHistory(key) {
  if (window.confirm("恢复将覆盖现有的数据，是否确认操作？")) {
    services.recoveryHistory(key);
    window.location.reload();
  }
}
</script>
<style lang="less" scoped>
.tab-pane {
  max-height: 400px;
}
.history-pane {
  overflow: auto;
}
</style>
