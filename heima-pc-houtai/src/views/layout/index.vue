<template>
  <el-container class="home">
    <el-aside
      width="auto"
      style="
         {
          background-color: rgb(238, 241, 246);
        }
      "
    >
      <app-aside class="aside-menu" :isCollapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <div class="headers">
          <i
            :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            @click="isCollapse = !isCollapse"
          ></i>
          <span class="header-title">头条后台管理</span>
        </div>
        <div class="user">
          <img class="user-img" :src="user.user.photo" alt="" />
          <el-dropdown>
            <span class="el-dropdown-link username">
              {{ user.user.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="command"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from "./component/Aside";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "layout",
  components: {
    AppAside,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    ...mapActions({
      getUserData: "user/getUserData",
    }),
    ...mapMutations({
      LOGOUT: "login/LOGOUT",
    }),
    command() {
      this.LOGOUT();
      this.$message({
        message: "退出成功",
        type: "success",
        duration: 1000,
      });
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang='less' scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .el-header {
    width: auto;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 30px;
    .header-title {
      font-size: 20px;
    }
    .el-icon-s-fold,
    .el-icon-s-unfold {
      font-size: 20px;
      padding-right: 10px;
    }
    .user {
      .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .username {
        font-size: 16px;
        color: #999;
        margin-left: 10px;
      }
    }
  }
  .el-main {
    background-color: #f4f5f6;
    color: #333;
    height: 100%;
  }
  .el-aside {
  }
  .aside-menu {
    height: 100%;
  }

  // .el-aside {
  //   height: 100vh;
  //   background-color: #d3dce6;
  //   color: #333;
  //   text-align: center;
  // }
}
</style>