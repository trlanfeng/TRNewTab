<template>
  <div>
    <div class="bg" :style="[bgStyle,bgImage]"></div>
    <TopBar @on-command="topBarCommand"></TopBar>
    <SearchBar v-show="userdata.isSearchOpen"></SearchBar>
    <div id="SpeedDialContainer">
      <draggable
        v-model="userdata.list"
        :animation="250"
        handle=".speeddial"
        :disabled="isDraggableDisabled"
        class="SpeedDialBox"
        @end="moveItem"
      >
        <div
          v-for="(item,index) in userdata.list"
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
import vueSlider from "vue-slider-component";
import DataManager from "../libs/DataManager";
import ImageManager from "../libs/ImageManager";
// components
import TopBar from "../components/TopBar.vue";
import SearchBar from "../components/SearchBox.vue";
import CreateBox from "../components/CreateBox.vue";
import SettingBox from "../components/SettingBox.vue";
import Icon from "../components/Icon.vue";

export default {
  components: {
    draggable,
    vueSlider,
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
      migrateData: "",
      settingIndex: 0,
      userdata: {},
      bgUrl: ""
    };
  },
  created() {
    this.userdata = this.$store.state.data;
    DataManager.GetData()
      .then(res => {
        this.userdata = res;
        this.$store.commit("SetData", res);
        this.changeBackground(res.bgUrl);
      })
      .catch(err => {
        console.log("TCL: created -> err", err);
      });
  },
  watch: {
    userdata: {
      handler(newVal, oldVal) {
        this.$store.commit("SetData", newVal);
      },
      deep: true
    }
  },
  computed: {
    bgStyle: {
      get() {
        let inner_width = -2 * parseInt(this.userdata.bgBlur) + "px";
        return {
          filter: "blur(" + this.userdata.bgBlur + "px)",
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
    settingCommand(cmd, data) {
      switch (cmd) {
        case "bgImage":
          this.changeBackground(data);
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
      this.userdata.list.splice(index, 1);
    },
    toggleEditMode(state) {
      this.isEditMode = !this.isEditMode;
      this.isDraggableDisabled = !this.isEditMode;
    },
    changeBackground(url) {
      ImageManager.Instance.LoadImage(url)
        .then(() => {
          this.bgUrl = url;
        })
        .catch(err => {
          console.log("TCL: changeBackground -> err", err);
        });
    }
  },
};
</script>
<style lang="less" scoped>
</style>
