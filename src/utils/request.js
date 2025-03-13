import axios from "axios";

const service = axios.create({
  baseURL: "https://v3pz.itndedu.com/v3pz",
  timeout: 5000,
  headers: {
    terminal: "h5",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("h5_token");
    // 不需要添加token的api
    const whiteList = ["/login"];
    if (token || whiteList.includes(config.url)) {
      // h-token是文档中要求的请求头的名称
      config.headers["h-token"] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 接口异常的时候给用户发送提示
    // response.data.code === -1 是为了捕捉并处理那些尽管 HTTP 请求成功但应用层仍然认为是错误的情况
    if (response.data.code === -1) {
    }
    if (response.data.code === -2) {
      localStorage.removeItem("h5_token");
      localStorage.removeItem("h5_userInfo");
      // 获取当前页面的路由
      window.location.href = window.location.origin;
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
