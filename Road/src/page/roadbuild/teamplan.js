import React from 'react';
import { DatePicker, Cascader, Button, Upload, Icon, Input, Select, Collapse, Table,Tabs ,Row, Col,message} from 'antd';
import $ from 'jquery';
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
 

class CheckPlan extends React.Component{
constructor(props) {
  super(props);
  this.state = {
   // data:[]
   list            : [],
   userId          : _mm.getStorage('userInfo').userId,
   token           : _mm.getStorage('userInfo').token,
   //team            :[],
   //region          :[],
   //regionId        :'',
   //road            :[],
   roadId          :'',
   //checker          :[],
   //checkerId        :'',
   manager:'',
   roadName:'',
   selectManagerName:[],
   selectRoadName:[],
   
     }  
         //this.onTeamValue = this.onTeamValue.bind(this);
}

    componentWillMount(){
      console.log(this.state.userId);
      this.setState({loading:true});
      
      this.loadTeamTaskList();
    }

    loadTeamTaskList() {
      $.ajax({
        url       :  '/team/getTeamTaskList',
        type      : "post",
        async: false,
        data      :{userId:this.state.userId,token:this.state.token},
        success     : res => {
          
            console.log(res);
            if(res.result==-1){
              message.error(res.message);
              window.location.href = '/';
            }
            if(res.result==1){
              this.setState({
                list:res.mapList
              })
            }
           
          
        },
        error       : err => {
            message.error('道路建设计划请求失败!');
            this.setState({
                list : []
            });
        }
      });
    }


onManagerValue(e){
  $.ajax({
    type      :  'post',
    url       :  '/team/getPlanManager',
    type      : "GET",
    data      :{userId:this.state.userId,token:this.state.token},
    success     : res => {
        //console.log(res);
        if(res.result == 1){
          //console.log("mapList:",res.mapList);
          this.setState({
            selectManagerName: res.mapList,
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
    type      :  'post',
    url       :  '/team/getPlanRoad',
    type      : "GET",
    data      :{userId:this.state.userId,token:this.state.token},
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

onManagerChange(e){
  console.log(e);
  this.setState({ manager:e});
}

onRoadNameChange(e){
  console.log(e);
  this.setState({roadName:e});
}

resetting() {
  this.setState({
    manager:'',
    roadName:'',
  });
  this.loadTeamTaskList();
}

onSearch() {
  
  $.ajax({
    type      :  'post',
    url       :  '/team/queryOnePlan',
    type      : "GET",
    data      :{userId:this.state.userId,token:this.state.token,managerId:this.state.manager,roadId:this.state.roadName},
    success     : res => {
        // console.log("123",res);
        if(res.result == 1){
          //console.log("mapList:",res.mapList);
          this.setState({
             list: res.mapList,
          });
        }
        else if(res.result == -1){
          window.location.href ='/';
        }
        else{
          message.success('查询为空！');
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
          width:"8%",
          render: (text, record, index) => {
          return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
          },
          }, {
          title: '区域名称',
          dataIndex: 'regionname',
          width: "10%",
        },{
          title: '路段名称',
          dataIndex: 'roadname',
          width: "30%",
        },
        // {
        //   title: '路段ID',
        //   dataIndex: 'roadId',
        //   width: "10%",
        // },
        {
          title: '巡检员',
          dataIndex: 'checker',
          width: "10%",
        },{
          title: '开始时间',
          dataIndex: 'starttime',
          width:"15%",
        },{
          title: '结束时间',
          dataIndex: 'limittime',
          width:"15%",
        },{
            title: '巡检周期',
            dataIndex: 'checkperiod',
            width:"10%",
          },{
            title: '巡检次数',
            dataIndex: 'checktimes',
            width:"10%",
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   width: "5%",
          //   render:(text,record)=>(
          //    <span>
          //    <a href="#"onClick={(e)=>this.handleDelete(e,record)}>删除 </a>
          //    </span>
          //   )
          // }

      ];

    const data=[];
      
    this.state.list.map((road,index)=>{
   
      for (let i = 0; i < 46; i++) {
      data.push({
          key: `${index+1}`,
          regionname:road.regionName,
          roadname:road.roadName,
          roadId:road.roadId,
          checker:road.realName,
          starttime:road.startPatrolTime,
          limittime:road.deadPatrolTime,
          checkperiod:road.patrolCycleTime,
          checktimes:road.checkTimes
              });        
      return  data;
            }
    })


      return (

      <div>
        {/* <Collapse  accordion bordered={false} onChange={this.callback} >
        <Panel header="添加巡检任务" key="1" style={customPanelStyle}>
          <Row>
            <Col span={8}>
              <label style={{ marginLeft:'15px' }}>区域名称</label>
              <Select placeholder="请选择区域" style={{ width: 160, marginLeft:'5px' }}  onFocus={this.onRegionValue} onChange={(e)=>this.onRegionChange(e)}>
                {this.state.region.map(regionName=> <Option key={regionName}>{regionName[2]}</Option>)}
              </Select>
            </Col>
            <Col span={8}>
              <label style={{ marginLeft:'15px' }}>路段名称</label>
              <Select placeholder="请选择路段" style={{ width: 160, marginLeft:'5px' }} >
                {this.state.road.map(roadName=> <Option key={roadName[0]}>{roadName[1]}</Option>)}
              </Select>
            </Col>
            <Col span={8}>
              <label style={{ marginLeft:'15px' }}>巡检员</label>
              <Select placeholder="请选择巡检员" style={{ width: 160, marginLeft:'5px' }}  onFocus={this.onCheckerValue}>
                {this.state.checker.map(checkerName=> <Option key={checkerName[0]}>{checkerName[1]}</Option>)}
              </Select>  
            </Col>
          </Row>
          <Row>
            <Col span={16} style={{ marginTop:'15px' }}>
              <label style={{ marginLeft:'15px' }}>起止时间</label>
              <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} />
            </Col>
            </Row>
          <div style={{float:'right'}}>
            <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onAddCheckPlan()}>确定</Button>
            <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.loadEventList()}>取消</Button>
          </div>
        </Panel>
        
        </Collapse> */}
          <Collapse  accordion bordered={false} history={this.props.history}>
              <Panel header="高级查询" key="1" style={{backgroundColor:'#efefef'}} history={this.props.history}>
              <Row style={{marginTop:'5px'}} history={this.props.history}>
                  <Col span={8} history={this.props.history}>
                  <label style={{ marginLeft:'15px' }}>路管员</label>
                  <Select placeholder="请选择路管员" style={{ width: 160, marginLeft:'5px' }}  value={this.state.manager} onFocus={(e)=>this.onManagerValue(e)} onChange={(e)=>this.onManagerChange(e)} history={this.props.history}>
                    {this.state.selectManagerName.map(item=> <Option key={item.managerId}>{item.managerName}</Option>)}
                  </Select>
                  </Col>
                  <Col span={8}>
                  <label style={{ marginLeft:'15px' }}>道路名称</label>
                  <Select placeholder="请选择道路名称" style={{ width: 160, marginLeft:'5px' }} value={this.state.roadName} onFocus={(e)=>this.onRoadValue(e)}  onChange={(e)=>this.onRoadNameChange(e)}>
                    {this.state.selectRoadName.map(item=> <Option key={item.roadId}>{item.roadName}</Option>)}
                  </Select>
                  </Col>
              </Row>

              <div style={{float:'right',marginBottom:'20px'}}>
                  <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                  <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
              </div>

              </Panel>
        </Collapse>
        <Table columns={columns} dataSource={data} pagination={true} bordered
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
       
        </div>
      );
      }
}
export default CheckPlan