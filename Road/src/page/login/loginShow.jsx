import React        from 'react';
import MUtil        from 'util/mm.jsx';
import User         from 'service/user-service.jsx';
import $ from 'jquery';
import imgPhoto from 'page/login/img/bgIMG.png';
import login_people from 'page/login/img/login_people.png';
import pass from 'page/login/img/pass.png'
import Encode from 'util/md5.js'; //引入js文件

const _mm   = new MUtil();
const _user = new User();

import './loginShow.scss';
import './loginShow.less'
import { Row, Col,Input,Button,message,Checkbox} from 'antd';


const divStyle = {
   
    backgroundImage: 'url(' + imgPhoto + ')',
    backgroundSize:'100% auto',
    backgroundRepeat:'no-repeat',
    height:'100%',
};

class LoginShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/home'
        }
    }
    componentWillMount(){
        document.title = '登录 - RoadChief';
    }
    // 当用户名发生改变
    onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        //console.log(inputName,inputValue)
        this.setState({
            [inputName] : inputValue
        });
    }
    //回车登录
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }

 // 检查登录接口的数据是不是合法
 checkLoginInfo(loginInfo){
    let username = $.trim(loginInfo.userName),
        password = $.trim(loginInfo.password);
    // 判断用户名为空
    if(typeof username !== 'string' || username.length ===0){
        return {
            status: false,
            msg: '用户名不能为空！'
        }
    }
    // 判断密码为空
    if(typeof password !== 'string' || password.length ===0){
        return {
            status: false,
            msg: '密码不能为空！'
        }
    }
    return {
        status : true,
        msg : '验证通过'
    }
}
    
    // 当用户提交表单
    onSubmit(){
        let loginInfo = {
                userName : this.state.userName,
                // password : Encode.hex_md5(this.state.password),
                password : this.state.password,
            
            }
        let  checkResult =this.checkLoginInfo(loginInfo);
        // 验证通过
        if(checkResult.status){
            loginInfo.password=Encode.hex_md5(this.state.password);
            
            $.ajax({
                type        :  'post',
                url         :  '/login/check',
                dataType    :  'json',
                data        : loginInfo,
                success     : res => {
                    console.log(loginInfo);

                    if(1 === res.result.state){
                        _mm.setStorage('userInfo',res.result);
                        if(res.result.roleId===5){
                            message.error('此用户是APP端登录的！')
                        }
                        else{
                            message.success('登录成功');
                            this.props.history.push(this.state.redirect);
                        }
                    }
                    else{
                        message.error(res.result.message);
                    }
                   
                },
                error       : err => {
                    message.error('error!');
                  
                   
                }
            });

        }
        // // 验证不通过
        // else{
        //     _mm.errorTips(checkResult.msg);
        // }
            
    }
    render(){
        return (
            <div style={divStyle}> 
                <div className='login-page-title' >
                   智慧路长综合信息管理平台
                </div>
                <div className='login-card'>
                    <div className='login-card-title' style={{height:'25%'}}>用户登录</div>
                    <div className='login-card-body' style={{height:'45%'}}>
                        <div className='input-margin'>
                            <Input type="text"  
                                        prefix={<img src={login_people} width={20}/>}
                                        placeholder="请输入用户名或手机号"
                                        name="userName"
                                        value={this.state.userName}
                                        onChange={(e) => this.onInputChange(e)}
                                        onKeyUp={e => this.onInputKeyUp(e)}/>           
                            {/* <br/><br/>
                            <br/> */}
                        </div>
                            <Input type="password"
                                            prefix={<img src={pass} width={20}/>}   
                                            placeholder="请输入密码"
                                            name="password"
                                            value={this.state.password}
                                            onChange={(e) => this.onInputChange(e)}
                                            onKeyUp={e => this.onInputKeyUp(e)}/> 
                            <div style={{float:'right',margin:'20px 0'}}>
                                <Checkbox defaultChecked={true}>记住当前用户</Checkbox>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a>忘记密码？</a>
                            </div>
            
                    </div>
                    <div className='login-card-button' style={{height:'30%'}}>
                        <Button type="primary" block onClick={e => {this.onSubmit(e)}}>登录</Button>
                    </div>
                </div>
            </div>           
        );
    }
}

export default LoginShow;