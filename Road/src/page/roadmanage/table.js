import React from 'react';
import { Table, Button, Divider, Modal,Icon,message,Tag,LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Link }     from 'react-router-dom';

import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
import './index.less';
const _mm   = new MUtil();

class TableList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId                  : _mm.getStorage('userInfo').userId,
      token                   : _mm.getStorage('userInfo').token,
      loading                 : this.props.loading,
    }
    
}

    componentDidMount(){
      this.setState({
        loading:false,
      })
    }

  showConfirm(){

    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '确认删除此事件？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          return resolve(true)
        },
        onCancel() {
          return reject(false)
        },
      })
    })  
    
   
  }
  
  

  handleDelete(e,record){
    
    this.showConfirm().then(res => {
      // console.log(record.eventId)

      var formData = new FormData();
      formData.append("userId",this.state.userId);
      formData.append("token ",this.state.token);
      formData.append("eventId ",record.eventId);  
      formData.append("eventStatus",0); 

      $.ajax({
        type        :  'post',
        url         :  '/eventmanage/deleteEvent', 
        data        :  formData,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success     : res => { 

          if(res.result==1){
            message.success('成功删除此事件!');
            this.props.history.push('/roadmanage');
            console.log(res);
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
           
        }
      });
            
    })
    .catch(reject => console.log('cancel'))

  }

  onShowSizeChange(e, pageSize) {
    this.props.SizeChange(e, pageSize);//讲pageNo,PageSize传给父组件，要由父组件控制其，第一次加载的时候可以重置
  }

  onPageNumberChange(e){
    this.props.PageNumberChange(e);
  }

  render() {

    console.log(this.props.list);
    // const { loading} = this.props.loading;
    
    const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
      title: '序号',
      dataIndex: 'number',
    }, {
      title: '事件状态',
      dataIndex: 'state',
      width:'8%',
    }, 
    // {                    
    //   title: '事件ID',
    //   dataIndex: 'eventId',
    // },
    {                    
      title: '事件编码',
      dataIndex: 'code',
      width:'8%',
    },
    {                    
      title: '巡路人员',
      dataIndex: 'inspector',
    },{                    
      title: '当前处理人',
      dataIndex: 'transactor',
    },{                    
      title: '问题类型',
      dataIndex: 'type',
    },{                    
      title: '事发时间',
      dataIndex: 'time',
    },{                    
      title: '所属道路',
      dataIndex: 'road',
      width:'20%',
    },
    {                    
      title: '紧急程度',
      dataIndex: 'eventLevelName',
      render: (text,record) => (
        <div>
          {record.eventLevelName=='一般'?
              <Tag color="#4cbf5e">{record.eventLevelName}</Tag>:
              record.eventLevelName=='紧急'?
              <Tag color="#f9b441">{record.eventLevelName}</Tag>:
              record.eventLevelName=='加急'?
              <Tag color="#eb6100">{record.eventLevelName}</Tag>:
              <Tag color="#e60012">{record.eventLevelName}</Tag>
          }
        
        </div>) //record为列表中某一行的值
    },
    {                    
      title: '操作',
      dataIndex: 'action',
      align:'left',
      render: (text,record) => (
        <div>
          <Link to={ `/roadmanage/check/${record.eventId}/${this.props.PageNoManage}/${this.props.PageSizeManage}/${this.props.eventType||'XX'}/${this.props.eventCode||'XX'}/${this.props.userName||'XX'}/${this.props.startTime||'XX'}/${this.props.endTime||'XX'}/${this.props.type||'XX'}/${this.props.problemType||'XX'}`}><Button  size="small" data-record={record}>查看</Button></Link>
          < Divider type="vertical" />
          {/* <a href="javascript:;">Invite {record.road}</a> */}
          <Button  size="small"  onClick={(e)=>this. handleDelete(e,record)} >删除</Button> 
        </div>) //record为列表中某一行的值
    }
    ];


    const data = [];
    
    this.props.list.map((event,index)=>{
     
      for (let i = 0; i < 46; i++) {
      data.push({
                key: index,
                number:`${(this.props.PageNoManage-1)*this.props.PageSizeManage+index+1}`,
                state:event.eventTypeName,
                code:event.eventCode,
                inspector:event.realName,
                transactor:event.nowRealName,
                type:event.problemTypeName,
                time:event.eventTime,
                road:event.roadName,
                eventId:event.eventId,
                eventLevelName:event.eventLevelName
              });        
      return  data;
            }
    })
    
  


    return (
      <div>
        {/* <div style={{ marginBottom: 16 }}>
        <Button  type="primary"><Link to="/user/adduser">新增</Link></Button> 
        </div> */}
        <LocaleProvider locale={zhCN}>
          <Table  columns={columns} dataSource={data}  loading={this.state.loading}  
          rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" } 
          pagination={{'showSizeChanger':true,'onShowSizeChange':(e, pageSize)=>this.onShowSizeChange(e,pageSize),'onChange':(e)=>this.onPageNumberChange(e),'total':this.props.countEvent,'pageSize':this.props.PageSizeManage,'pageSizeOptions':['6','12', '18', '24'],'current':this.props.PageNoManage}}
          className='table_pagination'
          />
       </LocaleProvider>
      </div>
    );
  }
}

export default TableList;