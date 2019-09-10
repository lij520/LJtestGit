import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';


import ProductHome from './index';
import ProductAddUpdate from './addupdate';
import ProductDetail from './detail';
import './product.less';
/*
商品分类路由
*/

export default class Product extends Component{
    render(){
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome}/>  {/*用exact进行完全匹配*/}
                <Route path='/product/detail' component={ProductDetail}/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}