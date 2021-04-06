<template>
  <el-card>
    <div slot="header" class="clearfix">
      <Breadcrumb title="评论管理" class="breadcrumb"></Breadcrumb>
    </div>
    <template>
      <el-table :data="commentData" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="comment_status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="statusChange(scope.row)"
            >
            </el-switch>
            <!-- <el-button
              size="large"
              :type="scope.row.comment_status ? 'success' : 'danger'"
              @click="statusChange(scope.row.id, scope.row.comment_status)"
              >{{
                scope.row.comment_status ? "打开评论" : "关闭评论"
              }}</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>
  </el-card>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getArticle, changeArticleStatus } from "@/api/articleList";
export default {
  name: "comment",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      commentData: [],
      total: 0,
      per_page: 20,
      page: 1,
    };
  },
  created() {
    this.getArticleData(this.page, this.per_page);
  },
  methods: {
    getArticleData(page, per_page) {
      getArticle({ page, per_page, response_type: "comment" }).then((res) => {
        // console.log(res);
        this.commentData = res.data.data.results;
        this.total = res.data.data.total_count;
      });
    },
    handleCurrentChange(page) {
      this.getArticleData(page, this.per_page);
    },
    handleSizeChange(per_page) {
      this.getArticleData(this.page, per_page);
    },
    statusChange(value) {
      //因为这个id是大数据量，需要进行处理，在处理之前使用toString()
      changeArticleStatus(value.id.toString(), value.comment_status).then(
        (res) => {
          this.$message({
            message: value.comment_status ? "打开评论" : "关闭评论",
            type: "success",
            duration: 1000,
          });
        }
      );
    },
  },
};
</script>

<style lang='less' scoped>
</style>