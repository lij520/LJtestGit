/*
应用的根组件
*/

import React,{ Component } from 'react';
// import {Button} from 'antd';
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom'
// import Login from './pages/login/login.jsx';
import WrappedLoginForm from './pages/login/login.jsx';
import Admin from './pages/admin/admin.jsx';

export default class extends Component{
    render(){
        return(
            // <BrowserRouter>  {/* 地址不带# */}
            <HashRouter>   {/* 地址带# */}
                <Switch>{/*只匹配其中一个路径*/}
                    <Route path='/login' component={WrappedLoginForm}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </HashRouter>
            // </BrowserRouter>
        )
    }
}