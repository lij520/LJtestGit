import React from 'react';
import $ from 'jquery';
import './index.scss'
import { Table,message,Collapse,Row, Col,Select,Input,Button} from 'antd';
import MUtil        from 'util/mm.jsx'

const _mm           = new MUtil();
const Panel = Collapse.Panel;
const Option = Select.Option;


class Userothers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        list            : [],
        pageNum         : 1,
        listType        : 'list',
        rolelist        : [],
        userId          : _mm.getStorage('userInfo').userId,
        token           : _mm.getStorage('userInfo').token,
        userName :'',
        roleId:'',
        regionName:'',
        organizationName:'',
    };
  }

  componentWillMount(){
    document.title = "用户信息" ;
  }

  componentDidMount(){
      this.loadUserList();
  }

  loadUserList(){
    $.ajax({
      type        :  'get',
      url         :  '/user/list',
      dataType    :  'json',
      data        : {userId:this.state.userId,token:this.state.token},
      success     : res => {
      
        console.log(res);

        if(res.result==1){
            this.setState({
              list:res.userlist
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

  onInputChange(e){

    let inputValue  = e.target.value,
    inputName       = e.target.name;
    this.setState({
        [inputName] : inputValue
    });
  }

  getRoleName(e){
    $.ajax({
      type        :  'post',
      url         :  '/role/list',
      dataType    :  'json',
      data        : {userId:this.state.userId,token:this.state.token},
      success     : res => {
      
        console.log(res);
        this.setState({
          rolelist : res
      });
       
    
         
      },
      error       : err => {
        message.error('error!');
          this.setState({
            rolelist : []
          });
      }
    });
  }

  onRoleNameChange(e){
   
    this.setState({
      roleId:e,
    });
  }

  onSearch(){
    console.log(this.state.roleId)
    $.ajax({
        type        :  'post',
        url         :  '/user/getUserByUROR',
        dataType    :  'json',
        data        : { userId:this.state.userId,
                        token:this.state.token,
                        userName:this.state.userName,
                        roleId:this.state.roleId,
                        regionName:this.state.regionName,
                        organizationName:this.state.organizationName,
                      },
        success     : res => {
        
            console.log(res);

            if(res.result==1){
                this.setState({
                    list:res.list
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

    resetting(){
        this.setState({
            userName :'',
            roleId:'',
            regionName:'',
            organizationName:'',
        });
        this.loadUserList();
    }

  render(){
    
    const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
        title: '用户编号',
        dataIndex: 'userId',
      }, {
        title: '用户名',
        dataIndex: 'userName',
      }, 
      {
        title: '真实姓名',
        dataIndex: 'realName',
      }, 
      {                    
        title: '角色',
        dataIndex: 'roleName',
      },
      {                    
        title: '所属区域',
        dataIndex: 'regionName',
      },
      {                    
        title: '所属组织',
        dataIndex: 'organizationName',
      },{                    
        title: '电话',
        dataIndex: 'phone',
      }
    ];
  
  
    const data = [];
      
    this.state.list.map((user, index) => {
        data.push({
                  key: index,
                  userId:user.userId, 
                  userName:user.userName,                     
                  realName:user.realName,
                  roleName:user.roleName,
                  regionName:user.regionName,
                  organizationName:user.organizationName,
                  phone:user.phone,
                });        
    })

    return (
        <div >
         <Collapse  accordion bordered={false} >
                <Panel header="高级查询" key="1" style={{backgroundColor:'#efefef'}} >
                <Row style={{marginTop:'5px'}}>
                    <Col span={6}>
                    <label style={{ marginLeft:'15px' }}>用户名</label>
                        <Input placeholder="请输入用户名" style={{ width:'160px', marginLeft:'5px' }} value={this.state.userName}  name="userName" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                    <Col span={6}>
                    <label style={{ marginLeft:'15px' }}>职位</label>
                    <Select placeholder="请选择职位" style={{ width: 160, marginLeft:'5px' }} value={this.state.roleId} onFocus={(e)=>this.getRoleName(e)} onChange={(e)=>this.onRoleNameChange(e)}>
                        {this.state.rolelist.map(role=><Option key={role.roleId}>{role.roleName}</Option>)}
                    </Select>
                    </Col>
                    <Col span={6}>
                    <label style={{ marginLeft:'15px' }}>区域名称</label>
                        <Input placeholder="请输入区域名称" style={{ width:'160px', marginLeft:'5px' }} value={this.state.regionName}  name="regionName" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                    
                    <Col span={6}>
                    <label style={{ marginLeft:'15px' }}>组织名称</label>
                        <Input placeholder="请输入组织名称" style={{ width:'160px', marginLeft:'5px' }} value={this.state.organizationName}  name="organizationName" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                </Row>
                <div style={{float:'right',marginBottom:'10px',marginTop:'10px'}}>
                    <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                    <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
                </div>

                </Panel>
            </Collapse>
            <Table  columns={columns} dataSource={data}  style={{marginBottom:'50px'}}
             rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/>   
        </div>
    );
  }
}
  
  
  export default Userothers;