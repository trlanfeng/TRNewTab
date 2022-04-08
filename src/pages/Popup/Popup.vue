<template>
  <div class="list-group list-group-flush" style="width: 200px">
    <button
      @click="getCurrentTabInfo"
      type="button"
      class="list-group-item list-group-item-action"
    >添加到新标签页</button>
  </div>
</template>
<script setup>
import { addItem } from "../../services/data";

function getCurrentTabInfo() {
  chrome.runtime.sendMessage('getCurrentTab', (response) => {
    addItem(response)
      .then(() => {
        window.close();
      })
      .catch((err) => {
        console.log("TR: getCurrentTabInfo -> err", err);
      });
  })
}

</script>
