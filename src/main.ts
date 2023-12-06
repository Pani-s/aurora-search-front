import { createApp } from "vue";
import router from "./router";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import { VueMasonryPlugin } from "vue-masonry";
createApp(App).use(Antd).use(router).use(VueMasonryPlugin).mount("#app");
