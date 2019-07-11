import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import './homeShow.scss'
import './homeShow.less'
import { Card, Col, Row, Button, Icon,Carousel, Modal,message} from 'antd';
import moment from 'moment';
import file_stack from './file_stack.png';

import PolicesAndRegulations from './policy/policiesRegulations.jsx';
import MorePolicies from './policy/morePolicies.jsx';
import StatisticReports from './policy/statisticReports.jsx';

import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

var str = window.location.href;//获取当前页面的完整路径信息
var imgBaseUrl = str.substring(0, str.indexOf('/',str.indexOf('/',str.indexOf('/')+ 1)+ 1) );

class RoadManageChart extends Component{
    constructor(props){
        super(props);
        this.state={
            newsList:[],
            list:[],
            newsImgUrl:'',
            newsTitle:'',

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

        }
        this.loadNoticeAndNewsList = this.loadNoticeAndNewsList.bind(this);
        this.newShowModal = this.newShowModal.bind(this);
        this.newHandleClick = this.newHandleClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
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

    loadNoticeAndNewsList(){
        //首页通知
        var noticeFormData = new FormData();
            noticeFormData.append("userId",_mm.getStorage('userInfo').userId);
            noticeFormData.append("token",_mm.getStorage('userInfo').token);
            noticeFormData.append("roleId",_mm.getStorage('userInfo').roleId);
            noticeFormData.append("regionId",_mm.getStorage('userInfo').regionId);
            noticeFormData.append("page",'1');
            noticeFormData.append("size",'5');
        
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
        var newsFormData = new FormData();
        newsFormData.append("userId",_mm.getStorage('userInfo').userId);
        newsFormData.append("token",_mm.getStorage('userInfo').token);

        //首页新闻
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
                newsList:res.list
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

    componentDidMount(){
        // let trapezoid1 = document.getElementById('naviPart1');
        // let trapezoid2 = document.getElementById('naviPart2');
        // let h1 = document.getElementById('topNavi').offsetHeight;
        
        
        // trapezoid1.style.borderTop = h1+'px solid white';
        // trapezoid1.style.borderLeft = h1/2+'px solid transparent';
        // trapezoid1.style.borderRight = h1/2+'px solid transparent';
        
        // let h2 = h1+4;/* 梯形边框2px */
        // trapezoid2.style.borderTop = h2+'px solid black';
        // trapezoid2.style.borderLeft = h2/2+'px solid transparent';
        // trapezoid2.style.borderRight = h2/2+'px solid transparent';

        // let w1 = document.getElementById('naviPart1').offsetWidth;
        // console.log(w1);
        // console.log(w1+4+'px');
        // trapezoid2.style.width = w1+4+'px'

        this.loadNoticeAndNewsList();

    }
    render(){
        return(
            <div style={{overflow:'hidden',height:'100%'}}>
                {/* <div className='topNavi' id='topNavi'>
                    <div className='naviPart' id='naviPart1' style={{width:'40%',position:'absolute',zIndex:'1'}}></div>
                    <div className='naviPart' id='naviPart2' style={{position:'absolute',zIndex:'0'}}></div> 
                </div> */}

                <div className='contentPanel' style={{marginLeft:'8px',marginRight:'8px'}}>
                    <Row gutter={16} className='infoPanel' style={{height:'23.4vw'}}>
                        <Col span={15} style={{height:'100%'}}>
                            <div className='news' style={{height:'100%',padding:'0 10px 10px 20px',overflow:'hidden'}}>
                                <div className='news_title'>
                                    <div className='news_live' style={{float:'left'}}> 
                                        <img style={{height:'100%'}} src={file_stack}></img>
                                        <span className='news_live_text'>管理风采</span>
                                    </div>
                                    <div className="news_more" style={{float:'right',fontSize:'15px'}}> 
                                        <Link to="/affiche" style={{color:'#E14D04'}}>更多<Icon type="double-right" theme="outlined" /></Link>  
                                    </div>
                                </div>

                                <Row style={{height:'18vw',marginTop:20}}>
                                    <Col span={12} className='carousel' style={{height:'100%',borderRadius:'20px',overflow:'hidden'}}>
                                        <Carousel autoplay speed={200} dots={true}>
                                            {
                                               this.state.newsList.map((news, index) => {
                                                    return (
                                                        <div key={index} style={{height:'100%'}}>
                                                            <a onClick={(e) => this.newShowModal(e,news)} style={{width:'100%'}}>
                                                                {/* <img src={require("page/home/img/5.jpg")} width='100%' height='100%' alt="暂无图片"/> */}
                                                                <img src={imgBaseUrl + news.fountImgUrl} height='100%' width='100%' alt="暂无图片"/>
                                                                    <span className="words-span">
                                                                        {/* <div className="words-div"> */}
                                                                            {news.newsTitle}
                                                                        {/* </div> */}
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
                                    </Col>

                                    <Col span={12} className='notice_content' style={{height:'100%',display:'flex',flexDirection:'column'}}>
                                        
                                        {
                                            this.state.list.map((notice, index) => {
                                                return(
                                                    
                                                    <div key={index} className='news_title_list'>
                                                        <a style={{width:'100%'}} onClick={(e) => this.showModal(e,notice)}>
                                                            {notice.notice_title}
                                                        </a>
                                                    </div>
                                                   
                                                    
                                                )
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
                                    </Col>

                                </Row>

                            </div>
                        </Col>
                        <Col span={9} style={{height:'100%'}}>
                            <div className='news' style={{height:'100%',padding:'0 10px 10px 20px',overflow:'hidden'}}>
                                <div className='news_title'>
                                    <div className='news_live' style={{float:'left'}}> 
                                    <Icon type="file-text" theme="outlined" style={{fontSize: '20px',color:'#E14D04'}}/>
                                        <span className='news_live_text'>政策法规</span>
                                    </div>
                                    <div className="news_more" style={{float:'right',fontSize:'15px'}}> 
                                        {/* <Link to="/affiche" style={{color:'#E14D04'}}>更多<Icon type="double-right" theme="outlined" /></Link>   */}
                                        <MorePolicies />
                                    </div>
                                </div>
                                <div style={{height:'18vw',marginTop:20}}>
                                    <PolicesAndRegulations/>
                                </div>
                            </div>
                            {/* <div className='regulation' style={{height:'100%'}}>
                            <PolicesAndRegulations/>
                            </div> */}
                        </Col>
                    </Row>
                    <Row gutter={16} className='chartPanel' style={{marginLeft:'8px',marginRight:'8px'}}>
                        <StatisticReports/>
                    </Row>
                </div>
    
            </div>
        )
    }
}


export default RoadManageChart;

