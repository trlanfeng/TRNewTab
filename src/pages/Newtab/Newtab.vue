<template>
  <div>
    <div class="bg" :style="[bgStyle, bgImage]"></div>
    <div class="topbar">
      <button type="text" @click="isCreateShow = true">
        <i class="iconfont iconplus-circle"></i>
        <span>网站</span>
      </button>
      <button type="text" @click="isCreateCategoryShow = true">
        <i class="iconfont iconplus-circle"></i>
        <span>分类</span>
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
        :src="$store.state.search.icon"
        :alt="$store.state.search.title"
        class="search_icon"
      />
      <input
        type="text"
        @keyup.enter="search"
        class="form-control"
        v-model="keywords"
        :placeholder="'通过 ' + $store.state.search.title + ' 来搜索'"
      />
      <button class="search_button" @click="search">搜索</button>
    </div>
    <div class="SpeedDialContainer">
      <div class="TabContainer col-12">
        <draggable
          v-model="state.categories"
          :animation="250"
          handle=".tab"
          class="tabs"
          @end="moveCategory"
        >
          <div
            class="tab"
            v-for="tab in state.categories"
            :key="tab"
            :class="{ active: tab === curTabKey }"
            @click="changeTabKey(tab)"
            @drop="dropOnTitle(tab)"
          >
            {{ state.links[tab].title }}
          </div>
        </draggable>
      </div>
      <draggable
        v-model="state.links[curTabKey].list"
        :animation="250"
        handle=".speeddial"
        :disabled="isDraggableDisabled"
        class="SpeedDialBox"
        @end="moveItem"
      >
        <div
          v-for="(item, index) in state.links[curTabKey].list"
          :key="item.name"
          class="col-12 col-sm-4 col-md-3 col-lg-3"
        >
          <div
            class="speeddial"
            :class="{ move: isEditMode }"
            draggable
            @dragstart="onDragStart(curTabKey, index, item)"
          >
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
    <CreateCategory
      v-show="isCreateCategoryShow"
      :onShow="handleShowCreateCategory"
      :onClose="handleHideCreateCategory"
    ></CreateCategory>
    <SettingBox
      v-show="isSettingShow"
      :onShow="handleShowSettings"
      :onClose="handleHideSettings"
    ></SettingBox>
  </div>
</template>
<script>
import Vue from "vue";
import "../../assets/icons/iconfont.css";
import draggable from "vuedraggable";
import { mapState } from "vuex";
import { getData, saveDate, sortCategories } from "../../services/data";
import { Button } from "element-ui";
import CreateBox from "./components/CreateBox";
import CreateCategory from "./components/CreateCategory";
import SettingBox from "./components/SettingBox";
import Icon from "./components/Icon";

Vue.use(Button);

export default {
  components: {
    draggable,
    CreateBox,
    CreateCategory,
    SettingBox,
    Icon,
  },
  data() {
    return {
      isSettingShow: false,
      isEditMode: false,
      isCreateShow: false,
      isCreateCategoryShow: false,
      isDraggableDisabled: true,
      keywords: "",
      curTabKey: this.$store.state.categories[0],
      dragItem: null,
    };
  },
  async created() {
    this.$store.dispatch("INIT_DATA");
    // todo change wallpaper
    // this.changeBackground(res.bgUrl);
  },
  computed: {
    state() {
      return this.$store.state;
    },
    bgStyle: {
      get() {
        let inner_width = -2 * parseInt(this.state.background.blur) + "px";
        return {
          filter: "blur(" + this.state.background.blur + "px)",
          top: inner_width,
          bottom: inner_width,
          left: inner_width,
          right: inner_width,
        };
      },
    },
    bgImage() {
      return {
        backgroundImage: "url(" + this.state.background.url + ")",
      };
    },
  },
  watch: {
    "$store.state.links": function (val) {
      this.tabs = Object.keys(val);
    },
  },
  methods: {
    moveCategory(e) {
      sortCategories(this.tabs);
    },
    moveItem(e) {},
    removeItem(index) {
      this.list.splice(index, 1);
    },
    toggleEditMode(state) {
      this.isEditMode = !this.isEditMode;
      this.isDraggableDisabled = !this.isEditMode;
    },
    handleShowCreateBox() {},
    handleHideCreateBox() {
      this.isCreateShow = false;
    },
    handleShowCreateCategory() {},
    handleHideCreateCategory() {
      this.isCreateCategoryShow = false;
    },
    handleShowSettings() {},
    handleHideSettings() {
      this.isSettingShow = false;
    },
    search() {
      let searchUrl =
        this.$store.state.search.url + encodeURIComponent(this.keywords);
      location.href = searchUrl;
    },
    changeTabKey(key) {
      this.curTabKey = key;
    },
    dropOnTitle(to) {
      const { from, index, item } = this.dragItem;
      this.$store.commit("MOVE_ITEM", { from, to, index, item });
    },
    onDragStart(from, index, item) {
      console.log('TR: onDragStart -> item', item);
      this.dragItem = { from, index, item };
    },
  },
};
</script>
