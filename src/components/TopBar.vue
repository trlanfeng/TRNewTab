<template>
  <div class="topbar">
    <button @click="showCreate()">
      <img src="../assets/images/add.png">
      <span>新增</span>
    </button>
    <button @click="toggleEditMode()">
      <img src="../assets/images/edit.png">
      <span>管理</span>
    </button>
    <button @click="showSetting()">
      <img src="../assets/images/setting.png">
      <span>设置</span>
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    showCreate() {
      this.$emit('on-command', 'create');
    },
    showSetting() {
      this.$emit('on-command', 'setting');
    },
    toggleEditMode() {
      this.$emit('on-command', 'edit');
    }
  }
};
</script>
<style lang="less" scoped>
</style>
