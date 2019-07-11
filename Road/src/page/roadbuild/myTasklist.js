import React from 'react';
import { Tabs, Table,Pagination,Modal,DatePicker,Select,Input,message} from 'antd';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
import moment from 'moment';
const _mm   = new MUtil();

const TabPane=Tabs.TabPane;
const {RangePicker } = DatePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

class MyTasklist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        list_all           : [],
        list_no           : [],
        list_did       : [],
        userId          : _mm.getStorage('userInfo').userId,
        token           : _mm.getStorage('userInfo').token,
        roadId:'',
        checker         :'',
        checkerId       :'',
        selectId:'',
        visible: false,
        managerList:[],
        
        realName:'',
        startTime:{},
        limitTime:{},
        patrolCycleTime:'',
        checkTimes:'',
        managerInfo:'',  

    }
}

componentDidMount(){
  this.loadAllList();
  this.loadNoList();
  //this.loadDidList();
}

loadAllList(){
  console.log(this.state.userId); 
  $.ajax({
   
    url       :  '/getTeamRoadlistByUserId',
    type      : "GET",
    data      :{user_id:this.state.userId,token:this.state.token},
    success     :  res => {
      
        console.log(res);
        if(res.result==-1){
          message.error(res.message);
          window.location.href = '/';
        }
        if(res.result==1){
          this.setState({
            list_all:res.bs,
          })
        }
       
    },
    error       : err => {
      message.error('所有任务请求失败!');
        this.setState({
            list_all : []
        });
    }
  });
}

loadNoList(){
  console.log(this.state.userId); 
  $.ajax({
    url       :  '/getTeamNot',
    type      : "GET",
    data      :{user_id:this.state.userId,token:this.state.token},
    success     : res => {
      
        console.log(res);
        if(res.result==-1){
          message.error(res.message);
          window.location.href = '/';
        }
        if(res.result==1){
          this.setState({
            list_no:res.bs,
          })
        }
        
    },
    error       : err => {
      message.error('待派发任务请求失败!');
        this.setState({
            list_no : []
        });
    }
  });
}

loadDidList(){
  console.log(this.state.userId); 
  $.ajax({
    url       :  '/getTeamAlready',
    type      : "GET",
    data      :{user_id:this.state.userId,token:this.state.token},
    success     :  res => {

        console.log(res);
        if(res.result==-1){
          message.error(res.message);
          window.location.href = '/';
        }
        if(res.result==1){
          this.setState({
            list_did:res.bs,
          })
        }
       
    },
    error       : err => {
      message.error('已派发任务请求失败!');
        this.setState({
            list_did: []
        });
    }
});
}

onTabChange(key){
  console.log(key);
  if(key==1){
      this.loadAllList();
  }
  if(key==2){
    this.loadNoList();
      // $.ajax({
      //     url       :  'http://192.168.0.147:13077/getTeamNot',
      //     type      : "GET",
      //     data      :{user_id:this.state.userId,token:this.state.token},
      //     success     : res => {
            
      //         console.log(res);
      //         this.setState({
      //           list_no:res,
      //           // loading:false
      //         });
            
      //     },
      //     error       : err => {
      //      
      //         this.setState({
      //             list_no : []
      //         });
      //     }
      //   });
  }
  if(key==3){
    this.loadDidList();
      // $.ajax({
      //     url       :  'http://192.168.0.147:13077/getTeamalready',
      //     type      : "GET",
      //     data      :{user_id:this.state.userId,token:this.state.token},
      //     success     :  res => {
      
      //         console.log(res);
      //         this.setState({
      //           list_did:res,
      //         // loading:false
      //         });
      //     },
      //     error       : err => {
      //         
      //         this.setState({
      //             list_did : []
      //         });
      //     }
      // });
   }
}

onCheckerValue= (data) =>{
  console.log(this.state.userId);
    $.ajax({
      url       :  '/team/getTeamAllManager',
      type      : "get",
      data      :{userId:this.state.userId,token:this.state.token},
      success     : res => { 
           console.log(res);

           if(res.result==-1){
            message.error(res.message);
            window.location.href = '/';
          }
          if(res.result==1){
            this.setState({
               managerList:res.mapList,
            })
          }

          console.log(this.state.managerList);
          
        
      },
      error       : err => {
        message.error('巡检员失败!');
          this.setState({
            managerList : []
          });
      }
    }); 
  }

onCheckerChange(value){
  console.log(value);
  let selectId ='';
 // selectId = value.split(',')[1];
  //console.log(selectId);
  this.setState({
   managerId:value,
   managerInfo:value,
  });
 }

dateToString(date) {   
  var y = date.getFullYear();    
  var m = date.getMonth() + 1;    
  m = m < 10 ? '0' + m : m;    
  var d = date.getDate();    
  d = d < 10 ? ('0' + d) : d;    
  return y + '-' + m + '-' + d;
};

onTimeChange(values){
  console.log(values);
  if (values.length>0){
    this.setState({
      startTime  : this.dateToString(values[0]._d),
      limitTime  :this.dateToString(values[1]._d)
    });
    console.log(this.dateToString(values[0]._d)); 
    console.log(this.dateToString(values[0]._d));  
  }
 
}

onPeriodChange(e){
    console.log(e.target.value);
    this.setState({
    patrolCycleTime:e.target.value,
    });
    //console.log(this.dateToString(values[0]._d)); 
  }

onTimesChange(e){
    console.log(e.target.value);
    this.setState({
        checkTimes:e.target.value,
    });
    //console.log(this.dateToString(values[0]._d)); 
  }

  showModal =(e,record) => {
    console.log(record.roadId);
    this.setState({
      visible: true,
      roadId:record.roadId,
    });
  }

  onAddCheckPlan(){
    console.log(this.state.roadId);
    console.log(this.state.managerId);
    console.log(this.state.startTime);
    console.log(this.state.limitTime);
    console.log(this.state.patrolCycleTime);
    console.log(this.state.checkTimes);
    $.ajax({
      type      :  'GET',
      url       :  '/team/addTeamPlan',
      data      :{
                 userId:this.state.userId,
                 token:this.state.token,
                 roadId:this.state.roadId,
                 //realName:this.state.realName,
                 managerId:this.state.managerId,
                 startPatrolTime:this.state.startTime,
                 deadPatrolTime:this.state.limitTime,
                 patrolCycleTime:this.state.patrolCycleTime,
                 checkTimes:this.state.checkTimes,
                 },
                
      success     : res => {
        
          console.log(res);
          this.loadNoList();
          message.success("派发成功！")
          if (res=="参数不完整！")
          message.error(res);
      
      },
      error       : err => {
        message.error("派发失败！");
      }
  
    });
    this.setState({
      managerInfo:'',
      startTime:{},
      limitTime:{},
      patrolCycleTime:'',
      checkTimes:'',
      visible: false,
    });
    //this.loadNoList();
    this.loadDidList();
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      managerInfo:'',
      startTime:{},
      limitTime:{},
      patrolCycleTime:'',
      checkTimes:'',
      visible: false,
    });

  }



render() {
    // console.log(key);
    const columns = [{
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      width:"8%",
      render: (text, record, index) => {
      return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
      },
      },{
        title: '路段名称',
        dataIndex: 'roadname',
        width: "30%",
       },
     // {
      //   title: '路段ID',
      //   dataIndex: 'roadId',
      //   width: "15%",
      // },
      {
        title: '区域名称',
        dataIndex: 'region',
        width: "15%",   
      },{
        title: '任务状态',
        dataIndex: 'taskstatus', 
        width: "15%", 
      },{
        title: '开始时间',
        dataIndex: 'starttime', 
        width: "10%",
      },{
        title: '结束时间',
        dataIndex: 'limittime', 
        width: "10%",
      },
      {
        title: '更新时间',
        dataIndex: 'updatetime',
      }];

      const columns_action = [{
        title: '序号',
        dataIndex: 'order',
        key: 'order',
        width:"8%",
        render: (text, record, index) => {
        return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
        },
        },{
          title: '路段名称',
          dataIndex: 'roadname',
          width: "30%",
        },
        // {
        //     title: '路段ID',
        //     dataIndex: 'roadId',
        //     width: "15%",
        //   }
          ,{
          title: '区域名称',
          dataIndex: 'region',
          width: "20%",   
        },{
          title: '任务状态',
          dataIndex: 'taskstatus', 
          width: "20%", 
        },
        {
          title: '更新时间',
          dataIndex: 'updatetime',
          //width: "25%",
        },{
        title: '操作',
        dataIndex: 'action',
        width: "10%",
        render:(text,record)=>(
        <span>
           <a href="javascript:;" onClick={(e)=>this.showModal(e,record)} >派发 </a>
         </span>
        )
      }];

      const columns_did = [{
        title: '序号',
        dataIndex: 'order',
        key: 'order',
        width:"8%",
        render: (text, record, index) => {
        return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
        },
        },{
          title: '路段名称',
          dataIndex: 'roadname',
          width: "30%",
        },
        // {
        //     title: '路段ID',
        //     dataIndex: 'roadId',
        //     width: "10%",
        //   }, 
        //   {
        //   title: '区域名称',
        //   dataIndex: 'region',
        //   width: "20%",   
        // },
        {
        title: '巡检次数',
        dataIndex: 'times', 
        width: "10%", 
        },{
          title: '巡检周期',
          dataIndex: 'period', 
          width: "10%", 
        },
        {
          title: '任务状态',
          dataIndex: 'taskstatus', 
          width: "20%", 
        },
        {
          title: '更新时间',
          dataIndex: 'updatetime',
          //width: "25%",
        }];

const data_all = [];  
  this.state.list_all.map((road_all,index)=>{ 
    for (let i = 0; i < 46; i++) {
        data_all.push({
        key: `${index+1}`,
        roadname:road_all.roadName,
        region:road_all.regionName,
        taskstatus:road_all.status,
        updatetime:road_all.updateTime,
        starttime:road_all.startTime,
        limittime:road_all.limitTime,
        //roadId:road_all.roadId,
            });        
    return  data_all;

    
          }
  })

  const data_no = [];  
  this.state.list_no.map((road_no,index)=>{ 
    for (let i = 0; i < 46; i++) {
        data_no.push({
        key: `${index+1}`,
        roadname:road_no.roadName,
        region:road_no.regionName,
        taskstatus:road_no.status,
        updatetime:road_no.updateTime,
        roadId:road_no.roadId,
            });        
    return  data_no;
          }
  })

  const data_did = [];
  this.state.list_did.map((road_did,index)=>{
    for (let i = 0; i < 46; i++) {
        data_did.push({
        key: `${index+1}`,
        roadname:road_did.roadName,
        //region:road_did.regionName,
        times:road_did.checkTime,
        period:road_did.patrolCycleTime,
        taskstatus:road_did.status,
        updatetime:road_did.updateTime,
        roadId:road_did.roadId,
            });        
    return  data_did;
          }
  })  

return (
    <Tabs onChange={(e)=>this.onTabChange(e)}>
    <TabPane tab="所有任务" key="1">
        <Table columns={columns} dataSource={data_all} pagination={true} bordered 
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }
         pagination={{ pageSize: 5,showQuickJumper: true,hideOnSinglePage: false }}
         />
    </TabPane>

    <TabPane tab="待派发" key="2">
        <Table columns={columns_action} dataSource={data_no} pagination={true} bordered
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
        <Modal
          title="任务派发"
          visible={this.state.visible}
          onOk={(e)=>this.onAddCheckPlan(e)}
          // {this.onAddCheckPlan}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消">
         <label style={{ marginLeft:'15px' }}>巡检员</label>&nbsp;&nbsp;&nbsp;
         <Select placeholder="请选择巡检员" style={{ width: 160, marginLeft:'5px' }}  
                onFocus={this.onCheckerValue} onChange={(e)=>this.onCheckerChange(e)}
                value={this.state.managerInfo}
                >
          {this.state.managerList.map(checker=><Option key={checker.managerId}>{checker.realName}</Option>)} 
         </Select> 
         <br/> <br/>
         <label style={{ marginLeft:'15px' }}>起止时间</label>&nbsp;&nbsp;&nbsp;
         <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} 
         value={[moment(this.state.startTime), moment(this.state.limitTime)]}
         //format={dateFormat}
         />
         <br/> <br/>
         <label style={{ marginLeft:'15px' }}>巡检周期</label>&nbsp;&nbsp;&nbsp;
         <Input 
            type="number" 
            style={{width:'100px'}} 
            value={this.state.patrolCycleTime}  name="patrolCycleTime"
            onChange={(e) => this.onPeriodChange(e)}
            />&nbsp;&nbsp;&nbsp;天/次
         <br/>
         <label style={{ marginLeft:'15px' }}>巡检次数</label>&nbsp;&nbsp;&nbsp;
         <Input 
            type="number" 
            style={{width:'100px'}} 
            value={this.state.checkTimes}  name="checkTimes"
            onChange={(e) => this.onTimesChange(e)}
            /> &nbsp;&nbsp;&nbsp;次
         <br/>
        </Modal>
    </TabPane>

    <TabPane tab="已派发" key="3">
        <Table columns={columns_did} dataSource={data_did} pagination={true} bordered
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
    </TabPane>
  </Tabs>
);
}
}
export default MyTasklist