import React, { Component } from 'react';
import { Select, Input, Form } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        categorys : PropTypes.array.isRequired,  //一级分类的数组
        parentId : PropTypes.string.isRequired,  //父分类的Id
        setForm : PropTypes.func.isRequired  //用来传递form对象的数据
    }

    onChange = (value) => {
        // console.log(`selected ${value}`);
    }
    onBlur = () => {
        console.log('blur');
    }
    onFocus = () => {
        console.log('focus');
    }
    onSearch = (val) => {
        console.log('search:', val);
    }
    componentWillMount(){
        this.props.setForm(this.props.form);
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const {categorys,parentId}=this.props;

        return (
            <div>
                <Form layout="vertical" style={{ paddingLeft: 10 }}>
                    <Item>
                        <p>所属分类</p>
                        {
                            getFieldDecorator('parentId', {
                                initialValue : parentId==='0'?'一级分类':parentId
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择分类"
                                    optionFilterProp="children"
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {categorys.map(item => {
                                        return <Option value={item._id} key={item._id}>{item.name}</Option>
                                    })}
                                </Select>
                            )
                        }

                    </Item>
                    <Item>
                        <p>分类名称</p>
                        {
                            getFieldDecorator('categoryName', {
                                initialValue: '',
                                rules:[
                                    {required:true,message:'分类名称不能为空！'}
                                ]
                            })(
                                <Input placeholder="请输入分类名称" />
                            )
                        }
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddForm);