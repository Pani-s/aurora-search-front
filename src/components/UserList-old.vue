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
    :grid="{ gutter: 0, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :data-source="props.userList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <!--        style="width: 200px"-->
        <a-card hoverable style="width: 150px">
          <template #cover>
            <img alt="example" width="100" :src="item.userAvatar" />
          </template>
          <a-card-meta :title="item.userName">
            <template #description>{{ item.userProfile }}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
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
