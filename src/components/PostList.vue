<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#7660aa',
      },
    }"
  >
    <a-list item-layout="vertical" :data-source="props.postList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a
                href="https://baike.baidu.com/item/%E7%99%BD%E6%97%A5%E6%A2%A6/27109"
                target="_blank"
                v-html="item.title"
              ></a>
            </template>
            <template #avatar>
              <a-avatar :src="gege" />
            </template>
            <template #description>
              <!--              限制帖子内容展示-->
              <div
                v-html="
                  item?.content
                    ? item.content.substring(0, 800) + `......[未完]`
                    : item.content
                "
                style="margin-bottom: 10px"
              ></div>
              <template v-for="tag in item.tagList" :key="tag">
                <a-tag>
                  {{ tag }}
                </a-tag>
              </template>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-config-provider>
</template>

<script setup lang="ts">
import gege from "../assets/gege.jpg";
import { withDefaults, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>
