<template>
  <div class="icon">
    <img class="icon_img" :src="iconUrl" :alt="name" v-show="isIconShow">
    <span class="word" v-show="!isIconShow">{{name | getFirstWord}}</span>
  </div>
</template>
<script>
import ImageManager from "../libs/ImageManager";
export default {
  props: ["url", "name"],
  data() {
    return {
      iconUrl: "",
      isIconShow: false
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      const iconUrl = this.getFavIconUrl(this.url);
      ImageManager.Instance.LoadImage(iconUrl)
        .then(() => {
          this.iconUrl = iconUrl;
          this.isIconShow = true;
        })
        .catch(err => {
          console.log("TCL: mounted -> err", err);
          this.isIconShow = false;
        });
    });
  },
  methods: {
    getFavIconUrl(url) {
      let domainArr = url.split("/");
      let domain = domainArr[0] + "//" + domainArr[2];
      return domain + "/favicon.ico";
    }
  },
  filters: {
    getDomain(url) {
      let domainArr = url.split("/");
      let domain = domainArr[0] + "//" + domainArr[2];
      return domain;
    },
    getFirstWord(title) {
      return title.substr(0, 1).toUpperCase();
    }
  }
};
</script>
<style lang="less" scoped>
</style>
