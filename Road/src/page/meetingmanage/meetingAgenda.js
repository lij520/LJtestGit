import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, Row, message } from 'antd';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const FormItem = Form.Item;
const { TextArea } = Input;

const _mm   = new MUtil();


const SeoCreateForm = Form.create()(
    (props) => {
        const { form,nextButton } = props;
        const { getFieldDecorator } = form;
        const saveFormData = () => {
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                console.table(values);
                values.userId=_mm.getStorage('userInfo').userId;
                values.token=_mm.getStorage('userInfo').token;
                values.conferenceId=props.conferenceId;
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
                        changeMyStyle();
                    },
                    error: function () {
                        alert("失败");
                    }
                })
                // 在这里执行保存到服务器的操作使用axios
                message.success('保存成功！')

            });
        }

        const changeMyStyle=()=>{
            props.changeStyle();
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
                <br/>
                    

                <FormItem
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 20 }}
                    label="会议议程："
                >
                    {getFieldDecorator('agenda')(
                        <TextArea rows={15} placeholder="" />
                    )}
                </FormItem>

                <row>
                <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={LastStep}>上一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" style={{ display: nextButton }} onClick={nextStep}>下一步</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
export default MeetingAgenda;

