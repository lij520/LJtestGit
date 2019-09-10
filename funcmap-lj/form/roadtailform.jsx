import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Icon, Select, Modal, message, Switch } from 'antd';
import { formColums } from './constcolums.jsx';
import { reqRoadtailForm } from '../../../../ajax-lj/index.jsx';
import TableForm from './tableForm.jsx';
import TreeForm from './treeform.jsx';
import './style.scss';
import $ from 'jquery';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const user = _mm.getStorage('user');
// console.log('user',user);
const { TextArea } = Input;
const { Option } = Select;
class AdvancedSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // display: 'block',
      visible: false,
      formData: '',
      flag : 0,
    };

  }
  //表格内容为Select类型
  setTableOne = (i) => {
    if (i === 3) {
      return (
        <Select>
          <Option value=" "></Option>
          <Option value="国道">国道</Option>
          <Option value="省道">省道</Option>
          <Option value="县道">县道</Option>
          <Option value="乡道">乡道</Option>
          <Option value="村道">村道</Option>
        </Select>
      )
    } else {
      return (
        <Select>
          <Option value=" "></Option>
          <Option value="是">是</Option>
          <Option value="否">否</Option>
        </Select>
      )
    }
  }

  //表格内容为Input类型
  setTableTwo = (i, formColums) => {
    const { getFieldDecorator } = this.props.form;
    // console.log('formColums[`${i}`].label', formColums)
    var usertype ;
    switch(formColums.label){
      case "路线代码": usertype="roadcode" ;break;
      case "村路长": usertype="007" ;break;
      case "乡路长": usertype="006" ;break;
      case "路政中队": usertype="3" ;break;
      case "运管部门": usertype="2" ;break;
      case "养护队": usertype="4" ;break;
      case "专管员": usertype="010" ;break;
      case "保险公司": usertype="5" ;break;
    }

    if (i === 4 || (i > 7 && i < 15)) {
      const {formData} = this.state;
      let required=i===4?true:false;
      return (
        <TableForm form={this.props.form} label={formColums.label} susertype={usertype} btnShow={true} field={formColums.names} required={required} disabled={false} flag={this.state.flag} formData={formData}/>
      )
    } else if (i === 6 || i === 7 || i === 15) {
      const {formData} = this.state;
      let required=i===6?true:false;
      return(
        <TreeForm form={this.props.form} label={formColums.label} susertype={usertype} btnShow={true} field={formColums.names} required={required}  flag={this.state.flag} formData={formData}></TreeForm>
      )
    } else {
      return (<Input />)
    }
  }

  Config = (value) => {
    const { formData } = this.state;
    // console.log('formDataq1',formData,value);
    return (
      {
        initialValue: formData[value],
        rules: [{ required: false, message: 'Input something or not!' }],
      }
    )
  };  //表格中非必填项

  reqConfig = (value) => {
    const { formData } = this.state;
    // console.log('formDataq2',formData,value);
    return (
      {
        initialValue: formData[value],
        rules: [{ required: true, message: 'Input something!' }],
      }
    )
  }; //表格中必填项
  //初始化表格
  getFields = () => {
    const { getFieldDecorator } = this.props.form;
    const children = [];

    for (let i = 0; i < formColums.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: 'block', visibility: i === 0 || i === 92 ? 'hidden' : 'none' }}>
          {
            i === 4 || (i > 5 && i < 16) ? this.setTableTwo(i, formColums[`${i}`]) : (<Form.Item label={formColums[`${i}`].label} style={{ left: i === 1 ? '-393px' : '0px', width: i === 1 ? '760px' : '365px' }}>
              {getFieldDecorator(formColums[`${i}`].names, i < 7 && i > 0 ? this.reqConfig(formColums[`${i}`].names) : this.Config(formColums[`${i}`].names))
                (i === 3 || i === 22 || i === 24 || i === 32 ? this.setTableOne(i) : this.setTableTwo(i, formColums[`${i}`]))
              }
            </Form.Item>)
          }
        </Col>,
      );
    }
    return children;
  }

  //修改=》新增
  changeSubmitAdd = () => {
    this.action = 'add';
    this.setState({
      formData: '',
      flag : 1,
    },()=>this.setState({flag:0}))
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
        console.log('Received values of form: ', values, this.action);
        if (this.action === 'add') {  //新增=》保存
          values.IsNotExcel = 'no';
          values.sadminarea = values.sareacode;
          values.sareacode = '';
          values.soperateuserid = user.account;
          values.soperateusername = user.usrname;
          values.screateuserid = user.account;
          values.screateusername = user.usrname;
          message.success('yoyoyoyoyo!!!!!!');
          $.ajax({
            type: "post",
            url: '/api/common/gl-road/addRoad',
            data: values,
            success:
              function (data) {
                message.success(data.msg);
              },
            error: function (data) {
              console.log(data.msg);
            }
          });
        } else if (this.action === 'edit') {  //修改=》保存
          $.ajax({
            type: "post",
            url: '/api/common/gl-road/updateRoad',
            data: values,
            success:
              function (data) {
                message.success(data.msg);
              },
            error: function (data) {
              console.log(data.msg);
            }
          });
        }
      }
    });
    window.close();
  };

  //取消=》重置表格
  handleReset = () => {
    this.props.form.resetFields();
    window.close();
  };

  componentWillMount() {
    const href = window.location.href;
    let roothref = href.split('map/');
    let childhref = roothref[1].split('/');
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
    const result = await reqRoadtailForm(keyno);
    console.log('result roadtailform', result);
    if (result.msg === "请求成功") {
      this.setState({
        formData: result.data
      })
    } else {
      console.log(result.msg)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { action } = this;
    const { formData } = this.state;

    return (
      <div className='form' style={{ width: '100%', border: '1px solid #d6d6d6', borderRadius: '5px' }}>
        <div style={{ width: '92%', height: '40px', marginBottom: '15px', marginLeft: '4%', marginTop: '10px' }}>
          <h2 style={{ textAlign: 'center', paddingTop: '6px' }}>公&nbsp;路&nbsp;档&nbsp;案</h2>
        </div>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} style={{ width: '92%', marginLeft: '4%' }}>
          <Row gutter={24}>
            {this.getFields()}
          </Row>
          <Row>
            <Form.Item label="报部备注">
              {
                getFieldDecorator('sdeptremark', {
                  initialValue: formData.sdeptremark,
                })(<Input />)
              }
            </Form.Item>
            <Form.Item label="审核说明">
              {
                getFieldDecorator('scheckremark', {
                  initialValue: formData.scheckremark,
                })(<Input />)
              }
            </Form.Item>
            <Form.Item label="备注">
              {
                getFieldDecorator('sremark', {
                  initialValue: formData.sremark,
                })(<TextArea rows={3} />)
              }
            </Form.Item>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' ,padding:'5px 0'}}>
              {action === 'edit' ? <Button type="primary" onClick={this.changeSubmitAdd} style={{ marginRight: 8 }}>
                新增
              </Button> : null}
              {action === 'edit' ? <Button type="primary" onClick={this.changeSubmitCopy} style={{ marginRight: 8 }}>
                复制
              </Button> : null}
              {action === 'add' || action === 'edit' ? <Button type="primary" htmlType="submit" >
                保存
              </Button> : null}
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const RoadDetailForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default withRouter(RoadDetailForm);