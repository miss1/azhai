/**
 * Created by yangliling on 2018/4/24.
 * axios网络请求
 */
import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://192.168.10.106:3000/client';
axios.defaults.withCredentials = true;

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    //返回的值为res.data，这里可以根据后台返回过来的编码做出相应的处理
    if(res.data.code != 200){
        return Promise.reject(res.data.msg);
    }
    return res.data;
}, (error) => {
    //404等问题可以在这里处理
    return Promise.reject(error);
});

export default{
    fetch(url, params){
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}
