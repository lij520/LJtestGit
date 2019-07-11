import React from 'react';
import { Tabs, Table,Pagination} from 'antd';
import $ from 'jquery';
import MUtil        from '../../util/mm.jsx';
const _mm   = new MUtil();

const TabPane=Tabs.TabPane;
let data_road1=[];
let data_road2=[];
let data_road3=[];

class ConstructionStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        list            : [],
        userId          : _mm.getStorage('userInfo').userId,
        token:_mm.getStorage('userInfo').token,
       }
}

componentDidMount(){
    this.loadEventList();
}

loadEventList(){
    console.log(this.state.userId);
    
    $.ajax({
      url       :  '/getCityRoadlistByUserId',
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

onTabChange(key){
    console.log(key);
    if(key==1){
        this.loadEventList();
    }
    if(key==2){
        $.ajax({
            url       :  '/getRoadinglistByUserId',
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
    if(key==3){
        $.ajax({
            url       :  '/getRoadedlistByUserId',
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
}

render() {
    // console.log(key);
    const columns = [{
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      width:"10%",
      render: (text, record, index) => {
      return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
      },
      },{
        title: '路段名称',
        dataIndex: 'roadname',
        width: "20%",
      }, {
        title: '区域名称',
        dataIndex: 'region',
        width: "15%",   
      }, {
        title: '负责大队',
        dataIndex: 'team',
        width: "15%",
      },{
        title: '任务状态',
        dataIndex: 'taskstatus', 
        width: "20%", 
      },
      {
        title: '更新时间',
        dataIndex: 'updatetime',
        width: "20%",
      }];

const data = [];
   
  this.state.list.map((road,index)=>{
   
    for (let i = 0; i < 46; i++) {
    data.push({
        key: `${index+1}`,
        roadname:road.roadName,
        team:road.teamName,
        region:road.regionName,
        taskstatus:road.status,
        updatetime:road.updateTime,
            });        
    return  data;
          }
  })

return (
    <Tabs onChange={(e)=>this.onTabChange(e)}>
    <TabPane tab="所有道路" key="1">
        <Table columns={columns} dataSource={data} pagination={true} bordered
        pagination={{ pageSize: 8,showQuickJumper: true,hideOnSinglePage: false }}
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
    </TabPane>

    <TabPane tab="在建道路" key="2">
        <Table columns={columns} dataSource={data} pagination={true} bordered
            pagination={{ pageSize: 8,showQuickJumper: true,hideOnSinglePage: false }}
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
    </TabPane>

    <TabPane tab="建成道路" key="3">
        <Table columns={columns} dataSource={data} pagination={true} bordered
         pagination={{ pageSize: 8,showQuickJumper: true,hideOnSinglePage: false }}
         rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
    </TabPane>
  </Tabs>
);
}
}
export default ConstructionStatus