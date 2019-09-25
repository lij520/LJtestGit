//包含n个action creator函数的模块
//包含同步和异步action：同步action：对象{type:'xxx',data:数据值}
//异步action：函数 dispatch=>{}

import {SET_HEAD_TITLE, RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './action-types';
import {reqLogin} from '../api/index';
// import { message } from 'antd';
import storageUtils from '../utils/storageUtils';

//设置头部标题的同步action
export const setHeadTitle = (headTitle) =>({type: SET_HEAD_TITLE,data : headTitle});
//接收用户信息的同步action
export const receiveUser = (user) =>({type: RECEIVE_USER,user});

//显示错误信息的同步action
export const showErrorMsg = (errorMSG) =>({type: SHOW_ERROR_MSG,errorMSG});


//退出登陆的同步action：logout
export const Logout = () =>{
    //删除local中的user
    storageUtils.removeUser();
    //返回action对象
    return {type: RESET_USER}
}

//异步登陆login
export const login = (username,password)=>{
    return async dispatch =>{
        //1\执行异步ajax请求
        const result = await reqLogin(username,password);
        if(result.status===0){ //请求成功，分发成功的同步action
            const data = result.data;
            console.log('!!!!!!!!!!!!!',data)
            //将用户数据保存到local中
            storageUtils.saveUser(data[0]);
            //分发接收用户的同步action
            dispatch(receiveUser(data[0]));
        }else{ //请求成功，分发失败的同步action
            // message.error(result.msg);
            dispatch(showErrorMsg(result.msg));
        }
    }
}

