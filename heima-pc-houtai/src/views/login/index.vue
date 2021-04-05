<template>
  <div>
    <div class="login-content">
      <div class="login-item p-10">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="button">
            <el-button type="primary" @click="loginSubmit('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetClick('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  computed: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      //检验登录名和密码
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "用户名长度只能在在 3 到 12 个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6-16位密码数", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions({
      userlogin: "login/login",
    }),
    //登录
    loginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          // this.$message("登录成功");
          this.userlogin({
            mobile: this.ruleForm.username,
            code: this.ruleForm.password,
            success: (res) => {
              if (res.status === 201) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.push("/layout/welcome");
              } else {
                this.$message({
                  message: "登录失败,用户名或密码错误",
                  type: "error",
                  duration: 1000,
                });
                return;
              }
            },
          });
        }
      });
    },
    resetClick(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
.login-content {
  height: 100vh;
  background: url("../../assets/img/login_bg.jpg") no-repeat;
  background-size: cover;
  position: relative;
  .login-item {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>