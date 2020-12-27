// 布局：layout -- main.js中引入Layout
<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 菜单栏 -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <Menu></Menu>
      </a-layout-sider>
      <a-layout>
        <!-- 头部 -->
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="collapse-icon"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <!-- 内容区 -->
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <!-- 底部 -->
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Drawer></Drawer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import Drawer from "../components/settingDrawer/index.vue";
export default {
  components: {
    Header,
    Footer,
    Menu,
    Drawer
  },

  data() {
    return {
      collapsed: false //左侧菜单是否可伸缩
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style scoped>
.collapse-icon {
  padding: 0 20px;
  line-height: 64px;
}
.collapse-icon:hover {
  background-color: #eeeeee;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eeeeee;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
