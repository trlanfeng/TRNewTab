<template>
  <div class="icon">
    <transition name="fade">
      <img class="icon_img" :src="iconUrl" :alt="name" v-show="isIconShow" />
    </transition>
    <transition name="fade">
      <span class="word" v-show="!isIconShow">{{ getFirstWord(name) }}</span>
    </transition>
  </div>
</template>
<script setup>
const { onMounted, ref } = require('vue');

const props = defineProps(["url", "name", "icon"]);
const iconUrl = ref("");
const isIconShow = ref(false);

onMounted(() => {
  const icon = props.icon || getFavIconUrl(props.url);
  const img = new Image();
  img.onload = () => {
    iconUrl.value = icon;
    isIconShow.value = true;
  };
  img.onerror = (err) => {
    console.log("TR: mounted -> err", err);
    isIconShow.value = false;
  };
  img.src = icon;
});

function getFavIconUrl(url) {
  let domainArr = url.split("/");
  return `http://trlanfeng.xicp.net/${domainArr[2]}/144`;
}

function getFirstWord(title) {
  return title.substr(0, 1).toUpperCase();
}
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
