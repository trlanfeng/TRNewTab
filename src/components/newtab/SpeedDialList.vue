<template>
  <div id="SpeedDialContainer">
    <draggable v-model="sddata.list" :options="draggableOptions" class="SpeedDialBox" @end="sdMoved">
      <div v-for="(item,index) in sddata.list" :key="index" class="speeddial col-12 col-sm-4 col-md-3 col-lg-3">
        <a :href="item.url" class="block" :title="item.name">
          <div class="icon">
            <img class="drag_handle" v-if="isEditMode" src="../../assets/icons/drag.png" alt="拖拽移动">
            <img class="icon_img" :src="item.url | getFavIconUrl" :alt="item.name" @load="imgLoad($event)" @error="imgError($event)">
            <span class="word">{{item.name | getFirstWord}}</span>
          </div>
          <span class="title">{{item.name}}</span>
        </a>
        <div :id="'delete_button_'+index" v-if="isEditMode" class="close_button">
          <img src="../../assets/images/delete.png">
        </div>
      </div>
    </draggable>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";
export default Vue.extend({
  components: {
    draggable
  },
  data() {
    return {};
  },
  methods: {
    imgLoad(e): void {
      e.target.style.display = "inline-block";
    },
    imgError(e): void {
      e.target.style.display = "none";
    },
    sdMoved(e): void {
      // this.$store.commit("moveItem", { from: e.oldIndex, to: e.newIndex });
      this.$store.commit("moveItem", { arr:[1,2,3,4,5], from: 4, to: 1 });
    }
  },
  mounted() {},
  computed: {
    isEditMode() {
      return this.$store.state.isEditMode;
    },
    sddata() {
      return this.$store.state.testdata;
    },
    draggableOptions() {
      return this.$store.state.draggableOptions;
    }
  },
  filters: {
    getFavIconUrl(url: string): string {
      let domainArr = url.split("/");
      let domain = domainArr[0] + "//" + domainArr[2];
      return domain + "/favicon.ico";
    },
    getFirstWord(title: string): string {
      return title.substr(0, 1).toUpperCase();
    }
  }
});
</script>
<style lang="less" scoped>
.SpeedDialBox {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0 100px;
  display: flex;
  flex-wrap: wrap;
  .speeddial {
    transition: all 0.5s;
    position: relative;
    margin-top: 20px;
    .block {
      display: flex;
      height: 52px;
      align-items: center;
      padding: 10px;
      color: #333;
      background-color: white;
      border-radius: 5px;
      text-decoration: none;
      overflow: hidden;
      &:hover,
      &:focus {
        text-decoration: none;
        box-shadow: 0 0 20px 0 #333;
        span {
          text-decoration: none;
        }
      }
      .icon {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        overflow: hidden;
        .drag_handle {
          width: 32px;
          height: 32px;
          color: #333;
          fill: #333;
          path {
            fill: #333;
          }
        }
        .icon_img {
          display: none;
          width: 32px;
          height: 32px;
          background-color: white;
        }
        .word {
          display: inline-block;
          font-size: 24px;
          background-color: #0090ff;
          color: white;
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          border-radius: 3px;
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
      // display: none;
      width: 32px;
      height: 32px;
      position: absolute;
      top: 10px;
      right: 24px;
      // background: linear-gradient(to left, rgba(255,255,255,0.3), transparent);
      background-color: white;
      cursor: pointer;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
