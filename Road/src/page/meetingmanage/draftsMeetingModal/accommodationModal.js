import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, message, DatePicker, Row } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

const FormItem = Form.Item;
const { TextArea } = Input;


var time;
// const FormItem = Form.Item;
// const {  RangePicker } = DatePicker;

// class TimeRelatedForm extends React.Component {
//   handleSubmit = (e) => {
//     e.preventDefault();

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    time = (value);
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
    console.log("TEST", Date.parse(value));
    time = (value);
}

const SeoCreateForm = Form.create()(
    (props) => {
        var arrangement = window.selectValue.arrangement;
        var accommodationInitial={};
        var time;
        if (arrangement === null) {
            accommodationInitial = {
                "mm_MeetingStay": "无",
                "mm_MeetingEat": "无",
                "mm_MeetingAcc_startTime": "",
                "mm_MeetingAcc_endTime": "",
                "mm_MeetingWaining": "无"
            }
        }else{
            accommodationInitial=JSON.parse(arrangement);
        }
        if(accommodationInitial.mm_MeetingAcc_startTime===""){
            time=moment(new Date());
        }else{
            time=moment(accommodationInitial.mm_MeetingAcc_startTime);
        }
        const { form } = props;
        const { getFieldDecorator } = form;
        const { save } = form;
        const saveFormData = () => {
            var accommodation = {
                "mm_MeetingStay": "无",
                "mm_MeetingEat": "无",
                "mm_MeetingAcc_startTime": "",
                "mm_MeetingAcc_endTime": "",
                "mm_MeetingWaining": "无"
            }
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                values.time = time;
                accommodation.mm_MeetingAcc_startTime = values.time;
                accommodation.mm_MeetingStay = values.zhusudidian;
                accommodation.mm_MeetingWaining = values.anpaixuzhi;
                accommodation.mm_MeetingEat = values.canyingdidian;
                values.time = time;
                console.log(JSON.stringify(accommodation));
                // 在这里执行保存到服务器的操作使用axios
                $.ajax({
                    url: "/conference/updateConference",
                    type: "post",
                    // async: false,
                    data: {
                        conferenceId: values.conferenceId,
                        arrangement: JSON.stringify(accommodation),
                        userId:_mm.getStorage('userInfo').userId,
                        token:_mm.getStorage('userInfo').token,
                    },
                    success: function (res) {
                        // alert("成功");
                        // message.success('保存成功！')
                        // data = res;
                        console.log(res);
                    },
                    error: function () {
                        alert("失败");
                    }
                })
                // 在这里执行保存到服务器的操作使用axios

            });
        }

        const LastStep = () => {
            console.log('nextStep');
            props.handelNextStep("4");
        }
        const nextStep = () => {
            console.log('nextStep');
            props.handelNextStep("6");
        }

        return (
            <div className="new-wrap">
                <Form layout='vertical'>
                    <div></div>
                    <Row>
                        <Col span={2}>
                            <FormItem
                                label="会议时间："
                            ></FormItem></Col>
                        <Col span={22}><DatePicker
                            showTime
                            defaultValue={time}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择时间"
                            onChange={onChange}
                            onOk={onOk}
                        /></Col>
                    </Row>

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
                        wrapperCol={{ span: 24 }}
                        label="餐饮地点："
                    >
                        {getFieldDecorator('canyingdidian', {
                            initialValue: accommodationInitial.mm_MeetingEat,
                        })(
                            <TextArea rows={7} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="住宿地点："
                    >
                        {getFieldDecorator('zhusudidian', {
                            initialValue: accommodationInitial.mm_MeetingStay,
                        })(
                            <TextArea rows={7} placeholderzhh="" />

                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="安排须知："
                    >
                        {getFieldDecorator('anpaixuzhi', {
                            initialValue: accommodationInitial.mm_MeetingWaining,
                        })(
                            <TextArea rows={7} placeholder="" />
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
            </div>
        )
    }
)






class Accommodation extends Component {
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
export default Accommodation;

