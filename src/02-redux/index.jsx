import React, { Component } from 'react';
import ReduxTS from './redux';  //真正的redux组件
import store from './store'; 

//为了重新渲染界面而创建的组件
export default class ReduxT extends Component{
    constructor(props){
        super(props);
        this.state={
            flag : 0,  //重新渲染组建的标识符
        }
    }

    newRender=()=>{
        //监听状态变化以便重新渲染界面
        store.subscribe(() =>{
            this.setState(state=>({
                flag : state.flag + 1
            }))
        })
    }
    
    render(){
        return (
            <ReduxTS store={store} newRender={this.newRender}/>
        )
    }

}