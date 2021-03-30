<template>
  <div>
    <div class="content-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/layout/welcome' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
</style>