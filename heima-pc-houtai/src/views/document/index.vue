<template>
  <el-card>
    <div slot="header" class="clearfix">
      <Breadcrumb title="素材管理" class="breadcrumb"></Breadcrumb>
    </div>
    <!-- 素材收藏 -->
    <el-radio-group v-model="collect" @change="change" class="radio-group">
      <div>
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </div>
      <div>
        <el-button size="small" type="success" @click="dialogVisible = true"
          >上传素材</el-button
        >
      </div>
    </el-radio-group>
    <!-- 素材响应式布局 -->
    <el-row :gutter="10" style="padding-top: 20px">
      <el-col
        :xs="4"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(img, index) in userImage"
        :key="index"
        class="images"
        ><el-image style="height: 100px" :src="img.url"></el-image>
        <div class="button">
          <el-button
            size="mini"
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            :loading="img.loading"
            @click="collectImage(img)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteImage(img)"
            circle
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="per_page"
      :current-page="page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 上传素材对话框 -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :headers="headers"
        name="image"
        :on-success="upLoadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </el-card>
</template> 
<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getUserImage, userCollectImage, userDeleteImage } from "@/api/upload";
export default {
  name: "document",
  components: {
    Breadcrumb,
  },
  data() {
    const token = window.sessionStorage.getItem("token");
    return {
      collect: false,
      userImage: [],
      dialogVisible: false,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      total: 0,
      page: 1,
      per_page: 10,
    };
  },
  created() {
    this.getUpload(this.collect);
  },
  methods: {
    getUpload(collect, page = 1) {
      this.page = page;
      getUserImage({ collect, page: this.page, per_page: this.per_page }).then(
        (res) => {
          let results = res.data.data.results;
          results.forEach((item) => {
            item.loading = false;
          });
          this.userImage = results;
          this.total = res.data.data.total_count;
        }
      );
    },
    change(value) {
      this.getUpload(value);
    },
    //用户上传素材
    upLoadSuccess() {
      this.dialogVisible = false;
      this.$message({
        message: "素材上传成功",
        type: "success",
      });
      this.getUpload(false);
    },
    //点击分页
    handleCurrentChange(page) {
      this.getUpload(false, page);
    },
    collectImage(img) {
      img.loading = true;
      // if(img.is_collected){
      //   //已经收藏，取消收藏
      //   userCollectImage(img.id,false)
      // }else {
      //   //收藏
      //   userCollectImage(img.id,true)
      // }
      //上面的写法可以简写为：userCollectImage(img.id, !img.is_collected)直接把img.is_collected取反就行了
      // userCollectImage(img.id, !img.is_collected).then((res) => {
      //   img.is_collected = res.data.data.collect;
      //   img.loading = false;
      //   this.$message({
      //     message: img.is_collected ? "素材收藏成功" : "取消收藏",
      //     type: "success",
      //     duration: 1000,
      //   });
      //   this.getUpload(false);
      // });
      if (!this.collect) {
        userCollectImage(img.id, !img.is_collected).then((res) => {
          img.is_collected = !img.is_collected;
          img.loading = false;
          this.$message({
            message: img.is_collected ? "素材收藏成功" : "取消收藏",
            type: "success",
            duration: 1000,
          });
          this.getUpload(false);
        });
      } else {
        userCollectImage(img.id, !img.is_collected).then((res) => {
          img.is_collected = !img.is_collected;
          img.loading = false;
          this.$message({
            message: img.is_collected ? "素材收藏成功" : "取消收藏",
            type: "success",
            duration: 1000,
          });
          this.getUpload(true);
        });
      }
    },
    //删除素材
    deleteImage(img) {
      this.$confirm("此操作将永久删除该素材, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userDeleteImage(img.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUpload(false);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang='less' scoped>
.radio-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.images {
  position: relative;

  .button {
    height: 40px;
    position: absolute;
    left: 5px;
    right: 5px;
    bottom: 4px;
    background-color: rgba(204, 204, 204, 0.5);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>