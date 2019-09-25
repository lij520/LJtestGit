// import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {connect} from '../../lib/react-redux/index';
import Counter from '../counter';
import {increment,decrement,incrementAsync} from '../actions'

//容器组件：通过connect包装UI组件
//connect():高阶函数，其返回的函数是一个高阶组件：接受一个UI组件生成一个容器组件
//容器组件的责任是向UI组件传入特定的属性


//将redux管理的state数据映射成UI组件的一般属性的函数
// function mapStateToProps(state){
//     return {
//         count : state
//     }
// }

//指定向counter传入那些一般属性（属性值的来源就是store中的state）
// const mapStateToProps = (state) =>({count:state.count})

// //将包含dispatch代码的函数映射成UI组件的函数属性的函数
// function mapDispatchToProps(dispatch){
//     return {
//         increment : (number)=>dispatch(increment(number)),
//         decrement : (number)=>dispatch(decrement(number)),
//     }
// }

//指定向counter传入哪些函数属性
//如果是函数，会自动调用得到的对象，将对象中的方法作为函数属性传入UI组件
// const mapDispatchToProps = (dispatch) =>({
//     increment : (number) =>dispatch(increment(number)),
//     decrement : (number) =>dispatch(decrement(number)),
//     incrementAsync : (number) =>dispatch(incrementAsync(number)),
// })

//简写
//如果是对象，将对象中的方法包装一个新的函数，并传入UI组件
// const mapDispatchToProps = {increment,decrement,incrementAsync}

export default connect(
    // mapStateToProps,  //指定一般属性
    // mapDispatchToProps,  //指定函数属性

    //简化最终代码
    state=>({count : state.count}),//combineReducers
    // state=>({count : state}),
    {increment,decrement,incrementAsync}
)(Counter)