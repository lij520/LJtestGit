import React, { Component } from 'react';
import {Input, Form } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class AddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        setForm : PropTypes.func.isRequired  //用来传递form对象的数据
    }

    
    componentWillMount(){
        this.props.setForm(this.props.form);
    }
    
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form layout="vertical" style={{ paddingLeft: 10 }}>
                    <Item>
                        <span>角色名称：</span>
                        {
                            getFieldDecorator('roleName', {
                                initialValue: '',
                                rules:[
                                    {required:true,message:'角色名称不能为空！'}
                                ]
                            })(
                                <Input placeholder="请输入角色名称" style={{width:300}}/>
                            )
                        }
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddRole);