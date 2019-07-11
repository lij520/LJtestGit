import React from 'react';
import { DatePicker, Cascader, Button, Upload, Icon, Input, Select, Table, Modal, Collapse,Row, Col,message } from 'antd';
import {Link} from 'react-router-dom';
import $ from 'jquery';


import MUtil        from '../../util/mm.jsx';
const _mm   = new MUtil();
const Panel = Collapse.Panel;
const Option = Select.Option;
const {RangePicker } = DatePicker;
let data_road=[];

class Report extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      option:[],
       userId          : _mm.getStorage('userInfo').userId,
       token          : _mm.getStorage('userInfo').token,
       modify:'',
       list:[],
       manager:'',
       roadName:'',
       selectManagerName: [],
       selectRoadName: [],
       }
}
  
componentDidMount() {
  this.loadTeamReportList();
}

loadTeamReportList() {
  $.ajax({
    url: "/team/getTeamReport",
    type: "get",
     async: false,
    data:{userId:this.state.userId,token:this.state.token},
    success: res=> {                                    
      console.log('道路建设列表：',res);
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

    
    error: err=> {
      
      this.setState({
        list : []
    });
    }
  })
}

onModifyChange(e){
  console.log(e.target.value);
  this.setState({
      modify:e.target.value,
  });
  //console.log(this.dateToString(values[0]._d)); 
}

showModal =(e,record) => {
  console.log(record.roadId);
  this.setState({
    visible: true,
    roadId:record.roadId,
    modify:record.modify,
  });
}

onReport(){
  console.log(this.state.roadId);
  console.log(this.state.modify);
  $.ajax({
    type      :  'GET',
    url       :  '/team/report',
    data      :{
               userId:this.state.userId,
              token:this.state.token,
               roadId:this.state.roadId,
               teamAdvice:this.state.modify,
               },
              
    success     : res => {
      
        console.log(res);
        if(res.result==-1){
          message.error(res.message);
          window.location.href = '/';
        }
        if(res.result==1){
          message.success(res.message);
          this.setState({
            visible: false,
            modify:'',
          });
          this.loadTeamReportList();
        }
       
       
    },
    error       : err => {
      message.error("上报失败！");
    }

  });
  
}

handleCancel = (e) => {
  console.log(e);
  this.setState({
    visible: false,
    modify:'',
  });
}

onManagerValue(e){
  $.ajax({
    type      :  'post',
    url       :  '/team/getReportManagerName',
    type      : "GET",
    data      :{userId:this.state.userId,token:this.state.token},
    success     : res => {
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
    url       :  '/team/getReportRoadName',
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
  this.loadTeamReportList();
}

onSearch() {
  
  $.ajax({
    type      :  'post',
    url       :  '/team/queryOneReport',
    type      : "GET",
    data      :{userId:this.state.userId,token:this.state.token,managerId:this.state.manager,roadId:this.state.roadName},
    success     : res => {
        console.log("123",res);
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

render(){
  
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
        width: "20%",
      }
      // ,{
      //   title: '路段ID',
      //   dataIndex: 'roadId',
      //   // width: "12%",
      //   // visible:false,
      //   // width:"0",
      //   // hidden:true,
      // }
      ,{
        title: '所属区域',
        dataIndex: 'region',
        width: "12%",
      },{
        title: '巡路员',
        dataIndex: 'inspector',
        width: "20%",
      }
      // ,{
      //   title: '巡路员ID',
      //   dataIndex: 'managerid',
      //   width: "12%",
      // }
      ,{
        title: '建设进度',
        dataIndex: 'progress',
        width: "10%",
      },{
        title: '问题类型',
        dataIndex: 'problem',
        width: "20%",
      }, 
      // {
      //   title: '道路状态',
      //   dataIndex: 'rcp_status',
      //   width: "8%",
      // },
      {
        title: '操作',
        dataIndex: 'report',
        //width: "15%",
        align:'left',
        render:(text,record)=>(
         <span>
           <Link to= { `/roadbuild/check/${record.roadId}/${record.managerid}`}>查看 </Link>
           {/* <Button onClick={(e)=>this.showModal(e,record)}>上报</Button> */}
           {record.rcp_status==2?null:<a href="javascript:;" onClick={(e)=>this.showModal(e,record)}>上报 </a>}
         </span>
        )
      }]; 

      const data_road=[];
      this.state.list.map((road,index)=>{
      data_road.push({
        key: `${index+1}`,
        region:road.regionName,
        roadname:road.roadName,
        roadId:road.roadId,
        inspector:road.realName,
        progress:road.status,
        problem:road.roadProblem,
        managerid:road.managerId,
        rcp_status:road.rcp_status,
      })
      });

     console.log(data_road);
     
    return(
        <div>
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
                    {/* <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>事件编码</label>
                        <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                    <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>巡查人员</label>
                        <Input placeholder="请输入巡查人员" style={{ width:'160px', marginLeft:'5px' }} value={this.state.userName}  name="userName" onChange={(e)=>this.onInputChange(e)} />
                    </Col> */}
                </Row>

                <div style={{float:'right',marginBottom:'20px'}}>
                    <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                    <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
                </div>

                </Panel>
      </Collapse>
      <Table columns={columns} dataSource={data_road} pagination={true} bordered
       rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>  
      <Modal
          title="道路建设情况上报"
          visible={this.state.visible}
          onOk={(e)=>this.onReport(e)}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消">
        <p>大队建议:</p>  
            <textarea style={{width:'470px',height:'200px'}} 
            onChange={(e) => this.onModifyChange(e)}
            value={this.state.modify}
            />
        </Modal>   
 </div>
    );
}
}
export default Report