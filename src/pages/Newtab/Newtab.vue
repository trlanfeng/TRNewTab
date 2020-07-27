<template>
  <div>
    <div class="bg" :style="[bgStyle,bgImage]"></div>
    <div class="topbar">
      <button @click="isCreateShow = true">
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
//iconfont
import '@/assets/icons/iconfont.css';
import draggable from "vuedraggable";
import Vue from "vue";
import { mapState } from 'vuex'
import { getData, setData, defaultSettings } from "@/libs/DataManager";
import ImageManager from "@/libs/ImageManager";
// components
import SearchBar from "./components/SearchBox.vue";
import CreateBox from "./components/CreateBox.vue";
import SettingBox from "./components/SettingBox.vue";
import Icon from "./components/Icon.vue";
import { CHANGE_SETTING, INIT_DATA } from '@/store/types';

export default {
  components: {
    draggable,
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
    settings() {
      return this.$store.state.settings
    },
    bgStyle: {
      get() {
        let inner_width = -2 * parseInt(this.settings.bgBlur) + "px";
        return {
          filter: "blur(" + this.settings.bgBlur + "px)",
          top: inner_width,
          bottom: inner_width,
          left: inner_width,
          right: inner_width
        };
      }
    },
    bgImage() {
      return {
        backgroundImage: "url(" + this.settings.bgUrl + ")"
      };
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
    moveItem(e) { },
    removeItem(index) {
      this.list.splice(index, 1);
    },
    toggleEditMode(state) {
      this.isEditMode = !this.isEditMode;
      this.isDraggableDisabled = !this.isEditMode;
    },
    handleShowCreateBox() {
      console.log('TR: handleCreateBoxShow -> handleCreateBoxShow');
    },
    handleHideCreateBox() {
      this.isCreateShow = false;
    },
    handleShowSettings() {

    },
    handleHideSettings() {
      this.isSettingShow = false
    }
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/variables.less';
.bg {
  position: fixed;
  top: -20px;
  bottom: -20px;
  left: -20px;
  right: -20px;
  z-index: -1;
  background-position: center;
  background-size: cover;
}

.SpeedDialBox {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0 100px;
  display: flex;
  flex-wrap: wrap;

  .speeddial {
    border: 1px solid @lightBorder;
    margin-top: 20px;
    background-color: @lightBackground;
    backdrop-filter: blur(10px);
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;

    &.move {
      cursor: move !important;

      a {
        cursor: move !important;
      }
    }

    &:hover,
    &:focus {
      text-decoration: none;
      box-shadow: 0 0 10px #333;

      span {
        text-decoration: none;
      }
    }

    .info {
      position: relative;
      display: flex;
      align-items: center;

      .block {
        flex: 1;
        transition: all 0.2s;
        display: flex;
        height: 52px;
        align-items: center;
        padding: 10px;
        color: @darkBackground;
        text-decoration: none;
        overflow: hidden;

        .icon {
          width: 32px;
          height: 32px;
          margin-right: 10px;
          overflow: hidden;

          .drag_handle {
            width: 32px;
            height: 32px;
            color: @darkBackground;
            fill: @darkBackground;

            path {
              fill: @darkBackground;
            }
          }
        }

        .title {
          flex: 1;
          white-space: nowrap;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .close_button {
        width: 28px;
        height: 32px;
        background: transparent;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .iconfont {
          color: #eb3323;
        }

        cursor: pointer !important;

        img {
          width: 32px;
          height: 32px;
        }
      }
    }

    .other {
      height: 30px;
      display: flex;
      border-top: 1px solid @lightBorder;

      .drag {
        width: 40px;
        padding-left: 10px;

        .drag_handle {
          max-width: 16px;
          max-height: 16px;
        }
      }

      .link {
        flex: 1;
        font-size: 12px;
        line-height: 28px;
        color: #999;
      }
    }
  }
}

.my-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: rgba(0, 0, 0, 0.7);
}

.switcher_box {
  display: flex;
  align-items: center;

  label {
    flex: 1;
  }

  .switcher {
    display: flex !important;
    justify-content: flex-end;
  }
}

.nav-item {
  cursor: pointer;
}

.sortable-chosen {
  opacity: 0.5;
}

.topbar {
  padding: 20px;
  text-align: right;
  background: linear-gradient(to bottom, rgba(1, 1, 1, 0.3), transparent);

  button {
    color: white;
    font-size: 0;
    text-decoration: none;
    margin: 0 10px;
    padding: 5px 0;
    border: 0;
    border-bottom: 2px solid transparent;
    border-color: transparent;
    background-color: transparent;
    outline: none;
    transition: border-color 0.2s;

    .iconfont {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 5px;
    }

    span {
      font-size: 18px;
      vertical-align: middle;
    }

    &:hover {
      border-color: white;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
