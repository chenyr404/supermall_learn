import axios from 'axios'

export function request(config) {
    //创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  })
    //axios拦截器
  instance.interceptors.request.use(success => {
   // console.log(success);
    return success
  },error => {
    //console.log(error);
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    //console.log(res);
    return res.data
  },err => {
    console.log(err);
  })


   return instance(config) //返回Promise
}
