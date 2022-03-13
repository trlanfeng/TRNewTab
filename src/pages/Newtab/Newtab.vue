<template>
  <div>
    <div class="bg" :style="[bgStyle, bgImage]"></div>
    <div class="topbar">
      <button type="text" @click="isCreateShow = true">
        <i class="iconfont iconplus-circle"></i>
        <span>网站</span>
      </button>
      <button type="text" @click="isCreateCategoryShow = true">
        <i class="iconfont iconplus-circle"></i>
        <span>分类</span>
      </button>
      <button @click="toggleEditMode">
        <i class="iconfont iconcompass"></i>
        <span>管理</span>
      </button>
      <button @click="isSettingShow = true">
        <i class="iconfont iconsetting"></i>
        <span>设置</span>
      </button>
    </div>
    <div class="search_box">
      <img :src="store.search.icon" :alt="store.search.title" class="search_icon" />
      <input
        type="text"
        @keyup.enter="search"
        class="form-control"
        v-model="keywords"
        :placeholder="'通过 ' + store.search.title + ' 来搜索'"
      />
      <button class="search_button" @click="search">搜索</button>
    </div>
    <div class="SpeedDialContainer">
      <div class="TabContainer col-12 ps-3 pe-3">
        <draggable
          v-model="store.categories"
          :animation="250"
          handle=".tab"
          class="tabs"
          @end="moveCategory"
        >
          <template #item="{ element }">
            <div
              class="tab"
              :title="element"
              :class="{ active: element === curTabKey }"
              @click="changeTabKey(element)"
              @drop="dropOnTitle(element)"
            >{{ store.links[element].title }}</div>
          </template>
        </draggable>
      </div>
      <draggable
        v-model="store.links[curTabKey].list"
        :itemKey="generateRandomKey"
        :animation="250"
        handle=".speeddial"
        :disabled="isDraggableDisabled"
        class="SpeedDialBox"
        @end="moveItem"
      >
        <template #item="{ element, index }">
          <div class="col-12 col-sm-4 col-md-3 col-lg-3 ps-3 pe-3">
            <div
              v-if="!!element && !!element.name && !!element.url"
              class="speeddial"
              :class="{ move: isEditMode }"
              draggable
              @dragstart="onDragStart(curTabKey, index, element)"
            >
              <div class="info">
                <a :href="element.url" class="block" :title="element.name">
                  <Icon :name="element.name" :url="element.url"></Icon>
                  <span class="title">{{ element.name }}</span>
                </a>
                <div @click="removeItem(index)" v-if="isEditMode" class="close_button">
                  <i class="iconfont icondelete"></i>
                </div>
              </div>
              <div class="other" v-if="isEditMode">
                <div class="drag">
                  <i class="drag_handle iconfont icondrag"></i>
                </div>
                <div class="link">{{ element.url }}</div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <CreateBox v-show="isCreateShow" :onShow="handleShowCreateBox" :onClose="handleHideCreateBox"></CreateBox>
    <CreateCategory
      v-show="isCreateCategoryShow"
      :onShow="handleShowCreateCategory"
      :onClose="handleHideCreateCategory"
    ></CreateCategory>
    <SettingBox v-show="isSettingShow" :onShow="handleShowSettings" :onClose="handleHideSettings"></SettingBox>
  </div>
</template>
<script setup>
import "../../assets/icons/iconfont.css";
import draggable from "vuedraggable";
import { getData, saveData, sortCategories } from "../../services/data";
import CreateBox from "./components/CreateBox";
import CreateCategory from "./components/CreateCategory";
import SettingBox from "./components/SettingBox";
import Icon from "./components/Icon";
import { reactive } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useStore } from '../../store';
import { ref } from 'vue';

const store = useStore();
console.log('TR: store.categories', store.categories);

const isSettingShow = ref(false)
const isEditMode = ref(false)
const isCreateShow = ref(false)
const isCreateCategoryShow = ref(false)
const isDraggableDisabled = ref(true)
const keywords = ref("")
const curTabKey = ref(store.categories[0])
const dragItem = ref(null)

function cleanList() {
  const list = store.links[curTabKey.value].list;
  // 清理不合法数据
  store.links[curTabKey.value].list = list.filter(item => !!item?.url);
  console.log('TR: cleanList -> store.links[curTabKey.value].list', store.links[curTabKey.value].list);
}

onMounted(async () => {
  await store.init();
  cleanList();
});

const bgStyle = computed(() => {
  let inner_width = -2 * parseInt(store.background.blur) + "px";
  return {
    filter: "blur(" + store.background.blur + "px)",
    top: inner_width,
    bottom: inner_width,
    left: inner_width,
    right: inner_width,
  };
});

const bgImage = computed(() => {
  return {
    backgroundImage: "url(" + store.background.url + ")",
  };
});

watch("store.links", function (val) {
  this.tabs = Object.keys(val);
});

watch(curTabKey, function (val) {
  cleanList();
})

function generateRandomKey() {
  return Math.random();
}

function moveCategory(e) {
  sortCategories(this.tabs);
}
function moveItem(e) { }
function removeItem(index) {
  store.commit("REMOVE_ITEM", { category: curTabKey.value, index });
}
function toggleEditMode(state) {
  isEditMode.value = !isEditMode.value;
  this.isDraggableDisabled = !isEditMode.value;
}
function handleShowCreateBox() { }
function handleHideCreateBox() {
  isCreateShow.value = false;
}
function handleShowCreateCategory() { }
function handleHideCreateCategory() {
  isCreateCategoryShow.value = false;
}
function handleShowSettings() { }
function handleHideSettings() {
  isSettingShow.value = false;
}
function search() {
  let searchUrl =
    store.search.url + encodeURIComponent(this.keywords);
  location.href = searchUrl;
}
function changeTabKey(key) {
  curTabKey.value = key;
}
function dropOnTitle(to) {
  const { from, index, item } = dragItem.value;
  store.commit("MOVE_ITEM", { from, to, index, item });
}
function onDragStart(from, index, item) {
  dragItem.value = { from, index, item };
}
</script>
