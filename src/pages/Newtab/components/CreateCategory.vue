<template>
  <div class="create_category my-modal">
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
            <label>标识：</label>
            <input
              type="text"
              class="form-control"
              v-model="key"
              placeholder="如：game"
            />
          </div>
          <div class="form-group">
            <label>名称：</label>
            <input
              type="text"
              class="form-control"
              v-model="title"
              placeholder="如：游戏"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideBox">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="addToCategory">
            添加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["onShow", "onClose"],
  data() {
    return {
      key: "",
      title: "",
    };
  },
  mounted() {
    this.onShow();
  },
  methods: {
    hideBox() {
      this.onClose();
    },
    addToCategory() {
      this.$store.dispatch("ADD_CATEGORY", { key: this.key, title: this.title });
      this.key = "";
      this.title = "";
      this.hideBox();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
