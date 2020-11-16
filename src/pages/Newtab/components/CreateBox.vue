<template>
  <div class="create_box my-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">添加</h5>
          <button type="button" class="close" @click="hideBox">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>名称：</label>
            <input
              type="text"
              class="form-control"
              v-model="speedDialTitle"
              placeholder="不填写则默认显示网址"
            />
          </div>
          <div class="form-group">
            <label>网址：</label>
            <input
              type="url"
              class="form-control"
              v-model="speedDialUrl"
              placeholder="请填入网址"
              required="required"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideBox">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="addToList">
            添加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ADD_ITEM } from '@/store/types';
export default {
  props: ['onShow', 'onClose'],
  data() {
    return {
      speedDialTitle: '',
      speedDialUrl: '',
      speedDialIcon: '',
    };
  },
  mounted() {
    this.onShow();
  },
  methods: {
    hideBox() {
      this.onClose();
    },
    addToList() {
      let speedDial = {
        name: this.speedDialTitle,
        url: this.speedDialUrl,
      };
      this.$store.commit(ADD_ITEM, speedDial);
      this.create_name = '';
      this.create_url = '';
      this.hideBox();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
