/*
reducer函数模块：根据当前state和指定的action返回新的state
*/
// import {combineReducers} from 'redux';
import { combineReducers } from '../lib/redux/index';
import { INCREMENT, DECREMENT } from './action-types';

/* //管理count的状态数据的reducer
export default function count(state=0,action){
    console.log('count()',state,action);
    switch(action.type){
        case INCREMENT: return state + action.data;
        case DECREMENT: return state - action.data;
        default:
            return state;
    }
} */

function count(state = 0, action) {
    console.log('count()',state,action);
    switch (action.type) {
        case INCREMENT: return state + action.data;
        case DECREMENT: return state - action.data;
        default:
            return state;
    }
}

//管理用户信息的reducer函数
function user(state = {}, action) {
    console.log('user()',state,action);
    switch (action.type) {
        default: return state;
    }
}

//返回一个整合后的总的reducer
export default combineReducers({
    count,
    user,
})