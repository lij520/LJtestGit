import React from 'react';
import { DatePicker, Cascader, Button, Upload, Icon, Input, Select, Collapse, Table,Tabs, Row, Col,message,Modal} from 'antd';
import $ from 'jquery';
import { Link }     from 'react-router-dom';
import MUtil        from '../../util/mm.jsx';
const _mm   = new MUtil();

const TabPane=Tabs.TabPane;
const Option = Select.Option;
const Panel = Collapse.Panel;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 10,
    border: 0,
  };
  
//var data_road=[];
let data_road=[];

class RoadStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userId : _mm.getStorage('userInfo').userId,
      token  : _mm.getStorage('userInfo').token,
      list   :[],
      data_road:[],
      //order:'',
      teamName:'',
      roadName:'',
      selectRoadName:[],
      selectTeamName:[],

       }
}

componentDidMount(){
  this.loadEventList();
}

loadEventList(){
  console.log(this.state.userId);
  this.setState({loading:true});
  
  $.ajax({
    //type      :  'post',
    url       :  '/getRoadlistByUserId',
    type      : "GET",
    async: false,
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
          console.log(this.state.data_road);
        }
       
     
    },
    error       : err => {
      message.error('道路建设情况请求失败!');
        this.setState({
            list : []
        });
    }
  });
}

  showConfirm(){

          return new Promise((resolve, reject) => {
              Modal.confirm({
                  title: '确认删除此任务？',
                  onOk() {
                  return resolve(true)
                  },
                  onCancel() {
                  return reject(false)
                  },
              })
              })  
  }

delete = (e,record) => {
//   console.log(record.roadconstructionid);
//   if(record.state=="已结束"){
//     $.ajax({
//     url: "/delete",
//     type: "GET",
//     data: {
//       user_id:this.state.userId,
//       road_construction_id:record.roadconstructionid,
//       token:this.state.token
//     },
//     success: function (res) {
//       console.log(res);
//       if(res.result==-1){
//         message.error(res.message);
//         window.location.href = '/';
//       }
//       if(res.result==1){
//         alert("删除成功");
//         this.loadEventList();
//       }
     
//     },
//     error: function () {
//       alert("删除失败");
//     }
//   }) 
// }
//   else{alert("任务未结束，不可以删除！")}
//   this.loadEventList();

          this.showConfirm().then(res => {

            $.ajax({
                    url: "/delete",
                    type: "GET",
                    data: {
                      user_id:this.state.userId,
                      road_construction_id:record.roadconstructionid,
                      token:this.state.token
                    },
                    success: function (res) {
                      console.log(res);
                      if(res.result==-1){
                        message.error(res.message);
                        window.location.href = '/';
                      }
                      if(res.result==1){
                        message.success("删除成功");
                        this.loadEventList();
                      }
                    
                    },
                    error: function () {
                      message.error("删除失败");
                    }
                  }) 
              })
        .catch(reject => console.log('cancel'))

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
  this.setState({ teamName:e});
}

onRoadNameChange(e){
  console.log(e);
  this.setState({roadName:e});
}

resetting() {
  this.setState({
    teamName:'',
    roadName:'',
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
        region_id:this.state.teamName,
        road_id:this.state.roadName
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
    width:"8%",
    render: (text, record, index) => {
    return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
    },
    },{
      title: '道路建设计划ID',
      dataIndex: 'roadconstructionid',
      width: "12%",
    },{
      title: '区域名称',
      dataIndex: 'regionname',
      width: "15%",
    },{
    title: '路段名称',
    dataIndex: 'roadname',
    width: "10%",
    },{
      title: '路段ID',
      dataIndex: 'roadId',
      width: "10%",
      },{
    title: '负责大队',
    dataIndex: 'team',
    width: "12%",
    },{
    title: '任务状态',
    dataIndex: 'state',
    width: "10%",
    },{
    title: '更新时间',
    dataIndex: 'updatetime',
    width:"15%",
   },{
      title: '操作',
      dataIndex: 'operation',
      align:'left',
      render: (text, record, index) => (
      <div>  
         {record.state=='已结束'?
         (
          <div>
            <Link to= { `/roadbuild/countycheck/${record.roadId}`}>查看 </Link>
            <a href="javascript:;" onClick={(e)=>this.delete(e,record)}>删除 </a>
          </div>
         )
         :null}
      
      
      </div>
      ),
  }];

  const data_road=[];
      
  this.state.list.map((road,index)=>{
    data_road.push({
        key: `${index+1}`,
        regionname:road.regionName,
        roadname:road.roadName,
        roadId:road.roadId,
        team:road.teamName,
        state:road.status,
        updatetime:road.updateTime,
        roadconstructionid:road.roadConstructionId,
            });            
  })


return (
 <div>  
       <Collapse  accordion bordered={false} history={this.props.history}>
              <Panel header="高级查询" key="1" style={{backgroundColor:'#efefef'}} history={this.props.history}>
              <Row style={{marginTop:'5px'}} history={this.props.history}>
                  <Col span={8} history={this.props.history}>
                  <label style={{ marginLeft:'15px' }}>大队</label>
                  <Select placeholder="请选择大队" style={{ width: 160, marginLeft:'5px' }}  value={this.state.teamName} onFocus={(e)=>this.onTeamNameValue(e)} onChange={(e)=>this.onTeamNameChange(e)} history={this.props.history}>
                    {this.state.selectTeamName.map(item=> <Option key={item.region_id}>{item.organization_name}</Option>)}
                  </Select>
                  </Col>
                  <Col span={8}>
                  <label style={{ marginLeft:'15px' }}>道路名称</label>
                  <Select placeholder="请选择道路名称" style={{ width: 160, marginLeft:'5px' }} value={this.state.roadName} onFocus={(e)=>this.onRoadValue(e)}  onChange={(e)=>this.onRoadNameChange(e)}>
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

       <Table columns={columns} dataSource={data_road} bordered pagination={true}
        rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" } style={{marginBottom:100}}/>
      
      </div> 
  );
}
}
export default RoadStatus