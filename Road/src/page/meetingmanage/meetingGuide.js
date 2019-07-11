import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, message } from 'antd';
import $ from 'jquery'
const FormItem = Form.Item;
const { TextArea } = Input;
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();


const SeoCreateForm = Form.create()(
    (props) => {
        const { form } = props;
        const { getFieldDecorator } = form;
        const saveFormData = () => {
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                var manual={}
                manual.traffic=values.traffic;
                manual.eating=values.eating;
                manual.living=values.living;
                manual.weather=values.weather;
                console.table(manual);
                console.log(JSON.stringify(manual));
                // 在这里执行保存到服务器的操作使用axios
                $.ajax({
                    // url: "/conference/updateConference",
                    url: "/conference/updateConference1",
                    type: "post",
                    // async: false,
                    data: {
                        conferenceId:props.conferenceId,
                        userId:_mm.getStorage('userInfo').userId,
                        token:_mm.getStorage('userInfo').token,
                        manual:JSON.stringify(manual)
                    },
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

        const LastStep = () => {
            console.log('nextStep');
            props.handelNextStep("6");
        }


        return (
            <div className="new-wrap">
                <Form layout='vertical'>
                <br/>
                   
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="交通："
                    >
                        {getFieldDecorator('traffic')(
                            <TextArea rows={1} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="餐饮："
                    >
                        {getFieldDecorator('eating')(
                            <TextArea rows={1} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="住宿："
                    >
                        {getFieldDecorator('living')(
                            <TextArea rows={1} placeholder="" />

                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="天气："
                    >
                        {getFieldDecorator('weather')(
                            <TextArea rows={1} placeholder="" />
                        )}
                    </FormItem>


                    <row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={LastStep}>上一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <Button type="primary" onClick={saveFormData}>发布</Button>
                        </Col>


                    </row>



                </Form>
            </div>
        )
    }
)



class MeetingGuide extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SeoCreateForm conferenceId={this.props.conferenceId} handelNextStep={this.props.handelNextStep.bind(this)} />
            </div>


        )
    }
}
export default MeetingGuide;

