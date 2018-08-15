<template>
  <div>
    <TopBar></TopBar>
    <SearchBox></SearchBox>
    <SpeedDialList></SpeedDialList>
  </div>
</template>
<script lang="ts">
import data from "../../assets/testdata";
import { DataManager } from "../../assets/js/DataManager";
import Vue from "vue";
import SpeedDialList from "./SpeedDialList.vue";
import SearchBox from "./SearchBox.vue";
import TopBar from "./TopBar.vue";
export default Vue.extend({
  components: {
    SpeedDialList,
    SearchBox,
    TopBar
  },
  mounted() {}
});
</script>

