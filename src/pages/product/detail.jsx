import React, {Component} from 'react';

/*
product的详细信息
*/
import {
    Card,
    Icon,
    List,
} from 'antd';
import LinkButton from '../../components/linkButton/index'
import {reqCategories} from '../../api/index';

const Item = List.Item;

export default class ProductDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            cPname : '', //父类名称
            cName : '', //子类名称
        }
    }

    async componentDidMount () {
        const { pcategoryId , categoryId}=this.props.location.state.products;
        if(pcategoryId==='0'){ //一级分类的商品
            const result = await reqCategories(categoryId);
            console.log('result',result)
            const cname1= result.data.name;
            this.setState({
                cPname : cname1
            })
        }else{ //二级分类的商品
            const results = await Promise.all([reqCategories(pcategoryId),reqCategories(categoryId)]);
            const cname1 = results[0].data[0].name;
            const cname2 = results[1].data[0].name;
            this.setState({
                cPname : cname1,
                cName : cname2
            })
        }
    }

    render(){
        const {name, price, desc, detail ,imgs } = this.props.location.state.products;
        const {cPname , cName} =this.state;
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type="arrow-left" style={{fontSize:'20px'}}/>  
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格：</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>{cPname} {cName ? '-->'+cName : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        {
                            imgs.map(imgs=>{
                               return <img key={imgs} className="product-img" src={imgs} alt="商品预览图"/>
                            })
                        }
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}/>
                    </Item>
                </List>
            </Card>
        )
    }
}