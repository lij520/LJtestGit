/*
包含n个用来创建action的工厂函数(action creater)
*/
import {INCREMENT,DECREMENT} from './action-types';

//同步action：返回对象
export const increment=(number)=>({type:INCREMENT,data:number})

export const decrement=(number)=>({type:DECREMENT,data:number})

//异步action：返回函数
export const incrementAsync = (number) =>{
    return dispatch =>{
        //执行异步（定时器，ajax请求，promise）
        setTimeout(()=>{
            //当前异步任务执行完成时，分发一个同步action
            dispatch(increment(number))
        },1000)
    }
}