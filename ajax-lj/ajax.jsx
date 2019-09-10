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
            console.log('请求出错了：'+error.message);
        })
    })
}