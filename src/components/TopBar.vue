<template>
  <div class="topbar">
    <button @click="showCreate()">
      <i class="iconfont iconplus-circle"></i>
      <span>新增</span>
    </button>
    <button @click="toggleEditMode()">
      <i class="iconfont iconcompass"></i>
      <span>管理</span>
    </button>
    <button @click="showSetting()">
      <i class="iconfont iconsetting"></i>
      <span>设置</span>
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    showCreate() {
      this.$emit("on-command", "create");
    },
    showSetting() {
      this.$emit("on-command", "setting");
    },
    toggleEditMode() {
      this.$emit("on-command", "edit");
    }
  }
};
</script>
<style lang="less" scoped>
</style>
