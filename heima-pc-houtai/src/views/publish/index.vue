<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <Breadcrumb
          :title="$route.query.id ? '修改文章' : '发布文章'"
          class="breadcrumb"
        ></Breadcrumb>
      </div>
      <el-form
        :model="article"
        ref="article"
        :rules="publishRules"
        class="form"
        label-width="60px"
      >
        <el-form-item label="标题" label-width="60px" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="60px" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            :height="350"
            placeholder="请输入文章内容"
          />
        </el-form-item>
        <el-form-item label="封面">
          <!-- el-radio默认把label的文本作为和v-model双向绑定的值 -->
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id" label-width="60px">
          <el-select v-model="article.channel_id" placeholder="请选择">
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
        <el-form-item>
          <el-button type="primary" @click="add(false)">{{
            $route.query.id ? "修改" : "发布"
          }}</el-button>
          <el-button @click="add(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Image,
  Preview,
  TextColor,
  Fullscreen,
} from "element-tiptap";
import {
  getAssignArticle,
  getChannels,
  addArticle,
  editArticle,
} from "@/api/articleList";
import { uploadImage } from "@/api/upload";
export default {
  name: "publish",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        channel_id: "",
      },
      channelsList: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Image({
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd).then((res) => {
              console.log(res);
              return res.data.data.url;
            });
          },
        }),
        new Preview(),
        new TextColor(),
        new Fullscreen(),
      ],
      publishRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "文章标题长度在 5 到 30 个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(new Error("请输入文章内容"));
              } else {
                callback();
              }
            },
          },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [
          { required: true, message: "请选择频道", trigger: "change" },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.id) {
      getAssignArticle(this.$route.query.id).then((res) => {
        this.article = res.data.data;
      });
    }

    getChannels().then((res) => {
      this.channelsList = res.data.data.channels;
    });
  },
  methods: {
    add(draft = false) {
      const articleId = this.$route.query.id;
      this.$refs.article.validate((vaild) => {
        if (!vaild) {
          return;
        } else {
          if (articleId) {
            editArticle(articleId, this.article, draft).then((res) => {
              console.log(res);
              this.$message({
                message: "编辑修改文章成功",
                type: "success",
                duration: 1000,
              });
              this.$router.push("/layout/content");
            });
          } else {
            addArticle(this.article, draft).then(() => {
              this.$message({
                message: draft ? "存入草稿成功" : "发布成功",
                type: "success",
                duration: 1000,
              });
              this.$router.push("/layout/content");
            });
          }
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
</style>