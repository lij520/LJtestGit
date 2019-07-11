import React from 'react';
import {Row, Col, Button, Modal, Icon, message, Select, DatePicker, Radio, Card} from 'antd';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();
import $ from 'jquery';
const Option = Select.Option;
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

class LogExport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            list: [],
            disabled: false,
            startTime: '',
            endTime: '',
            queryUserId: ''
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.loadSelectUserList();
    }

    componentWillReceiveProps(nextProps) {

    }

    //Select 请求下拉列表
	loadSelectUserList() {
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("roleType",'50');
        formData.append("regionId",_mm.getStorage('userInfo').regionId);
       
        $.ajax({
            type        :  'post',
            url         :  '/patrol/queryUserList',
            data        :  formData,
            cache       :  false,
            processData :  false,
            contentType :  false, 
            success     : res => {
                if(res.result == 1){
                this.setState({
                    list:res.userList,
                });
                }
                else if(res.result == -1){
                message.error(res.message);
                window.location.href = '/';
                }
                else{
                    message.error(res.message);
                }
            },
            error       : err => {
                message.error('error!');
            }
        });
    }

    //通过表单form实现excel文件下载
    exportLog() {
        var form = $("<form>");   //定义一个form表单
            $('body').append(form);  //将表单放置在web中
                form.attr('style','display:none');   
                form.attr('target','');
                form.attr('method','post');
                form.attr('action','/prExcel');//下载文件的请求路径

                var input1 = $('<input>'); 
                input1.attr('type','hidden'); 
                input1.attr('name','userId'); 
                input1.attr('value', _mm.getStorage('userInfo').userId);
                form.append(input1);  

                var input2 = $('<input>'); 
                input2.attr('type','hidden'); 
                input2.attr('name','token'); 
                input2.attr('value',_mm.getStorage('userInfo').token);
                form.append(input2);

                var input3 = $('<input>'); 
                input3.attr('type','hidden'); 
                input3.attr('name','regionId'); 
                input3.attr('value',_mm.getStorage('userInfo').regionId);
                form.append(input3);

                var input4 = $('<input>'); 
                input4.attr('type','hidden'); 
                input4.attr('name','methodNo'); 
                input4.attr('value',1);
                form.append(input4);

                var input5 = $('<input>'); 
                input5.attr('type','hidden'); 
                input5.attr('name','startTime'); 
                input5.attr('value',this.state.startTime);
                form.append(input5);

                var input6 = $('<input>'); 
                input6.attr('type','hidden'); 
                input6.attr('name','endTime'); 
                input6.attr('value',this.state.endTime);
                form.append(input6);

                //查所有填2, 查一个人填1
                var input7 = $('<input>'); 
                input7.attr('type','hidden'); 
                input7.attr('name','appType'); 
                input7.attr('value',(this.state.disabled ? 1: 2) );
                form.append(input7);

                //查个人时填的
                var input8 = $('<input>'); 
                input8.attr('type','hidden'); 
                input8.attr('name','queryUserId'); 
                input8.attr('value',(this.state.disabled ? this.state.queryUserId: ""));
                form.append(input8);

                form.submit();//表单提交 
                form.remove();//移除该临时元素
    }

    openModal() {
        this.setState({visible: true});
    }
    handleOk() {
        if(this.state.startTime == "" || this.state.endTime == ""){
            message.info("请选择日期！")
        }else if(this.state.disabled && this.state.queryUserId == ""){
            message.info("请选择人员！")
        }else{
            this.exportLog();
            this.setState({visible: false,disabled: false});
        }
        
    }
    handleCancel() {
        this.setState({visible: false,disabled: false});
    }

    onRangePickerChange(dates,dateStrings) {
        console.log("time",dateStrings);
        this.setState({
            startTime: dateStrings[0],
            endTime: dateStrings[1]
        })
    }

    onRadioChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            disabled: e.target.value, 
        })
    }

    onSelectChange(value) {
        console.log("selected:",value);
        this.setState({ queryUserId: value})
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.openModal()}><Icon type="cloud-download" />导出日志</Button>
                <Modal
                    title="导出日志"
                    visible={this.state.visible}
                    okText="导出"
                    cancelText="取消"
                    destroyOnClose={true}
                    centered={false}
                    width={"50%"}
                    style={{top:"10%"}}
                    onOk={() => this.handleOk()} 
                    onCancel={() => this.handleCancel()}
                    >

                    <Card
                        bordered={false}
                        bodyStyle={{padding:"40px"}}
                        >
                        <Row style={{marginBottom:"30px"}}>
                            <Col span={5}><span style={{fontSize:"15px",fontWeight:"bold"}}>导出日期范围：</span></Col>
                            <Col span={19}><RangePicker onChange={(dates,dateStrings) => this.onRangePickerChange(dates,dateStrings)} placeholder={["开始日期","结束日期"]}style={{width:"100%"}}/></Col>
                        </Row>

                        <Row>
                            <Col span={4}>
                                <span style={{fontSize:"15px",fontWeight:"bold"}}>巡路人员：</span>
                            </Col>
                            <Col span={6}>
                                <RadioGroup onChange={(e) => this.onRadioChange(e)} value={this.state.disabled}>
                                    <Radio value={false}>全部</Radio>
                                    <Radio value={true}>个人</Radio>
                                </RadioGroup>
                            </Col>
                            <Col span={14}>
                                <Select style={{width:"100%"}} disabled={!this.state.disabled}
                                    showSearch showArrow={true} notFoundContent={"No Data!"}
                                    // onFocus={() => this.loadSelectUserList()}
                                    // onSearch={() => this.handleSearch()}
                                    onChange={(value) => this.onSelectChange(value)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >

                                        { this.state.list.map(item => <Option key={item.user_id}>{item.real_name}</Option>) }
                                </Select>
                            </Col>
                        </Row>

                    </Card>
                </Modal>
            </div>
            
        )
    }
}

export default LogExport;