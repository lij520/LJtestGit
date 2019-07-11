import React, { Component } from 'react'
import { Modal, Form, Input, Button, Col, message, Tabs } from 'antd';
import MeetingAgenda from './meetingAgendaModal';
import Conferee from './confereeModal'
import Accommodation from './accommodationModal'
import MeetingGuide from './meetingGuideModal'
import MeetingMaterialModal  from './meetingMaterialModal'
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
window.selectValue = {
    conferenceName: "",
    agenda: null,
    announcements: "",
    arrangement: null,
    conferenceId: "",
    conferenceName: "",
    contact: "",
    followThrough: null,
    level: null,
    manual: null,
    notice: "",
    organizationId: 0,
    recorder: "",
    remark: "",
    site: "",
    status: 0,
    stepStatus: null,
    theme: "",
    time: "",
};

class BsicMessingModal extends Component {

    render() {
        const { form } = this.props;
        console.log(window.selectValue.conferenceName);
        const { getFieldDecorator } = form;
        const saveFormData = () => {
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                // console.table(values);
                console.log(values);
                values.userId=_mm.getStorage('userInfo').userId;
                values.token=_mm.getStorage('userInfo').token;
                $.ajax({
                    // url: "http://192.168.1.98:8085/conference/insertConference",
                    url: "http://192.168.0.126:8088/conference/updateConference",            
                    type: "post",
                    // async: false,
                    data: values,
                    success: function (res) {
                        alert("成功");
                        message.success('保存成功！')
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
        const nextStep = () => {
            console.log('nextStep');
            this.props.handelNextStep("2");
        }

        return (
            <div className="new-wrap">
                <Form layout='vertical'>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议名称：">
                        {
                            getFieldDecorator('conferenceName', {
                                rules: [{ required: true, message: '请填写会议名称' }],
                                initialValue: window.selectValue.conferenceName,
                            })(
                                <Input placeholder="请准确填写会议名称" />
                            )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议地点：">
                        {getFieldDecorator('site', {
                            rules: [{ required: true, message: '请填写会议地点·' }],
                            initialValue: window.selectValue.site,
                        })(
                            <Input placeholder="请准确填写会议地点" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        label="会议主题："
                    >
                        {getFieldDecorator('theme', {
                            initialValue: window.selectValue.theme,
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
                            initialValue: window.selectValue.recorder,
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
                            initialValue: window.selectValue.contact,
                        })(
                            <Input placeholder="请准确填写联系电话" />
                        )}

                    </FormItem>

                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="参会须知："
                    >
                        {getFieldDecorator('notice', {
                            initialValue: window.selectValue.notice,
                        })(
                            <TextArea rows={6} placeholder="" />

                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="注意事项："
                    >
                        {getFieldDecorator('announcements', {
                            initialValue: window.selectValue.announcements,
                        })(
                            <TextArea rows={6} placeholder="" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 24 }}
                        label="备注："
                    >
                        {getFieldDecorator('remark', {
                            initialValue: window.selectValue.remark,
                        })(
                            <TextArea rows={6} placeholder="" />
                        )}
                    </FormItem>
                    <row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={nextStep}>下一步</Button>&emsp;
                                <Button type="primary" onClick={saveFormData}>保存</Button>
                        </Col>
                    </row>
                </Form>
            </div>

        )
    }
}
const SeoCreateForm = Form.create()(
    BsicMessingModal
)
class MeetingManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTabKey: '1'
        };
    }
    handelNextStep(val) {
        this.setState({
            addTabKey: val
        })
    }
    state = {
        visible: this.props.visible,
    }
    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            selectValue: this.props.selectValue
        })
    }
    componentWillReceiveProps() {
        this.setState({
            visible: this.props.visible,
            selectValue: this.props.selectValue
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.props.handleCancel();
        
        this.setState({})
    }
    render() {
        return (
            <div><Modal
                title="查看或修改列表信息"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={1200}
                footer={null}
                destroyOnClose
            >
                <Tabs tabPosition={"right"} /* onChange={(e)=>this.addTabChange(e)} */ activeKey={this.state.addTabKey}>
                    <TabPane tab="基本信息" key="1"><SeoCreateForm visible={this.props.visible} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                    <TabPane tab="会议议程" key="2"><MeetingAgenda handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                    <TabPane tab="会议材料" key="3"><MeetingMaterialModal handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                    {/* <TabPane tab="会议议程" key="3"><MeetingAgenda handelNextStep={this.handelNextStep.bind(this)} /></TabPane> */}
                    <TabPane tab="参会人员" key="4"><Conferee handelNextStep={this.handelNextStep.bind(this)} /></TabPane> 
                     <TabPane tab="食宿安排" key="5"><Accommodation handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                    <TabPane tab="会议指南" key="6"> <MeetingGuide handelNextStep={this.handelNextStep.bind(this)} /></TabPane> 
                </Tabs>
            </Modal>
            </div>
        );
    }
}

export default MeetingManage;