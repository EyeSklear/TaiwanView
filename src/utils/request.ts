import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios'
import { useUserInfo } from "@/stores/userInfo"
import { setToken, getToken } from "@/utils/auth";
import { notice } from "@/utils/notice";
// axios对象
const service: AxiosInstance = axios.create({
  // axios请求基础URL
  // 由于本项目使用mock + vite-plugin-mock启动的mock服务，默认使用的端口号与页面一致
  baseURL: '/viewTaiwan',
  timeout: 200000
})

// const stores =useUserInfo()
const requestList = new Set();

// service.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// service.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });


//相应拦截器 包含两个回调函数
service.interceptors.response.use(
  (response: AxiosResponse) => {
    ///当响应中无token或者或者token过期时
    if (response.data.code === -4 || response.data.code === -5){
      const stores =useUserInfo()
       stores.logout()
      return response.data;
    }
    if (
      response.data.refreshToken != null &&
      response.data.refreshToken != ""
    ) {
      setToken(response.data.refreshToken);
    }
    setTimeout(() => {
      requestList.delete(response.config.url + response.config.data);
    }, 600); //请求间隔600ms
    return response.data;
  },
  (err: AxiosResponse) => {
    if (axios.isCancel(err)) {
      console.log(err);
      notice("warning", "警告", "操作频繁");
      return null;
    } else {
      console.log(err)     
      notice("error", "错误", "请求错误");
      requestList.delete(err.config?.url + err.config?.data);
      return err.config?.data;
    }
  }
)

service.interceptors.request.use(
  (config:AxiosRequestConfig)=>{
    const token = getToken();
    if(config.headers && config.headers.repeat){
      config.headers ={
        Authorization :`Bearer ${token}`,
      }
      return config
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    config.cancelToken = new axios.CancelToken((e) => {
      const cancelRequest = () => {
        let url: string = (config.baseURL as string) + config.url;
        e(url);
      };
  
      if (JSON.stringify(config.data) != "{}") {
        requestList.has(config.url + JSON.stringify(config.data))
          ? cancelRequest()
          : requestList.add(config.url + JSON.stringify(config.data));
      }
    });
    return config;
  },
)

const get = (url: string, params?: any, repeat?: boolean): AxiosInstance => {
  const header: AxiosRequestHeaders = {
    repeat: repeat as any,
  };
  return service({
    url: url,
    params: params,
    method: "get",
    headers: header,
  });
};

const post = (url: string, data?: any): AxiosInstance => {
  return service({
    url: url,
    data: data,
    method: "post",
  });
};

const del = (url: string, data?: any): AxiosInstance => {
  return service({
    url: url,
    data: data,
    method: "delete",
  });
};

const patch = (url: string, data?: any): AxiosInstance => {
  return service({
    url: url,
    data: data,
    method: "patch",
  });
};

export {
  get,
  post,
  del,
  patch
}