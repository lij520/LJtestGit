import React from 'react';
import { Table,message} from 'antd';
import MUtil        from 'util/mm.jsx';
import $ from 'jquery';
const _mm   = new MUtil();

class RoadConditions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          userId                  : _mm.getStorage('userInfo').userId,
          token                   : _mm.getStorage('userInfo').token,
          regionId                :_mm.getStorage('userInfo').regionId,
          list                    :[],
          loading                 :true,
        } 
    }

    componentDidMount(){
        this.loadEventList();
    }
    
    loadEventList(){
        console.log(this.state.userId);
        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token ",this.state.token);
        formData.append("regionId  ",this.state.regionId);
        formData.append("type",0);
        
        $.ajax({
          type        :  'post',
          url         :  '/roadsituation/queryRoadsituation',
          data:  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => {

            console.log(res);
            if(res.result==1){
              this.setState({
                list:res.roadsituationList,
                loading:false,
              });
            }
            else if(res.result==-1){
              message.error(res.message);
              window.location.href = '/';
            }
            else{
              message.error(res.message);
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

    render(){

        const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
            title: '序号',
            dataIndex: 'number',
            width:'7%',
          }, {
            title: '道路情况',
            dataIndex: 'roadsituationName',
            width:'8%',
          }, 
          {                    
            title: '编号',
            dataIndex: 'roadsituationCode',
            width:'8%',
          },
          {                    
            title: '上报人',
            dataIndex: 'realName',
            width:'7%',
          },{                    
            title: '所属道路',
            dataIndex: 'roadName',
            width:'8%',
          },
          {                    
            title: '开始时间',
            dataIndex: 'roadsituationTime',
            width:'8%',
          },{                    
            title: '更新时间',
            dataIndex: 'updateTime',
            width:'8%',
          },{                    
            title: '内容',
            dataIndex: 'roadsituationContent',
            align:'left',
          }
          ];
      
      
          const data = [];
          
          this.state.list.map((event,index)=>{
            data.push({
                      key: index,
                      number:`${index+1}`,
                      roadsituationName:event.roadsituationName,
                      roadsituationCode:event.roadsituationCode,
                      realName:event.realName,
                      roadName:event.roadName,
                      roadsituationTime:event.roadsituationTime,
                      updateTime:event.updateTime,
                      roadsituationContent:event.roadsituationContent,
                    });        
          })
        return(             
            <div>
                <Table  columns={columns} dataSource={data}  loading={this.state.loading} style={{marginBottom:'50px'}}
                 rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>
            </div>               
        )
    }
}

export default RoadConditions;
