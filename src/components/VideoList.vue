<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#7660aa',
      },
    }"
  >
    <a-list
      item-layout="horizontal"
      :grid="{ gutter: 30, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 3 }"
      :data-source="props.userList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <!--        style="width: 230px"-->
          <a-card hoverable class="card">
            <template #cover>
              <a :href="item.videoUrl" target="_blank">
                <!--                width="230"-->
                <img alt="example" :src="item.picUrl" class="card-img" />
              </a>
            </template>
            <!--            :title="item.title"-->
            <a-card-meta class="card-title">
              <template #title>
                <a
                  :href="item.videoUrl"
                  target="_blank"
                  style="font-weight: bold"
                  v-html="item.title"
                ></a>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </a-config-provider>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>
<style>
.card-title {
  overflow-wrap: break-word;
  word-wrap: break-word;
  width: 100%;
  color: rgba(0, 0, 0, 0.88);
  /* font-weight: 500; */
  font-size: 15px;
  overflow: hidden;
  display: -webkit-box; /* 设置为块级弹性盒子元素 */
  -webkit-box-orient: vertical; /* 设置为垂直排列 */
  text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
  -webkit-line-clamp: 2; /* 限制显示两行文本 */
}

.card-img {
  justify-content: center;
  flex: 0 1 auto;
  width: 230px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card {
  justify-content: center;
  flex: 0 1 auto;
  width: 230px;
  margin: 10px;
  //height: 210px;
}

a {
  text-decoration: none; /*去掉下划线*/
  color: dimgrey;
}

.keyword {
  color: #8c6eff;
  font-weight: bold;
}
</style>
