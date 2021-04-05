<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="selectPath"
    :collapse-transition="false"
    router
  >
    <el-menu-item index="/layout/welcome" :disabled="isDisabled">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/layout/content" :disabled="isDisabled">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/layout/document" :disabled="isDisabled">
      <i class="el-icon-document"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/layout/publish" :disabled="isDisabled">
      <i class="el-icon-document-add"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/layout/comment" :disabled="isDisabled">
      <i class="el-icon-chat-dot-square"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/layout/fans" :disabled="isDisabled">
      <i class="el-icon-user"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/layout/setting" :disabled="isDisabled">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "app-aside",
  props: {
    isCollapse: {
      type: Boolean,
    },
  },
  data() {
    return {
      // isDisabled: false,
    };
  },
  created() {},
  computed: {
    isDisabled() {
      if (this.isCollapse) {
        return true;
      }
    },
  },
  methods: {
    selectPath(index, path) {
      // if (index === this.$route.path) {
      //   return;
      // }
    },
  },
};
</script>

<style lang='less' scoped>
.el-menu-vertical-demod {
  height: 100%;
}
.el-menu-item {
  padding: 0 40px;
}
</style>