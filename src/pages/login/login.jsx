/*
登陆的路由组件
*/
import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';  //Redirect重定向，可直接跳转到指定的路径上去
import { Form, Icon, Input, Button, Checkbox,message} from 'antd';
import {reqLogin} from '../../api/index.jsx';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils.jsx';
import logo from './images/logo.png';

import './login.less';

class Login extends Component{

    handleSubmit = e => {
        //阻止事件的默认行为
        e.preventDefault();

        //获取所有表单的字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('登陆表单接受的值为：', values);
                //请求登陆
                const {username,password}=values;
                const result = await reqLogin(username,password);
                console.log('请求成功',result);
                if(result.status===0){//登陆成功
                    message.success('登录成功！');
                    const user = result.data[0];
                    memoryUtils.user = user;   //保存到内存中去
                    // console.log('memoryUtils.user',memoryUtils.user);
                    storageUtils.saveUser(user); //保存到local中
                    //跳转页面:首页
                    this.props.history.replace('/');
                }else{//登陆失败
                    message.error(result.message);;
                }
            }else{
                console.log("校验失败！")
            }
        });
    };
    
    //对密码进行自定义验证
    /*
        1、必须输入密码
        2、用户名至少4位最多12位
        3、用户名必须是英文字母或下划线组成
    */
    validatePwd = (rule,value,callback)=>{
        console.log('validatePwd',rule,value);
        // callback();  //验证通过
        // callback("xxxxxx");  //验证失败并给出提示信息
        if(!value){
            callback("必须输入密码");
        }else if(value.length<4){
            callback("密码长度不能小于4位");
        }else if(value.length>12){
            callback("密码长度不能大于12位");
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须是英文字母、数字或下划线组成");
        }else{
            callback();
        }

    }
    render(){

        //如果用户已经登陆，自动跳转到管理界面
        const user = memoryUtils.user;
        // console.log('user123',user)
        if(user && user._id){
            // console.log('in here');
            return <Redirect to='/' />  //跳转到根路径
        }
        //得到巨强大功能的form对象
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="icon"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>   
                            {/*用户名规则
                                1、必须输入用户名
                                2、用户名至少4位最多12位
                                3、用户名必须是英文字母或下划线组成
                            */}
                            {getFieldDecorator('username', {//配置对象：属性名是特殊的名称
                                //声明式验证：直接使用别人定义好的验证过则进行验证
                                //自定义验证：
                                rules: [
                                    //声明式验证
                                    { required: true, message: '必须输入用户名！' },
                                    { min: 4, message: '用户名至少4位！' },
                                    { max: 12, message: '用户名最多12位！' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母、数字或下划线组成！' }
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                />,
                            )}
                        </Form.Item>   
                        <Form.Item>   
                            {/*密码验证
                            对密码进行自定义验证
                            */}
                            {getFieldDecorator('password', {
                                rules: [
                                    // { required: true, message: '必须输入密码!' }
                                    { validator : this.validatePwd }
                                ],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                                />,
                            )}
                        </Form.Item>   
                        <Form.Item>  {/*密码*/}
                            {getFieldDecorator('remember', {
                                valuePropName:'checked',
                                initialValue: true,
                            })(<Checkbox style={{color:'#fff',marginLeft:'90px',marginBottom:'20px'}}>记住密码</Checkbox>)}
                            <a className="login-form-forgot" href="https://bilibili.com">
                                忘记密码
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm;


/*
async和await
1：作用？
    简化promise对象的使用：不再使用then()来指定成功/失败的回调函数
    以同步编码(没有回调函数)方式实现异步流程
2、哪里写await？
    在返回promise的表达式左侧写await：不想要promise要promise异步执行成功的value数据
3、哪里写aysnc？
    await所在函数(最近的)定义的左侧
*/


/* 
登陆验证包含两种方式：
1、根据组件包含的规则rules来验证，比如本文件中对用户名的要求
2、可自定义验证规则来验证，比如本文件中对密码的要求
*/