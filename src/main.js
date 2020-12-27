import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//第三方库ant-design-vue
// import Antd from "ant-design-vue";
//引入ant-design-vue less样式
// import "ant-design-vue/dist/antd.less";
// 按需引入后，样式也不用单独来写 === 按需引入用到babel -- 安装babel-plugin-import
import { Button, Layout, Icon } from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
