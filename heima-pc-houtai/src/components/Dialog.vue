<template>
  <div>
    <el-dialog
      title="删除提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定要删除吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
</style>