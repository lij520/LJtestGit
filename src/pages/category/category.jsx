import React, { Component } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import LinkButton from '../../components/linkButton';
import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../api/index';
import AddForm from './addform';
import UpdateCategory from './updatecategory';

/*
品类管理路由
*/

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,//是否正在获取数据中
            categorys: [],//一级分类列表
            parentId: '0', //当前需要显示的分类列表Id
            parentName: '', //当前默认显示的分类列表的父类名称
            subCategory: [], //二级分类列表
            visible: false,
            showStatue: 0,//标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2、显示更新
        }
    }

    /* 
    初始化table所有列的数据
    */
    initColumn = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',  //显示数据对应的属性名
                key: 'name',
                width: '70%'
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'action',
                width: '30%',
                render: (category) => (  //返回需要显示的界面标签
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {/*如何向时间回调函数传递参数：先定义一个匿名函数，在函数中调用处理函数并传入数据 */}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}  {/*二级子分类不显示‘查看子分类’*/}
                    </span>
                )
            }
        ];
    }

    /*
    异步获取一级列表显示
    parentId：如果没有指定状态中的parentId请求，如果指定了则根据指定的请求
    */
    getCategory = async (parentId) => {

        //再发请求前显示loading
        this.setState({
            loading: true
        })
        parentId = parentId || this.state.parentId;
        //异步ajax请求获取数据
        const result = await reqCategory(parentId);
        // console.log('result here we are',result);

        //在请求完成后隐藏loading
        this.setState({
            loading: false
        })

        if (result.status === 0) {
            //取出分类数组（可能是一级也可能是二级）
            const categorys = result.data;
            //更新一级分类状态
            if (parentId === '0') {
                this.setState({
                    categorys
                })
            } else {
                //更新二级分类状态
                this.setState({
                    subCategory: categorys
                })
            }

        } else {
            message.error('获取分类列表失败')
        }
    }

    /*
    显示指定一级分类的列表
    */
    showFirstCategory = () => {
        //更新为显示一级列表的状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategory: []
        })
    }

    /*
    显示指定二级子列表
    */
    showSubCategorys = (category) => {
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => { //在状态更新且render()之后执行
            // console.log('parentId', this.state.parentId);
            //获取二级分类列表显示
            this.getCategory();
        });

    }

    /*
    显示添加新分类表单
    */
    showAdd = () => {
        this.setState({
            showStatue: 1,
        });
    };

    //显示修改分类表单
    showUpdate = (category) => {
        //保存分类对象
        this.category = category;
        //更新状态
        this.setState({
            showStatue: 2,
        })
    }

    //确认添加分类
    addCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //1、隐藏确定框
                this.setState({
                    showStatue: 0,
                });
                //2、收集数据，发送请求更新分类
                const { parentId, categoryName } = values;
                const result = await reqAddCategory(categoryName, parentId);

                //清除表单的输入数据
                this.form.resetFields();

                if (result.status === 0) {
                    //添加的分类就是当前分类列表下的分类
                    if (parentId === this.state.parentId) {
                        //3、重新显示列表
                        this.getCategory();
                    } else if (parentId === '0') { //在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示一级分类列表
                        this.getCategory('0');
                    }
                } else {
                    message.error('数据获取失败');
                }
            }
        })

    };

    //确认更新分类
    updateCategory = () => {
        //进行表单验证，只有通过了才处理
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //1、 隐藏确定框
                this.setState({
                    showStatue: 0,
                });
                //准备数据
                const categoryId = this.category._id;
                const { categoryName } = values;
                //重置所有的数据和表单项
                this.form.resetFields();
                //2、发送请求更新分类
                const result = await reqUpdateCategory({ categoryId, categoryName });
                if (result.status === 0) {
                    //3、重新显示列表
                    this.getCategory();
                } else {
                    message.error('数据更新失败')
                }
            }
        })

    };

    //响应点击取消：隐匿确定框
    handleCancel = e => {
        this.setState({
            showStatue: 0,
        });
        //重置所有的数据和表单项
        this.form.resetFields();
    };

    /*
    为第一次render准备数据
    */
    componentWillMount() {
        this.initColumn();
    }

    /*
    执行异步任务：发送异步ajax请求
    */
    componentDidMount() {
        //获取一级分类列表显示
        this.getCategory();
    }

    render() {

        //读取状态数据
        const { categorys, loading, parentId, subCategory, parentName, showStatue } = this.state;
        const category = this.category || {};  //如果没有就指定一个空对象

        //card的左侧标题
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showFirstCategory}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{ marginRight: '5px' }} />
                <span>{parentName}</span>
            </span>
        );
        
        //card的右侧按钮
        const extra = (
            <div>
                <Button type="primary" onClick={this.showAdd}>
                    添加
                </Button>
            </div>
        );

        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        dataSource={parentId === '0' ? categorys : subCategory}
                        columns={this.columns}
                        bordered
                        loading={loading}
                        rowKey='_id'
                        //设置每页的条数以及快速跳转
                        pagination={{ defaultPageSize: 6, showQuickJumper: true }}
                    />
                </Card>

                <Modal
                    title="添加分类"
                    visible={showStatue === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form) => { this.form = form }}
                    />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showStatue === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateCategory
                        categoryName={category.name}
                        setForm={(form) => { this.form = form }}
                    />
                </Modal>
            </div>
        )
    }
}