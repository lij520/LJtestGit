import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, Row, message } from 'antd';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

const FormItem = Form.Item;
const { TextArea } = Input;




const SeoCreateForm = Form.create()(
    (props) => {
        const { form } = props;
        const { getFieldDecorator } = form;
        const saveFormData = () => {
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                console.table(values);
                values.userId=_mm.getStorage('userInfo').userId;
                values.token=_mm.getStorage('userInfo').token;
                // 在这里执行保存到服务器的操作使用axios
                $.ajax({
                    url: "/conference/updateConference",
                    type: "post",
                    // async: false,
                    data: values,
                    success: function (res) {
                        // alert("成功");
                        // data = res;
                        console.log(res);
                    },
                    error: function () {
                        alert("失败");
                    }
                })
                // 在这里执行保存到服务器的操作使用axios
                message.success('保存成功！')

            });
        }


        const nextStep = () => {
            console.log('nextStep');
            props.handelNextStep("3");
        }
        const LastStep = () => {
            console.log('nextStep');
            props.handelNextStep("1");
        }


        return (

            <Form layout='vertical'>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议编号：">
                        {
                            getFieldDecorator('conferenceId', {
                                rules: [{ required: true, message: '请填写会议名称' }],
                                initialValue: window.selectValue.conferenceId,
                            })(
                                <Input placeholder="请准确填写会议名称" />
                            )}
                    </FormItem>

                <FormItem
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 20 }}
                    label="会议议程："
                >
                    {getFieldDecorator('agenda',{initialValue: window.selectValue.agenda},)(
                        <TextArea rows={30} placeholder="" />
                    )}
                </FormItem>


                

                <row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={LastStep}>上一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Button type="primary" onClick={nextStep}>下一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Button type="primary" onClick={saveFormData}>保存</Button>
                    </Col>
                </row>
            </Form>
        )
    }

)

class MeetingAgenda extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SeoCreateForm handelNextStep={this.props.handelNextStep.bind(this)} />
            </div>

        )
    }
}
export default MeetingAgenda;

