<template>
  <div class="search_box">
    <img
      :src="$store.state.settings.searchIcon"
      :alt="$store.state.settings.searchTitle"
      class="search_icon"
    />
    <input
      type="text"
      @keyup.enter="search"
      class="form-control"
      v-model="keywords"
      :placeholder="'通过 '+ $store.state.settings.searchTitle +' 来搜索'"
    />
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
@import '../../../assets/css/variables.less';
.search_box {
  max-width: 900px;
  padding: 0 15px;
  margin: 50px auto 0;
  position: relative;

  .search_icon {
    position: absolute;
    left: 30px;
    top: 10px;
    width: 32px;
    height: 32px;
    z-index: 10;
  }

  input {
    border-radius: 5px;
    max-width: 900px;
    height: 52px;
    padding-left: 60px;
  }

  button {
    position: absolute;
    right: 15px;
    top: 0;
    background: transparent;
    border: none;
    border-left: 1px solid @lightBorder;
    padding-left: 15px;
    padding-right: 18px;
    height: 52px;
  }
}
</style>
