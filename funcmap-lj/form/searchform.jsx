import React, { Component } from 'react';
import { Select, List, Input, Form, DatePicker, Button, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import MUtil from 'util/mm.jsx';
import { reqLocation } from '../../../../ajax-lj/index.jsx';
import TableForm from './tableForm.jsx';
import moment from 'moment';

const _mm = new MUtil();

const nowTime = new Date();
//修改

const token = _mm.getStorage('user').token;
const Item = Form.Item;
const Option = Select.Option;

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            showVisible: 1,
            visible: false,
            flag : 0,
            startValue : moment('1979-01-01'),
            endValue :  moment(nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate()),
        }
    }

    static propTypes = {
        setForm: PropTypes.func.isRequired  //用来传递form对象的数据
    }

    onChange = (value) => {
        console.log(`selected ${value}`);
    }
    componentWillMount() {
        this.props.setForm(this.props.form);
    }
    componentDidMount() {
        this.getLocation();
    }
    //获取区域接口
    getLocation = async () => {
        const result = await reqLocation(token);
        console.log('result seeionid', result);
        if (result.msg === "请求成功") {
            const location = result.data;
            this.setState({ location })
        } else {
            console.log(result.msg)
        }
    }

    //清空按钮
    resetForm = () => {
        this.props.form.resetFields();
        this.setState({
            flag : 1,
        },()=>this.setState({flag:0}))
    }

    //点击关闭按钮关闭modal
    closeModal = () => {
        this.setState({
            showVisible: 0,
            flag : 0
        }, () => this.props.changeShowVisible(this.state.showVisible))
    }
    //点击查找按钮
    onSearchForm = () => {
        this.setState({flag : 0})
        this.props.onSearchTable();
    }
    handleChangeS = (value)=>{
        this.setState({
            startValue : value
        })
    }
    handleChangeE = (value)=>{
        this.setState({
            endValue : value
        })
    }
    render() {

        const { location ,startValue ,endValue} = this.state;
        const { getFieldDecorator } = this.props.form;

        //指定Form/Item布局的配置对象
        const formItemLayout = {
            labelCol: {  //指定左侧label的宽度
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {  //指定右侧包裹的宽度
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div>
                <Form {...formItemLayout} style={{ paddingLeft: 10 }} className="searchform">
                    <Item label="行政区域">
                        {
                            getFieldDecorator('region_id', {
                                initialValue: '',
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    onChange={this.onChange}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        location.map((item) => {  //修改
                                            return <Option key={item.keyno} value={item.keyno}>{item.scodeName}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }

                    </Item>
                    <Item label="公路类别">
                        {
                            getFieldDecorator('roadtype', {
                                initialValue: '',
                            })(
                                <Select>
                                    <Option value=" "></Option>
                                    <Option value="国道">国道</Option>
                                    <Option value="省道">省道</Option>
                                    <Option value="县道">县道</Option>
                                    <Option value="乡道">乡道</Option>
                                    <Option value="村道">村道</Option>
                                </Select>
                            )
                        }
                    </Item>
                    <TableForm form={this.props.form} label='村路长' susertype='007' btnShow={true} field='suserkeyno' value='你好' required={false} disabled={false} flag={this.state.flag} formData=''/>
                    <TableForm form={this.props.form} label='乡路长' susertype='006' btnShow={true} field='suserkeyno2' value='你好' required={false} disabled={false} flag={this.state.flag} formData=''/>
                    <TableForm form={this.props.form} label='养护队' susertype='2' btnShow={true} field='sprotectaccount' value='你好' required={false} disabled={false} flag={this.state.flag} formData=''/>
                    <TableForm form={this.props.form} label='专管员' susertype='010' btnShow={true} field='sofficeraccount' value='你好' required={false} disabled={false} flag={this.state.flag} formData=''/>
                    <TableForm form={this.props.form} label='保险公司' susertype='5' btnShow={true} field='sinsuranceaccount' value='你好' required={false} disabled={false} flag={this.state.flag} formData=''/>
                    <Item label="创建人员">
                        {
                            getFieldDecorator('screateusername', {
                                initialValue: '',
                            })(
                                <Input />
                            )
                        }
                    </Item>
                    <Item label="创建时间" style={{ marginBottom: 0 }}>
                        <Item style={{ display: 'inline-block', marginRight: '-40px' }}>
                            {
                                getFieldDecorator('dcreatedateStart', {
                                    initialValue: startValue,
                                })(
                                    <DatePicker onChange={this.handleChangeS}/>
                                )
                            }
                        </Item>
                        <span style={{ width: '24px', marginLeft: '-30px' }}>-</span>
                        <Item style={{ display: 'inline-block', marginLeft: '5px', marginRight: '-45px' }}>
                            {
                                getFieldDecorator('dcreatedateEnd', {
                                    initialValue: endValue,
                                })(
                                    <DatePicker onChange={this.handleChangeE}/>
                                )
                            }
                        </Item>
                    </Item>
                    <Item style={{ left: 120 }}>
                        <span>
                            <Button type="primary" onClick={this.resetForm} style={{ marginRight: 5 }}>清空</Button>
                            <Button type="primary" style={{ marginRight: 5 }} onClick={this.onSearchForm}>查找</Button>
                            <Button type="primary" onClick={this.closeModal}>关闭</Button>
                        </span>
                    </Item>
                </Form>

            </div>
        )
    }
}

export default Form.create()(SearchForm);