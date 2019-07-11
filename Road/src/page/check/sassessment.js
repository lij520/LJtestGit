import React from 'react';
import { Modal, Button, Input, Upload, message,DatePicker, Icon, Table, Divider, Select } from 'antd';
import moment from 'moment';
//import axios from 'axios'
import $ from 'jquery'
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
let data = [];

class SAssessment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      beginTime: '2018-9-1', //ajax请求初始值
      start:moment('2018-9-1'), //DatePicker初始值
      endTime: '2018-10-30',
      end: moment('2018-10-30'),
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
      url:"/assessment/queryAssessment",
      type: "post",
      async: false,
      processData : false,
      contentType:false,
      data : formData,
      // data: {
      //   userId: 6,
      //   beginTime:this.state.beginTime,
      //   endTime:this.state.endTime,
      //   token: 'E18C25091DA9919A06D5FB1D7F5FF612',
      // },
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

  getendTimeValue(date) {
    var unixTimestamp = new Date(date);
    //console.log(`${unixTimestamp.toLocaleString()}`); //2018/3/9 上午12:00:00
    console.log('endTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`); //2018-03-09
    this.setState({
      'endTime' : moment(unixTimestamp).format("YYYY-MM-DD")
    });
  }
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
       '<input type="text" name="t" value="' +1 + '"/>' + 
       '</form>')
       .appendTo('body').submit().remove();
   }
  render() {
    const columns = [{

      title: '市',
      dataIndex: 'regionName',
      width: "17%",
    }, {
      title: '道路建设分数',
      dataIndex: 'roadConstructionScore',
      width: "17%",
    }, {
      title: '道路养护分数',
      dataIndex: 'roadMaintenanceScore',
      width: "17%",
    }, {
      title: '道路管理分数',
      dataIndex: 'roadManagerScore',
      width: "17%",
    },
    {
      title: '考核总分',
      dataIndex: 'totalScore',
      width: "17%"
    
  }, {
    title: '排名',
    dataIndex: 'rank',
    width: "17%",
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
                
              </div>
        <Table  columns={columns} dataSource={data.assessmentList} />
      </div>);
  }
}




export default SAssessment;







