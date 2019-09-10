import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import { Card, Col, Row, Button, Carousel, Modal, Icon, Collapse, notification,message,Statistic} from 'antd';

import moment from 'moment';
import MUtil        from 'util/mm.jsx';
import MorePolicies from './morePolicies.jsx';
import $ from 'jquery';
const _mm   = new MUtil();


class PolicesAndRegulations extends Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            lists           : [],
            pageNum         : 1,
            listType        : 'list',
            
            visible         : false,
            modal_title     : '',
            modal_body      : '',
            modal_time      : '',
        }
        
    }

    //显示通知内容
    showModal(e,notice) {
        console.log('notice',notice);
        this.setState({ 
            visible:true,
            modal_title     : notice.lawName,
            modal_body      : notice.lawContent,
            modal_time      : notice.updateTime,
        })
    }

    handleClick() {
        this.setState({ visible:false })
    } 

    componentDidMount(){
        this.loadNoticeAndNewsList();
    }


    // 加载列表
    loadNoticeAndNewsList(){
    
        var noticeFormDatas = new FormData();
            noticeFormDatas.append("userId",_mm.getStorage('userInfo').userId);
            noticeFormDatas.append("token",_mm.getStorage('userInfo').token);
            noticeFormDatas.append("roleId",_mm.getStorage('userInfo').roleId);

        $.ajax({
            type        :  'post',
            url         :  '/eventmanage/queryLawType',
            data        :  noticeFormDatas,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     : res => {
                console.log('政策法规:',res);
                if(res.result === 1){
                    this.setState({
                        lists:res.dicts,
                        list:res.dicts[3].lawList
                    });
                    // console.log('lists',this.state.lists);
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


    render(){
        return(
            <div style={{height:'100%',width:'100%'}}>
                {/* <Card className='cardTile' style={{border:'none',background:'transparent'}}>
                    <div  className='cardTile_background' style={{height:'18%',width:'100%'}}>
                        <div className='cardContent' style={{float:'left',marginLeft:'5px'}}> 
                            <Icon type="file-text" theme="outlined" style={{fontSize: '20px',marginTop:'6px',marginLeft:'15px',color:'#E14D04'}}/> 
                            <span style={{fontSize: '20px',color:'#E14D04',fontWeight:'bold',marginLeft:'3px'}}>政策法规</span>
                        </div>
                        <div className="More" style={{float:'right',marginRight:'13px',marginTop:'2px'}}> 
                            <MorePolicies />
                        </div> 
                    </div> */}
                    <div style={{height:'82%',width:'100%',top:'35px'}}>
                    {
                        this.state.list.map((notice, index) => {
                            if(index<5){
                            return (
                                <div key={index} style={{height:'3.9em',borderRadius:'2px',marginTop:'1px',marginLeft:'9px'}}>
                                <a onClick={(e) => this.showModal(e,notice)}>
                                    <ul style={{height:'25px',backgroundColor:'transparent',marginBottom:'12px'}}>
                                        <li style={{listStyle: 'none',color:'#666666',fontSize:'14px',fontWeight:'normal',marginLeft:'-20px'}}><div className="home-title">{notice.lawName}</div>
                                        </li>
                                        <li style={{listStyle: 'none',fontSize:'14px',color:'black',marginLeft:'-15px',color:'#666666'}}>..............................................{moment(notice.updateTime).format("YYYY-MM-DD")}</li>
                                        
                                    </ul> 
                                </a>
                                </div>
                                
                            );}
                        })
                    }
                        <Modal
                            title="政策法规"
                            className="modalStyles"
                            visible={this.state.visible}
                            centered={true}
                            onOk={() => this.handleClick()}
                            onCancel={() => this.handleClick()}
                            okText='确定'
                            cancelText='取消'
                            >
                            <h1 style={{textAlign:'center'}}>{this.state.modal_title}</h1><br/>
                            <div style={{fontSize:'16px',textIndent:'2em'}} dangerouslySetInnerHTML={{__html:this.state.modal_body}}/><br/>
                            <span style={{position:'absolute',marginTop:'25%',float:'right',fontSize:'14px',right:'10px'}}>发布时间：{moment(this.state.modal_time).format("YYYY-MM-DD")}</span><br/>
                        </Modal>
                    </div>
                {/* </Card > */}
            </div>
        )
    }
}


export default PolicesAndRegulations;