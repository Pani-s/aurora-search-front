<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#7660aa',
      },
    }"
  >
    <!--    :pagination="pagination"-->
    <a-list
      :grid="{ gutter: 30, column: 2 }"
      item-layout="horizontal"
      :data-source="props.userList"
    >
      <template #renderItem="{ item }">
        <a-list-item style="display: flex; justify-content: start">
          <!--        style="width: 200px"-->
          <a-avatar :size="80">
            <template #icon
              ><img :src="item.userAvatar ? item.userAvatar : gege" alt=".."
            /></template>
          </a-avatar>
          <div style="margin-left: 15px">
            <p style="font-size: 18px; font-weight: bold; padding-top: 15px">
              {{ item.userName }}
            </p>
            <p
              style="
                font-size: 14px;
                color: rgb(128, 128, 128);
                margin-top: -15px;
              "
            >
              {{ item.userProfile }}
            </p>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </a-config-provider>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, onMounted, ref } from "vue";
import gege from "@/assets/gege.jpg";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
// const pagination = {
//   pageSize: ref(parseInt(route.query.pageSize as any)).value,
//   current: ref(parseInt(route.query.pageNum as any)).value,
//   onChange: (page: number) => {
//     console.log(page);
//     //我好聪明
//     pagination.current = page;
//     const query = { ...route.query };
//     // 修改query参数中的某一项
//     query.pageNum = page.toString();
//     // 将修改后的query参数更新到URL中
//     router.replace({ query });
//   },
// };
// onMounted(() => {
//   if (route.query.pageNum != null) {
//     pagination.onChange(parseInt(route.query.pageNum as any));
//     //pagination.current = parseInt(route.query.pageNum);
//   }
// });

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>
