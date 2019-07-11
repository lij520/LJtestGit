import React, { Component } from 'react';
import { Form, Input, Button, Radio, Upload, Icon, Col, Row, Cascader, Select, DatePicker, message, AutoComplete } from 'antd';
import $ from 'jquery';
import MUtil from 'util/mm.jsx';
import momnet from 'moment'
const _mm = new MUtil();
const FormItem = Form.Item;
const { TextArea } = Input;
var time;
let conferenceId;
function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    time=value;
    time=momnet(time).format();
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
    console.log("TEST", Date.parse(value));
    time=momnet(value).valueOf();
    
    time=time;  
}

const SeoCreateForm = Form.create()(
    
    (props) => {
       
        const { form,nextButton} = props;
        const { getFieldDecorator } = form;
        const saveFormData = () => {
            
            
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                // console.table(values);
                console.log(SeoCreateForm)
                console.log(saveFormData);
                console.log(values);
                values.userId = _mm.getStorage('userInfo').userId;
                values.token = _mm.getStorage('userInfo').token;
                values.time=time;
                
                $.ajax({
                    url: "/conference/insertConference",
                    //    url: "../../conference/insertConference",         
                    type: "post",
                    async: false,
                    data: values,
                    success: function (res) {
                        if(res.result == 1){
                             console.log("res",res);
                        conferenceId=res.conferenceId;
                        props.setConferenceId(conferenceId);
                        changeMyStyle();
                    }
                    else if(res.result == -1){
                        message.error(res.message);
                        window.location.href = '/';
                       }
                   else{
                       message.error('error!');
                   }
                        },
                      
                    error: function () {
                        alert("失败");
                    }
                })
                // 在这里执行保存到服务器的操作使用axios

            });

        }
        // const values = {
        //     ...fieldsValue,
        //     'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        //     'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
        //   };
        const config = {
            rules: [{ type: 'object', required: true, message: '请填写时间' }],
          };
      
        const changeMyStyle=()=>{
            props.changeStyle();
        }
        
        const nextStep = () => {
            console.log('nextStep');
            props.handelNextStep("2");
        }
        /* const setconferenceId=(val)=>{
            props.setconferenceId(val);
        } */

        return (
            <div className="new-wrap">
                <Form layout='vertical'>
                    <br />

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议名称：">
                        {getFieldDecorator('conferenceName', {
                            rules: [{ required: true, message: '请填写会议名称' }],
                        })(
                            <Input placeholder="请准确填写会议名称" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议地点：">
                        {getFieldDecorator('site', {
                            rules: [{ required: true, message: '请填写会议地点' }],
                        })(
                            <Input placeholder="请准确填写会议地点" />
                        )}
                    </FormItem>

                    <Row>      
                         <FormItem
                         labelCol={{ span: 2 }}
                         wrapperCol={{ span: 12 }}
                        label="会议时间" 
                        >
                        
                        {getFieldDecorator('time', config)(
                            <DatePicker 
                            showTime 
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择时间"

                            onChange={onChange}
                            onOk={onOk}
                            />
                        )}
                        </FormItem>
                    </Row>
               



                    {/* <Row> */}
                        {/* <Col span={2}>
                        
                            <FormItem
                                label="会议时间：">  
                                </FormItem>
                                </Col>                             */}
                        {/* <Col span={22}>  
                        
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            // placeholder="请选择时间"
                            onChange={onChange}
                            onOk={onOk}
                        /></Col> */}
                    {/* </Row> */}
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议主题："
                    >
                        {getFieldDecorator('theme', {

                        })(
                            <Input placeholder="请准确填写会议主题" />
                        )}

                    </FormItem>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label=" 联系人："
                    >
                        {getFieldDecorator('recorder', {

                        })(
                            <Input placeholder="请准确填写联系人" />
                        )}

                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="联系电话："
                    >
                        {getFieldDecorator('contact', {

                        })(
                            <Input placeholder="请准确填写联系电话" />
                        )}

                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="参会须知："
                    >
                        {getFieldDecorator('notice')(
                            <TextArea rows={2} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="注意事项："
                    >
                        {getFieldDecorator('announcements')(
                            <TextArea rows={2} placeholder="" />
                        )}
                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="备注："
                    >
                        {getFieldDecorator('remark')(
                            <TextArea rows={2} placeholder="" />

                        )}
                    </FormItem>
                    <row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" style={{ display: nextButton }} onClick={nextStep}>下一步</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick={saveFormData}>保存</Button>
                        </Col>

                    </row>

                </Form>
            </div>
        )
    }
)



class BasicMessage extends Component {
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
        console.log(this.props);
        
        return (
            <div>
                <SeoCreateForm  changeStyle={this.changeStyle} conferenceId={conferenceId} nextButton={this.state.nextButton} setConferenceId={this.props.setConferenceId.bind(this)}  handelNextStep={this.props.handelNextStep.bind(this)} />
            </div>

        )
    }
}
export default BasicMessage;

