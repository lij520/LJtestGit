import React from 'react';
import { Form, Button, Input, DatePicker, message, Select, Modal, Progress} from 'antd';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();
import $ from 'jquery';
import './index.less';

const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class OneKeyForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    handleSubmit(e) {
        var formData = new FormData();
        let formInfo = this.props.form.getFieldsValue(); 
        console.log(formInfo);

        e.preventDefault();
        const form = this.props.form;
        form.validateFields((err, values) => {
            if(err){
                return;
            }
            this.props.openModal();
            formData.append("patrolPeriod",formInfo.patrolPeriod); 
            formData.append("patrolNum",formInfo.patrolNum); 
            formData.append("opuserId",_mm.getStorage('userInfo').userId);
            formData.append("regionId",_mm.getStorage('userInfo').regionId);

            const self = this;  //this作用域的问题
         
            $.ajax({
                type        :  'post',
                url         :  '/patrol/semiautoInsertPatrol',
                data        :  formData,
                cache       :  false,//上传文件无需缓存
                processData :  false,//用于对data参数进行序列化处理 这里必须false
                contentType :  false, //必须
                beforeSend  : function(){
                    setTimeout(()=>{             
                        self.props.percentNum(20);    
                    },1000)
        
                    setTimeout(()=>{             
                        self.props.percentNum(60);    
                    },1000)  
                },
                success     : res => {
                    if(res.result == 1){
                        setTimeout(()=>{             
                            self.props.percentNum(80);  
                        },1000)
                    }
                    if(res.result == 0){
                        message.error(res.message);
                        self.props.statusChange("exception","#ff0000");
                    }
                    
                },
                complete: xhr => {
                    if(xhr.responseJSON.result == 1){
                        setTimeout(()=>{             
                            self.props.percentNum(100); 
                            message.success("派发成功！"); 
                        },1000)
                        setTimeout(()=>{             
                            self.props.handleCancel();     
                        },1500)
                        setTimeout(()=>{             
                            self.props.percentNum(0);    
                        },2000)
                    }
                    if(xhr.responseJSON.result == 0){
                        setTimeout(()=>{             
                            self.props.handleCancel();   
                            self.props.percentNum(0);  
                        },1000)
                    }
                    // console.log(xhr);
                },
                error       : err => {
                    message.error("error!");
                    // self.props.statusChange("exception","#ff0000");
                }

            });

        })
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <FormItem {...formItemLayout} label="巡路周期：">
                {getFieldDecorator('patrolPeriod', {
                    initialValue: '5',
                    rules: [{
                    required: true,
                    message: '巡路周期不能为空！',
                    }],
                })(
                    <Select
                            placeholder="请输入巡路周期！"
                            defaultActiveFirstOption={false}
                            showArrow={true}
                            filterOption={false}
                            onChange={this.handleChange}
                        >
                            <Option key="1" value="1">每年</Option>
                            <Option key="2" value="2">每半年</Option>
                            <Option key="3" value="3">每季度</Option>
                            {/* <Option key="4" value="4">每两个月</Option> */}
                            <Option key="5" value="5">每月</Option>
                            <Option key="6" value="6">每周</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label="巡路次数：">
                {getFieldDecorator('patrolNum', {
                    initialValue: '',
                    rules: [{
                    required: true,
                    message: '巡路次数不能为空！',
                    }],
                })(
                    <Input placeholder="请输入巡路次数！" />
                )}
                </FormItem>
                
                <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                    <Button type="primary" htmlType="submit">派发</Button>
                </FormItem>
            </Form>  
        )
    }
}

const OneKeyCom = Form.create()(OneKeyForm);

class OneKey extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            strokeColor: '#006699',//'#e2986f','#58a5cc','#e5d16a','#ca87b8','#006699','#333399'
            percent: 0,
            status: "active",
        }
    }

    percentNum(num) {
        this.setState({
            percent: num,
        })
        if(this.state.percent == 100){
            this.setState({
                status: "success",
                strokeColor: "#00ff00",
            })
        }
    }
    statusChange(status,color) {
        this.setState({
            status: status,
            strokeColor: color
        })
    }

    openModal() {
        this.setState({visible: true})
    }

    handleCancel() {
        this.setState({
            visible: false,
            strokeColor: '#006699',
            status: "active",
        });  //关闭进度条

        this.props.oneKeyHandleCancel();        
        this.props.loadPlanList(1,this.props.pageSize);    //刷新巡路任务列表
    }

    render(){
        return(
            <div>
                <OneKeyCom percentNum={(num) => this.percentNum(num)} 
                           statusChange={(status,color) => this.statusChange(status,color)}	
                           openModal={() => this.openModal()} 
                           handleCancel={() => this.handleCancel()}/>
                <Modal visible={this.state.visible} closable={false} maskClosable={false}
                    centered={true} footer={null}
                    onCancel={() => this.handleCancel()}>
                    <Progress className="progress-shade" strokeWidth={20} percent={this.state.percent} status={this.state.status} strokeColor={this.state.strokeColor}/>
                </Modal>
            </div>
            
        )
    }
}

export default OneKey;