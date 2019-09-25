/*
reducer函数模块：根据当前state和指定的action返回新的state
*/
import {INCREMENT,DECREMENT} from './action-types';
// import {combineReducers} from 'redux';
import {combineReducers} from '../lib/redux/index';
/* //管理count的状态数据的reducer
export default function count(state=0,action){
    // console.log('count()',state,action);
    switch(action.type){
        case INCREMENT: return state + action.data;
        case DECREMENT: return state - action.data;
        default:
            return state;
    }
} */

function count(state=0,action){
    // console.log('count()',state,action);
    switch(action.type){
        case INCREMENT: return state + action.data;
        case DECREMENT: return state - action.data;
        default:
            return state;
    }
}
const initUser={};

//管理user状态数据的reducer
function user(state=initUser,action){
    switch(action.type){
        default: return state;
    }
}

//如果使用combineReducers，在connect()中count要用state.count
export default combineReducers({
    count,
    user
})