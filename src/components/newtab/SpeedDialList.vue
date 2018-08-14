<template>
  <div id="SpeedDialContainer">
    <draggable v-model="sddata.list">
      <div v-for="(item,index) in sddata.list" :key="index" class="test">
        <h2>{{item.name}}</h2>
        <p>{{item.url}}</p>
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
      sddata
    };
  },
  mounted() {
    console.log("123");
  }
});
</script>
<style lang="less" scoped>
  #SpeedDialContainer {
    display: flex;
    .test {
      width: 20%;
    }
  }
</style>
