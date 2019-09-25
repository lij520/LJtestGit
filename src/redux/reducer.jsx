//用来根据旧的state和指定的action生成并返回新的state
import {combineReducers} from 'redux';
import storageUtils from '../utils/storageUtils';
import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './action-types';

//用来管理头部标题的reducer函数
const initHeadTitle='';
function headTitle(state = initHeadTitle,action){
    switch(action.type){
        case SET_HEAD_TITLE: return action.data;
        default : return state;
    }
}

//用来管理当前登陆用户的reducer函数
const initUser = storageUtils.getUser()||{};  //从localstorage中取数据

function user(state = initUser,action){
    switch(action.type){
        case RECEIVE_USER: 
            return action.user;
        case SHOW_ERROR_MSG : 
            const errorMSG = action.errorMSG; 
            return {...state,errorMSG}; //不要直接修改原先的状态数据
        case RESET_USER:
            return {}
        default : return state;
    }
}


/*
向外暴露的是合并产生的总的reducer函数
管理的总的state的结构 
{
    headTitle:'首页',
    user : {},
} 
*/
export default combineReducers({
    headTitle,
    user,
})