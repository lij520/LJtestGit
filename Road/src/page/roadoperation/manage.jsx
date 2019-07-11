import React from 'react';
import {List, Avatar, Button, Skeleton, Row,Col,Icon,Tabs,Affix,Input,Pagination,LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.scss';
import './index.less';

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1084087_mroeh373ps.js',
});

const TabPane = Tabs.TabPane;
class Manage extends React.Component{
    constructor(props){
      super(props);
      this.everything=(
        <IconFont type="icon-suoyou" style={{"fontSize":"30px"}}/>
      )
      this.undo=(
        <IconFont type="icon-weikaishi" style={{"fontSize":"27px"}}/>
      )
      this.doing=(
        <IconFont type="icon-jinxingzhong" style={{"fontSize":"27px"}} />
      )
      this.done=(
        <IconFont type="icon-yiwancheng" style={{"fontSize":"25px"}}/>
      )
      this.state = {
        initLoading     : true,
        data            : [],
        list            : [],
        pageSize        : 5,
        page            : 1,
        total           : 0,
        tabName         :this.everything,
      };
    }

    componentDidMount() {
      this.getData((res) => {
        this.setState({
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
    }
  
    getData(callback){
      $.ajax({
        type        :  'get',
        url         : fakeDataUrl,
        dataType    : "json",
        contentType: 'application/json',
        success     : res => {
          callback(res);
        },
      });
    }

    onTabChange(e){
      console.log(e);
      switch(e){
        case '1': this.setState({tabName:this.everything});break;
        case '2': this.setState({tabName:this.undo});break;
        case '3': this.setState({tabName:this.doing});break;
        case '4': this.setState({tabName:this.done});break;
      }
      this.getData((res) => {
        this.setState({
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
    }

    SizeChange(e, pageSize){
      this.setState({
        pageSize: pageSize,
        page:e,
      })
    
      this.getData((res) => {
        this.setState({
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
  }

  PageNumberChange(e){
      this.setState({
        page:e,
      })
      this.getData((res) => {
        this.setState({
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
     
  }
    render(){
      const { initLoading, loading, list } = this.state;
      return (
        <Row style={{'marginRight':'20px'}}>
          
        <Col span={3} gutter={16} className='switchButton'>
        <Affix offsetTop={20}>
          <Tabs tabPosition="left" onChange={(e)=>this.onTabChange(e)} className="test">
           <TabPane tab='所有任务' key="1"></TabPane>
           <TabPane 
            tab='未开始'
             key="2">
           </TabPane>
           <TabPane 
             tab='待整改'     
             key="3">
           </TabPane>
           <TabPane 
             tab='已完成'  
             key="4">
           </TabPane>
         </Tabs>
         </Affix>
        </Col>
      
       <Col span={21} style={{"paddingLeft":'15px',marginBottom:'40px'}}>
         <Row style={{marginBottom:'10px',background:'#f2f4f5'}}>
           <Row style={{margin:'10px auto',paddingBottom:10}}>
             <Col span={7} >
                   <label style={{ marginLeft:'5px' }}>事件编码</label>
                   <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode"  />
             </Col>
             <Col span={7} >
                   <label style={{ marginLeft:'5px' }}>事件编码</label>
                   <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode"  />
             </Col>
             <Col span={7} >
                   <label style={{ marginLeft:'5px' }}>事件编码</label>
                   <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode"  />
             </Col>
             <Col span={3} >
               <a style={{ fontSize: 14,verticalAlign:'-webkit-baseline-middle',color:'#1890ff' }} onClick={this.toggle}>
                 展开 <Icon type={this.state.expand ? 'up' : 'down'} />
               </a>
             </Col>
           </Row>
         </Row>

           {/* <Row style={{marginTop:'5px'}}>
                 <Col span={8}>
                
                 </Col>
                 <Col span={8}>
                 <label style={{ marginLeft:'15px' }}>事件编码</label>
                     <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode" onChange={(e)=>this.onInputChange(e)} />
                 </Col>
                 <Col span={8}>
                 <label style={{ marginLeft:'15px' }}>巡查人员</label>
                     <Input placeholder="请输入巡查人员" style={{ width:'160px', marginLeft:'5px' }} value={this.state.userName}  name="userName" onChange={(e)=>this.onInputChange(e)} />
                 </Col>
           </Row>
           <Row>
                 <Col span={16} style={{ marginTop:'15px' }}>
                 <label style={{ marginLeft:'15px' }}>起止时间</label>
                 <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} 
                 placeholder={['开始日期', '结束日期']}
                 value={this.state.time}
                 format={dateFormat}/>
                 </Col>
           </Row>
           <div style={{float:'right',marginBottom:'20px'}}>
                 <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                 <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
           </div> */}

         <Button type="dashed" onClick={()=>window.location.href=`#/roadoperation/plan/new/${this.state.tab}`} style={{ width: "100%",marginBottom: "8px" }}>
           <Icon type="plus" /> 添加
         </Button>
         <List
         loading={initLoading}
         itemLayout="horizontal"
         dataSource={list}
         renderItem={item => (
           <List.Item actions={[<a href={`#/roadoperation/check/${item.name.last}`}>查看</a>, <a>删除</a>]}>
               <List.Item.Meta
                 avatar={<div style={{color:'#1890ff'}}>{this.state.tabName}</div>}
                 title={<a >公司名称：{item.name.last}</a>}
                 description="公司所在地址"/>
                 <div className='planText'>
                     <span>公司负责人</span>
                     <p>18605</p>
                 </div>
                 <div className='planText'>
                     <span>事件状态</span>
                     <p>1860</p>
                 </div>
                 <div className='planText'>
                     <span>检查时间</span>
                     <p>18605912222</p>
                 </div>
                 <div className='planText'>
                     <span>运管员</span>
                     <p>张三</p>
                 </div>
           </List.Item>
       )}
     />
      <LocaleProvider locale={zhCN}>
                 <Pagination
                     style={{float:'right',marginBottom:"30px",marginTop:"10px"}} 
                     pageSize={this.state.pageSize}
                     current={this.state.page}
                     // total={20}
                     onChange={(e) => this.onPageNumberChange(e)}
                     showSizeChanger
                     pageSizeOptions={['5','10', '20', '30', '40','50']}
                     onShowSizeChange={(current, pageSize) => this.onShowSizeChange(e, pageSize)}
                     />
       </LocaleProvider>   
     </Col>
   </Row>
      );
    }
  }

  export default Manage;