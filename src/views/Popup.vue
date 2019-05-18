<template>
  <div class="list-group list-group-flush" style="width:200px;">
    <button
      @click="getCurrentTabInfo"
      type="button"
      class="list-group-item list-group-item-action"
    >添加到快速拨号</button>
  </div>
</template>
<script>
import DataManager from "../libs/DataManager";
import Vue from "vue";
export default {
  data() {
    return {
      userdata: {}
    };
  },
  mounted() {
    DataManager.GetData().then(res => {
      this.userdata = res;
    });
  },
  watch: {
    userdata: {
      handler(newVal, oldVal) {
        DataManager.SetData(newVal);
      },
      deep: true
    }
  },
  methods: {
    getCurrentTabInfo() {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        // console.log(tabs[0].title);
        // console.log(tabs[0].url);
        this.addSpeedDial(tabs[0].title, tabs[0].url);
      });
    },
    addSpeedDial(title, url) {
      this.userdata["list"].push({
        name: title,
        url: url
      });
      window.close();
    }
  }
};
</script>
