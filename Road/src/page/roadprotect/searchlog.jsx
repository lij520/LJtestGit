//巡路日志查询
import React from 'react';
import { Form, Button, Input, DatePicker, message, Row, Col, Select} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import './index.less';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
var myDate = new Date();//获取系统当前时间

class SearchLog extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        regionList: [],
        roadName : '',
        logName  : '',
        userName : '',
        startTime: moment(myDate).subtract(1,'year').format("YYYY-MM-DD"),
        lastTime : moment(myDate).format("YYYY-MM-DD"),
        region: _mm.getStorage('patrolRegionId').regionName,
        regionId: _mm.getStorage('patrolRegionId').regionId||'',
        roleId: _mm.getStorage('userInfo').roleId,
      }
    }

    componentDidMount() {
      this.state.roleId === 9 ?this.queryRegionList() :'';
      if(this.state.roleId === 9&&this.state.regionId){
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("appType",'2');
        formData.append("regionId",this.state.regionId);
        this.props.logQuery(formData);
        this.props.queryPatrolRecord(formData,1,this.props.pageSize);
      }
      _mm.removeStorage('patrolRegionId')
    }

    //县级所属地区下拉框
    queryRegionList() {
      $.ajax({
          type    :  'get',
          url     :  '/patrol/regionList?regionId='+ _mm.getStorage('userInfo').regionId,
          data    :  {},
          success : res => {
              console.log(res);
              this.setState({
                  regionList: res
              })
          },
          error   : err => {
              message.error('error!');
          }
      });
    }

    handleRegionChange(value,option) {
      console.log(value)
      this.setState({
          regionId: value
      });
    }

    getStartTimeValue(date) {
      var unixTimestamp = new Date(date);
      console.log('startTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`);
      this.setState({
        'startTime' : moment(unixTimestamp).format("YYYY-MM-DD")
      });
    }
    getLastTimeValue(date) {
      var unixTimestamp = new Date(date);
      //console.log(`${unixTimestamp.toLocaleString()}`); //2018/3/9 上午12:00:00
      console.log('lastTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`); //2018-03-09
      this.setState({
        'lastTime' : moment(unixTimestamp).format("YYYY-MM-DD")
      });
    }
    onValueChange(e) {
      let name = e.target.name,
          value = e.target.value.trim();
      //console.log(name,value);
      this.setState({
        [name] : value,
      });
    }

    //日志查询
    logSearch() {
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("appType",'2');
        formData.append("regionId",_mm.getStorage('userInfo').regionId);
        
        //任务名称不为空
        if (this.state.logName != '') {
            formData.append("logName",this.state.logName);
        }
        //路段名称不为空
        if (this.state.roadName != '') {
            formData.append("roadName",this.state.roadName);
        }
        //巡路人员不为空
        if (this.state.userName != '') {
            formData.append("userName",this.state.userName);
        }
        //时间不为空
        if ( (this.state.startTime != '') && (this.state.lastTime != '') ) {
            formData.append("startTime",this.state.startTime);
            formData.append("endTime",this.state.lastTime);
        }
        //regionId不为空
        if (this.state.regionId != '') {
          formData.set("regionId",this.state.regionId);
        }

        // console.log(formData.get("userName") )
        this.props.logQuery(formData);
        this.props.queryPatrolRecord(formData,1,this.props.pageSize);
    }

    //重置日志列表
    resetLogList() {
      this.setState({
          roadName: '',
          logName: '',
          userName: '',
          startTime: moment(myDate).subtract(1,'year').format("YYYY-MM-DD"),
          lastTime: moment(myDate).format("YYYY-MM-DD"),
          regionId: '',
      })

      var formData = new FormData();
      this.props.logQuery(formData);
      this.props.loadLogList(1,this.props.pageSize);
    }

    render(){
      return(
      	<div>
            <Row style={{marginTop:"10px",marginBottom:"10px"}}>
                <span>路段名称：</span>
                <Input name="roadName" value={this.state.roadName} placeholder="请输入路段名称" onChange={(e) => this.onValueChange(e)} style={{width:'40%'}}/>
                <span style={{marginLeft:20}}>日志名称：</span>
                <Input name="logName" value={this.state.logName} placeholder="请输入日志名称" onChange={(e) => this.onValueChange(e)} style={{width:'40%'}}/>
            </Row>
            <Row style={{marginTop:"10px",marginBottom:"10px"}} className='search-plan-log-datePicker'>
                <span>起止时间：</span>
                <DatePicker name="startTime"  value={moment(this.state.startTime,dateFormat)} placeholder="请输入起始时间" style={{width:'40%'}} onChange={(date) => this.getStartTimeValue(date)} />
                <span style={{marginLeft:34,marginRight:34}}> 至 </span>
                <DatePicker name="lastTime" value={moment(this.state.lastTime,dateFormat)} placeholder="请输入终止时间" style={{width:'40%'}} onChange={(date) => this.getLastTimeValue(date)} />
            </Row>
            <Row style={{marginTop:"10px",marginBottom:"10px"}}>
                <span>巡路人员：</span>
                <Input name="userName" value={this.state.userName} placeholder="请输入巡路人员" onChange={(e) => this.onValueChange(e)} style={{width:'40%'}}/>
                {
                  this.state.roleId === 9? <span style={{marginLeft:20}}>选择乡镇：</span> :''
                }
                {
                  this.state.roleId === 9
                  ?
                  <Select
                      loading
                      style={{width: '40%'}}
                      value={this.state.regionId}
                      onChange={(value,option) => this.handleRegionChange(value,option)} getPopupContainer={triggerNode => triggerNode.parentNode}
                      >
                      {
                          this.state.regionList.map(item => <Option key={item.regionId}>{item.regionName}</Option>)
                      }
                  </Select>
                  :''
                }  
                  
            </Row>
 
            <div style={{float:'right',marginBottom:'10px'}}>
                <Button type="primary" style={{marginLeft:'15px'}} onClick={() => this.logSearch()}>查询</Button> 
                <Button type="primary" style={{marginLeft:'10px'}} onClick={() => this.resetLogList()}>重置</Button>
            </div>
          
                  
        </div>   
      );
    }
}

export default SearchLog;
