<template>
  <div>
    <Header> </Header>
    <Menu> </Menu>
    <Footer> </Footer>

    <router-view></router-view>
  </div>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
export default {
  components: {
    Header,
    Footer,
    Menu
  }
};
</script>
