import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, message, DatePicker, Row } from 'antd';
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
    time=value;
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
    console.log("TEST", Date.parse(value));
    time=value;
}

const SeoCreateForm = Form.create()(
    (props) => {
        const { form,nextButton } = props;
        const { getFieldDecorator } = form;
        const { save } = form;
        const saveFormData = () => {
            var accommodation={
                "mm_MeetingStay":"无",
                "mm_MeetingEat":"无",
                "mm_MeetingAcc_startTime":"",
                "mm_MeetingAcc_endTime":"",
                "mm_MeetingWaining":""
            }
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                
                values.time=time;
                console.log(values);
                accommodation.mm_MeetingAcc_startTime=values.time;
                accommodation.mm_MeetingStay=values.zhusudidian;
                accommodation.mm_MeetingWaining=values.anpaixuzhi;
                accommodation.mm_MeetingEat=values.canyingdidian;
                console.log(JSON.stringify(accommodation));
                
                // 在这里执行保存到服务器的操作使用axios
                $.ajax({
                    url: "/conference/updateConference",
                    type: "post",
                    // async: false,
                    data: {
                        conferenceId:props.conferenceId,
                        arrangement:JSON.stringify(accommodation),
                        userId:_mm.getStorage('userInfo').userId,
                        token:_mm.getStorage('userInfo').token,
                        
                    },
                    success: function (res) {
                        // alert("成功");
                        message.success('保存成功！')
                        // data = res;
                        console.log(res);
                        changeMyStyle();
                    },
                    error: function (res) {
                        console.log(res);
                        alert("失败");
                    }
                })
                // 在这里执行保存到服务器的操作使用axios
                
            });
        }
        const changeMyStyle=()=>{
            props.changeStyle();
        }
        const LastStep = () => {
            console.log('nextStep');
            props.handelNextStep("5");
        }
        const nextStep = () => {
            console.log('nextStep');
            props.handelNextStep("8");
        }

        return (
            <div className="new-wrap">
                <Form layout='vertical'>
                    <div></div>
                    <br/>
                    <Row>
                        <Col span={2}>
                        
                            <FormItem
                                label="参会时间："
                            ></FormItem></Col>
                        <Col span={22}><DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择时间"
                            onChange={onChange}
                            onOk={onOk}
                        /></Col>
                    </Row>
                    
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="餐饮地点："
                    >
                        {getFieldDecorator('canyingdidian')(
                            <TextArea rows={1} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="住宿地点："
                    >
                        {getFieldDecorator('zhusudidian')(
                            <TextArea rows={1} placeholderzhh="" />

                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="安排须知："
                    >
                        {getFieldDecorator('anpaixuzhi')(
                            <TextArea rows={1} placeholder="" />
                        )}
                    </FormItem>


                    <row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={LastStep}>上一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" style={{ display: nextButton }} onClick={nextStep}>下一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
        this.state={
            nextButton:"none"
        }
    }
    changeStyle=()=>{
        this.setState({
            nextButton:""
        })
    }
    render() {
     
        
        return (
            <div>
                <SeoCreateForm conferenceId={this.props.conferenceId} changeStyle={this.changeStyle} nextButton={this.state.nextButton}  handelNextStep={this.props.handelNextStep.bind(this)} />
            </div>

        )
    }
}
export default Accommodation;

