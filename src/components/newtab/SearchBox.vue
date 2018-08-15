<template>
    <div class="container search_box">
        <div class="row">
            <div class="col search_bar">
                <div class="search_input mx-auto">
                    <img src="../../assets/images/default.png" alt="" class="search_icon">
                    <input type="text" class="form-control" v-model="keywords" placeholder="通过 百度 来搜索">
                    <button class="search_button" @click="search">搜索</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import DataManager from "../../assets/js/DataManager";
export default Vue.extend({
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    search() {
      let searchUrl = DataManager.searchUrl + this.keywords;
      console.log(searchUrl);
      location.href = searchUrl;
    }
  }
});
</script>
<style lang="less" scoped>
</style>
