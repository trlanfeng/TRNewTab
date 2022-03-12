<template>
  <div class="create_box my-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">添加</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="hideBox"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">分类：</label>
            <!-- <input
              type="text"
              class="form-control"
              v-model="category"
              placeholder="不填写则默认显示网址"
            />-->
            <select class="form-control" v-model="category" placeholder="不填写则默认分类">
              <option
                v-for="cat in store.categories"
                :value="cat"
                :key="cat"
              >{{ store.links[cat].title }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">名称：</label>
            <input type="text" class="form-control" v-model="title" placeholder="不填写则默认显示网址" />
          </div>
          <div class="mb-3">
            <label class="form-label">网址：</label>
            <input
              type="url"
              class="form-control"
              v-model="url"
              placeholder="请填入网址"
              required="required"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideBox">取消</button>
          <button type="button" class="btn btn-primary" @click="addToList">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from '../../../store';

const store = useStore();
const props = defineProps(["onShow", "onClose"]);
const category = ref("default")
const title = ref("");
const url = ref("");
const icon = ref("");

onMounted(() => props.onShow());

function hideBox() {
  props.onClose();
}

function addToList() {
  let speedDial = {
    category: category.value,
    item: {
      name: title.value,
      url: url.value,
    },
  };
  store.addItem(speedDial);
  category.value = "";
  title.value = "";
  url.value = "";
  hideBox();
}
</script>
<style lang="less" scoped>
</style>
