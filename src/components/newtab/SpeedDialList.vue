<template>
  <div id="SpeedDialContainer">
    <draggable v-model="sddata.list" :options="draggableOptions" class="SpeedDialBox">
      <div v-for="(item,index) in sddata.list" :key="index" class="speeddial col-3 col-md-3 col-lg-3">
        <a :href="item.url" class="block" :title="item.name">
          <div class="icon">
            <img :src="item.url | getFavIconUrl" :alt="item.name" @load="imgLoad($event)">
            <span class="word">{{item.name | getFirstWord}}</span>
          </div>
          <span class="title">{{item.name}}</span>
        </a>
        <div :id="'delete_button_'+index" class="close_button">
          <img src="../../assets/images/delete.png">
        </div>
      </div>
    </draggable>
  </div>
</template>
<script lang="ts">
import sddata from "../../assets/testdata";
import Vue from "vue";
import draggable from "vuedraggable";
export default Vue.extend({
  components: {
    draggable
  },
  data() {
    return {
      sddata,
      draggableOptions: {
        animation: 250
      }
    };
  },
  methods: {
    imgLoad(e): void {
      e.target.style.display = "inline";
    }
  },
  mounted() {},
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
  margin: 50px auto 0;
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
        img {
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
      display: none;
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
