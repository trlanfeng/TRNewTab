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
            <label>分类：</label>
            <input
              type="text"
              class="form-control"
              v-model="category"
              placeholder="不填写则默认显示网址"
            />
          </div>
          <div class="form-group">
            <label>名称：</label>
            <input
              type="text"
              class="form-control"
              v-model="title"
              placeholder="不填写则默认显示网址"
            />
          </div>
          <div class="form-group">
            <label>网址：</label>
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
export default {
  props: ["onShow", "onClose"],
  data() {
    return {
      category: "",
      title: "",
      url: "",
      icon: "",
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
        category: this.category,
        item: {
          name: this.title,
          url: this.url,
        },
      };
      this.$store.commit("ADD_ITEM", speedDial);
      this.category = "";
      this.title = "";
      this.url = "";
      this.hideBox();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
