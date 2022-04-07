<template>
  <div class="list-group list-group-flush" style="width: 200px">
    <button
      @click="getCurrentTabInfo"
      type="button"
      class="list-group-item list-group-item-action"
    >添加到快速拨号</button>
  </div>
</template>
<script setup>
import { addItem } from "../../services/data";

function getCurrentTabInfo() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    // console.log(tabs[0].title);
    // console.log(tabs[0].url);
    let speedDial = {
      name: tabs[0].title,
      url: tabs[0].url,
    };
    addItem(speedDial)
      .then(() => {
        window.close();
      })
      .catch((err) => {
        console.log("TR: getCurrentTabInfo -> err", err);
      });
  });
}

</script>
