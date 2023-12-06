<script>
import { ref } from "vue";

const intro = ref(
  "你好(*´▽｀)ノノ~~~~\n这是一个基于 Spring Boot + Elastic Stack + Vue3 的一站式信息聚合搜索平台，用户可在同一页面集中搜索出不同来源、不同类型的内容，提升搜索体验。"
);
const front = ref(
  "1. 基于Vue 3 + Ant Design Vue 4.0.0 实现响应式页面开发，使用 Tab 组件 + Vue Router 动态路由实现统一页面布局，通过用户点击 Tab 时更改路由来切换各类数据（文章、图片、用户）的搜索结果，并选用不同的组件进行展示。\n" +
    "2. 为解决刷新页面后搜索结果丢失的问题，定义 searchParams 响应式变量来集中保存当前的搜索条件（比如关键词、搜索类别、分页），并通过 Vue Router 的 query 参数将搜索条件同步到 url 的 querystring 中。即使用户刷新后也还是会回到原来的页面~~\n" +
    "3. 使用 masonry 插件，固定每张图片的宽度，高度自适应，实现图片的瀑布流布局。\n"
);
const backend = ref(
  "1. 基于 Spring Boot 框架 + MyBatis Plus + MyBatis X 插件，快速生成基本数据源的增删改查（比如用户、文章）。\n" +
    "2. 数据源获取：\n" +
    "   - 使用 HttpClient 请求离线获取外部网站的文章，并使用 Hutool 的 JSONUtil 解析和预处理文章，最终入库。\n" +
    "   - 使用 jsoup 实时请求必应搜索接口获取图片，请求哔哩哔哩网站获取视频，并使用 CSS Selector 等语法解析和预处理图片信息，最终返回给前端。\n" +
    "3. 搜索词高亮：使用 Elasticsearch 的 highlight 语法实现搜索词高亮。\n" +
    "4. 数据同步：使用 Spring Scheduler 定时同步近5分钟内发生更新的 MySQL 的文章数据到 ES ，通过唯一 id 来保证每条数据的准确性。\n" +
    "5. 模糊查询：为解决文章搜不出的问题，自主搭建 Elasticsearch 来代替 MySQL 的模糊查询，并通过索引绑定ik分词器实现了更灵活的分词搜索。\n" +
    "6. 开发搜索功能时，使用 Kibana DevTools + DSL 调试 ES 的搜索效果，并使用 Spring Data Elasticsearch 的 QueryBuilder 组合查询条件，实现对 ES 内文章的灵活查询（比如同时查询标题和文章中带有指定关键字的内容）。"
);
// export default { intro, front, backend };
export { intro, front, backend };
const why = 1;
export default { why };
</script>
