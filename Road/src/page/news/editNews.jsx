/* 新闻修改 */

import React from 'react';
import { Form, Input, Icon, Row, Col, Button, message, Upload } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';
import './index.less';

import $ from 'jquery';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

const FormItem = Form.Item;
const { TextArea } = Input;

// const baseUrl = "http://192.168.0.115:13077";
const baseUrl = "";

class FormList extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fileData:[],
      }
    }

    componentDidMount(){}

    handleSubmit() {
      let news = this.props.form.getFieldsValue(); 
      console.log(news);
      const { fileData } = this.state;

      var formData = new FormData();

      //fileData 长度为0，说明没有重新上传图片。
      if(this.state.fileData.length != 0){
          fileData.forEach((file) => {
            formData.append('files', file);
        });
      }
     
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
        formData.append("newsId",this.props.oneNews.newsId); 
        formData.append("newsTitle",news.newsTitle); 
        formData.append("summary",news.summary); 
        formData.append("newsBody",news.newsBody); 
        formData.append("outlink",news.outLink);  
        
        $.ajax({
          type        :  'post',
          url         :  baseUrl + '/news/submitAndUpdata', 
          data        :  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => { 
              console.log(res);
              if(res.result == 1){
                message.success("修改成功！");
                this.setState({
                  fileData:[],
                });
                // this.props.form.setFields({"newsTitle":""})
                // this.props.form.setFields({"summary":""})
                // this.props.form.setFields({"newsBody":""})
                // this.props.form.setFields({"outLink":""})

                // window.location.href = '/news#/news/list';
                window.history.back(-1);
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
          wrapperCol: { span: 16 },
      };
      const tailFormItemLayout = {
          wrapperCol: { span: 16, offset: 8 },
      };
      console.log(this.props.oneNews);

      return (
        <Form onSubmit={() => this.handleSubmit()} style={{marginBottom:100}}>

          {/* <FormItem wrapperCol={{span: 2}}>
            <Link to="/news#/news/list"><Button type="primary">返回</Button></Link>
          </FormItem> */}
          <FormItem {...formItemLayout} label="新闻标题">
            {getFieldDecorator('newsTitle', {
              initialValue: this.props.oneNews.newsTitle,
              rules: [{
                required: true, message: 'Please input newsTitle!',
              }],
            })(
              <Input/>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="概括">
            {getFieldDecorator('summary', {
              initialValue: this.props.oneNews.summary,
              rules: [{
                required: true, message: 'Please input summary!',
              }],
            })(
              <TextArea autosize={{minRows: 1}} />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="新闻正文">
            {getFieldDecorator('newsBody', {
              initialValue: this.props.oneNews.newsBody,
              rules: [{
                required: true, message: 'Please input newsBody!',
              }],
            })(
              <TextArea autosize={{minRows: 5}} />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="链接">
            {getFieldDecorator('outLink', {
              initialValue: this.props.oneNews.outLink,
              // rules: [{
              //   required: true, message: 'Please input outLink!',
              // }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="选择图片">
              <Upload name="file" action="/news/submitAndUpdata" listType="picture" multiple={false}
                  showUploadList={true} beforeUpload={(e)=>this.beforeUpload(e)}
                  onRemove={(e) => this.onRemove(e)}>
                    <Button><Icon type="upload"/> Click to upload</Button>
              </Upload>
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">修改</Button>
          </FormItem>
      
        </Form>
 
      );
    }
}
const EditForm = Form.create()(FormList);

class EditNews extends React.Component{
    constructor(props){
      super(props);
      this.state={
        newsId:this.props.match.params.newsId,
        oneNews: {},
      }
    }

    // componentWillMount(){
    //   document.title = "新闻编辑" ;
    // }

    componentDidMount() {
      this.loadOneNews();
    }
    loadOneNews() {
      var formData = new FormData();
          formData.append("userId",_mm.getStorage('userInfo').userId);
          formData.append("token",_mm.getStorage('userInfo').token);   
          formData.append("newsId",this.state.newsId);  
                
          $.ajax({
            type        :  'post',
            url         :  baseUrl + '/news/getOneNews',
            data        :  formData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     : res => {
                console.log(res);
                if(res.result == 1){
                  this.setState({
                    oneNews: res.list[0],
                  });
                }
            },
            error       : err => {
                message.error(res.message);
            }
          });
    }

    render(){
      //console.log("newsId:",this.state.newsId);
      // console.log(this.state.oneNews);
      return (
        <div>  
          <Row>
              <Col span={4}><h2>编辑</h2></Col>
              <Col span={2} style={{float:'right'}}><Link to="/news#/news/list"><Button type="primary">返回</Button></Link></Col>
          </Row>
          <EditForm oneNews={this.state.oneNews}/>
        </div>
      );
    }
}

export default EditNews;