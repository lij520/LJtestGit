
import React,{Component} from 'react';
import { Tabs } from 'antd';
import { Card, Col, Row, Button, Carousel, Modal, Icon, Collapse, notification,message,Statistic} from 'antd';
import { Pagination, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import MUtil        from 'util/mm.jsx';
import $ from 'jquery';


const _mm   = new MUtil();
const TabPane = Tabs.TabPane;
class PolicyTabs extends Component{
    constructor(props){
        super(props);
        this.type='1';
        this.state = { 
            visible: false ,
            visibles: false ,
            list1 : [],
            list2 : [],
            list3 : [],
            list4 : [],

            modal_title     : '',
            modal_body      : '',
            modal_time      : '',
            policy_titles     : '',
            activeTab   :this.type,
            pageSize: 5,
            page: 1,
        };
    }
    //分页页码发生改变时
    onPageChange(page) {
        this.setState({page: page});    //改变页码
        console.log('page',page);
        this.loadpolicyAndNewsList(page);
    }

    onTabsChange(key){

        if(key=='1'){
          this.setState({
            activeTab:'1',
          })
          this.type='1';
        }
        if(key=='2'){
          this.setState({
            activeTab:'2',
          })
          this.type='2';
        }
        if(key=='3'){
          this.setState({
            activeTab:'3',
          })
          this.type='3';
        }
        if(key=='4'){
          this.setState({
            activeTab:'4',
          })
          this.type='4';
        }
       
      }

    showModal(){
        this.setState({
          visible: true,
          visibles: false ,
        });
    }
    //显示通知内容
    showModals(e,policy) {
        console.log('policy',policy);
        if(policy.lawType==="04"){
            policy.lawType="道路建设"
        }else if(policy.lawType==="05"){
            policy.lawType="道路管理"
        }else if(policy.lawType==="06"){
            policy.lawType="道路养护"
        }else if(policy.lawType==="07"){
            policy.lawType="道路运营"
        }
        this.setState({ 
            visible:true,
            visibles: true ,
            modal_title     : policy.lawName,
            modal_body      : policy.lawContent,
            modal_time      : policy.updateTime,
            policy_titles   : policy.lawType,
        })
    }

    handleClick() {
        this.setState({ 
            visible:false ,
            visibles : false,
        })
    } 
    handleClicks() {
        this.setState({ 
            visible:true ,
            visibles : false,
        })
    }
    componentDidMount(){
        this.loadpolicyAndNewsList(this.state.page);
        console.log('this.state.page',this.state.page)
    }

    loadpolicyAndNewsList(page){
    
        var policyFormDatas = new FormData();
            policyFormDatas.append("userId",_mm.getStorage('userInfo').userId);
            policyFormDatas.append("token",_mm.getStorage('userInfo').token);
            policyFormDatas.append("roleId",_mm.getStorage('userInfo').roleId);

        $.ajax({
            type        :  'post',
            url         :  '/eventmanage/queryLawType',
            data        :  policyFormDatas,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     : res => {
                // console.log('政策法规:',res);
                if(res.result === 1){
                    console.log('pages',page);
                    
                    for(var i = 0;i<res.dicts.length;i++){
                        if(res.dicts[i].name==="道路建设"){
                            
                            this.setState({
                                list1:res.dicts[i].lawList,
                            });
                            
                            // for(var j= (page-1)*10;j<page*10;j++){
                            //     // this.setState({
                            //     //     lists1:res.dicts[i].lawList,
                            //     // });
                            //     // console.log('here');
                            //     // console.log('this.state.lists1',this.state.lists1);
                            //     console.log('j',j)
                            //     var teste1=[];
                            //     if(res.dicts[i].lawList.length>j&&res.dicts[i].lawList.length<10){
                            //         for(var k=0;k<res.dicts[i].lawList.length;k++){
                            //             teste1.push(res.dicts[i].lawList[k]);
                            //         }
                            //         this.setState({
                            //             list1: teste1
                            //         })
                            //         console.log('21',teste1)
                            //     }else{
                            //         this.setState({
                            //             list1:this.state.list1
                            //         })
                            //         console.log('21',teste1)
                            //     }   
                            // }
                            
                        }else if(res.dicts[i].name==="道路管理"){
                            this.setState({
                                list2:res.dicts[i].lawList,
                            });
                        }else if(res.dicts[i].name==="道路养护"){
                            this.setState({
                                list3:res.dicts[i].lawList,
                            });
                        }else if(res.dicts[i].name==="道路运营"){
                            this.setState({
                                list4:res.dicts[i].lawList,
                            });
                        }
                    }
                       
                    
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
    

    render() {
        return(
        <div className="tabsPolicy" style={{position:'absolute',width:'95%',height:'91%',left:'3%',marginTop:'-13px'}}>
            <Tabs defaultActiveKey="1" onChange={(e)=>this.onTabsChange(e)} style={{height:'100%'}}>
                <TabPane tab="道路建设" key="1">
                {
                    this.state.list1.map((policy, index) => {
                    if(index<10){
                        return (
                            <div key={index} style={{height:'3em',borderRadius:'2px',marginTop:'1px'}}>
                                <a onClick={(e) => this.showModals(e,policy)}>
                                <ul style={{height:'25px',backgroundColor:'transparent',marginBottom:'12px'}}>
                                    <li style={{listStyle: 'none',color:'#666666',fontSize:'16px',fontWeight:'normal',marginLeft:'-20px'}}><div className="home-title"><Icon type="right-circle" theme="outlined" style={{fontSize: '14px',color:'#E14D04'}}/>{policy.lawName}<span style={{position:'absolute',float:'right',right:'10px'}}>{moment(policy.updateTime).format("YYYY-MM-DD")}</span></div>
                                    </li>
                                    
                                </ul> 
                                </a>
                            </div>
                        );}
                    })
                }
                    <Modal
                        title= {'当前：政策法规 > '+this.state.policy_titles}
                        className="PoliciesContent"
                        visible={this.state.visibles}
                        centered={true}
                        onOk={() => this.handleClicks()}
                        onCancel={() => this.handleClicks()}
                        okText='确定'
                        cancelText='取消'
                        >
                        <h1 style={{textAlign:'center'}}>{this.state.modal_title}</h1><br/>
                        <div style={{fontSize:'16px',textIndent:'2em'}} dangerouslySetInnerHTML={{__html:this.state.modal_body}}/><br/>
                        <span style={{position:'absolute',bottom:'25px',float:'right',fontSize:'14px',right:'10px'}}>发布时间：{moment(this.state.modal_time).format("YYYY-MM-DD")}</span><br/>
                        
                    </Modal>
                    <LocaleProvider locale={zhCN}>
                        <Pagination
                            style={{position:'absolute',top:'94%',float:'right',right:'10px'}}
                            showQuickJumper
                            current={this.state.page}
                            total={500}
                            onChange={(page) => this.onPageChange(page)}
                        />
                    </LocaleProvider>
                </TabPane>
                <TabPane tab="道路管理" key="2">
                {
                    this.state.list2.map((policy, index) => {
                        if(index<10){
                        return (
                            <div key={index} style={{height:'3em',borderRadius:'2px',marginTop:'1px'}}>
                                <a onClick={(e) => this.showModals(e,policy)}>
                                <ul style={{height:'25px',backgroundColor:'transparent',marginBottom:'12px'}}>
                                    <li style={{listStyle: 'none',color:'#666666',fontSize:'16px',fontWeight:'normal',marginLeft:'-20px'}}><div className="home-title"><Icon type="right-circle" theme="outlined" style={{fontSize: '14px',color:'#E14D04'}}/>{policy.lawName}<span style={{position:'absolute',float:'right',right:'10px'}}>{moment(policy.updateTime).format("YYYY-MM-DD")}</span></div>
                                    </li>
                                    
                                </ul> 
                                </a>
                            </div>    
                        );}
                    })
                }
                <LocaleProvider locale={zhCN}>
                        <Pagination
                            style={{position:'absolute',top:'94%',float:'right',right:'10px'}}
                            showQuickJumper
                            current={this.state.page}
                            total={500}
                            onChange={(page) => this.onPageChange(page)}
                        />
                </LocaleProvider>
                </TabPane>
                <TabPane tab="道路养护" key="3">
                {
                    this.state.list3.map((policy, index) => {
                        if(index<10){
                        return (
                            <div key={index} style={{height:'3em',borderRadius:'2px',marginTop:'1px'}}>
                                <a onClick={(e) => this.showModals(e,policy)}>
                                <ul style={{height:'25px',backgroundColor:'transparent',marginBottom:'12px'}}>
                                    <li style={{listStyle: 'none',color:'#666666',fontSize:'16px',fontWeight:'normal',marginLeft:'-20px'}}><div className="home-title"><Icon type="right-circle" theme="outlined" style={{fontSize: '14px',color:'#E14D04'}}/>{policy.lawName}<span style={{position:'absolute',float:'right',right:'10px'}}>{moment(policy.updateTime).format("YYYY-MM-DD")}</span></div>
                                    </li>
                                </ul> 
                                </a>
                            </div>
                        );}
                    })
                }
                <LocaleProvider locale={zhCN}>
                    <Pagination
                        style={{position:'absolute',top:'94%',float:'right',right:'10px'}}
                        showQuickJumper
                        current={this.state.page}
                        total={500}
                        onChange={(page) => this.onPageChange(page)}
                    />
                </LocaleProvider>
                </TabPane>
                <TabPane tab="道路运营" key="4">
                {
                    this.state.list4.map((policy, index) => {
                        if(index<10){
                        return (
                            <div key={index} style={{height:'3.2em',borderRadius:'2px',marginTop:'1px'}}>
                                <a onClick={(e) => this.showModals(e,policy)}>
                                <ul style={{height:'25px',backgroundColor:'transparent',marginBottom:'12px'}}>
                                    <li style={{listStyle: 'none',color:'#666666',fontSize:'16px',fontWeight:'normal',marginLeft:'-20px'}}><div className="home-title"><Icon type="right-circle" theme="outlined" style={{fontSize: '14px',color:'#E14D04'}}/>{policy.lawName}<span style={{position:'absolute',float:'right',right:'10px'}}>{moment(policy.updateTime).format("YYYY-MM-DD")}</span></div>
                                    </li>
                                </ul> 
                                </a>
                            </div>
                        );}
                    })
                }
                <LocaleProvider locale={zhCN}>
                    <Pagination
                        style={{position:'absolute',top:'94%',float:'right',right:'10px'}}
                        showQuickJumper
                        current={this.state.page}
                        total={500}
                        onChange={(page) => this.onPageChange(page)}
                    />
                </LocaleProvider>
                </TabPane>
            </Tabs>
        </div>
        )
    }
}

export default PolicyTabs;
