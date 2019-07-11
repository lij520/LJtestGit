import React from 'react';
import { Table, Button, Divider, Modal,message} from 'antd';
import { Link }     from 'react-router-dom';


class TableList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        list            : [],
        pageNum         : 1,
        listType        : 'list',
        loading         : false,
       
    };
}
 


  componentDidMount(){
    this.loadEventList();
  }

  loadEventList(){
    this.setState({loading:true});
    $.ajax({
      type        :  'get',
      url         :  'http://localhost:8081/user/list',
      dataType    :  'json',
      data        : null,
      success     : res => {
          // console.log(res.userlist);
          this.setState({
              list:res.userlist,
              loading:false
          });
      },
      error       : err => {
        message.error('error!');
          this.setState({
              list : []
          });
      }
    });
  }

 

  

  showConfirm(){

    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '确认删除此事件？',
        
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
    
    this.showConfirm().then(res => console.log(record))
    .catch(reject => console.log('cancel'))

  }

  render() {
    const { loading} = this.state;
    
    const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
      title: '序号',
      dataIndex: 'number',
    }, {
      title: '事件状态',
      dataIndex: 'state',
    }, {                    
      title: '事件编码',
      dataIndex: 'code',
    },{                    
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
    },{                    
      title: '操作',
      dataIndex: 'action',
      render: (text,record) => (
        <div>
          <Button  size="small" data-record={record}><Link to={ `/user/modifyuser`}>查看</Link></Button>
          < Divider type="vertical" />
          {/* <a href="javascript:;">Invite {record.road}</a> */}
          <Button  size="small"  onClick={(e)=>this. handleDelete(e,record)} >删除</Button> 
        </div>) //record为列表中某一行的值
    }
    ];


    const data = [];
    
    this.state.list.map((event,index)=>{
     
      for (let i = 0; i < 46; i++) {
      data.push({
                key: index,
                number:`${index+1}`,
                state:event.userId,
                code:'20180922113630',
                inspector:'黄琴招',
                transactor:'官庄畲族乡路长办',
                type:'路产路权问题',
                time:'2018/09/22 11:36:30',
                road:'蛟洋镇崇下线',
              });        
      return  data;
            }
    })
    
  


    return (
      <div>
        {/* <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div> */}
        <Table  columns={columns} dataSource={data}  loading={loading}/>
       
      </div>
    );
  }
}

export default TableList;