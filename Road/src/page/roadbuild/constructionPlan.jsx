import React from 'react';
import { Tabs, Table, Pagination} from 'antd';
import $ from 'jquery';
import MUtil        from '../../util/mm.jsx';
const _mm   = new MUtil();

const TabPane=Tabs.TabPane;
let data_road=[];


class ConstructionPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
     list            : [],
     userId          : _mm.getStorage('userInfo').userId,
     token           : _mm.getStorage('userInfo').token,
   }
}

componentDidMount(){
    this.loadEventList();
}

loadEventList(){
    console.log(this.state.userId);
    this.setState({loading:true});
    // var formData = new FormData();
    // formData.append("userId",this.state.userId);
    // formData.append("token ",this.state.token);
    // formData.append("regionId  ",this.state.regionId);
    // formData.append("type",this.state.type);
    
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

render() {

  // const  data_road = [];

  const columns = [{
    title: '序号',
    dataIndex: 'order',
    key: 'order',
    width:"10%",
    render: (text, record, index) => {
    return <span>{index + 1}</span>//索引从零开始，所以第一行为index+1，index为render方法里面的参数，可自动获取到下标，在ant design里面有详情解释，可参考
    },
     },
   
  {
    title: '区域名称',
    dataIndex: 'regionname',
    width: "20%",
  },
  {
    title: '路段名称',
    dataIndex: 'roadname',
    width: "20%",
  }, 
  {
    title: '负责大队',
    dataIndex: 'team',
    width: "20%",
   }, 
  {
    title: '开始时间',
    dataIndex: 'starttime',
    width:"15%",
  },{
    title: '终止时间',
    dataIndex: 'limittime',
    width:"15%",
  }];

  const data = [];
   
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
    <div>
    <Table columns={columns} dataSource={ data} pagination={true} bordered
     pagination={{ pageSize: 9,showQuickJumper: true,hideOnSinglePage: false }}
     rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
    </div>
);
}
}
export default ConstructionPlan