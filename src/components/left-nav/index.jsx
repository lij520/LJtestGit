/*
左侧导航栏
 */

import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../components/config/menuconfig.jsx';

import { Menu, Icon} from 'antd';
const { SubMenu } = Menu;

class LeftNav extends Component{
    
    getMenuNodes_map = (menuList) =>{
        //根据menu数据数据生成对应的标签数组
        //使用map()+递归调用
        return menuList.map(item =>{
            /*
            title : '商品',
            key : '/products',
            icon : 'appstore',
            children : [] //可能有也可能无
            //返回的两种方式<Menu.Item/>和<SubMenu/>
            */
           if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
           }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {/*递归调用，children也是一个数组，所以使用方法和menuList相同*/}
                       {this.getMenuNodes_map(item.children)}   
                    </SubMenu>
                )
           }
        })
    }

    getMenuNodes = (menuList) =>{
        const path = this.props.location.pathname;
        //根据menu数据数据生成对应的标签数组
        //使用reduce()+递归调用 [reduce()是用来做累计累加的]
        return menuList.reduce((pre,item) =>{
            //向pre中添加<Menu.Item>或者<SubMenu/>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
                //如果存在，说明当前的item子列表需要打开
                if(cItem){
                    this.openKey = item.key;
                }
                
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {/*递归调用*/}
                       {this.getMenuNodes(item.children)}   
                    </SubMenu>
                ))
            }
            return pre  //必须return pre
        }, [])
    }

    /* 
    在第一次render()之前执行
    为第一个render()准备数(必须是同步的准备)
    */
    componentWillMount(){
        this.getMenuNodes(menuList);
    }

    render(){
        //获取当前路径
        let path = this.props.location.pathname;
        //当请求的路径为父路径有下面的子路由时
        if(path.indexOf('/product')===0){  //当前请求的是商品或其子路由
            path='/product'
        }
        //得到需要打开菜单项的key
        const openKey = this.openKey

        return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={logo} alt='logo'/>
                <h1>React全栈</h1>
            </Link>

            <Menu
                // defaultSelectedKeys={[path]}
                selectedKeys = {[path]}
                defaultOpenKeys = {[openKey]}
                mode="inline"
                theme="dark"
            >
                {
                    this.getMenuNodes(menuList)
                }
                
            </Menu>
        </div>
        )
    }
}

/*
withRouter高阶路由组件：
包装非路由组件，返回一个新组件
新的组件向非路由组件传递3个属性：history/location/match

如果不使用这个路由高阶组件，在leftNav组件中则不存在localtion这个属性
*/

export default withRouter(LeftNav);