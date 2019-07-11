import React                from 'react';
import { Col, Row,Form, Input,Select, Checkbox,Button,Icon} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

let id = 0;
class RegulatoryCreateForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        RegulatoryOptions:[
            { label: '客运企业安全生产基础保障情况', value: 'A' },
            { label: '客运企业运输组织情况', value: 'B' },
            { label: '客运企业建立健全安全生产责任制情况', value: 'C' },
            { label: '车辆动态监控情况', value: 'D' },
            { label: '客运企业客运驾驶员管理情况', value: 'E' },
            { label: '安全隐患排查治理与风险管控情况', value: 'F' },
            { label: '客运企业客运车辆管理管理', value: 'G' },
          ]
      } 
  }

  
  onRegulatoryChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  addCheckbox(){ //增加触发keys长度变化，从而触发render里的names变化
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let length=this.state.RegulatoryOptions.length-1
    const nextKeys = keys.concat(length++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit(){
    
    this.props.form.validateFields((err, values) => {
        if (err) {
        return;
        }
        console.log('Received values of form: ', values);
    })
  }

  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    keys.splice(k,1);
    // can use data-binding to set
    form.setFieldsValue({
    //   keys: keys.filter(key => key !== k),
      keys: keys,
    });
  }


render() {
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: { span: 18 , offset: 4},
      };
      const { getFieldDecorator, getFieldValue } = this.props.form;
      

      getFieldDecorator('keys', { initialValue:this.state.RegulatoryOptions});//key是最后的减号，相当于index,是数字
      
       

      const keys = getFieldValue('keys');
      const formItems =(
          <Row>
            {
                   keys.map((k, index) => (
                    <Col span={12} key={index}>
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? '监管内容' : ''}
                      required={false}
                      key={index}
                    >
                      {getFieldDecorator(`names[${index}]`, {
                        initialValue:k.label||null,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "请输入要新增的监管内容或者删除这个输入框",
                        }],
                      })(
                        <Input placeholder="新增的监管内容" style={{width:'80%',height:'28px'}}/>
                      )}
                      {keys.length > 1 ? (
                        <a   onClick={() => this.remove(index)} className='checkboxicon' style={{color:'grey'}} disabled={keys.length === 1}>
                        <Icon type="minus-circle" />
                        </a>
                      ) : null}
                    </Form.Item>
                    </Col>
                  ))
            }  
          </Row>
      ) 
  ;

    return(
        <Form onSubmit={(e)=>this.handleSubmit(e)}>
         {formItems}
        <FormItem style={{marginBottom:'0'}}{...formItemLayoutWithOutLabel}>

               <Button type="dashed" onClick={()=>this.addCheckbox()} className='checkboxicon' style={{color:'grey',width:'80%'}}>
                   <Icon type="plus-circle" />
               </Button>
        </FormItem>
        <Form.Item style={{textAlign:'center',marginTop:'0'}}>
          <Button type="primary" htmlType="submit" style={{marginRight:'20px'}}>保存</Button>
        </Form.Item>
        </Form>
    )
}
}

const  RegulatoryForm = Form.create()(RegulatoryCreateForm);
export default RegulatoryForm;