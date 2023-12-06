<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#7660aa',
      },
    }"
  >
    <div>
      <div class="global-search-wrapper" style="width: 100%">
        <!--        <a-auto-complete-->
        <!--          v-model:value="searchParams.text"-->
        <!--          @select="onSearch"-->
        <!--          :options="options"-->
        <!--          style="width: 100%"-->
        <!--        >-->
        <!--          <a-input-search-->
        <!--            v-model:value="searchParams.text"-->
        <!--            placeholder="请输入搜索关键词"-->
        <!--            enter-button="搜索"-->
        <!--            size="large"-->
        <!--            @search="onSearch"-->
        <!--          />-->
        <!--        </a-auto-complete>-->

        <!--        here-->
        <a-input-search
          v-model:value="searchParams.text"
          placeholder="请输入搜索关键词"
          enter-button="搜索"
          size="large"
          @search="tabChange"
        />
      </div>

      <MyDivider />

      <a-tabs
        v-model:activeKey="activeKey"
        @change="tabChange"
        style="lighting-color: #7660aa"
      >
        <a-tab-pane key="post" tab="文章">
          <PostList :post-list="postList" />
        </a-tab-pane>
        <a-tab-pane key="picture" tab="图片">
          <!--          这是瀑布流吗-->
          <a-spin :spinning="spinning" id="spin" />
          <PictureList :picture-list="pictureList" :v-if="!spinning" />
        </a-tab-pane>
        <a-tab-pane key="user" tab="用户">
          <UserList :user-list="userList" />
        </a-tab-pane>
        <a-tab-pane key="video" tab="视频">
          <VideoList :user-list="videoList" />
        </a-tab-pane>
      </a-tabs>
    </div>
    <MyDivider />
    <a-pagination
      :showSizeChanger="false"
      v-model:current="current"
      v-model:pageSize="pageSizeParam"
      :total="total"
      @change="changePage"
    />
    <a-float-button
      description="HELP"
      shape="square"
      class="pink"
      :style="{
        right: '164px',
        color: '#7660aa',
      }"
      @click="showDrawer"
    >
      <template #icon>
        <img
          alt="@/assets/logo.png"
          :src="require('@/assets/logo.png')"
          style="width: 25px; height: 25px"
        />
      </template>
    </a-float-button>
    <a-drawer
      width="640"
      placement="right"
      :closable="true"
      :open="open"
      @close="onClose"
      title="aurora聚合搜索平台-项目说明"
    >
      <div class="container">
        <h2>项目介绍</h2>
        <br />
        <pre class="text">{{ intro }}</pre>
        <br />
        <h2>主要工作</h2>
        <br />
        <h3>前端</h3>
        <pre class="text">{{ front }}</pre>
        <h3>后端</h3>
        <pre class="text">{{ backend }}</pre>
      </div>
      <div>
        <a-divider />
        <h2>效果展示</h2>
        <br />
        <p>1. 文章</p>
        <a-image-preview-group>
          <a-image :src="require('@/assets/display1.png')" class="display" />
          <p>2. 图片</p>
          <a-image :src="require('@/assets/display2.png')" class="display" />
          <p>3. 用户</p>
          <a-image :src="require('@/assets/display3.png')" class="display" />
          <p>4. 视频</p>
          <a-image :src="require('@/assets/display4.png')" class="display" />
        </a-image-preview-group>
      </div>
    </a-drawer>
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { backend, intro, front } from "@/assets/introduceText.vue";
// import intro from "@/assets/introduceText.vue";
// import front from "@/assets/introduceText.vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import VideoList from "@/components/VideoList.vue";
import MyDivider from "@/components/MyDivider.vue";
import myAxios from "@/plugins/myAxios";

interface Option {
  value: string;
}

// const filterOption = (input: string, option: Option) => {
//   return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
// };
// const value = ref("");
const options = ref<Option[]>([]);
const open = ref<boolean>(false);
const spinning = ref<boolean>(true);
//========================================
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);
const videoList = ref([]);
//----------------------------------------
const router = useRouter();
const route = useRoute();
const activeKey = ref(route.params.category);
const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};
const searchParams = ref(initSearchParams);
//========================================

// 切换tab/点击搜索 => url更改，搜索数据
const onSearch = () => {
  options.value = [];
  router.push({
    path: `${activeKey.value}`,
    query: searchParams.value,
  });
  console.log(route.query);
  const query = {
    searchText: searchParams.value.text,
    type: activeKey.value,
    pageSize: initSearchParams.pageSize,
    pageNum: searchParams.value.pageNum,
    // pageNum: route.query.pageNum,
    //好像不会立即生效.....
  };
  console.log("pageNum", query.pageNum);
  spinning.value = true;
  //pictureList.value = [];
  console.log(query.searchText);
  myAxios.post("/search/all", query).then((res: any) => {
    //记得转换

    total.value = parseInt(res.total);
    console.log("执行了search，total是", total.value);
    if (query.type === "post") {
      postList.value = res.dataList;
      return;
    } else if (query.type === "picture") {
      const query = { ...route.query };
      //query.pageNum = 1 as any;
      // total.value = 99;
      router.replace({ query });
      pictureList.value = res.dataList;
      spinning.value = false;
      total.value = 300;
      return;
    } else if (query.type === "user") {
      userList.value = res.dataList;
      return;
    } else if (query.type === "video") {
      videoList.value = res.dataList;
      total.value = 300;
      return;
    }
  });
};

// 监听，路由改变，页面随之改变
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    pageNum: route.query.pageNum,
  } as any;
});

// 初始化，默认tab为post
onMounted(() => {
  const navigationType = window.performance.navigation.type;
  if (navigationType === 0) {
    console.log("页面初次加载");
    activeKey.value = "post";
  } else if (navigationType === 1) {
    console.log("页面刷新");
  }
  onSearch();
});
//==========================================
const pageSizePLUS = parseInt(route.query.pageSize as any);
const pageSizeParam = ref(isNaN(pageSizePLUS) ? 1 : pageSizePLUS).value;
const current = ref(parseInt(route.query.pageNum as any));
const total = ref(99);

const changePage = () => {
  //console.log("total = ", total.value);
  // if (activeKey.value === "video") {
  //   if (current.value % 2 == 0) {
  //     console.log("视频不翻页");
  //     return;
  //   }
  // }
  searchParams.value.pageNum = current.value;
  onSearch();
  window.scrollTo(0, 0);
};
const tabChange = () => {
  searchParams.value.pageNum = 1;
  current.value = 1;
  onSearch();
};
//==========================================
// 抽屉
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
</script>
<style>
:where(.css-ykw4qh).ant-float-btn
  .ant-float-btn-body
  .ant-float-btn-content
  .ant-float-btn-icon {
  text-align: center;
  margin: auto;
  width: 25px;
  font-size: 18px;
  line-height: 1;
}

:where(.css-ykw4qh).ant-float-btn-default
  .ant-float-btn-body
  .ant-float-btn-content
  .ant-float-btn-description {
  display: flex;
  align-items: center;
  line-height: 16px;
  color: #7660aa;
  font-size: 12px;
}

#spin {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  text-align: justify;
}

.text {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 20px;
}

.display {
  width: 100%;
  height: auto;
}
</style>
