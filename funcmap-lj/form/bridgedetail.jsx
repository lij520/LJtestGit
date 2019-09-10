import React, { Component } from 'react';
import {
    Form,
    Input,
    Col,
    Button,
    Row,
    message
} from 'antd';
import { reqBridgeAttr } from '../../../../ajax-lj/index.jsx';

const Item = Form.Item;
const { TextArea } = Input;

class BridgeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bridgeattribute: '',
        }
    }
    componentWillMount() {
        const href = window.location.href;
        let roothref = href.split('bridgedetail/');
        // console.log('roothref',roothref);
        this.sbridgecode = roothref[1];
    }

    componentDidMount() {
        this.getbridgeAttr();
    }

    getbridgeAttr = async () => {
        const { sbridgecode } = this;
        const result = await reqBridgeAttr(sbridgecode);
        if (result.msg === "请求成功") {
            this.setState({
                bridgeattribute: result.data
            })
        } else {
            console.log(result.msg)
        }
    }
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

        const { bridgeattribute } = this.state;

        return (
            <div>
                <h2>桥梁档案</h2>
                <Form {...formItemLayout} layout="inline" style={{ paddingLeft: 10 }} className='landbridge'>
                    <Row>
                        <Col span={24}>
                            <Item label='附属代码' style={{ marginLeft: '-20px' }}>
                                {
                                    getFieldDecorator('sbridgecode', {
                                        initialValue: bridgeattribute.sbridgecode,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label='  名称' style={{ marginLeft: '10px' }}>
                                {
                                    getFieldDecorator('sname', {
                                        initialValue: bridgeattribute.sname,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="路线代码">
                                {
                                    getFieldDecorator('sroadcode', {
                                        initialValue: bridgeattribute.sroadcode,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="路线名称">
                                {
                                    getFieldDecorator('lxmc', {
                                        initialValue: bridgeattribute.lxmc,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="  经度" style={{ marginLeft: '-8px' }}>
                                {
                                    getFieldDecorator('nlongitude', {
                                        initialValue: bridgeattribute.nlongitude,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="  纬度" style={{ marginLeft: '27px' }}>
                                {
                                    getFieldDecorator('nlatitude', {
                                        initialValue: bridgeattribute.nlatitude,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="位置桩号" >
                                {
                                    getFieldDecorator('smileagecode', {
                                        initialValue: bridgeattribute.smileagecode,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="桥梁全长" >
                                {
                                    getFieldDecorator('rd4008', {
                                        initialValue: bridgeattribute.rd4008,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="管理单位" >
                                {
                                    getFieldDecorator('gydwmc', {
                                        initialValue: bridgeattribute.gydwmc,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="位置类型" >
                                {
                                    getFieldDecorator('wzlx', {
                                        initialValue: bridgeattribute.wzlx,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="技术状况" style={{ margin: '0 30px 0 22px' }}>
                                {
                                    getFieldDecorator('hrd4026', {
                                        initialValue: bridgeattribute.hrd4026,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="按使用年限分" >
                                {
                                    getFieldDecorator('hrd4004', {
                                        initialValue: bridgeattribute.hrd4004,
                                    })(
                                        <Input style={{ width: 185 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="按跨径分" >
                                {
                                    getFieldDecorator('hrd4007', {
                                        initialValue: bridgeattribute.hrd4007,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="路段代码">
                                {
                                    getFieldDecorator('sroadnumber', {
                                        initialValue: bridgeattribute.sroadnumber,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="备注" style={{ marginLeft: '-155px' }}>
                                {
                                    getFieldDecorator('sremark', {
                                        initialValue: bridgeattribute.srmark,
                                    })(
                                        <TextArea rows={3} style={{ width: 740 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="创建日期" style={{ marginLeft: '-13px' }}>
                                {
                                    getFieldDecorator('doperatedate', {
                                        initialValue: bridgeattribute.doperatedate,
                                    })(
                                        <Input style={{ width: 200 }} disabled={true} />
                                    )
                                }
                            </Item>
                            <Item label="创建人">
                                {
                                    getFieldDecorator('screateusername', {
                                        initialValue: bridgeattribute.screateusername,
                                    })(
                                        <Input style={{ width: 200 }} disabled={true} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                </Form>
                <Button type="primary" style={{ margin: '5px 0' }} onClick={this.handleReset}>取消</Button>
            </div>
        )
    }

}

export default Form.create()(BridgeDetail);