<template>
  <div>
    <SpeedDialList></SpeedDialList>
  </div>
</template>
<script lang="ts">
import data from "../../assets/testdata";
import { DataManager } from "../../assets/js/DataManager";
import Vue from "vue";
import SpeedDialList from "./SpeedDialList.vue";
export default Vue.extend({
  components: {
    SpeedDialList
  },
  mounted() {
    
  }
});
</script>

