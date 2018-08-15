<template>
  <div>
    <TopBar></TopBar>
    <SearchBox v-if="isSearchBoxShow"></SearchBox>
    <SpeedDialList></SpeedDialList>
  </div>
</template>
<script lang="ts">
import DataManager from "../../assets/js/DataManager";
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
  data() {
    return {
      isSearchBoxShow: false
    };
  },
  mounted() {
    this.isSearchBoxShow = DataManager.isSearchOpen;
  }
});
</script>

