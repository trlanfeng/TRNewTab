<template>
  <div class="search_box">
    <img
      :src="$store.state.settings.searchIcon"
      :alt="$store.state.settings.searchTitle"
      class="search_icon"
    >
    <input
      type="text"
      @keyup.enter="search"
      class="form-control"
      v-model="keywords"
      :placeholder="'通过 '+ $store.state.settings.searchTitle +' 来搜索'"
    >
    <button class="search_button" @click="search">搜索</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    search() {
      let searchUrl =
        this.$store.state.settings.searchUrl + encodeURIComponent(this.keywords);
      location.href = searchUrl;
    }
  }
};
</script>
<style lang="less" scoped>
</style>
