import React from 'react';
import { Link }     from 'react-router-dom';
import { Card, Col, Row, Button, Carousel, Modal, Icon, Collapse, notification,message,Statistic} from 'antd';
import moment from 'moment';

import ChartsEvent from './chartsevent.jsx';
import  ChartsRoad from './chartsroad.jsx';

// import ChartsEvent from './chartsevent1.jsx';
// import  ChartsRoad from './chartsroad1.jsx';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
import img1 from 'page/home/img/5.jpg';

import './index.scss';
import './index.less';

var str = window.location.href;//获取当前页面的完整路径信息
var imgBaseUrl = str.substring(0, str.indexOf('/',str.indexOf('/',str.indexOf('/')+ 1)+ 1) );

const homeImg1 = { backgroundSize:'100% 100%',backgroundRepeat:'no-repeat',backgroundImage: 'url(' + img1 + ')'}

// notification.warning()({
//   duration: null,
// });

const openNotificationWithIcon = (message, description) => {
  notification.warning({
    message: message,  
    description: description,
    duration: null,
    placement:"bottomRight",
  });
};

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list            : [],
      newList         : [],
      pageNum         : 1,
      listType        : 'list',
      
      visible         : false,
      modal_title     : '',
      modal_body      : '',
      modal_time      : '',
      modal_orgname   : '',
      modal_realname  : '',

      newVisible       : false,
      modal_newsTitle  : '',
      modal_newsBody   : '',
      modal_submitTime : '',
      modal_img_url    : '',
      userId           :_mm.getStorage('userInfo').userId,
      token            :_mm.getStorage('userInfo').token,
      time             :Date.parse(new Date()),//时间戳
      wholeData        : '',
      countryPatrol    :'',
    };
  }

  componentWillMount(){
    document.title = "首页" ;
  }
    
  //显示通知内容
  showModal(e,notice) {
    console.log(notice);
    this.setState({ 
      visible:true,
      modal_title     : notice.notice_title,
      modal_body      : notice.notice_body,
      modal_time      : notice.submit_time,
      modal_orgname   : notice.organization_name,
      modal_realname  : notice.real_name
    })
  }
  handleClick() {
    this.setState({ visible:false })
  } 

  newShowModal(e,news) {
    this.setState({ 
      newVisible:true, 
      modal_newsTitle  : news.newsTitle,
      modal_newsBody   : news.newsBody,
      modal_submitTime : news.submitTime,
      modal_img_url    : news.fountImgUrl,
    })
  }
  newHandleClick() {
    this.setState({ newVisible:false })
  }

  messageNotification(){

    var formData = new FormData();
    formData.append("userId",this.state.userId);
    formData.append("token ",this.state.token);
    
    $.ajax({
      type        :  'post',
      url         :  '/eventmanage/countAddUpdateEvent',
      data        :  formData,
      cache: false,//上传文件无需缓存
      processData: false,//用于对data参数进行序列化处理 这里必须false
      contentType: false, //必须
      success     : res => {
        console.log(res);
        let message=null;
        if(res.result==1){

          if(res.eventResult.countEvent!=0||res.maintenanceResult.countMaintenance!=0){
            if(res.eventResult.countEvent!=0&&res.maintenanceResult.countMaintenance==0){
              message=(
                <div>
                道路管理新增待办事件：<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'20px',marginRight:'5px'}}>{res.eventResult.countEvent}</span>件
                </div>
                );
              openNotificationWithIcon('事件提醒',message);
            }
            else if(res.maintenanceResult.countMaintenance!=0&&res.eventResult.countEvent==0){
              message=(
                <div>
                道路养护新增待办事件：<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'20px',marginRight:'5px'}}>{res.maintenanceResult.countMaintenance}</span>件
                </div>
                );
               openNotificationWithIcon('事件提醒',message);
            }
            else{
                 message=(
                  <div>
                  道路管理新增待办事件：<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'20px',marginRight:'5px'}}>{res.eventResult.countEvent}</span>件
                  <br/>
                  道路养护新增待办事件：<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'20px',marginRight:'5px'}}>{res.maintenanceResult.countMaintenance}</span>件
                  </div>
                  );
              openNotificationWithIcon('事件提醒',message);
            }
          }
              
        }
        // else if(res.result==-1){
        //     message.error(res.message);
        //     window.location.href = '/';
        //   }
        // else{
        //     message.error(res.message);
        // }
        
      },
      // error       : err => {
      //    
      //     this.setState({
      //         list : []
      //     });
      // }
    });
    
  }

  componentDidMount(){
      this.loadNoticeAndNewsList();
      this.messageNotification();
      // this.loadWhole();
    }
    // 加载列表
    loadNoticeAndNewsList(){
        //请求通知列表
        var noticeFormData = new FormData();
            noticeFormData.append("userId",_mm.getStorage('userInfo').userId);
            noticeFormData.append("token",_mm.getStorage('userInfo').token);
            noticeFormData.append("roleId",_mm.getStorage('userInfo').roleId);
            noticeFormData.append("regionId",_mm.getStorage('userInfo').regionId);
            noticeFormData.append("page",'1');
            noticeFormData.append("size",'2');
        
        $.ajax({
          type        :  'post',
          url         :  '/notice/getNoticeListForRole',
          data        :  noticeFormData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            console.log('首页通知:',res);
            if(res.result === 1){
              this.setState({
                list:res.noticeList
              });
            }else if(res.result === -1){
              message.error(res.message);
              window.location.href = '/';
            }
            
          },
          error       : err => {
            message.error('error!');
          }
        });

        //请求新闻列表
        var newsFormData = new FormData();
            newsFormData.append("userId",_mm.getStorage('userInfo').userId);
            newsFormData.append("token",_mm.getStorage('userInfo').token);

        $.ajax({
          type        :  'post',
          url         :  '/news/getPassNews',
          data        :  newsFormData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            console.log('首页新闻:',res);
            if(res.result === 1){
              this.setState({
                newList:res.list
              });
            }else if(res.result === -1){
              message.error(res.message);
              window.location.href = '/';
            }
            
          },
          error       : err => {
            message.error('error!');
          }
        });
            
    }

     //整体概括
     loadWhole() {
      var formData = new FormData();
        formData.append("time",this.state.time);
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);

        $.ajax({
          type        :  'post',
          url         :  '/eventStatistic/getSummarizeInfo',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            console.log('whole:',res);
            this.setState({
              wholeData:res
            });
            console.log(this.state.wholeData);
          },
          error       : err => {
            message.error("失败!");
          }
        })
           
    }

    countryPatrol(e){
      this.setState({
        countryPatrol:e
      })
    }
    
    
    render(){
   
      return (
        <div style={{height:'100%',margin: '-20px'}}>   
            <Row gutter={16}  style={{height:'40%',marginLeft:'10px',marginRight:'20px',marginBottom:'5px',marginTop:'5px'}}>
           
           <Col span={8} style={{height:'100%'}}>
              <Card  bordered className='card_home'>
                <div  className='card_title_background'  >
                  <div className='card_news' style={{float:'left'}}> 
                    <Icon type="file-text" theme="outlined" style={{fontSize: '20px'}}/> 
                    <span style={{fontSize:'15px',marginLeft:'7px'}}>实时新闻</span>
                  </div>
                  <div className="card_news_more" style={{float:'right'}}> 
                      <Link to="/news" className="more_link">更多</Link>
                  </div>
                  </div>
                <div style={{height:'82%'}}>
                  
                    <Carousel autoplay speed={200} dots={true}>                                   
                    {
                      this.state.newList.map((news, index) => {
                        return (
                          <div key={index}>
                            <a onClick={(e) => this.newShowModal(e,news)}>
                                {/* <img src={require("page/home/img/5.jpg")} width='100%' height='100%' alt="暂无图片"/> */}
                                <img src={imgBaseUrl + news.fountImgUrl} width='100%' height='100%' alt="暂无图片"/>
                                  <span className="words-span">
                                    <div className="words-div">
                                      {news.newsTitle}
                                    </div>
                                  </span>
                            </a>
                          </div>       
                        )
                      })
                    }         
                    </Carousel>
                    <Modal
                        title="新闻动态"
                        className="modalStyle"
                        visible={this.state.newVisible}
                        centered={true}
                        onOk={() => this.newHandleClick()}
                        onCancel={() => this.newHandleClick()}
                        okText='确定'
                        cancelText='取消'
                        >
                        <h1 style={{textAlign:'center'}}>{this.state.modal_newsTitle}</h1><br/>
                        <p style={{fontSize:'16px',textIndent:'2em'}}><div dangerouslySetInnerHTML={{__html:this.state.modal_newsBody}}/></p><br/>
                        <span style={{float:'right',fontSize:'14px'}}>发布时间：{this.state.modal_submitTime}</span><br/><br/>                          
                    </Modal>
                </div>
              </Card >
           </Col>
           <Col span={8} style={{height:'100%'}}>
              <Card  bordered className='card_home'>
                <div  className='card_title_background'  >
                  <div className='card_news' style={{float:'left'}}> 
                    <Icon type="sound" theme="outlined" style={{fontSize: '20px'}}/> 
                    <span style={{fontSize: '15px',marginLeft:'7px'}}>通知公告</span>
                  </div>
                  <div className="card_news_more" style={{float:'right'}}> 
                      <Link to="/affiche" className="more_link">更多</Link>
                  </div>
                </div>
                <div style={{height:'82%'}}>
                {
                    this.state.list.map((notice, index) => {
                      return (
                        <div key={index} style={{height:'6.6em',borderRadius:'2px',marginTop:'1px'}}>
                          <a onClick={(e) => this.showModal(e,notice)}>
                          <ul style={{height:'30px',backgroundColor:'#98b8e1'}}>
                            <li style={{listStyle: 'none',color:'#fff',fontSize:'16px',fontWeight:'normal',marginLeft:'-20px'}}><div className="home-title">{notice.notice_title}</div>
                            </li>

                            <li style={{listStyle: 'none',fontSize:'14px',color:'black',marginLeft:'-15px',marginTop:'10px'}}>{moment(notice.submit_time).format("YYYY-MM-DD HH:mm:ss")}</li>
                            <li style={{listStyle: 'none',marginLeft:'-15px',color:'black',fontSize:15}}>
                              {/* <div className="home-body"><p><div dangerouslySetInnerHTML={{__html:notice.notice_body}}/></p></div> */}
                              <div className="home-body" dangerouslySetInnerHTML={{__html:notice.notice_body}}></div>
                            </li>
                          </ul> 
                          </a>
                        </div>
                          
                      );
                    })
                  }
                  <Modal
                      title="通知公告"
                      className="modalStyle"
                      visible={this.state.visible}
                      centered={true}
                      onOk={() => this.handleClick()}
                      onCancel={() => this.handleClick()}
                      okText='确定'
                      cancelText='取消'
                      >
                      <h1 style={{textAlign:'center'}}>{this.state.modal_title}</h1><br/>
                      <p style={{fontSize:'16px',textIndent:'2em'}}><div dangerouslySetInnerHTML={{__html:this.state.modal_body}}/></p><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布时间：{moment(this.state.modal_time).format("YYYY-MM-DD HH:mm:ss")}</span><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布单位：{this.state.modal_orgname} </span><br/>
                      <span style={{float:'right',fontSize:'14px'}}>发布人：{this.state.modal_realname} </span><br/><br/>
                  </Modal>
                </div>
              </Card >
           </Col>
           <Col span={8} style={{height:'100%'}}>
              <Card  bordered className='card_home'>
                <div  className='card_title_background'  >
                  <div className='card_news'>
                    <Icon type="line-chart" theme="outlined"  style={{fontSize: '20px'}}/>
                    <span style={{fontSize:'15px',marginLeft:'7px'}}>整体概况</span>
                  </div>
                  </div>
                <div style={{height:'82%'}}>
                  <div style={{padding:'40px', verticalAlign:'middle'}}>
                  本月上报事件共<span style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'30px'}}>48</span>件，公众参与<span  style={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'30px'}}>37</span>件，重点问题类型为道路侵占和公示牌问题。
                  </div>
                  {/* <div style={{padding:'20px', verticalAlign:'middle',textAlign:'center'}}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic title="上报事件" value={48}  valueStyle={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'30px' }}/>
                      </Col>
                      <Col span={12}>
                        <Statistic title="公众参与" value={37} valueStyle={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'30px' }} />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic title="本县巡路总次数" value={this.state.countryPatrol}  valueStyle={{color:'red',  fontFamily:'Sans-serif' ,fontSize:'30px' }} prefix={<Icon type="like" />}/>
                      </Col>
                    </Row>
                         
                  </div> */}
                </div>
              </Card >
           </Col>
          </Row>
          <Row gutter={16}  style={{height:'60%',marginLeft:'10px',marginRight:'20px'}}>
            <Col span={12} style={{height:'100%'}}>
            <Card  bordered  className='card_home' >
              <div  className='card_title_background' >
              <div className='card_title_text'> 事件类型分布情况</div>
              </div>
              <div style={{height:'88%'}}>
              <ChartsEvent />
              </div>
            </Card> 
            </Col>
            <Col span={12} style={{height:'100%'}}>
            <Card  bordered  className='card_home'>
              <div  className='card_title_background' >
              <div className='card_title_text'> 巡路完成情况</div>
              </div>
              <div style={{height:'88%'}}>
              < ChartsRoad />
              </div>
            </Card> 
            </Col>
          </Row>

           {/* <Row gutter={32}  style={{marginLeft:'10px',marginRight:'20px'}}>
            <Col span={12} >
            <Card  bordered  className='card_home' >
              <div  className='card_title_background' >
              <div className='card_title_text_home'> 事件类型分布情况</div>
              </div>
                  <div style={{marginTop:10,marginBottom:6}}>
                    <ChartsEvent />
                  </div>
            </Card> 
            </Col>
            <Col span={12} style={{height:'100%'}}>
            <Card  bordered  className='card_home'>
              <div  className='card_title_background' >
              <div className='card_title_text_home'> 巡路完成情况</div>
              </div>
              <div style={{height:'88%'}}>
              < ChartsRoad countryPatrol={(e)=>this.countryPatrol(e)}/>
              </div>
            </Card> 
            </Col>
          </Row> */}
        </div>
       
      );
    }
  }
  
  
  export default Home;