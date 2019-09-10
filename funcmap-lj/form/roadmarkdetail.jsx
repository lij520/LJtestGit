import React, { Component } from 'react';
import {
    Form,
    Input,
    Col,
    Button,
    Row,
    message,
} from 'antd';
import { reqRoadmarkAttr } from '../../../../ajax-lj/index.jsx';


const Item = Form.Item;
const { TextArea } = Input;

class RoadMarkDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roadmarkattr : '',
        }
    }

    componentWillMount() {
        const href = window.location.href;
        let roothref = href.split('roadmarkdetail/');
        this.keyno = roothref[1];
    }

    componentDidMount(){
        this.getRoadMarkAttr();
    }

    getRoadMarkAttr=async()=>{
        const {keyno} = this;
        const result = await reqRoadmarkAttr(keyno);
        if(result.msg==="请求成功"){
            this.setState({
                roadmarkattr : result.data
            })
        }else{
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
            labelCol: { span: 7 },
            wrapperCol: { span: 15, style: { textAlign: 'center' } },
        };
        const {roadmarkattr} = this.state;

        return (
            <div>
                <h2>公路设施档案</h2>
                <Form {...formItemLayout} layout="inline" style={{ paddingLeft: 10 }} className='landbridge'>
                    <Row>
                        <Col span={24}>
                            <Item label='名称' style={{ marginLeft: '-165px' }}>
                                {
                                    getFieldDecorator('sname', {
                                        initialValue: roadmarkattr.sname,
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
                            <Item label="设施类别">
                                {
                                    getFieldDecorator('stype', {
                                        initialValue: roadmarkattr.stype,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="上传用户">
                                {
                                    getFieldDecorator('suploaduser', {
                                        initialValue: roadmarkattr.suploaduser,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="经度" style={{ marginLeft: '-10px' }}>
                                {
                                    getFieldDecorator('nlongitude', {
                                        initialValue: roadmarkattr.nlongitude,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                            <Item label="纬度" style={{ marginLeft: '28px' }}>
                                {
                                    getFieldDecorator('nlatitude', {
                                        initialValue: roadmarkattr.nlatitude,
                                    })(
                                        <Input style={{ width: 200 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="备注" style={{ marginLeft: '-90px' }}>
                                {
                                    getFieldDecorator('sremark', {
                                        initialValue: roadmarkattr.sremark,
                                    })(
                                        <TextArea rows={3} style={{ width: 760 }} />
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Item label="创建人" style={{ marginLeft: '0px' }}>
                                {
                                    getFieldDecorator('screateusername', {
                                        initialValue: roadmarkattr.screateusername,
                                    })(
                                        <Input style={{ width: 200 }} disabled={true}/>
                                    )
                                }
                            </Item>
                            <Item label="创建时间" style={{ marginLeft: '10px' }}>
                                {
                                    getFieldDecorator('doperatedate', {
                                        initialValue: roadmarkattr.doperatedate,
                                    })(
                                        <Input style={{ width: 200 }} disabled={true}/>
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

export default Form.create()(RoadMarkDetail);