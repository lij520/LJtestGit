/* 新闻发布 */

import React from 'react';
import { Table, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Button, message, Upload } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';
import './index.less';
import $ from 'jquery';

import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class FormList extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fileData:[],
      }
    }

    handleSubmit(e) {
      e.preventDefault();

      let news = this.props.form.getFieldsValue(); 
      console.log(news);
      const { fileData } = this.state;

      var formData = new FormData();
      fileData.forEach((file) => {
          formData.append('files', file);
      });
      // Object.keys(news).map((item)=>{
      //   formData.append(item,news.item);
      // })

      const form = this.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);   
        formData.append("status","2"); 
        formData.append("newsTitle",news.newsTitle); 
        formData.append("summary",news.summary); 
        formData.append("newsBody",news.newsBody); 
        formData.append("outLink",news.outLink);  
        
        $.ajax({
          type        :  'post',
          url         :  '/news/submitAndUpdata', 
          data        :  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => { 
              console.log(res);
              if(res.result == 1){
                message.success("发布成功！");
                this.setState({
                  fileData:[],
                });
                this.props.form.setFields({"newsTitle":""})
                this.props.form.setFields({"summary":""})
                this.props.form.setFields({"newsBody":""})
                this.props.form.setFields({"outLink":""})
                // window.location.href = '/news#/news/list';
              }
          },
          error       : err => {
            message.error('error!');  
          }
        })  
      })
    }
    
    // 拦截文件上传
    beforeUpload(file){    
      this.setState(
        ({fileData})=>(
          { fileData:[...fileData,file],}
          )
        ) 
        return false;
    }
    // 文件列表的删除
    onRemove(file) {
      this.setState(({ fileData }) => {
        const index = fileData.indexOf(file);
        var newFileList = fileData.slice();
        newFileList.splice(index, 1);
        return {
          fileData: newFileList,
        };
      });
    }

    getFileData(){
        return this.state.fileData;
    } 

    render(){
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 12 },
      };
      const tailFormItemLayout = {
          wrapperCol: { span: 16, offset: 8 },
      };

      return (
        <Form onSubmit={(e) => this.handleSubmit(e)} style={{marginBottom:100}}>
          
          <FormItem {...formItemLayout} label="新闻标题">
            {getFieldDecorator('newsTitle', {
              initialValue: '',
              rules: [{
                required: true, message: 'Please input newsTitle!',
              }],
            })(
              <Input/>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="概括">
            {getFieldDecorator('summary', {
              initialValue: '',
              rules: [{
                required: true, message: 'Please input summary!',
              }],
            })(
              <TextArea autosize={{minRows: 1}} />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="新闻正文">
            {getFieldDecorator('newsBody', {
              initialValue: '',
              rules: [{
                required: true, message: 'Please input newsBody!',
              }],
            })(
              <TextArea autosize={{minRows: 5}} />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="链接">
            {getFieldDecorator('outLink', {
              initialValue: '',
              // rules: [{
              //   required: true, message: 'Please input outLink!',
              // }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="选择图片">
              <Upload name="file" action="/news/submitAndUpdata" listType="picture" multiple={false}
                  showUploadList={true}  beforeUpload={(e)=>this.beforeUpload(e)}
                  onRemove={(e) => this.onRemove(e)}>
                    <Button><Icon type="upload"/> Click to upload</Button>
              </Upload>
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">发布</Button>
          </FormItem>
      
        </Form>
 
      );
    }
  }
  const NewsForm = Form.create()(FormList);

  class AddNews extends React.Component{
      constructor(props){
        super(props);
      }

      componentDidMount(){
        
      }
      // componentWillMount(){
      //   document.title = "新闻发布" ;
      // }
      
      render(){
        return (
          <div>
            <Row>
              <Col span={6}><h2>新闻发布</h2></Col>
              <Col span={2} style={{float:'right'}}><Link to="/news/list"><Button type="primary">返回</Button></Link></Col>
            </Row>
            <NewsForm/>
          </div>
        );
      }
    }

  export default AddNews;