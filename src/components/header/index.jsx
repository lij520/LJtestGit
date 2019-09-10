import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Modal} from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {formateDate} from '../../utils/dateUtils';
import {reqWeather} from '../../api/index';
import menuList from '../config/menuconfig';
import LinkButton from '../../components/linkButton/index';
import './index.less';

/*
左侧导航栏
 */
const { confirm } = Modal;

class Header extends Component{

    constructor(props){
        super(props);
        this.state={
                currentTime: formateDate(Date.now()),//当前时间字符串
                dayPictureUrl:'',//天气图片url
                weather:'',//天气的文本
        }

        this.getTime=this.getTime.bind(this);
        this.getWeather=this.getWeather.bind(this);
        this.getTitle=this.getTitle.bind(this);
        this.Logout=this.Logout.bind(this);
    }
    
    //动态时间
    getTime = () =>{
        //显示时间的循环定时器
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({
                currentTime
            })
        }, 1000);
    }

    //动态天气
    getWeather =async () =>{
        //调用接口请求异步获取数据
        const {dayPictureUrl,weather} = await reqWeather('长乐');
        //更新状态
        this.setState({
            dayPictureUrl,
            weather,
        })
    }

    //获取title
    getTitle = () =>{
        //得到当前请求路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item =>{
            if(item.key===path){
                title = item.title;
            }else if(item.children){
               const cItem= item.children.find(cItem =>path.indexOf(cItem.key)===0);
               //如果有值才说明有匹配的
               if(cItem){
                   //取出它的title
                   title = cItem.title;
               }
            }
        })
        return title;
    }


    /*
    退出登录
    */
    Logout = () =>{
        confirm({
            // title: 'Do you Want to delete these items?',
            content: '确定退出吗？',
            onOk: () =>{
            //   console.log('确定');
            //删除保存的user数据
            storageUtils.removeUser();
            memoryUtils.user={};
            //跳转到Login
            this.props.history.replace('/login');
            },
            onCancel() {
              console.log('取消');
            },
          });
    }


   /*
   在第一次render之后执行
   一般在此执行异步操作：发送ajax请求/启动定时器
   */
    componentDidMount(){
        this.getTime();
        this.getWeather();
    }

    /*
    在当前组件卸载之前调用
    */
    componentWillUnmount(){
        //清除定时器
        clearInterval(this.intervalId);
    }


    render(){
        const username = memoryUtils.user.username;
        const title = this.getTitle();
        return (
            <div className='header'>
            <div className='header-top'>
                <span>欢迎，{username}</span>
                {/*
                    解决a标签的警告问题：Script URL is a form of eval no-script-url
                    方法：自己写一个LinkButton的组件来解决
                */}
                <LinkButton onClick={this.Logout}>退出</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>{title}</div>
                <div className='header-bottom-right'>
                    <span>{this.state.currentTime}</span>
                    <img src={this.state.dayPictureUrl} alt="weather"/>
                    <span>{this.state.weather}</span>
                </div>
            </div>
            </div>
        )
    }
 }

 export default withRouter(Header);