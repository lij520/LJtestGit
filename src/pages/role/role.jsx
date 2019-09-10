import React, { Component } from 'react';

/*
角色路由
*/
import {
    Card,
    Table,
    message,
    Button,
    Modal
} from 'antd';
// import LinkButton from '../../components/linkButton/index'
import { reqRoleList, reqAddRole, reqUpdateRole } from '../../api/index';
import { TranFormatDate } from '../../utils/dateUtils';
import TreeSelect from './treeselect';
import AddRole from './addrole';
import memoryUtils from '../../utils/memoryUtils';



export default class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList: [],    //角色列表
            loading: true,
            roleSelect: {},//选中的对象
            showVisibe: 0, //0为弹出窗不可见，1为创建角色可见，2为设置权限可见
        }
        this.selecteAuth = React.createRef();
    }

    //初始化角色列表
    initRoleList = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => TranFormatDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (auth_time) => TranFormatDate(auth_time)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }
        ];
    }

    //获取角色列表
    getRoleList = async () => {
        this.setState({
            loading: true
        })
        const result = await reqRoleList();
        this.setState({
            loading: false
        })
        if (result.status === 0) {
            message.success('获取角色列表成功');
            const roleList = result.data;
            this.setState({
                roleList
            });
        } else {
            message.error("获取角色列表失败");
        }
    }


    //获取表格某行的整体数据
    onRow = (role) => {
        return {
            onClick: event => {  //点击行
                this.setState({
                    roleSelect: role
                })
                console.log('reole', role)
            }
        }
    }

    //添加新角色
    AddRoleCreate = () => {
        //进行表单验证，通过了才能向下处理
        this.form.validateFields(async (error, values) => {
            if (!error) {
                //收集数据
                const name = values.roleName;
                const time = new Date().getTime();
                //清除表单存在的数据
                this.form.resetFields();
                //请求添加
                const result = await reqAddRole(name, time);
                // console.log('result', result)
                //根据结果提示角色添加结果
                if (result.status === 0) {
                    message.success('创建角色成功');
                    //一、利用接口重新获取rolelist更新显示列表
                    // this.getRoleList();
                    //二、直接更新以获取过的角色列表数据
                    const role = result.data;
                    //更新roleList状态：基于原本的状态数据更新
                    this.setState(state => ({
                        roleList: [...state.roleList, role[0]]
                    }));

                } else {
                    message.error('创建角色失败')
                }

                //隐藏modal窗口
                this.setState({
                    showVisibe: 0
                });
            }
        })
    }
    //添加角色

    //设置角色权限/更新角色
    AddRoleAuth = async () => {
        const roleSelect = this.state.roleSelect;
        //需要最新的menus
        const menus = this.selecteAuth.current.getMenus();
        roleSelect.menus = menus;
        roleSelect.auth_name = memoryUtils.user.username;
        roleSelect.auth_time = new Date().getTime();
        //请求更新
        const result = await reqUpdateRole(roleSelect);
        console.log('result232', result);
        if (result.status === 0) {
            message.success('更新权限成功');
            //更新显示角色列表
            this.setState({
                roleList: [...this.state.roleList]
            })
        } else {
            message.error('更新权限失败')
        }
        this.setState({
            showVisibe: 0
        })
    }

    componentWillMount() {
        this.initRoleList();
    }

    componentDidMount() {
        this.getRoleList();
    }

    render() {
        const { roleList, loading, roleSelect, showVisibe } = this.state;
        // console.log('roleselect',roleSelect);
        const title = (
            <span>
                <Button type="primary" style={{ marginRight: 10 }} onClick={() => { this.setState({ showVisibe: 1 }) }}>创建角色</Button>
                <Button type="primary" disabled={!roleSelect._id} onClick={() => { this.setState({ showVisibe: 2 }) }}>设置角色权限</Button>
            </span>
        )

        // 表格选择功能的配置
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            type: 'radio',  //radio单选，checkbox多选
            selectedRowKeys: [roleSelect._id],  //指定选中项的key值
            onSelct : (role)=>{
                this.setState({
                    roleSelect: role
                })
            }
        };

        return (
            <div>
                <Card title={title}>
                    <Table
                        rowKey='_id'
                        rowSelection={rowSelection}
                        dataSource={roleList}
                        columns={this.columns}
                        loading={loading}
                        bordered
                        pagination={{ defaultPageSize: 3, showQuickJumper: true }}
                        onRow={this.onRow}  //点击某行的任何一处都可选中该项
                    />
                </Card>
                <Modal
                    title="创建角色"
                    visible={showVisibe === 1}
                    onOk={() => this.AddRoleCreate()}
                    onCancel={() => { this.form.resetFields(); this.setState({ showVisibe: 0 }) }}
                >
                    <AddRole setForm={(form) => { this.form = form }} />
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={showVisibe === 2}
                    onOk={() => this.AddRoleAuth()}
                    onCancel={() => { this.setState({ showVisibe: 0 }) }}
                >
                    <TreeSelect roleSelect={roleSelect} ref={this.selecteAuth} />
                </Modal>
            </div>
        )
    }
}