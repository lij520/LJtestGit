/* 
redux库的模块 
1）redux库向外暴露下面几个函数
    createStore():接收参数为reducer函数，返回为store对象
    combineReducers():接受包含n个reducer方法的对象，返回一个新的reducer函数
    applayMiddleware()://暂时不实现
2）store对象的内部结构
    getState():返回值为内部保存的state数据
    dispatch():参数为action对象
    subscribe():参数为监听内部state更新的回调函数
*/


//创建一个store对象并返回
export function createStore(reducer){

    //用来存储内部状态数据的变量,初始值为调用reducer函数返回的结果
    let state = reducer(undefined,{type:'@@redux/init'});
    //用来存储监听state更新回调函数的数组容器
    let listeners = [];

    //取值：返回当前内部的state数据
    function getState(){
        return state;
    }
    //分发action，触发reducer调用，产生新的state
    function dispatch(action){
        console.log('dispatch()',action);
        //触发reducer的调用
        const newState = reducer(state,action);
        //保存新的state
        state = newState;
        //调用所有已存在的监视回调函数
        listeners.forEach(listener=>listener())
    }
    //监听状态变化：监听内部state的变化:可以给一个store绑定多个监听
    function subscribe(listener){
        // console.log('subscribe()',listener);
        //保存到缓存listener的容器数组中
        listeners.push(listener);
    }


    //返回store对象
    return {
        getState,
        dispatch,
        subscribe
    }
}


//整合传入参数对象中的多个reducer函数，返回一个新的reducer，新的reducer管理的状态是：{}
/*
reducers的结构:
{
    count : (state=2,action)=>newState,
    user : (state={},action)=>{}
}
得到的总状态的结构
{
    count : count(state.count,action),
    user : user(state.user,action)
}
*/
export function combineReducers(reducers){
    // console.log('reducers',reducers);
    //返回一个新的总reducer函数
    return (state = {},action)=>{
        /*
        执行reducers中每个reducer函数得到一个新的子状态，并添加到总状态空对象容器
        利用Object.keys()得到对象的属性名数组
        */
        /* 
        //利用forEach遍历reducers
        const newState ={};  //总状态空对象
        Object.keys(reducers).forEach(key=>{
            newState[key] = reducers[key](state[key],action)
        })
        return newState; 
        */
        //利用reduce
        const newState = Object.keys(reducers).reduce((preState,key)=>{
            preState[key] = reducers[key](state[key],action);
            return preState
        },{});
        return newState;
    }
}