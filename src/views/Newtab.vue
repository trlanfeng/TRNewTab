<template>
  <div>
    <div class="bg" :style="[bgStyle,bgImage]"></div>
    <TopBar @on-command="topBarCommand"></TopBar>
    <SearchBar v-show="settings.isSearchOpen"></SearchBar>
    <div id="SpeedDialContainer">
      <draggable
        v-model="list"
        :animation="250"
        handle=".speeddial"
        :disabled="isDraggableDisabled"
        class="SpeedDialBox"
        @end="moveItem"
      >
        <div
          v-for="(item,index) in list"
          :key="item.url"
          class="col-12 col-sm-4 col-md-3 col-lg-3"
        >
          <div class="speeddial" :class="{move:isEditMode}">
            <div class="info">
              <a :href="item.url" class="block" :title="item.name">
                <Icon :name="item.name" :url="item.url"></Icon>
                <span class="title">{{item.name}}</span>
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
              <div class="link">{{item.url}}</div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <CreateBox :visible.sync="isCreateShow" v-show="isCreateShow"></CreateBox>
    <SettingBox
      :visible.sync="isSettingShow"
      v-show="isSettingShow"
      @on-command="settingCommand"
    ></SettingBox>
  </div>
</template>
<script>
//iconfont
import '@/assets/icons/iconfont.css';
import draggable from "vuedraggable";
import Vue from "vue";
import { mapState } from 'vuex'
import { getData, setData, defaultSettings } from "../libs/DataManager";
import ImageManager from "../libs/ImageManager";
// components
import TopBar from "../components/TopBar.vue";
import SearchBar from "../components/SearchBox.vue";
import CreateBox from "../components/CreateBox.vue";
import SettingBox from "../components/SettingBox.vue";
import Icon from "../components/Icon.vue";
import { CHANGE_SETTING, INIT_DATA } from '../store/types';

export default {
  components: {
    draggable,
    TopBar,
    SearchBar,
    CreateBox,
    SettingBox,
    Icon
  },
  data() {
    return {
      isSettingShow: false,
      isEditMode: false,
      isCreateShow: false,
      isDraggableDisabled: true,
    };
  },
  async created() {
    this.$store.dispatch(INIT_DATA)
    // todo change wallpaper
    // this.changeBackground(res.bgUrl);
  },
  computed: {
    bgUrl() {
      return this.$store.state.settings.bgUrl
    },
    bgBlur() {
      return this.$store.state.settings.bgBlur
    },
    bgStyle: {
      get() {
        let inner_width = -2 * parseInt(this.bgBlur) + "px";
        return {
          filter: "blur(" + this.bgBlur + "px)",
          top: inner_width,
          bottom: inner_width,
          left: inner_width,
          right: inner_width
        };
      }
    },
    bgImage() {
      return {
        backgroundImage: "url(" + this.bgUrl + ")"
      };
    },
    settings() {
      return this.$store.state.settings
    },
    list: {
      get() {
        return this.$store.state.settings.list
      },
      set(value) {
        this.$store.commit(CHANGE_SETTING, {
          key: 'list',
          value
        })
      }
    }
  },
  methods: {
    topBarCommand(cmd) {
      switch (cmd) {
        case "create":
          this.isCreateShow = true;
          break;
        case "setting":
          this.isSettingShow = true;
          break;
        case "edit":
          this.toggleEditMode();
          break;
      }
    },
    imgLoad(e) {
      e.target.style.display = "inline-block";
    },
    imgError(e) {
      e.target.style.display = "none";
    },
    moveItem(e) { },
    removeItem(index) {
      this.list.splice(index, 1);
    },
    toggleEditMode(state) {
      this.isEditMode = !this.isEditMode;
      this.isDraggableDisabled = !this.isEditMode;
    },
  },
};
</script>
<style lang="less" scoped>
</style>
