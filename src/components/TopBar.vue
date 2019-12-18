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
.topbar {
  padding: 20px;
  text-align: right;
  background: linear-gradient(to bottom, rgba(1, 1, 1, 0.3), transparent);

  button {
    color: white;
    font-size: 0;
    text-decoration: none;
    margin: 0 10px;
    padding: 5px 0;
    border: 0;
    border-bottom: 2px solid transparent;
    border-color: transparent;
    background-color: transparent;
    outline: none;
    transition: border-color 0.2s;
    .iconfont {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 5px;
    }
    span {
      font-size: 18px;
      vertical-align: middle;
    }

    &:hover {
      border-color: white;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
