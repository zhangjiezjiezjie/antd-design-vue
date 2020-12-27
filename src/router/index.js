import Vue from "vue";
import VueRouter from "vue-router";
// 第三方组件
import Nprogress from "nprogress"; // 路由加载动画
import "nprogress/nprogress.css";
// 自定义页面组件
import NotFound from "../views/404.vue";
// import RenderRouterView from '../components/renderRouterView'

Vue.use(VueRouter);

const routes = [
  // 登录 注册
  {
    path: "/user",
    //第一种: component: RenderRouterView, //新建专门用来挂载login和register的组件
    //第二种： component: { render: h => h('router-view') },
    //第三种：UserLayout.vue统一的路由挂载组件，布局会用到
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"), //挂载children中的所有组件
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
  {
    path: "/",
    component: () =>
      import(/*webpackChunkName:"layout"*/ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashoard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashoard/analysis",
            name: "analysis",
            component: () =>
              import(
                /*webpackChunkName:"dashboard"*/ "../views/Dashboard/Analysis.vue"
              )
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(/*webpackChunkName:"form"*/ "../views/Forms/BasicForm.vue")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            component: () =>
              import(/*webpackChunkName:"form"*/ "../views/Forms/StepForm.vue"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /*webpackChunkName:"form"*/ "../views/Forms/StepForm/StepInfo.vue"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /*webpackChunkName:"form"*/ "../views/Forms/StepForm/StepConfirm.vue"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /*webpackChunkName:"form"*/ "../views/Forms/StepForm/StepResult.vue"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  // 404
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

// 路由守卫
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    Nprogress.start();
  }

  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
