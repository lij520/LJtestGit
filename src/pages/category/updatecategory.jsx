import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input, Form } from 'antd';

const Item = Form.Item;

class UpdateCategory extends Component {
    
    static propTypes = {
        categoryName : PropTypes.string.isRequired,
        setForm : PropTypes.func.isRequired
    }

    componentWillMount(){
        //将form对象传递给父组件
        this.props.setForm(this.props.form);
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const {categoryName} = this.props;
        console.log('categoryname',categoryName);
        return (
            <Form layout="vertical" style={{ paddingLeft: 10 }}>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName,
                            rules:[
                                {required:true,message:'分类名称不能为空！'}
                            ]
                        })(
                            <Input placeholder="请输入更改后的分类名称" />
                        )
                    }
                </Item>

            </Form>
        )
    }
}

export default Form.create()(UpdateCategory);