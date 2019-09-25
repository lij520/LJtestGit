import React, { Component } from 'react';
import ReduxTS from './containers/index';
import store from './store';
// import {Provider} from 'react-redux'; 
import {Provider} from '../lib/react-redux/index'; 

//包裹react-redux组件的入口文件

export default class ReduxT extends Component{
    render(){
        return (
            <Provider store={store}>
                <ReduxTS/>
            </Provider>
        )
    }
}
