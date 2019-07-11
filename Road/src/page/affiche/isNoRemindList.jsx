//通知列表:已读、未读、提醒
import React from 'react';
import { Link }     from 'react-router-dom';
import { Card, Col, Tabs, Button, Modal, Icon, message, Table, Row } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import './index.less';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();
const TabPane = Tabs.TabPane;

class IsNoRemindList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roleId: _mm.getStorage('userInfo').roleId,
            check_val: _mm.getStorage('userInfo').regionId.substring(0,6),
            NoReadList      : [],
            IsReadList      : [],
            RemindList      : [],

            visible1         : false,
            modal1_title     : '',
            modal1_body      : '',
            modal1_time      : '',
            modal1_orgname   : '',
            modal1_realname  : '',
            modal1_id        : '',

            visible2         : false,
            modal2_title     : '',
            modal2_body      : '',
            modal2_time      : '',
            modal2_orgname   : '',
            modal2_realname  : '',

            visible3         : false,
            modal3_title     : '',
            modal3_body      : '',
            modal3time       : '',
            modal3_orgname   : '',
            modal3_realname  : '',
            modal3_id        : '',

            regionNameList  : []
        };
    }

    //显示未读通知内容 Modal1
    onClickNoReadTitle(e,record) {
      const i = `${record.key}`;
      console.log('NoReadItem:'+`${this.state.NoReadList[i].notice_id}`,this.state.NoReadList[i]);

      this.setState({ 
        visible1: true,
        modal1_title     : this.state.NoReadList[i].notice_title,
        modal1_body      : this.state.NoReadList[i].notice_body,
        modal1_time      : this.state.NoReadList[i].submit_time,
        modal1_orgname   : this.state.NoReadList[i].organization_name,
        modal1_realname  : this.state.NoReadList[i].real_name,
        modal1_id        : this.state.NoReadList[i].notice_id,
      });
    }
    handleOk1() {
      this.setState({
          visible1: false
      });
      const {modal1_id} = this.state;
      this.changeReadStatus(modal1_id);
    }
    handleCancel1() {
      this.setState({
          visible1: false
      });
    } 

    //显示已读通知内容 Modal2
    onClickIsReadTitle(e,record) {
      const i = `${record.key}`;
      console.log('IsReadItem:'+`${this.state.IsReadList[i].notice_id}`,this.state.IsReadList[i]);

      this.setState({ 
        visible2: true,
        modal2_title     : this.state.IsReadList[i].notice_title,
        modal2_body      : this.state.IsReadList[i].notice_body,
        modal2_time      : this.state.IsReadList[i].submit_time,
        modal2_orgname   : this.state.IsReadList[i].organization_name,
        modal2_realname  : this.state.IsReadList[i].real_name 
      });
    }
    handleClick2() {
      this.setState({
          visible2: false
      });
    } 

    //显示提醒通知内容 Modal3
    onClickRemindTitle(e,record) {
      const i = `${record.key}`;
      console.log('RemindItem:'+`${this.state.RemindList[i].notice_id}`,this.state.RemindList[i]);

      this.setState({ 
        visible3: true,
        modal3_title     : this.state.RemindList[i].notice_title,
        modal3_body      : this.state.RemindList[i].notice_body,
        modal3_time      : this.state.RemindList[i].submit_time,
        modal3_orgname   : this.state.RemindList[i].organization_name,
        modal3_realname  : this.state.RemindList[i].real_name,
        modal3_id        : this.state.NoReadList[i].notice_id,
      });
    }
    handleOk3() {
      this.setState({
          visible3: false
      });
      const {modal3_id} = this.state;
      this.changeReadStatus(modal3_id);
    }
    handleCancel3() {
      this.setState({
          visible3: false
      });
    } 

    //阅读状态isread
    readChange(record) {
      const notice_id = record.notice_id;
      this.changeReadStatus(notice_id);
      
    }
    changeReadStatus(notice_id) {
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("noticeId",notice_id);

        $.ajax({
          type        :  'post',
          url         :  '/changeRead',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            
            console.log(res);
            if(res.result == 1){
              message.success('已阅读此通知！');
              this.loadNoticeList();
            }
            if(res.result == -1){
              message.error(res.message);
              window.location.href = '/';
            }
          },
          error       : err => {
              message.error('error!');
          }
        });
    }

    componentDidMount(){
      this.loadNoticeList();
      this.loadRegionNameList();
    }
    // 加载通知列表
    loadNoticeList(){
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("page",'1');
        formData.append("size",'10');

        $.ajax({
          type        :  'post',
          url         :  '/notice/selectThreeList',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            
            console.log(res);
            if(res.result == 1){
              this.setState({
                NoReadList:res.NoReadList,
                IsReadList:res.IsReadList,
                RemindList:res.RemindList
              });
            }
            if(res.result == -1){
              message.error(res.message);
              window.location.href = '/';
            }
          },
          error       : err => {
            message.error('error!');
          }
        });
        
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

    render(){
      const {roleId,  regionNameList} = this.state;

      //未读表头  
      const columns1 = [{  //columns每列的类型一样，dataIndex对应data中的属性
            title: '序号',
            dataIndex: 'num',
            align: 'center',
            className: 'table-td',
          }, {
            title: '通知标题',
            dataIndex: 'notice_title',
            align: 'center',
            className: 'table-td',
            render: (text,record) => <a href="javascript:;" onClick={(e) => this.onClickNoReadTitle(e,record)}>{text}</a>,
          }, 
          {                    
            title: '通知类型',
            dataIndex: 'directory_id',
            align: 'center',
            className: 'table-td',
            render(directory_id){
                let config  = {
                  '5':'通知',
                  '6':'公告',
                }
                return config[directory_id];
            }
          },
          {                    
            title: '通知人员',
            dataIndex: 'notice_level',
            align: 'center',
            className: 'table-td',
            render(notice_level){
                let config  = {
                  '20':'仅市级路长办',
                  '30':'县级路长办及以上',
                  '40':'大队及以上',
                  '50':'全部人员',
                }
                return config[notice_level];
            }
          },
          {                    
            title: '通知区域',
            dataIndex: 'region_id',
            align: 'center',
            className: 'table-td',
            render(region_id){
                let config ='';
                if(roleId != 10){
                  for(var i = 0;i < regionNameList.length;i++){
                    if(region_id.indexOf(regionNameList[i].regionId) != -1){
                      config = regionNameList[i].regionName;
                      return config;
                    }
                  }
                }
                if(roleId === 10){
                  for(var i = 0;i <regionNameList.length;i++){
                    if(region_id.indexOf(regionNameList[i].regionId) != -1){
                      config += regionNameList[i].regionName + "、";
                    }
                  }
                  config = config.substring(0,config.length -1 );  //去掉最后一个“、”
                  return config;
                }
            }
          },{                    
            title: '通知时间',
            dataIndex: 'submit_time',
            align: 'center',
            className: 'table-td', 
          },{                    
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            className: 'table-td',
            render: (text,record) => (
              <div className='isread-a'>
                <a href="javascript:;" onClick={() => this.readChange(record)}>已读</a>
              </div>) //record为列表中某一行的值
          }
        ];
        //已读表头
        const columns2 = [{  //columns每列的类型一样，dataIndex对应data中的属性
            title: '序号',
            dataIndex: 'num',
            align: 'center',
            className: 'table-td',
          }, {
            title: '通知标题',
            dataIndex: 'notice_title',
            align: 'center',
            className: 'table-td',
            render: (text,record) => <a href="javascript:;" onClick={(e) => this.onClickIsReadTitle(e,record)}>{text}</a>,
          }, 
          {                    
            title: '通知类型',
            dataIndex: 'directory_id',
            align: 'center',
            className: 'table-td',
            render(directory_id){
                let config  = {
                  '5':'通知',
                  '6':'公告',
                }
                return config[directory_id];
            }
          },
          {                    
            title: '通知人员',
            dataIndex: 'notice_level',
            align: 'center',
            className: 'table-td',
            render(notice_level){
                let config  = {
                  '20':'仅市级路长办',
                  '30':'县级路长办及以上',
                  '40':'大队及以上',
                  '50':'全部人员',
                }
                return config[notice_level];
            }
          },
          {                    
            title: '通知区域',
            dataIndex: 'region_id',
            align: 'center',
            className: 'table-td',
            render(region_id){
                let config ='';
                if(roleId != 10){
                  for(var i = 0;i < regionNameList.length;i++){
                    if(region_id.indexOf(regionNameList[i].regionId) != -1){
                      config = regionNameList[i].regionName;
                      return config;
                    }
                  }
                }
                if(roleId === 10){
                  for(var i = 0;i <regionNameList.length;i++){
                    if(region_id.indexOf(regionNameList[i].regionId) != -1){
                      config += regionNameList[i].regionName + "、";
                    }
                  }
                  config = config.substring(0,config.length -1 );  //去掉最后一个“、”
                  return config;
                }
            }
          },{                    
            title: '通知时间',
            dataIndex: 'submit_time',
            align: 'center',
            className: 'table-td',
          }
        ];
        //提醒表头
        const columns3 = [{  //columns每列的类型一样，dataIndex对应data中的属性
            title: '序号',
            dataIndex: 'num',
            align: 'center',
            className: 'table-td',
          }, {
            title: '通知标题',
            dataIndex: 'notice_title',
            align: 'center',
            className: 'table-td',
            render: (text,record) => <a href="javascript:;" onClick={(e) => this.onClickRemindTitle(e,record)}>{text}</a>,
          }, 
          {                    
            title: '通知类型',
            dataIndex: 'directory_id',
            align: 'center',
            className: 'table-td',
            render(directory_id){
                let config  = {
                  '5':'通知',
                  '6':'公告',
                }
                return config[directory_id];
            }
          },
          {                    
            title: '通知人员',
            dataIndex: 'notice_level',
            align: 'center',
            className: 'table-td',
            render(notice_level){
                let config  = {
                  '20':'仅市级路长办',
                  '30':'县级路长办及以上',
                  '40':'大队及以上',
                  '50':'全部人员',
                }
                return config[notice_level];
            }
          },
          {                    
            title: '通知区域',
            dataIndex: 'region_id',
            align: 'center',
            className: 'table-td',
            render(region_id){
                let config ='';
                if(roleId != 10){
                  for(var i = 0;i < regionNameList.length;i++){
                    if(region_id.indexOf(regionNameList[i].regionId) != -1){
                      config = regionNameList[i].regionName;
                      return config;
                    }
                  }
                }
                if(roleId === 10){
                  for(var i = 0;i <regionNameList.length;i++){
                    if(region_id.indexOf(regionNameList[i].regionId) != -1){
                      config += regionNameList[i].regionName + "、";
                    }
                  }
                  config = config.substring(0,config.length -1 );  //去掉最后一个“、”
                  return config;
                }
            }
          },{                    
            title: '通知时间',
            dataIndex: 'submit_time',
            align: 'center',
            className: 'table-td',
          },{                    
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            className: 'table-td',
            render: (text,record) => (
              <div className='isread-a'>
                <a href="javascript:;" onClick={() => this.readChange(record)}>已读</a>
              </div>) //record为列表中某一行的值
          }
        ];
      
      
        const NoReadData = [];   
        this.state.NoReadList.map((notice, index) => {
            NoReadData.push({
              key: index,
              num: index+1,                      
              notice_title:notice.notice_title,
              directory_id:notice.directory_id,
              notice_level:notice.notice_level,
              region_id:notice.region_id,
              submit_time:moment(notice.submit_time).format("YYYY-MM-DD HH:mm:ss"),
              notice_id:notice.notice_id,
            });        
        });
        const IsReadData = [];   
        this.state.IsReadList.map((notice, index) => {
            IsReadData.push({
              key: index,
              num: index+1,                      
              notice_title:notice.notice_title,
              directory_id:notice.directory_id,
              notice_level:notice.notice_level,
              region_id:notice.region_id,
              submit_time:moment(notice.submit_time).format("YYYY-MM-DD HH:mm:ss"),
            });        
        });
        const RemindData = [];   
        this.state.RemindList.map((notice, index) => {
            RemindData.push({
              key: index,
              num: index+1,                      
              notice_title:notice.notice_title,
              directory_id:notice.directory_id,
              notice_level:notice.notice_level,
              region_id:notice.region_id,
              submit_time:moment(notice.submit_time).format("YYYY-MM-DD HH:mm:ss"),
              notice_id:notice.notice_id,
            });        
        })
      
      let mySubmitButton=null;
      switch(this.state.roleId){
      case 3:case 4:case 9:case 10:mySubmitButton=(
        <Link to="/affiche/submit" style={{position:"absolute",right:0}}><Button type="primary"><Icon type="check" theme="outlined" />我的发布</Button></Link>
        );break;
      } 

      return (       
        <div className="home">
        
          <Row style={{zIndex:2}}>
            {mySubmitButton}
          </Row>
          
          <div style={{zIndex:1}}>
             <Tabs className="tabsStyle" defaultActiveKey="1" tabBarGutter={0}>
              {/*1、未读通知*/}
              <TabPane tab={<span style={{fontSize:16}}>未读通知</span>} key="1">
                <Col span={24}>
                  <Table
                      bordered
                      className="table-color"
                      rowClassName={
                        (record,index) => 
                          index % 2 === 0 ? "grayRow" : "whiteRow" 
                      }
                      columns={columns1} 
                      dataSource={NoReadData} 
                      style={{marginBottom:100}}
                      pagination={{
                          pageSize: 5,
                      }}
                      />    
                  <Modal
                      title="未读通知"
                      className="modalStyle"
                      visible={this.state.visible1}
                      onOk={() => this.handleOk1()}
                      onCancel={() => this.handleCancel1()}
                      okText='已读'
                      cancelText='取消'
                      >
                      <h1 style={{textAlign:'center'}}>{this.state.modal1_title}</h1><br/>
                      <p style={{fontSize:'16px',textIndent:'2em'}}><div dangerouslySetInnerHTML={{__html:this.state.modal1_body}}/></p><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布时间：{moment(this.state.modal1_time).format("YYYY-MM-DD HH:mm:ss")}</span><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布单位：{this.state.modal1_orgname} </span><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布人：{this.state.modal1_realname}</span><br/><br/>

                  </Modal>
                </Col>
              </TabPane>

              {/*2、已读通知*/}
              <TabPane tab={<span style={{fontSize:16}}>已读通知</span>} key="2">
                <Table
                    bordered
                    className="table-color"
                    rowClassName={
                      (record,index) => 
                        index % 2 === 0 ? "grayRow" : "whiteRow" 
                    }
                    columns={columns2} 
                    dataSource={IsReadData} 
                    style={{marginBottom:100}}
                    pagination={{
                        pageSize: 5,
                    }}
                    />    
                <Modal
                    title="已读通知"
                    className="modalStyle"
                    visible={this.state.visible2}
                    onOk={() => this.handleClick2()}
                    onCancel={() => this.handleClick2()}
                    okText='确定'
                    cancelText='取消'
                    >
                    <h1 style={{textAlign:'center'}}>{this.state.modal2_title}</h1><br/>
                    <p style={{fontSize:'16px',textIndent:'2em'}}><div dangerouslySetInnerHTML={{__html:this.state.modal2_body}}/></p><br/>
                    <span style={{float:'right',fontSize:'14px'}}>发布时间：{moment(this.state.modal2_time).format("YYYY-MM-DD HH:mm:ss")}</span><br/>
                    <span style={{float:'right',fontSize:'14px'}}>发布单位：{this.state.modal2_orgname} </span><br/>
                    <span style={{float:'right',fontSize:'14px'}}>发布人：{this.state.modal2_realname}</span><br/><br/>

                </Modal>
              </TabPane>

              {/*3、提醒列表*/}
              <TabPane tab={<span style={{fontSize:16}}>领导提醒列表</span>} key="3">
                <Col span={24}>
                  <Table
                      bordered
                      className="table-color"
                      rowClassName={
                        (record,index) => 
                          index % 2 === 0 ? "grayRow" : "whiteRow" 
                      }
                      columns={columns3} 
                      dataSource={RemindData} 
                      style={{marginBottom:100}}
                      pagination={{
                          pageSize: 5,
                    }}
                    />  
                  <Modal
                      title="提醒通知"
                      className="modalStyle"
                      visible={this.state.visible3}
                      onOk={() => this.handleOk3()}
                      onCancel={() => this.handleCancel3()}
                      okText='已读'
                      cancelText='取消'
                      >
                      <h1 style={{textAlign:'center'}}>{this.state.modal3_title}</h1><br/>
                      <p style={{fontSize:'16px',textIndent:'2em'}}><div dangerouslySetInnerHTML={{__html:this.state.modal3_body}}/></p><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布时间：{moment(this.state.modal3_time).format("YYYY-MM-DD HH:mm:ss")}</span><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布单位：{this.state.modal3_orgname} </span><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布人：{this.state.modal3_realname}</span><br/><br/>

                  </Modal> 
                </Col>
              </TabPane>
            </Tabs>
          </div>
                  
        </div>     
      );
    }
  }
  
  
  export default IsNoRemindList;