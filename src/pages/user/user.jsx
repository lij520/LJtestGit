/*
用户路由
*/
import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import { TranFormatDate } from '../../utils/dateUtils';
import LinkButton from '../../components/linkButton/index';
import {reqUserList,reqDeleteUser,reqAddUsers} from '../../api/index';
import AddUser from './adduser';

const { confirm } = Modal;

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], //所有的用户列表
            roles : [], //所有角色列表
            showVisibe : 0,
            loading: true,
        }
    }

    //角色列表表头
    getColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => TranFormatDate(create_time)
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render : (role_id)=>this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.showEdit(user)}>修改</LinkButton>
                            <LinkButton onClick={() => this.showConfirm(user)}>删除</LinkButton>
                        </span>
                    )
                }
            }
        ];
    }

    //根据roles的数组，生成包含所有角色名的对象（属性名用角色id值）
    getRoleNames=(roles)=>{
        const roleNames = roles.reduce((pre,role)=>{
            pre[role._id] = role.name
            return pre;
        },{});
        this.roleNames = roleNames;
    }
    //获取所有用户列表
    getUserList=async()=>{
        this.setState({
            loading: true
        })
        const result = await reqUserList();
        console.log('result',result);
        this.getRoleNames(result.data.roles);
        this.setState({
            loading: false
        })
        if(result.status === 0){
            this.setState({
                users : result.data.users,
                roles : result.data.roles
            })
        }else{
            message.error('获取数据失败');
        }

    }

    //删除modal
    showConfirm=(user)=>{
        confirm({
            title: `确认删除用户${user.username}吗?`,
            onOk : async()=>{
                const result = await reqDeleteUser(user._id);
                if(result.status===0){
                    message.success('删除用户成功！');
                    //更新显示列表
                    this.getUserList();
                }else{
                    message.error('删除用户失败')
                }
                // console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //修改角色
    showEdit=(user)=>{
        console.log('here',user);
        this.user = user;
        this.setState({
            showVisibe:1,
        })
    }
    //添加或更新角色
    addOrUpdateUser=async () =>{
        console.log('showvisible',this.state.showVisibe)
        this.setState({ showVisibe: 0 });
        // this.form.validateFields(async (error, values) => {
        //     if(!error){
        //         console.log('values',values)
        //     }
        // })
        //1、收集表单数据(getFieldsValue可直接收集form表单数据)
        const user = this.form.getFieldsValue();
        this.form.resetFields();
        console.log('user',user);
        //2、提交添加的请求
        const result = await reqAddUsers(user);
        //3、更新列表
        if(result.status===0){
            message.success('操作成功！');
            this.getUserList();
        }else{
            message.error('操作失败！');
        }
    }

    componentWillMount() {
        this.getColumns();
    }

    componentDidMount(){
        this.getUserList();
    }
    render() {
        const { users ,showVisibe, loading, roles} = this.state;
        const {user} = this;
        const title = <Button type='primary' onClick={()=>{this.setState({showVisibe : 1})}}>创建用户</Button>
        return (
            <div>
                <Card title={title}>
                    <Table
                        bordered
                        rowKey='_id'
                        dataSource={users}
                        columns={this.columns}
                        pagination={{ defaultPageSize: 3, showQuickJumper: true }}
                        loading={loading}
                    />
                </Card>
                <Modal
                    title={user ?"修改用户":"创建用户"}
                    visible={showVisibe === 1}
                    onOk={() =>this.addOrUpdateUser()}
                    onCancel={() => this.setState({ showVisibe: 0 })}
                >
                    <AddUser setForm={(form) => { this.form = form }} roles={roles} user={user}/>
                </Modal>
            </div>
        )
    }
}