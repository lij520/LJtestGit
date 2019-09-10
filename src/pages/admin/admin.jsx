/*
后台管理的路由组件
*/
import React,{Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/index.jsx';
import Header from '../../components/header/index.jsx';
import memoryUtils from '../../utils/memoryUtils';
import './index.less';

import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){

        /*
        如果可以和后端对接登陆则下面的内容取消注释
        */
        const user = memoryUtils.user;
        // 如果内存中没有user==》说明当前没有登陆
        if(!user || !user._id){
            //自动跳转到登陆界面
            return <Redirect to='/login/'/>
        }
        return(
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{marginTop:'15px',marginLeft:'15px',marginRight:'15px',backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home'/>   
                        </Switch>
                    </Content>
                    <Footer className='footer'>推荐使用谷歌浏览器，可以获得更加页面操作体验</Footer>
                </Layout>
            </Layout> 
        )
    }
}