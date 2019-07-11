import React from 'react';
import { Form, Button, Input, message, Radio, Checkbox} from 'antd';
import moment from 'moment';
import MUtil from 'util/mm.jsx';
import $ from 'jquery';

const _mm   = new MUtil();

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
};

class secondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        isSubmit: 0,
        roleId: _mm.getStorage('userInfo').roleId,
        regionNameList  : [],
        repeat: false,
		}
  }

  componentDidMount(){
    this.loadRegionNameList();
  }

  loadRegionNameList(){
    var formData = new FormData();
    formData.append("regionId",_mm.getStorage('userInfo').regionId);

    if(this.state.roleId != 10){
      $.ajax({
        type        :  'post',
        url         :  '/notice/cityRegionName',
        data        :  formData,
        cache       :  false,//上传文件无需缓存
        processData :  false,//用于对data参数进行序列化处理 这里必须false
        contentType :  false, //必须
        success     : res => {
          if(res.result == 1){
            this.setState({
              regionNameList : res.list,
            });
            console.log(this.state.regionNameList); 
          }
          else{
            message.error("error!");
            this.setState({
              regionNameList : [],
            });
          }
         
        },
        error       : err => {
          message.error("error!");
        }
      });
    }
    if(this.state.roleId == 10){
      $.ajax({
        type        :  'post',
        url         :  '/notice/containCity',
        data        :  formData,
        cache       :  false,//上传文件无需缓存
        processData :  false,//用于对data参数进行序列化处理 这里必须false
        contentType :  false, //必须
        success     : res => {
          if(res.result == 1){
            this.setState({
              regionNameList : res.list,
            });
            console.log(this.state.regionNameList); 
          }
          else{
            message.error("error!");
            this.setState({
              regionNameList : [],
            });
          }
         
        },
        error       : err => {
          message.error("error!");
        }
      });
    }
    
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let secondInfo = this.props.form.getFieldsValue();
        console.log(secondInfo);
        this.props.setSecondData(secondInfo);
        this.setState({
            isSubmit: 1,
        },() => {
          this.nextHandleClick();
        });
      }
    });
  }

  nextHandleClick() {
    // let secondInfo = this.props.form.getFieldsValue();
    // this.props.setSecondData(secondInfo);
    if(this.state.isSubmit == 0){
       message.info("请保存通知内容！")
    }
    if(this.state.isSubmit == 1){
        if(!this.state.repeat){
          this.props.onSubmit();
          this.setState({
            repeat:true,
          });
        }
        if(this.state.repeat){
          message.info("请勿重复提交！");
        }
        
        // this.props.next();
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const options = [];
    this.state.regionNameList.map((item,index) => {
        options.push({
            label:item.regionName,
            value:item.regionId
        })
    })
    console.log(options);

    return(
        <Form onSubmit={(e) => this.handleSubmit(e)}>
            {
                this.state.roleId == 9 ? '' : 
                <FormItem {...formItemLayout} label="通知区域：">
                {getFieldDecorator('region', {
                    rules: [{
                    required: true,
                    message: '请选择通知对象！',
                    }],
                })(
                    <CheckboxGroup options={options}/>
                )}
                </FormItem>
            }
  
            <FormItem {...formItemLayout} label="用户等级：">
            {getFieldDecorator('level', {
                initialValue: '40',
                rules: [{
                required: true,
                message: '请选择用户等级！',
                }],
            })(
                <RadioGroup>
                    {
                        this.state.roleId == 9 ? '' : <Radio value="20">仅市级路长办可见</Radio>
                    }
                    {
                        this.state.roleId == 9 ? '' : <Radio value="30">县级路长办及以上可见</Radio>
                    }
                    <Radio value="40">大队及以上可见</Radio>
                    <Radio value="50">全部可见</Radio>
                </RadioGroup>
            )}
            </FormItem>
            
            <FormItem wrapperCol={{ span: 12, offset: 17 }}>
                <Button type="primary" htmlType="submit">发布</Button>
            </FormItem>

        </Form>     
    );
  }
}

const AddSecondForm = Form.create()(secondForm);

export default AddSecondForm;