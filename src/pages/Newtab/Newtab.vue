<template>
  <div>
    <div class="bg" :style="[bgStyle, bgImage]"></div>
    <div class="topbar">
      <button type="text" @click="isCreateShow = true">
        <i class="iconfont iconplus-circle"></i>
        <span>新增</span>
      </button>
      <button @click="toggleEditMode">
        <i class="iconfont iconcompass"></i>
        <span>管理</span>
      </button>
      <button @click="isSettingShow = true">
        <i class="iconfont iconsetting"></i>
        <span>设置</span>
      </button>
    </div>
    <div class="search_box">
      <img
        :src="$store.state.settings.searchIcon"
        :alt="$store.state.settings.searchTitle"
        class="search_icon"
      />
      <input
        type="text"
        @keyup.enter="search"
        class="form-control"
        v-model="keywords"
        :placeholder="'通过 ' + $store.state.settings.searchTitle + ' 来搜索'"
      />
      <button class="search_button" @click="search">搜索</button>
    </div>
    <div id="SpeedDialContainer">
      <div class="tabs col-12 col-sm-4 col-md-3 col-lg-3">
        <div
          class="tab"
          v-for="(tab, key) in settings.links"
          :key="key"
          @click="changeTabKey(key)"
        >
          {{ tab.title }}
        </div>
      </div>
      <draggable
        v-model="settings.links[curTabKey].list"
        :animation="250"
        handle=".speeddial"
        :disabled="isDraggableDisabled"
        class="SpeedDialBox"
        @end="moveItem"
      >
        <div
          v-for="(item, index) in settings.links[curTabKey].list"
          :key="item.name"
          class="col-12 col-sm-4 col-md-3 col-lg-3"
        >
          <div class="speeddial" :class="{ move: isEditMode }">
            <div class="info">
              <a :href="item.url" class="block" :title="item.name">
                <Icon :name="item.name" :url="item.url"></Icon>
                <span class="title">{{ item.name }}</span>
              </a>
              <div
                @click="removeItem(index)"
                v-if="isEditMode"
                class="close_button"
              >
                <i class="iconfont icondelete"></i>
              </div>
            </div>
            <div class="other" v-if="isEditMode">
              <div class="drag">
                <i class="drag_handle iconfont icondrag"></i>
                <!-- <img
                  class="drag_handle"
                  src="../assets/icons/drag.svg"
                  alt="拖拽移动"
                />-->
              </div>
              <div class="link">{{ item.url }}</div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <CreateBox
      v-show="isCreateShow"
      :onShow="handleShowCreateBox"
      :onClose="handleHideCreateBox"
    ></CreateBox>
    <SettingBox
      v-show="isSettingShow"
      :onShow="handleShowSettings"
      :onClose="handleHideSettings"
    ></SettingBox>
  </div>
</template>
<script>
import Vue from "vue";
import "@/assets/icons/iconfont.css";
import draggable from "vuedraggable";
import { mapState } from "vuex";
import { getData, setData, defaultSettings } from "@/services/data";
import { Button } from "element-ui";
import CreateBox from "./components/CreateBox";
import SettingBox from "./components/SettingBox";
import Icon from "./components/Icon";
import { CHANGE_SETTING, INIT_DATA } from "@/store/types";

Vue.use(Button);

export default {
  components: {
    draggable,
    CreateBox,
    SettingBox,
    Icon,
  },
  data() {
    return {
      isSettingShow: false,
      isEditMode: false,
      isCreateShow: false,
      isDraggableDisabled: true,
      keywords: "",
      curTabKey: "default",
    };
  },
  async created() {
    this.$store.dispatch(INIT_DATA);
    // todo change wallpaper
    // this.changeBackground(res.bgUrl);
  },
  computed: {
    settings() {
      return this.$store.state.settings;
    },
    bgStyle: {
      get() {
        let inner_width = -2 * parseInt(this.settings.bgBlur) + "px";
        return {
          filter: "blur(" + this.settings.bgBlur + "px)",
          top: inner_width,
          bottom: inner_width,
          left: inner_width,
          right: inner_width,
        };
      },
    },
    bgImage() {
      return {
        backgroundImage: "url(" + this.settings.bgUrl + ")",
      };
    },
    list: {
      get() {
        return this.$store.state.settings.list;
      },
      set(value) {
        this.$store.commit(CHANGE_SETTING, {
          key: "list",
          value,
        });
      },
    },
  },
  methods: {
    moveItem(e) {},
    removeItem(index) {
      this.list.splice(index, 1);
    },
    toggleEditMode(state) {
      this.isEditMode = !this.isEditMode;
      this.isDraggableDisabled = !this.isEditMode;
    },
    handleShowCreateBox() {
      console.log("TR: handleCreateBoxShow -> handleCreateBoxShow");
    },
    handleHideCreateBox() {
      this.isCreateShow = false;
    },
    handleShowSettings() {},
    handleHideSettings() {
      this.isSettingShow = false;
    },
    search() {
      let searchUrl =
        this.$store.state.settings.searchUrl +
        encodeURIComponent(this.keywords);
      location.href = searchUrl;
    },
    changeTabKey(key) {
      this.curTabKey = key;
    },
  },
};
</script>
