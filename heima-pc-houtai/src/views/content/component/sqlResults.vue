<template>
  <div class="result">
    <el-card>
      <div slot="header" class="clearfix">
        <div>根据您筛选的结果的数据有{{ total }}条</div>
      </div>
      <template>
        <el-table
          :data="results"
          style="width: 100%"
          class="result-table"
          stripe
        >
          <el-table-column label="封面" width="180" align="center">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover.images[0]"
                :src="scope.row.cover.images[0]"
                alt=""
              />
              <img
                v-else
                class="article-img"
                src="../../../assets/img/404.png"
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
            <el-button type="primary" circle>
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="danger" circle>
              <i class="el-icon-delete"></i>
            </el-button>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        class="pagination"
        :page-size="10"
        layout="prev, pager, next"
        :total="1000"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    results: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      articleStatus: [
        { status: 0, text: "草稿", type: "info" },
        { status: 1, text: "待审核", type: "primary" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "warnning" },
        { status: 4, text: "已删除", type: "danger" },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.result {
  margin-top: 20px;
}
</style>