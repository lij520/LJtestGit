import React from 'react';
import { DatePicker, Cascader, Button, Upload, Icon, Input, Select, Collapse, Table,Tabs ,Row, Col,message} from 'antd';
import $ from 'jquery';
import moment from 'moment';
import MUtil        from '../../util/mm.jsx';
const _mm   = new MUtil();

const TabPane=Tabs.TabPane;
const Option = Select.Option;
const {RangePicker } = DatePicker;
const Panel = Collapse.Panel;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 10,
    border: 0,
  };


class RoadPlan extends React.Component{
constructor(props) {
  super(props);
  this.state = {
   // data:[]
   list            : [],
   userId          : _mm.getStorage('userInfo').userId,
   token          : _mm.getStorage('userInfo').token,
   team            :[],
   region          :[],
   regionId        :'',
   road            :[],
   roadId          :'',
   
   teamName :'',
   regionName:'',
   roadName:'',
   
   startTime0:moment().endOf('day'),
   limitTime0:moment().endOf('day'),
   startTime:'',
   limitTime:'',

   teamInfo:'',
   regionInfo:'',
   roadInfo:'',

   searchTeamName:'',
   searchRoadName:'',
   selectTeamName:[],
   selectRoadName:[],
     }  
        // this.onTeamValue = this.onTeamValue.bind(this);
}

componentDidMount(){
  this.loadEventList();
}

loadEventList(){
  console.log(this.state.userId);
  this.setState({loading:true});
  
  $.ajax({
   
    url       :  '/getRoadlistByUserId',
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
            list:res.bs
          })
        }
      
    },
    error       : err => {
      message.error('error!');
        this.setState({
            list : []
        });
    }
  });
}

onTeamValue= (data) =>{
  $.ajax({
   
    url       :  '/getteam',
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
            team:res.mapList,
          })
        }
        console.log(this.state.team);
    },
    error       : err => {
      message.error('error!');
        this.setState({
          team : []
        });
    }
  });
  // console.log('hello');
}

 onTeamChange(value) {
  
  console.log(value);
  let selectId1 ='';
  selectId1 = value.split(",")[0];
  console.log( selectId1);
  this.setState({
    teamId:selectId1,
    teamInfo:value,
    regionId:value.split(",")[1],
 
  });
  console.log( this.state.regionId)

  $.ajax({
    url       :  '/getRoad',
    type      : "GET",
    data      :{region_id:value.split(",")[1],user_id:this.state.userId,token:this.state.token},
    
    success     : res => {
      
        console.log(res);

        if(res.result==-1){
          message.error(res.message);
          window.location.href = '/';
        }
        if(res.result==1){
          this.setState({
            road:res.mapList,
          });
        }
       
        // console.log(this.state.team);
    },
    error       : err => {
      message.error('error!');
        this.setState({
          road  : []
        });
    }
  });
  // $.ajax({
  //   type      :  'post',
  //   url       :  'http://192.168.3.156:13077/getRegion',
  //   type      : "GET",
  //   data      :{region_id:value.split(",")[4],token:this.state.token},
  //   success     : res => {
      
  //       console.log(res);
  //       this.setState({
  //         region:res,
       
  //       });
  //       // console.log(this.state.team);
  //   },
  //   error       : err => {
  //   
  //       this.setState({
  //         region  : []
  //       });
  //   }
  // });
}

// onRegionChange(value){
//   console.log(value);
//   let selectId1 ='';
//   selectId1 = value.split(",")[0];
//   console.log( selectId1);
//   this.setState({
//     teamId:selectId1,
//     teamInfo:value
 
//   });

  // this.setState({
  //   regionId  : value,
  //   regionInfo:value
  // });
  // console.log(value)
//   $.ajax({
//     url       :  'http://192.168.3.156:13077/getRoad',
//     type      : "GET",
//     data      :{region_id:value,token:this.state.token},
//     success     : res => {
      
//         console.log(res);
//         this.setState({
//           road:res,
       
//         });
//         // console.log(this.state.team);
//     },
//     error       : err => {
//        
//         this.setState({
//           road  : []
//         });
//     }
//   });
// }

onRoadChange(value){
  console.log(value)
  this.setState({
    roadId  : value,
    roadInfo:value
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
      startTime  : values[0]._d,
      limitTime  :values[1]._d,
      //startTime  : values[0]._d,
      //limitTime  :values[1]._d,
      // startTime0:values[0]._d,
      // limitTime0:values[1]._d,
      startTime0:values[0],
      limitTime0:values[1],
      
    });
  
  } 
}

onAddRoadPlan(){
  console.log(this.state.teamId);
  console.log(this.state.startTime0,this.state.limitTime0)
  $.ajax({
    type      :  'post',
    url       :  '/insertroadplan',
    data      :{teamId:this.state.teamId,
               regionId:this.state.regionId,
               roadId:this.state.roadId,
               startTime:this.state.startTime0._d,
               limitTime:this.state.limitTime0._d,
              token:this.state.token,
              user_id:this.state.userId
              },
    success     : res => {
      
      if(res.result==-1){
        message.error(res.message);
        window.location.href = '/';
      }
      if(res.result==1){
        message.success(res.message);
        this.loadEventList();
        this.setState({
          teamId:'',
          regionId:'',
          roadId:'',
          startTime:'',
          limitTime:'',
        })
      }
      if(res.result==0){
        message.error(res.message);
      } 
    
    },
    error       : err => {
      message.error("添加失败！");
    }
  });
  this.setState({
    startTime0:moment().endOf('day'),
    limitTime0:moment().endOf('day'),
     teamInfo:'',
     regionInfo:'',
     roadInfo:'',
    });
}

handleDel(){
   this.setState({
   startTime0:moment().endOf('day'),
   limitTime0:moment().endOf('day'),
    teamInfo:'',
    regionInfo:'',
    roadInfo:'',
   });
  this.loadEventList();
}

onTeamNameValue(e){
  $.ajax({
    url       :  '/getAllTeam',
    type      : "GET",
    data      :{user_id:this.state.userId,token:this.state.token},
    success     : res => {
        //console.log(res);
        if(res.result == 1){
          //console.log("mapList:",res.mapList);
          this.setState({
            selectTeamName: res.mapList,
          });
        }
        //console.log(res);
        if(res.result==-1){
          window.location.href ='/';
        }
    },
    error       : err => {
      message.error('error!');
        this.setState({
          // team : []
        });
    }
  });
}

onRoadValue(e) {
  $.ajax({
    //type      :  'post',
    url       :  '/getAllRoad',
    type      : "GET",
    data      :{user_id:this.state.userId,token:this.state.token},
    success     : res => {
        //console.log(res);
        if(res.result == 1){
          //console.log("mapList:",res.mapList);
          this.setState({
             selectRoadName: res.mapList,
          });
        }
        if(res.result == -1){
          window.location.href ='/';
        }
    },
    error       : err => {
      message.error('error!');
        this.setState({
          // team : []
        });
    }
  });
}

onTeamNameChange(e){
  console.log(e);
  this.setState({ searchTeamName:e});
}

onRoadNameChange(e){
  console.log(e);
  this.setState({ searchRoadName:e});
}

resetting() {
  this.setState({
    searchRoadName:'',
    searchTeamName:'',
  });
  this.loadEventList();
}

onSearch() {
  
  $.ajax({
    url       :  '/CheckRegionAndRoad',
    type      : "GET",
    data      :{
        user_id:this.state.userId,
        token:this.state.token,
        region_id:this.state.searchTeamName,
        road_id:this.state.searchRoadName
    },
    success     : res => {
        if(res.result == 1){
          console.log("bs:",res.bs);
          this.setState({
             list: res.bs,
          });
        }
        if(res.result == -1){
          window.location.href ='/';
        }
    },
    error       : err => {
      message.error('error!');
        this.setState({
          // team : []
        });
    }
  });

}


    render() {

        const columns = [{
          title: '序号',
          dataIndex: 'order',
          key: 'order',
          width:"10%",
          render: (text, record, index) => {
          return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
          },
          }, {
          title: '区域名称',
          dataIndex: 'regionname',
          width: "20%",
        },{
          title: '路段名称',
          dataIndex: 'roadname',
          width: "15%",
        }, {
          title: '负责大队',
          dataIndex: 'team',
          width: "15%",
        },{
          title: '开始时间',
          dataIndex: 'starttime',
          width:"20%",
        },{
          title: '结束时间',
          dataIndex: 'limittime',
          width:"20%",
        }
      ];

    const data=[];
      
    this.state.list.map((road,index)=>{
   
      for (let i = 0; i < 46; i++) {
      data.push({
          key: `${index+1}`,
          regionname:road.regionName,
          roadname:road.roadName,
          team:road.teamName,
          starttime:road.startTime,
          limittime:road.limitTime,
              });        
      return  data;
            }
    })


      return (

      <div style={{background:'rgb(247,247,247)'}}>
        <Collapse  accordion bordered={false} history={this.props.history}>
              <Panel header="高级查询" key="1" style={{backgroundColor:'#efefef'}} history={this.props.history}>
              <Row style={{marginTop:'5px'}} history={this.props.history}>
                  <Col span={8} history={this.props.history}>
                  <label style={{ marginLeft:'15px' }}>大队</label>
                  <Select placeholder="请选择大队" style={{ width: 160, marginLeft:'5px' }}  value={this.state.searchTeamName} onFocus={(e)=>this.onTeamNameValue(e)} onChange={(e)=>this.onTeamNameChange(e)} history={this.props.history}>
                    {this.state.selectTeamName.map(item=> <Option key={item.region_id}>{item.organization_name}</Option>)}
                  </Select>
                  </Col>
                  <Col span={8}>
                  <label style={{ marginLeft:'15px' }}>道路名称</label>
                  <Select placeholder="请选择道路名称" style={{ width: 160, marginLeft:'5px' }} value={this.state.searchRoadName} onFocus={(e)=>this.onRoadValue(e)}  onChange={(e)=>this.onRoadNameChange(e)}>
                    {this.state.selectRoadName.map(item=> <Option key={item.id}>{item.name}</Option>)}
                  </Select>
                  </Col>
              </Row>

              <div style={{float:'right',marginBottom:'20px'}}>
                  <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                  <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
              </div>

              </Panel>
        </Collapse>


        <Collapse  accordion bordered={false} onChange={this.callback} >
        <Panel header="添加建设计划" key="1" style={customPanelStyle}>
          <Row style={{paddingTop:'4px'}}>
            <Col span={8}>
              <label style={{ marginLeft:'15px' }}>负责大队</label>
              <Select placeholder="请选择大队" style={{ width: 160, marginLeft:'5px' }}  onFocus={this.onTeamValue} onChange={(e)=>this.onTeamChange(e)}
              value={this.state.teamInfo}
              >
                {this.state.team.map(teamName=> <Option key={`${teamName.organization_id},${teamName.region_id}`}>{teamName.organization_name}</Option>)}
              </Select>
            </Col>
            {/* <Col span={8}>
              <label style={{ marginLeft:'15px' }}>区域名称</label>
              <Select placeholder="请选择区域" style={{ width: 160, marginLeft:'5px' }} onChange={(e)=>this.onRegionChange(e)}
              value={this.state.regionInfo}
              >
                {this.state.region.map(regionName=> <Option key={regionName[0]}>{regionName[1]}</Option>)}
              </Select>
            </Col> */}
            <Col span={8}>
              <label style={{ marginLeft:'15px' }}>路段名称</label>
              <Select placeholder="请选择路段" style={{ width: 160, marginLeft:'5px' }}  onChange={(e)=>this.onRoadChange(e)}
              value={this.state.roadInfo}
              >
                {this.state.road.map(roadName=> <Option key={roadName[0]}>{roadName[1]}</Option>)}
              </Select>  
            </Col>
          </Row>
          <Row>
            <Col span={16} style={{ marginTop:'15px' }}>
              <label style={{ marginLeft:'15px' }}>起止时间</label>
              <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} 
               value={[moment(this.state.startTime0), moment(this.state.limitTime0)]}
              />
            </Col>
            </Row>
          <div style={{float:'right'}}>
            <Button type="primary" style={{ marginLeft:'15px',marginBottom:'15px' }} onClick={()=>this.onAddRoadPlan()}>确定</Button>
            <Button type="primary" style={{ marginLeft:'10px',marginBottom:'15px' }} onClick={()=> this.handleDel()}>取消</Button>
          </div>
        </Panel>
        
        </Collapse>

        <Table columns={columns} dataSource={data} pagination={true} bordered style={{marginBottom:'60px'}}
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
        {/* <a href="javascript:void(0)" onclick="doSomething()">链接</a> */}
       
        </div>
      );
      }
}
export default RoadPlan