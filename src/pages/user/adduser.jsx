import React, { PureComponent } from 'react';
import { Input, Form, Select } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

//添加/修改用户
class AddUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        setForm: PropTypes.func.isRequired, //用来传递form对象的数据
        roles: PropTypes.array.isRequired, //角色列表
        user : PropTypes.object,  //选中的用户
    }

    //对密码进行自定义验证
    /*
        1、必须输入密码
        2、用户名至少4位最多12位
        3、用户名必须是英文字母或下划线组成
    */
    validatePwd = (rule, value, callback) => {
        console.log('validatePwd', rule, value);
        // callback();  //验证通过
        // callback("xxxxxx");  //验证失败并给出提示信息
        if (!value) {
            callback("必须输入密码");
        } else if (value.length < 4) {
            callback("密码长度不能小于4位");
        } else if (value.length > 12) {
            callback("密码长度不能大于12位");
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文字母、数字或下划线组成");
        } else {
            callback();
        }

    }

    componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render() {

        const { roles } = this.props;
        const user = this.props.user || {};
        console.log('usershere',user)
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 }, //左侧label的宽度
            wrapperCol: { span: 15 }, //右侧包裹的宽度
        }

        return (
            <div>
                <Form  {...formItemLayout}>
                    <Item label="用户名:">
                        {
                            getFieldDecorator('username', {
                                initialValue: user.username,
                                rules: [
                                    // { required: true, message: '必须输入用户名！' },
                                    { min: 4, message: '用户名至少4位！' },
                                    { max: 12, message: '用户名最多12位！' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母、数字或下划线组成！' }
                                ]
                            })(
                                <Input placeholder="请输入用户名" style={{ width: 300 }} />
                            )
                        }
                    </Item>
                    {
                        user.role_id?null:<Item label="密码:">
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                    rules: [
                                        { validator: this.validatePwd }
                                    ]
                                })(
                                    <Input type='password' placeholder="请输入密码" style={{ width: 300 }} />
                                )
                            }
                        </Item>
                    }
                    
                    <Item label="手机号:">
                        {
                            getFieldDecorator('phone', {
                                initialValue: user.phone,
                            })(
                                <Input placeholder="请输入手机号" style={{ width: 300 }} />
                            )
                        }
                    </Item>
                    <Item label="邮箱:">
                        {
                            getFieldDecorator('email', {
                                initialValue: user.email,
                            })(
                                <Input placeholder="请输入邮箱" style={{ width: 300 }} />
                            )
                        }
                    </Item>
                    <Item label="角色:">
                        {
                            getFieldDecorator('role_id', {
                                initialValue: user.role_id,
                            })(
                                <Select placeholder="请选择角色">
                                    {
                                        roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddUser);