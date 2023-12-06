const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7070,
    // 此处修改你想要的端口号
    proxy: {
      "/api": {
        target: "http://localhost:8101/api", //这里填入你要请求的接口的前缀
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        secure: true, //是否https接口
      },
    },
  },
});
