import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message,
} from 'antd';
import LinkButton from '../../components/linkButton/index'
import { reqProducts , reqSearchProducts ,reqUpdateStatus  } from '../../api/index';
import { PAGE_SIZE } from '../../utils/constants';
import memoryUtils from '../../utils/memoryUtils'
/*
product默认的子路由组件
*/

const Option = Select.Option;

export default class ProductHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            total: 0, //商品的总数量
            products: [], //商品的数组
            searchName: '', //搜索的关键字
            searchType: 'productName', //根据哪个字段搜索
            newStatus : 1,
        }
    }

    initColunms = (newStatusId) => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                width: '15%'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price //当前指定了对应的属性，传入的是对应的属性值
            },
            {
                title: '状态',
                // dataIndex: 'status',//当只获取status时可以写dataIndex，但是要想获取商品则不能写
                width: '6%',
                render: (products) => {  //状态有两个值：1在售0下架
                    const {_id,status}= products;
                    return (
                        <span>
                            <Button type="primary"
                                onClick={() => this.updateStatus(_id ,status)}
                            >
                            {status ===1 ? '下架' : '上架'}
                            </Button>
                            <p>{status === 1 ? '在售' : '已下架' }</p>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                // dataIndex: 'operation',
                width: '5%',
                render: (products) => {
                    return (  //hashRouter不支持携带变量传递，browerRouter则支持，可以用redux或者memoryUtils
                        <span>
                            {/* <LinkButton onClick={() => this.props.history.push('/product/detail', {products})}>详情</LinkButton> */}
                            {/* <LinkButton onClick={()=>this.props.history.push('/product/addupdate',{products})}>修改</LinkButton> */}
                            <LinkButton onClick={() =>this.showDetail(products)}>详情</LinkButton>
                            <LinkButton onClick={()=>this.editProduct(products)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    showDetail = (products) =>{
        //缓存products对象，给detail组件使用
        memoryUtils.product = products;
        this.props.history.push('/product/detail');
    }

    editProduct =(products)=>{
        //缓存products对象，给edit组件使用
        memoryUtils.product = products;
        this.props.history.push('/product/addupdate');
    }
    /*
    获取指定页码的列表数据显示
    */
    getProducts = async (pageNum) => {
        this.pageNum = pageNum; //保存pageNum，让其他方法可以看到
        //再发请求前显示loading
        this.setState({
            loading: true
        })
        const { searchName, searchType } = this.state;
        //如果搜索关键字有值，说明要做搜索分页
        let result;
        if (searchName) {
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType);
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        //再发请求前隐藏loading
        this.setState({
            loading: false
        })

        if (result.status === 0) {
            //取出分页数据，更新状态，显示分页列表
            const { total, list } = result.data;
            this.setState({
                total,
                products: list,
                newStatus : list.status
            })
        }
    }

    //更新指定商品状态
    updateStatus = async (productId,statusId) =>{
        const result = await reqUpdateStatus(productId,statusId);
        console.log("status",result.status)
        if(result.status===0){
            message.success('更新商品状态成功！');
            /*
            由于后端接口不完善，所以为了重新设置显示的上下架文字，写下代码
            */
            this.setState({
                newStatus : result.data[0].status
            },()=>this.initColunms(this.state.newStatus)) ;

            /*
            如果后端完善，可直接重新获取商品即可，代码如下
            */
            // this.getProducts(thsi.pageNum);
        }else{
            message.error('操作失败');
        }
    }

    componentWillMount() {
        this.initColunms(this.state.newStatus);
    }

    componentDidMount() {
        this.getProducts(1);
    }

    render() {
        //取出状态数据
        const { products, total, loading, searchName, searchType } = this.state;
        const columns = this.columns;

        const title = (
            <span>
                <Select
                    defaultValue={searchType}
                    style={{ width: 120 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: '200px', margin: '0 10px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = ( //这里
            <Button type="primary" onClick={()=>this.props.history.push('/product/addupdate')}>
                <Icon type="plus" />
                添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    bordered
                    loading={loading}
                    columns={columns}
                    dataSource={products}
                    pagination={{
                        current : this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE, showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}