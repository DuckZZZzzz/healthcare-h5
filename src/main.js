import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router from "./router";
import api from './api'

const app = createApp(App);

// 在实例上绑定属性
app.config.globalProperties.$api = api;
// 挂载路由

router.beforeEach((to, from, next) => {
  // 如果目标路径是登录页，则直接放行
  if (to.path === '/login') {
    return next();
  }

  // 检查是否有 token
  const h5Token = localStorage.getItem('h5_token');
  if (h5Token) {
    // 如果有 token，则放行
    return next();
  } else {
    // 如果没有 token，则重定向到登录页
    return next({ path: '/login' });
  }
});
app.use(router);
app.mount("#app");
