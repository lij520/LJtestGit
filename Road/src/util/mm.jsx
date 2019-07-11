/*
* @Author: Rosen
* @Date:   2018-01-23 22:54:28
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:21:22
*/
import $ from 'jquery';
class MUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'post',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : res => {
                    // // 数据请求成功
                    // if(0 === res.status){
                    //     typeof resolve === 'function' && resolve(res.data, res.msg);
                    // }
                    // // 没有登录状态，强制登录
                    // else if(10 === res.status){
                    //     this.doLogin();
                    // }
                    // else{
                    //     typeof reject === 'function' && reject(res.msg || res.data);
                    // }
                },
                error       : err => {
                    // typeof reject === 'function' && reject(err.statusText);
                }
            });
        });  
    }
    // 跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }
    // 本地存储
    setStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.sessionStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.sessionStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            alert('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name){
        let data = window.sessionStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.sessionStorage.removeItem(name);
    }

      //取出SessionStorage
      getSessionStorage(name){
        let data = window.sessionStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }

    //存入SessionStorage
    setSessionStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.sessionStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.sessionStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            alert('该类型不能用于本地存储');
        }
    }
}

export default MUtil;