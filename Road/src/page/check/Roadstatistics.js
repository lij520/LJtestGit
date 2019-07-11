import React from 'react';
import { Modal, Button, Input, Upload, message,DatePicker, Icon, Table, Divider, Select } from 'antd';
import moment from 'moment';
//import axios from 'axios'
import $ from 'jquery'
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
let data = [];

class Roadstatistics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      beginTime: '2018-9-1', //ajax请求初始值
      start:moment('2018-9-1'), //DatePicker初始值
      endTime: '2018-11-30',
      end: moment('2018-11-30'),
      regionId: '350800000000'
    }
  }
  
  componentWillMount() {
   this.getAssessmentInFo();
  }
 
  //查询大队列表的方法
  getAssessmentInFo=()=>{
    var formData = new FormData();
    formData.append("beginTime",this.state.beginTime);
    formData.append("endTime",this.state.endTime);
    formData.append("userId",_mm.getStorage('userInfo').userId);
    formData.append("token",_mm.getStorage('userInfo').token);
    
    $.ajax({
      // url:"/assessment/getTownAssessmentInFo",
      url:"/statistics/getRoadChiefInfo",
      type: "post",
      async: false,
      processData : false,
      contentType:false,
      data : formData,
      success: function (res) {
        //alert("成功");
        data = res;
        console.log(data);
      },
      
      error: function () {
        message.error("失败!");
      }
      
    })
    this.setState({});
  }
  handleSubmit() {
    // message.info('beginTimebeginTime:'+ `${this.state.beginTime}`);
    //message.info('regionId:'+ `${this.state.regionId}`);
    this.getAssessmentInFo();
  }

  getbeginTimeValue(date) {
    var unixTimestamp = new Date(date);
    console.log('beginTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`);
    this.setState({
      'beginTime' : moment(unixTimestamp).format("YYYY-MM-DD")
    });
  }
//考核导出Excel表格
handleDownload = (record) => {
  console.log(record);
  this.check(record);
};

 check() {
   $('<form  action="/excel/export" method="' + ('GET' || 'post') + '">' +  // action请求路径及推送方法
     '<input type="text" name="beginTime" value="' + this.state.beginTime + '"/>' + 
     '<input type="text" name="endTime" value="' + this.state.endTime + '"/>' + 
    '<input type="text" name="userId" value="' + _mm.getStorage('userInfo').userId + '"/>' + 
     '<input type="text" name="token" value="' +_mm.getStorage('userInfo').token + '"/>' + 
     '<input type="text" name="t" value="' +5 + '"/>' + 
     '</form>')
     .appendTo('body').submit().remove();
 }

  getendTimeValue(date) {
    var unixTimestamp = new Date(date);
    //console.log(`${unixTimestamp.toLocaleString()}`); //2018/3/9 上午12:00:00
    console.log('endTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`); //2018-03-09
    this.setState({
      'endTime' : moment(unixTimestamp).format("YYYY-MM-DD")
    });
  }
  render() {
    const columns = [{

      title: '路管员',
      dataIndex: 'roadCheifName',
      width: "6%",
    }, {
      title: '上报事件数量',
      dataIndex: 'countReport',
      width: "12%",
    }, {
      title: '已处理事件数量',
      dataIndex: 'countProcess',
      width: "12%",
    },{
      title: '事件解决率%',
      dataIndex: 'eventCompletionRate',
      width: "12%",
    },{
      title: '已完成任务数量',
      dataIndex: 'countFulfilTask',
      width: "12%"
  }, {
    title: '超时任务数量',
    dataIndex: 'countNotFulfilTask',
    width: "12%",
  },{
    title: '任务完成率%',
    dataIndex: 'taskCompletionRate',
    width: "12%",
  },
 ];
    return (
      <div>
        <div style={{backgroundColor:'#f0f0f0',padding:5}}>
                <span style={{marginLeft:'10px',fontSize:20,fontWeight:'bolder'}}>日期选择：</span>
                <DatePicker format="YYYY-MM-DD"
                            placeholder="请选择起始时间"
                            name="beginTime"
                            //defaultValue={this.state.start}
                            onChange={(date) => this.getbeginTimeValue(date)}
                />
                <span>~</span>
                <DatePicker format="YYYY-MM-DD"
                            placeholder="请选择终止时间"
                            name="endTime"
                            //defaultValue={this.state.end}
                            onChange={(date) => this.getendTimeValue(date)}
                />
                <Button style={{marginLeft:'10px'}} type="primary" 
                onClick={() => this.handleSubmit()}
                >查询</Button>
            <Button style={{marginLeft:'10px'}} type="primary" onClick={this.handleDownload} >导出</Button>
            {/* <Button style={{marginLeft:'10px'}} type="primary" >导出</Button> */}
              </div>
        <Table  columns={columns} dataSource={data.townStatistic} />
      </div>);
  }
}

export default Roadstatistics;







