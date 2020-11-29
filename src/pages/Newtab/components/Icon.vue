<template>
  <div class="icon">
    <transition name="fade">
      <img class="icon_img" :src="iconUrl" :alt="name" v-show="isIconShow" />
    </transition>
    <transition name="fade">
      <span class="word" v-show="!isIconShow">{{ name | getFirstWord }}</span>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["url", "name"],
  data() {
    return {
      iconUrl: "",
      isIconShow: false,
    };
  },
  mounted() {
    const iconUrl = this.getFavIconUrl(this.url);
    const img = new Image();
    img.onload = () => {
      this.iconUrl = iconUrl;
      this.isIconShow = true;
    };
    img.onerror = () => {
      console.log("TCL: mounted -> err", err);
      this.isIconShow = false;
    };
    img.src = iconUrl;
  },
  methods: {
    getFavIconUrl(url) {
      let domainArr = url.split("/");
      return `http://trlanfeng.xicp.net/${domainArr[2]}/144`;
    },
  },
  filters: {
    getFirstWord(title) {
      return title.substr(0, 1).toUpperCase();
    },
  },
};
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.icon_img {
  // display         : none;
  width: 32px;
  height: 32px;
  background-color: transparent;
}
.word {
  display: inline-block;
  font-size: 24px;
  background-color: #0090ff;
  color: white;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 3px;
}
</style>
