//已发布列表
import React        from 'react';
import { Link }     from 'react-router-dom';
import { Button, Icon, Modal, Popconfirm, message, notification, Table, Row } from 'antd';
import moment       from 'moment';

import Product      from 'service/product-service.jsx'
import Select from 'rc-select';
import $ from 'jquery';
import 'rc-select/assets/index.css';

import './index.scss';
import './index.less';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const _product      = new Product();
//全局配置message
message.config({
  top: 50,
  duration: 3,
  //maxCount: 3,
});

class MySubmitList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            total           : '',
            listType        : 'list',
            visible         : false,
            modal_title     : '',
            modal_body      : '',
            modal_time      : '',
            modal_orgname   : '',
            modal_realname  : '',
            modal_id        : '',

            roleId          : _mm.getStorage('userInfo').roleId,
            regionNameList  : []
        };
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

        $.ajax({
          type        :  'post',
          url         :  '/notice/mySubmit',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            console.log('mySubmitList=',res);
            if(res.result == 1){
              this.setState({
                list:res.mysubmitList,
                total:res.mysubmitList.length,
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
      console.log('hahahah');

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
    
    //领导提醒
    Remind(record) {
      var formData = new FormData();
      formData.append("userId",_mm.getStorage('userInfo').userId);
      formData.append("token",_mm.getStorage('userInfo').token);
      formData.append("noticeId",record.notice_id);

        $.ajax({
          type        :  'post',
          url         :  '/LeaderRemind',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
           
            console.log('remind-res=',res);
            if(res.result == 1){
              message.success('已提醒！');
            }
            else if(res.result == -1){
              message.error(res.message);
              window.location.href = '/';
            }
            else{
              message.error('error！');
            }
            
          },
          error       : err => {
              message.error('error！');
          }
        });
    }

    //删除通告
    DeleteNotice(record){
      var formData = new FormData();
      formData.append("userId",_mm.getStorage('userInfo').userId);
      formData.append("token",_mm.getStorage('userInfo').token);
      formData.append("id",record.notice_id);
      
        $.ajax({
          type        :  'post',
          url         :  '/notice/delete',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            console.log('delete-res',res);
            if(res.result == 1){
              //message.success('已删除此通告！');
              this.loadNoticeList();
            }
            else if(res.result == -1){
              message.error(res.message);
              window.location.href = '/';
            }
            else{
              message.error('error！');
            }
            
          },
          error       : err => {
              message.error('error！');
          }
        });
    }

    close() {
       console.log('Notification was closed.');
    };

    //阅读情况
    readSituation(record) {
      console.log(record.notice_id);

      var formData = new FormData();
      formData.append("userId",_mm.getStorage('userInfo').userId);
      formData.append("token",_mm.getStorage('userInfo').token);
      formData.append("noticeId",record.notice_id);

      $.ajax({
        type        :  'post',
        url         :  '/readSituation',
        data        :  formData,
        cache       :  false,//上传文件无需缓存
        processData :  false,//用于对data参数进行序列化处理 这里必须false
        contentType :  false, //必须
        success     : res => {
          if(res.result == 1){
            console.log('readSituation-res',res);

            var arr1=[]; //allRecipient
            var arr2=[]; //readMan
            var arr3=[]; //unReadMan

            $.each(res.allRecipient, function(index, item) {
              if(item.user_id != null) {
                arr1.push(item.user_id);  
              }
            });
            $.each(res.readMan, function(index, item) {
              if(item.user_id != null) {
                arr2.push(item.user_id);  
              }
            });
            $.each(res.unReadMan, function(index, item) {
              if(item.user_id != null) {
                arr3.push(item.user_id);  
              }
            });
            var allRecipient =arr1.length;  //全部人数
            var readMan      =arr2.length;  //已读人数
            var unReadMan    =arr3.length;  //未读人数

            // message.info('ALL:'+allRecipient,10);
            // message.info('readMan:'+readMan,10);
            // message.info('unReadMan:'+unReadMan,10);

            //Notification通知提醒框
            const key = `open${Date.now()}`;
            const btn = (
              <Button type="primary" size="small" onClick={() => notification.close(key)}>
                close
              </Button>
            );
            notification.open({
              // message: '阅读情况',
              // description: '已读人数：'+readMan+'\n ,未读人数：'+unReadMan,

              message: (<div style={{fontSize:20,fontWeight:'bold'}}>阅读情况</div>),
              description: (<div style={{padding:'10px', verticalAlign:'middle',fontSize:16}}>已读人数：<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:25}}>{readMan}</span>，未读人数：<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:25}}>{unReadMan}</span>。</div>),

              btn: (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => notification.close(key)}
                    >
                    关闭
                </Button>
              ),
              key,
              onClose: this.close(),
              duration: 3,
            });
          }
          else if(res.result == -1){
            message.error(res.message);
            window.location.href = '/';
          }
          else if(res.result == -2){
            message.error(res.message);
          }
          
        },
        error       : err => {
          message.error('222error！');
        }
      });
    }

    //点击通知标题，显示通知内容
    onClickTitle(e,record) {
        const i = `${record.key}`;
        console.log('submitItem:'+`${this.state.list[i].noticeId}`,this.state.list[i]);
        
        this.setState({ 
            visible: true,
            modal_title     : this.state.list[i].noticeTitle,
            modal_body      : this.state.list[i].noticeBody,
            modal_time      : this.state.list[i].submitTime,
            // modal_id        : this.state.list[i].noticeId,
            // modal_orgname   : this.state.list[i].organization_name,
            // modal_realname  : this.state.list[i].real_name
        });
    }
    handleOk() {
      this.setState({
          visible: false
      });
      // const {modal_id} = this.state;
      
    }
    handleCancel() {
      this.setState({
          visible: false
      });
    }

    // var str    = "My blog name is Benjamin-专注前端开发和用户体验",
    // substr = "Benjamin";
    //true
    //console.log(isContains(str, substr));
    //js判断一个字符串是否包含一个子串的方法
    isContains(str, substr) {
      return new RegExp(substr).test(str);
    }
   
    
    render(){     
        const {roleId,  regionNameList} = this.state;
        
        const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          className: 'table-td',
        }, {
          title: '通知标题',
          dataIndex: 'notice_title',
          align: 'center',
          className: 'table-td',
          render: (text,record) => <a href="javascript:;" onClick={(e) => this.onClickTitle(e,record)}>{text}</a>,
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
            <div>
              <Button size="small" onClick={() => this.readSituation(record)}>查阅</Button>
              <Button size="small" style={{marginLeft:'5px'}} onClick={() => this.Remind(record)}>提醒</Button>
              <Popconfirm title="确认删除此通告?" onConfirm={() => this.DeleteNotice(record)} okText="Yes" cancelText="No">
                <Button size="small" style={{marginLeft:'5px'}}>删除</Button>
              </Popconfirm>
            </div>) //record为列表中某一行的值
          }
        ];
        
        const data = [];
          
        this.state.list.map((notice, index) => {
            data.push({
              key: index,
              num: index+1,                      
              notice_title:notice.noticeTitle,
              directory_id:notice.directoryId,
              notice_level:notice.noticeLevel,
              region_id:notice.regionId,
              submit_time:moment(notice.submitTime).format("YYYY-MM-DD HH:mm:ss"),
              notice_id:notice.noticeId,
            });        
        })

        return (
            <div>
              <Row>
                <Link to="/affiche/adduser" style={{float:'right'}}><Button type="primary" style={{marginLeft:'5px'}}><Icon type="plus" theme="outlined" />新增</Button></Link>
                <Link to="/affiche/list" style={{float:'right'}}><Button type="primary" style={{marginLeft:'5px'}}><Icon type="double-left" theme="outlined" />返回</Button></Link> 
              </Row>
              <Table
                  bordered
                  className="table-color"
                  rowClassName={(record,index) => 
                      index % 2 === 0 ? "grayRow" : "whiteRow" 
                  } 
                  columns={columns} 
                  dataSource={data} 
                  style={{marginBottom:100,marginTop:40}}
                  pagination={{
                      pageSize: 5,
                      // showQuickJumper:true,
                      // hideOnSinglePage:false
                  }}
                  />    
              <Modal
                  title="通知公告"
                  className="modalStyle"
                  visible={this.state.visible}
                  onOk={() => this.handleOk()}
                  onCancel={() => this.handleCancel()}
                  okText='确定'
                  cancelText='取消'
                  >
                  <h1 style={{textAlign:'center'}}>{this.state.modal_title}</h1><br/>
                  <p style={{fontSize:'16px',textIndent:'2em'}}><div dangerouslySetInnerHTML={{__html:this.state.modal_body}}/></p><br/>
                  <span style={{float:'right',fontSize:'14px'}}>发布时间：{moment(this.state.modal_time).format("YYYY-MM-DD HH:mm:ss")}</span><br/>
                  {/* <span style={{float:'right',fontSize:'14px'}}>发布单位：{this.state.modal_orgname} </span><br/>
                  <span style={{float:'right',fontSize:'14px'}}>发布人：{this.state.modal_realname}</span><br/><br/> */}
 
              </Modal>
            </div>
        );
    }
}

export default MySubmitList;
