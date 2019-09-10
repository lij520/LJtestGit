/* 
能发送异步ajax请求的函数模块
封装axios库
函数的返回是一个promise对象
1、优化：统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时不用reject，而是显示错误提示
2、异步得到的不是response，而是response.data
    在请求成功resolve时：resolve(response.data)
*/

import axios from 'axios';
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){
    
    //判断请求方式是post还是get
    return new Promise((resolve,reject)=>{
        let promise;
        //1、执行异步Ajax请求
        if(type==='GET'){
            promise = axios.get(url,{
                params:data
            })
        }else{  //POST请求
            promise = axios.post(url,data);
        }
        //2、如果成功，调用resolve(value)
        promise.then(response=>{
            resolve(response.data);
        //3、如果失败，不调用reject(value),而是提示异常信息
        }).catch(error=>{
            //reject(error)
            message.error('请求出错了：'+error.message);
        })
    })
}