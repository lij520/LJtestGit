import React,{Component} from 'react';
import moment from 'moment';
import {Modal,message} from 'antd';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

import './noticeBoard.css'

class NoticeBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[{notice_title:'',submit_time:'',notice_body:''}],

            visible         : false,
            modal_title     : '',
            modal_body      : '',
            modal_time      : '',
            modal_orgname   : '',
            modal_realname  : '',

        }
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

    componentDidMount(){
         //通知公告
         var noticeFormData = new FormData();
         noticeFormData.append("userId",_mm.getStorage('userInfo').userId);
         noticeFormData.append("token",_mm.getStorage('userInfo').token);
         noticeFormData.append("roleId",_mm.getStorage('userInfo').roleId);
         noticeFormData.append("regionId",_mm.getStorage('userInfo').regionId);
         noticeFormData.append("page",'1');
         noticeFormData.append("size",'1');
     
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
    }

    render(){
        return(
            <div>
                <div className='noticeBoard-title' >通知公告</div>
                <div className='noticeBoard-content' >
                    <div className='noticeBoard-content-title'>
                        <div style={{float:'left',fontWeight:'bold'}}>{this.state.list[0].notice_title}</div>
                        <div className='title-tag'>新公告</div>
                        <div style={{float:'right',fontWeight:'bold'}}>{moment(this.state.list[0].submit_time).format("YYYY-MM-DD")}</div>
                    </div>
                    {/* <br/>
                    <br/> */}
                    <div className='noticeBoard-content-body'>
                        {this.state.list[0].notice_body}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a onClick={(e) => this.showModal(e,this.state.list[0])}>阅读全文</a>
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
                </div>
            </div>
        )
    }
}

export default NoticeBoard;