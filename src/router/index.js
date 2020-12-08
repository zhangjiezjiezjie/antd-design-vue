import Vue from "vue";
import VueRouter from "vue-router";
// import RenderRouterView from '../components/renderRouterView'

Vue.use(VueRouter);

const routes = [
  // 登录 注册
  {
    path: "/user",
    //第一种: component: RenderRouterView, //用来挂载login和register
    //第二种： component: { render: h => h('router-view') },
    //第三种：UserLayout.vue统一的路由挂载组件
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        //import异步加载,把某个路由下的所有组件都打包在同个异步块(chunk)中，只需要使用命名chunk,一个特殊得注释语法来提供chunk name
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/register")
      }
    ]
  },
  // 仪表盘
  {}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
