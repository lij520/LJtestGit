import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, message } from 'antd';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();


const FormItem = Form.Item;
const { TextArea } = Input;


const SeoCreateForm = Form.create()(
    (props) => {
        const { form } = props;
        const { getFieldDecorator } = form;
        var manualInitial=window.selectValue.manual;
        if(null===manualInitial){
            manualInitial={
                traffic:"",
                eating:"",
                living:"",
                weather:""
            }
        }else{
            manualInitial=JSON.parse(manualInitial);
        }
        const saveFormData = () => {
            
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                console.table(values);
                var manual={};
                manual.traffic=values.traffic;
                manual.eating=values.eating;
                manual.living=values.living;
                manual.weather=values.weather;

                // 在这里执行保存到服务器的操作使用axios
                $.ajax({
                    url: "/conference/updateConference",
                    type: "post",
                    // async: false,
                    data: {
                        conferenceId:values.conferenceId,
                        manual:JSON.stringify(manual),
                        // userId:_mm.getStorage('userInfo').userId,
                        token:_mm.getStorage('userInfo').token,
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
            props.handelNextStep("5");
        }


        return (
            <div className="new-wrap">
                <FormItem
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 12 }}
                    label="会议编号：">
                    {
                        getFieldDecorator('conferenceId', {
                            // rules: [{ required: true, message: '请填写会议名称' }],
                            initialValue: window.selectValue.conferenceId,
                        })(
                            <Input placeholder="请准确填写会议名称" />
                        )}
                </FormItem>
                <Form layout='vertical'>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="交通："
                    >
                        {getFieldDecorator('traffic', {
                            initialValue: manualInitial.traffic,
                        })(
                            <TextArea rows={6} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="餐饮："
                    >
                        {getFieldDecorator('eating',{
                            initialValue: manualInitial.eating,
                        })(
                            <TextArea rows={6} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="住宿："
                    >
                        {getFieldDecorator('living',{
                            initialValue: manualInitial.living,
                        })(
                            <TextArea rows={6} placeholder="" />

                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="天气："
                    >
                        {getFieldDecorator('weather',{
                            initialValue: manualInitial.weather,
                        })(
                            <TextArea rows={6} placeholder="" />
                        )}
                    </FormItem>


                    <row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={LastStep}>上一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <Button type="primary" onClick={saveFormData}>保存</Button>
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
                <SeoCreateForm handelNextStep={this.props.handelNextStep.bind(this)} />
            </div>


        )
    }
}
export default MeetingGuide;

