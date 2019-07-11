import React                from 'react';
import { Col, Row,Form, Input,Select, Checkbox,Button,Icon,message} from 'antd';
import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const FormItem = Form.Item;
const Option = Select.Option;


class CompanyCreateForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        userId          :_mm.getStorage('userInfo').userId,
        token           :_mm.getStorage('userInfo').token,
      } 
  }

  onRegulatoryChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  addCheckbox(){
    console.log("111")
  }

  handleSubmit(){
    
    this.props.form.validateFields((err, values) => {
        if (err) {
            return;
        }

        $.ajax({
          type        :  'post',
          url         : '/roadoperation/opreation-bus-corp/saveOrUpdateByCorpName?userId='+this.state.userId+"&token="+this.state.token,
          data        :JSON.stringify(values),
          dataType    : "json",
          contentType: 'application/json',
          success     : res => {
            console.log(res);
            if(res.rtnCode ==200){
                message.success(res.msg);
                this.props.form.resetFields();
                if(this.props.companyId){
                    this.props.updataCompany()
                }
               
            }else{
              message.error(res.msg);
            }
          },
          error: err => {
            message.error("失败！");
          }
        });
        console.log('Received values of form: ', values);
    })
    
  }

  onCancle(){
    this.props.form.resetFields();
    this.props.onRegulatoryCardClose();
  }
render() {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const { getFieldDecorator } = this.props.form;
      const RegulatoryOptions=[
        { label: '客运企业安全生产基础保障情况', value: 'A' },
        { label: '客运企业运输组织情况', value: 'B' },
        { label: '客运企业建立健全安全生产责任制情况', value: 'C' },
        { label: '车辆动态监控情况', value: 'D' },
        { label: '客运企业客运驾驶员管理情况', value: 'E' },
        { label: '安全隐患排查治理与风险管控情况', value: 'F' },
        { label: '客运企业客运车辆管理管理', value: 'G' },
      ]
    console.log("222",this.props.history)
    return(
        <Form onSubmit={(e)=>this.handleSubmit(e)}>
        <Row >
            <Col span={12}>
                <FormItem
                {...formItemLayout}
                label="公司名称"  className="companyform"
                >
                {getFieldDecorator('busCorpName', {
                    rules: [{ required: true, message: '请输入客运公司名称!' }],
                    initialValue:this.props.companyFormData.busCorpName,
                })(
                    <Input  />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="公司所在地区"  className="companyform"
                >
                {getFieldDecorator('area', {
                    rules: [{ required: true, message: '请输入公司所在地区!' }],
                    initialValue:this.props.companyFormData.area,
                })(
                    <Input  />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="公司联系电话"  className="companyform"
                >
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入公司联系电话!' }],
                    initialValue:this.props.companyFormData.phone,
                })(
                    <Input  />
                )}
                </FormItem>
            </Col>
            <Col span={12}>
            <FormItem
                {...formItemLayout}
                label="公司负责人"  className="companyform"
                >
                {getFieldDecorator('officialPerson', {
                    rules: [{ required: true, message: '请输入公司负责人!' }],
                    initialValue:this.props.companyFormData.officialPerson,
                })(
                    <Input  />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="公司所在地址"  className="companyform"
                >
                {getFieldDecorator('address', {
                    rules: [{ required: true, message: '请输入公司所在地址!' }],
                    initialValue:this.props.companyFormData.address,
                })(
                    <Input  />
                )}
                </FormItem>
                {/* <Row gutter={16}>
                    <Col span={16} >
                    <FormItem
                    labelCol={ {span: 8 }}
                    wrapperCol={ {span: 16}}
                    label="派发任务给"  className="companyform"
                    >
                    {getFieldDecorator('person', {
                        rules: [{ required: true, message: '请选择派发任务人员!' }],
                        initialValue:this.props.companyFormData.manageUser,
                    })(
                        <Select placeholder="选择职位" 
                        onFocus={(e)=>this.onRole(e)}  onChange={(e)=>this.onRoleIdChange(e)}
                        >
                        {this.state.role.map(role=> <Option key={role.roleId}>{role.roleName}</Option>)}
                        <Option key='A'>'A'</Option>
                        </Select>
                    )}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                    <FormItem
                    labelCol={ {span: 8 }}
                    wrapperCol={ {span: 16}}
                    label="周期"  className="companyform"
                    >
                    {getFieldDecorator('period', {
                        rules: [{ required: true, message: '请输入周期!' }],
                        initialValue:this.props.companyFormData.cycle,
                    })(
                        <Input  />
                    )}
                    </FormItem>
                    </Col>
                </Row> */}
            </Col>
        </Row>
        {/* <FormItem style={{marginBottom:'0'}}
                labelCol={ {span: 3 }}
                wrapperCol={ {span: 20}}
                label="监管内容"
                >
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: '请选择监管内容!' }],
                    initialValue:this.props.userName,
                })(
                    <Checkbox.Group style={{ width: '100%' }}  onChange={(e)=>this.onRegulatoryChange(e)}>
                    <Row >
                        {
                         RegulatoryOptions.map(item=> <Col span={12} key={item.value} style={{marginBottom:'5px'}}><Checkbox value={item.value}>{item.label}</Checkbox></Col>)
                        }
                    {this.props.add?
                         <Col span={12}>
                         <Input style={{ width: '60%',height:'28px' }} placeholder='请输入增加的监管内容'/>
                         <a onClick={()=>this.addCheckbox()} className='checkboxicon' style={{color:'grey'}}>
                             <Icon type="plus-circle" />
                         </a>
                        </Col>
                        :null
                    }
                   
                    </Row>
                </Checkbox.Group>
                )}
        </FormItem> */}
        <Form.Item style={{textAlign:'center',marginTop:'0'}}>
          <Button type="primary" htmlType="submit" style={{marginRight:'20px'}}>保存</Button>
          <Button type="primary" onClick={()=>this.onCancle()}>取消</Button>
        </Form.Item>
        </Form>
    )
}
}

const  CompanyForm = Form.create()(CompanyCreateForm);
export default CompanyForm;