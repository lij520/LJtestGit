import React, { Component } from 'react';
import {
    Form,
    Input,
    Col,
    Button,
    Row,
    Upload,
    message,
    Icon,
    Radio,
} from 'antd';
import LonLatModal from 'component/getlonlat/lonlatmodal.jsx';
import { reqSecenryAttr } from '../../../../ajax-lj/index.jsx';
import moment from 'moment';
import $ from 'jquery';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const userAera = _mm.getStorage('user');
const token = _mm.getStorage('user').token;
// console.log('userAera',userAera)

const nowTime = new Date();
const Item = Form.Item;
const { TextArea } = Input;

class SceneryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: '',
        }
    }

    componentWillMount() {
        const href = window.location.href;
        let roothref = href.split('scenerydetail/');
        let childhref = roothref[1].split('/');
        console.log(childhref)
        this.selectRowkeyno = childhref[1];
        this.action = childhref[0];
    }

    componentDidMount() {
        const { selectRowkeyno, action } = this;
        // message.success('yoyoyoyoyo!!!!!!')
        if (action === 'add') {
            console.log('no repeat')
        } else {
            this.getInitTable(selectRowkeyno);
        }
    }

    //当为详情、修改时表格的初始化值
    getInitTable = async () => {
        const keyno = this.selectRowkeyno;
        const result = await reqSecenryAttr(keyno);
        console.log('result scenery', result);
        if (result.msg === "请求成功") {
            this.setState({
                formData: result.data
            })
        } else {
            console.log(result.msg)
        }
    }

    //修改=》新增
    changeSubmitAdd = () => {
        this.action = 'add';
        this.setState({
            formData: '',
        })
    }

    //修改=》复制
    changeSubmitCopy = () => {
        this.action = 'add';
        var newData = this.state.formData;
        newData.sname = '';
        this.setState({
            formData: newData,
        })
    }

    //内容新增/修改=》保存
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values, this.action);
                if (this.action === 'add') {  //新增=》保存
                    values.token=token;
                    console.log('Received values of form: ', values);
                    message.success('yoyoyoyoyo!!!!!!');
                    $.ajax({
                        type: "post",
                        url: '/api/roadsign/gl-view-spot/addGlViewSpot',
                        data: values,
                        success:
                            function (data) {
                                console.log(data.msg);

                            },
                        error: function (data) {
                            console.log(data.msg);
                        }
                    });
                } else if (this.action === 'edit') {  //修改=》保存
                    values.keyno=this.selectRowkeyno;
                    console.log('Received values of form: ', values);
                    $.ajax({
                        type: "post",
                        url: '/api/roadsign/gl-view-spot/updateGlViewSpot',
                        data: values,
                        success:
                            function (data) {
                                console.log(data.msg);
                            },
                        error: function (data) {
                            console.log(data.msg);
                        }
                    });
                }
                // this.props.onSearchTable();
            }
        });
        window.close();
    };

    //取消=》重置表格
    handleReset = () => {
        this.props.form.resetFields();
        window.close();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 15, style: { textAlign: 'center' } },
        };

        const { action } = this;
        const { formData } = this.state;

        return (
            <div>
                <h2>景点档案</h2>
                <Form {...formItemLayout} layout="inline" style={{ paddingLeft: 10 }} className='landbridge'>
                    <Row>
                        <Col span={24}>
                            <Item label='景点名称' style={{ marginLeft: '-210px' }}>
                                {
                                    getFieldDecorator('sname', {
                                        initialValue: formData.sname,
                                        rules: [{ required: true, message: 'Input something!' }],
                                    })(
                                        <Input style={{ width: 500 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label='地址' style={{ marginLeft: '-220px' }}>
                                {
                                    getFieldDecorator('saddress', {
                                        initialValue: formData.saddress,
                                    })(
                                        <Input style={{ width: 500 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="行政区划">
                                {
                                    getFieldDecorator('sadminarea', {
                                        initialValue: formData.sadminarea,
                                        rules: [{ required: true, message: 'Input something!' }],
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="联系电话">
                                {
                                    getFieldDecorator('stelephone', {
                                        initialValue: formData.stelephone,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginLeft: '20px' }}>
                            {/* <Item label='景点位置' style={{ marginLeft: '-165px' }}> */}
                            <LonLatModal form={this.props.form} />
                            {/* </Item> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label='首页显示' style={{ marginLeft: '-325px' }}>
                                {
                                    getFieldDecorator('bhomepage', {
                                        initialValue: formData.bhomepage,
                                    })(
                                        <Radio style={{ marginLeft: '40px' }}>是</Radio>
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="景点介绍" style={{ marginLeft: '-145px' }}>
                                {
                                    getFieldDecorator('sintroduce', {
                                        initialValue: formData.sintroduce,
                                        rules: [{ required: true, message: 'Input something!' }],
                                    })(
                                        <TextArea rows={5} style={{ width: 760 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label='添加图片' style={{ marginLeft: '-315px' }} validateStatus="error" help="景点图片">
                                {
                                    getFieldDecorator('sphotos', {
                                        initialValue: '',
                                    })(
                                        <Upload>
                                            <Button>
                                                <Icon type="upload" /> 选择文件
                                            </Button>
                                        </Upload>
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label='附件列表' style={{ marginLeft: '-315px' }}>
                                {
                                    getFieldDecorator('sadditonlist', {
                                        initialValue: '',
                                    })(<div style={{ marginLeft: '100px' }}></div>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="备注" style={{ marginLeft: '-155px' }}>
                                {
                                    getFieldDecorator('sremark', {
                                        initialValue: formData.sremark,
                                    })(
                                        <TextArea rows={3} style={{ width: 760 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="创建人" style={{ marginLeft: '15px' }}>
                                {
                                    getFieldDecorator('screateusername', {
                                        initialValue: userAera.usrname,
                                        rules: [{ required: true, message: 'Input something!' }],
                                    })(
                                        <Input style={{ width: 200 }} disabled={true}/>
                                    )
                                }
                            </Item>
                            <Item label="创建时间" style={{ marginLeft: '10px' }}>
                                {
                                    getFieldDecorator('doperatedate', {
                                        initialValue: moment(nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate()).format('YYYY-MM-DD'),
                                        rules: [{ required: true, message: 'Input something!' }],
                                    })(
                                        <Input style={{width: 200}} disabled={true}/>
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'center', padding: '5px 0' }}>
                            {action === 'edit' ? <Button type="primary" onClick={this.changeSubmitAdd} style={{ marginRight: 8 }}>
                                新增
                             </Button> : null}
                            {action === 'edit' ? <Button type="primary" onClick={this.changeSubmitCopy} style={{ marginRight: 8 }}>
                                复制
                            </Button> : null}
                            {action === 'add' || action === 'edit' ? <Button type="primary" onClick={this.handleSearch} >
                                保存
                            </Button> : null}
                            <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                取消
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

}

export default Form.create()(SceneryDetail);