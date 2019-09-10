import React, { Component } from 'react';

/*
product的添加和更新的子路由组件
*/
import {
    Form,
    Input,
    Cascader,
    Card,
    Button,
    Icon,
    message
} from 'antd';
import LinkButton from '../../components/linkButton/index';
import {reqCategory,reqCategories,reqAddorUpdateProduct} from '../../api/index';
import PicturesWall from './pictures-wall';
import RichTextEditor from './richtexteditor';

const Item = Form.Item;
const { TextArea } = Input;

/*
使用ref的三步：
1、在constructor中创建refs:this.reference = React.createRef()
2、在子组件的标签中添加ref：ref={this.reference}
3、访问Refs：对该节点的引用可以在 ref 的 current 属性中被访问(this.reference.current)
*/



class ProductAddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options : [],
        }
        this.pw = React.createRef();
        this.rte = React.createRef();
    }

    initOptions =async (categorys) =>{
        /*
        直接为一级商品更新
        */
        //根据categorys生成options数组
        const options = categorys.map(item=>({
            value : item._id,
            label : item.name,
            isLeaf: false
        }));

        //如果是二级分类商品的更新
        const {isUpdate, product} = this;
        //需要进行判断，因为当为添加商品时，isUpdate为false, product为空，无法进行
        if(isUpdate){
            const {pcategoryId,categoryId} =  product.products;
            if(pcategoryId!=='0'){
                const subCategorys =await reqCategories(categoryId);
                //生成二级分类列表的options
                const childrenOption = subCategorys.data.map(item=>({
                    value:item._id,
                    label:item.name,
                    isLeaf :true
                }));
                console.log('subCategorys',childrenOption)
                //找到当前商品对应的一级option对象
                const targetOption = options.find(option=>option.value===pcategoryId);
                console.log('targetOption',targetOption)
                //关联对应的一级option上
                targetOption.children = childrenOption;
            }
        }

        //更新options的状态
        this.setState({
            options: options
        });

    }

    /*
    异步获取一级/二级分类列表
    async函数的返回值是一个新的promise对象，promise的结国和值由async的结果来决定
    */
    getCategotys =async (parentId) =>{
        const result = await reqCategory(parentId);
        // debugger 调试
        if(result.status===0){
            const categorys = result.data;
            console.log(categorys);
            //如果是一级分类列表
            if(parentId==='0'){
                this.initOptions(categorys);
            }else{ //二级分类列表
                return categorys;  //返回二级列表==》当前async函数返回的promise就会成功且value为categorys 
            }
        }
    }

    //表单提交函数
    Submit =() => {
        //进行表单验证，如果通过发送请求
        this.props.form.validateFields(async (error, value) => {
            if (!error) {
                //1、收集数据
                const {productName,productPrice,productDesc,productCategory}=value;
                let name=productName,price=productPrice,desc=productDesc;
                let pcategoryId,categoryId;
                if(productCategory.length===1){
                    pcategoryId = '0';
                    categoryId = productCategory[0]
                }else{
                    pcategoryId = productCategory[0];
                    categoryId = productCategory[1];
                }
                //获取上传的商品图片
                const imgs = this.pw.current.getImgs();
                //获取输入的商品详情
                console.log('this.rte',this.rte);
                const detail = this.rte.current.getDetail();

                const product = {name,price,desc,detail,pcategoryId,categoryId,imgs}
                //如果是更新，需要添加_id
                if(this.isUpdate){
                    product._id = this.product._id
                }
                console.log('product',product)
                //2、调用接口请求函数去添加/更新
                const result =await reqAddorUpdateProduct(product);
                console.log('result here',result)
                //3、根据结果显示
                if(result.status===0){
                    message.success(`${this.isUpdate?'更新':'添加'}商品成功！`);
                    this.props.history.goBack();
                }else{
                    message.error(`${this.isUpdate?'更新':'添加'}商品失败！`)
                }

                alert('发送ajax请求');
            }
        })
    }

    //价格验证
    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback(); //验证通过
        } else {
            callback("价格必须大于0");
        }
    }

    //动态获取二级分类列表
    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //显示loading
        targetOption.loading = true;

        console.log('target',targetOption)
        //根据选中的分类，请求获取二级分类列表
        const subCategory =await this.getCategotys(targetOption.value);
        targetOption.loading = false;
        
        if(subCategory && subCategory.length>0){
            //生成一个二级分类列表的options
            const childrenOption = subCategory.map(item=>({
                value:item._id,
                label:item.name,
                isLeaf :true
            }))
            //关联到当前option上
            targetOption.children = childrenOption;
        }else{  //当前选中的分类没有二级分类
            targetOption.isLeaf = true;  //
        }

        //更新options的状态
        this.setState({
            options: [...this.state.options],
        });
    };

    //获取一级分类列表
    componentDidMount(){
        this.getCategotys('0')
    }

    componentWillMount(){
        //取出携带的state
        const product = this.props.location.state;
        console.log('products',product)
        //保存是否更新的标识
        this.isUpdate = !!product;  //双非是强制转换布尔类型的数据
        //保存商品(如果没有值则是一个空对象)
        this.product = product || {}; 
    }

    render() {
        const {isUpdate,product} = this;
        console.log('isUpdate',isUpdate,product);
        const products = product.products || {};  //同上
        const { getFieldDecorator } = this.props.form;
        //用来接收级联分类Id的数组
        const productCategory = [];
        if(isUpdate){
            if(products.pcategoryId==='0'){  //一级分类
                productCategory.push(products.categoryId);
            }else{ //二级分类
                productCategory.push(products.pcategoryId);
                productCategory.push(products.categoryId);   
            }
        }
        const title = (
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type="arrow-left" style={{ fontSize: 20 }} />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        //指定Form/Item布局的配置对象
        const formItemLayout = {
            labelCol: {  //指定左侧label的宽度
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {  //指定右侧包裹的宽度
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };


        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {getFieldDecorator('productName', {
                            initialValue: products.name,
                            rules: [
                                {
                                    required: true,
                                    message: '必须输入商品名称',
                                },
                            ],
                        })(<Input placeholder="请输入商品名称" />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('productDesc', {
                            initialValue: products.desc,
                            rules: [
                                {
                                    required: true,
                                    message: '必须输入商品描述',
                                }
                            ],
                        })(<TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('productPrice', {
                            initialValue: products.price,
                            rules: [
                                {
                                    required: true,
                                    message: '必须输入商品价格',
                                },
                                {
                                    validator: this.validatorPrice
                                }
                            ],
                        })(<Input type='number' addonAfter='元' placeholder="请输入商品价格" />)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('productCategory', {
                            initialValue: productCategory,
                            rules: [
                                {
                                    required: true,
                                    message: '必须选择商品所属分类',
                                },
                            ],
                        })(<Cascader 
                            options={this.state.options} /*需要显示的列表数据数组 */
                            loadData={this.loadData} /*当选择某个列表项，加载下一级列表的监听回调 */
                            // changeOnSelect 
                            placeholder="请选择商品所属分类" 
                            />)}
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pw} imgs={products.imgs}/>
                    </Item>
                    <Item label="商品详情" labelCol={{span:2}} wrapperCol={{span:20}}>
                        <RichTextEditor ref={this.rte} detail={products.detail}/>
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.Submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate);