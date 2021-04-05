<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <Breadcrumb title="内容管理" class="breadcrumb"></Breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="状态">
          <!-- el-radio默认把label的文本作为和v-model双向绑定的值 -->
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="region" placeholder="请选择">
            <!-- el-option双向绑定的是value的值 -->
            <el-option
              v-for="(item, index) in channelsList"
              :label="item.name"
              :value="item.id"
              :key="index"
            ></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <!-- format是选择日期后显示的格式
              value-format是选择日期后双向绑定的数据的格式
           -->
          <el-date-picker
            v-model="selectTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            size="small"
            :disabled="loading"
            >筛选</el-button
          >
          <!-- 防止用户在网速慢得情况下多次点击筛选，在请求网络期间把按钮禁用 -->
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <sql-results :total="total" :results="resultList"></sql-results> -->
    <el-card class="resultsList">
      <div slot="header" class="clearfix">
        <div>根据您筛选的结果的数据有{{ total }}条</div>
      </div>
      <template>
        <el-table
          :data="resultList"
          style="width: 100%"
          class="result-table"
          stripe
          v-loading="loading"
        >
          <el-table-column label="封面" width="180" align="center">
            <template slot-scope="scope">
              <img
                class="article-img"
                v-if="scope.row.cover.images[0]"
                :src="scope.row.cover.images[0]"
                alt=""
              />
              <img
                v-else
                class="article-img"
                src="../../assets/img/404.png"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="250">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="250"
            align="center"
          >
            <template
              slot-scope="status"
              v-for="(item, index) in articleStatus"
            >
              <el-tag
                :type="articleStatus[status.row.status].type"
                :key="index"
                >{{ articleStatus[status.row.status].text }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                circle
                @click="$router.push('/layout/publish?id=' + scope.row.id)"
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                type="danger"
                circle
                @click="deleteArticleData(scope.row.id)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        class="pagination"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        background
        @current-change="currentChange"
        :disabled="loading"
      >
        <!-- 为了防止用户在网络慢的情况下多次点击分页 -->
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import SqlResults from "./component/sqlResults";
import { getArticle, getChannels, deleteArticle } from "@/api/articleList";
import { mapActions } from "vuex";
// import dayjs from "dayjs";
export default {
  name: "contents",
  components: {
    Breadcrumb,
    SqlResults,
  },
  data() {
    return {
      form: {},
      region: "",
      status: null, //单选按钮的状态
      selectTime: [],
      total: 0, //总条数
      resultList: [],
      currentPage: 1, //当前页数
      pageSize: 20, //当前页条数,
      channelsList: [], //文章频道
      articleStatus: [
        { status: 0, text: "草稿", type: "info" },
        { status: 1, text: "待审核", type: "primary" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "warnning" },
        { status: 4, text: "已删除", type: "danger" },
      ],
      loading: true,
    };
  },
  created() {
    this.getArticleData(this.currentPage, this.pageSize);
    this.getChannelsdData();
  },
  methods: {
    ...mapActions({
      //getArticle: "articleList/getArticleData",
    }),
    //获取文章列表
    async getArticleData(page, per_page, status, channel_id) {
      this.loading = true;
      let { data: res } = await getArticle({
        page,
        per_page,
        status,
        channel_id,
        begin_pubdate: this.selectTime[0] || null,
        end_pubdate: this.selectTime[1] || null,
      });
      // console.log(res);
      if (res.message === "OK") {
        this.total = res.data.total_count;
        this.resultList = res.data.results;
      }
      this.loading = false;
    },
    //获取文章频道
    getChannelsdData() {
      getChannels().then((res) => {
        let { data } = res;
        if (data.message === "OK") {
          this.channelsList = data.data.channels;
        } else {
          this.$message("请求失败");
        }
      });
    },
    //筛选
    onSubmit() {
      if (!this.region) {
        return this.$message({
          message: "请选择频道",
          type: "error",
          duration: 1000,
        });
      }
      this.getArticleData(
        this.currentPage,
        this.pageSize,
        this.status,
        this.region
      );
    },
    //监听页数发生改变
    currentChange(page) {
      this.getArticleData(page, this.pageSize);
    },
    //删除文章
    deleteArticleData(articleId) {
      console.log(articleId);
      console.log(articleId.toString());
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(articleId.toString()).then((res) => {
            if (res.status === 204) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getArticleData(this.currentPage);
            }
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
.content-header {
  border: 1px solid #f7f7f7;
  background-color: #fff;
  .breadcrumb {
    border-bottom: 1px solid #eee;
    padding: 20px 0 20px 20px;
  }
  .form {
    margin-top: 20px;
  }
}
.resultsList {
  margin-top: 20px;
}
.pagination {
  margin-top: 10px;
}
.article-img {
  width: 100px;
  height: 100px;
  background-size: cover;
}
</style>