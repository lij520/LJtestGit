
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import { Button,Icon,Table,Divider,message,Collapse,Row, Col,Select,Input, Modal,Upload} from 'antd';

import $ from 'jquery';
import './index.scss';
import './index.less';
const _mm           = new MUtil();
const Panel = Collapse.Panel;
const Option = Select.Option;

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            // pageNum         : 1,
            // listType        : 'list',
            rolelist        : [],
            userId          : _mm.getStorage('userInfo').userId,
            token           : _mm.getStorage('userInfo').token,
            roleId          :_mm.getStorage('userInfo').roleId,
            userName :'',
            roleId:'',
            regionName:'',
            organizationName:'',
            fileInfo:[],
        };
    }

    componentWillMount(){
        document.title = "用户信息" ;
      }

    
    componentDidMount(){
        this.loadUserList();
    }
    // 加载商品列表
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
   

//删除商品

    showConfirm(){

        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: '确认删除此用户？',
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
      

      onDeleteClick(e,record){
        
        this.showConfirm().then(res => {

            $.ajax({
                type        :  'post',
                url         :  '/user/removeuser',
                dataType    :  'json',
                data        : {'struserId':this.state.userId,'userId': record.userId,token:this.state.token},
                success     : res => {

                    if(res.result==1){
                        message.success('已删除此用户!');
                        this.props.history.push('/user');
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

    fileChange(info){
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(info.file.response);
            if(info.file.response.result==1){
                message.success(`${info.file.name} 文件上传成功`);
            }
            else{
                message.error(`${info.file.response.message}`);
            }
       
        this.setState({
          fileInfo:info.file.response.fileinfo,
        });

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      }
 
    render(){

        const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
            title: '用户编号',
            dataIndex: 'userId',
          },{
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
          },{                    
            title: '操作',
            dataIndex: 'action',
            render: (text,record) => (
              <div>
                <Button  size="small" data-record={record}><Link to={ `/user/modifyuser/${record.userId}`}>查看</Link></Button>
                < Divider type="vertical" />
                <Button  size="small"  onClick={(e)=>this.onDeleteClick(e,record)} >删除</Button> 
              </div>) //record为列表中某一行的值
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

        let header=(
            <div>
                <span >高级查询</span>
                <Button  type='primary' style={{float:'right'}}><Icon type="plus" theme="outlined"  /><Link to="/user/adduser" style={{color:'white'}}>新增</Link></Button>  
            </div>
        )

        const props = {
            name: 'file',
            action: '/user/importDataFromExcel',
            headers: {
              authorization: 'authorization-text',
            },
            accept:'.xls,.xlsx',
            data:{userId:this.state.userId,token:this.state.token},
            onChange:(info)=>this.fileChange(info),
            beforeUpload: (file) => {
                // const isExcel = file.type === 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                const isExcel = file.type =="application/vnd.ms-excel"||file.type =="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                if (!isExcel) {
                    message.error('你只能上传Excel文件!');
                  }
                  return isExcel
              },
        };

        return (
            <div>
                 <Row>
            
                    <div style={{float:'right'}}>
                    <Button  type='primary' style={{marginBottom:'5px',marginRight:'10px'}}><Icon type="plus" theme="outlined"  /><Link to="/user/adduser" style={{color:'white'}}>新增</Link></Button> 
                    {this.state.roleId==1?
                        <Upload {...props}>
                            <Button type='primary'>
                                <Icon type="upload" />批量导入
                            </Button>
                        </Upload>
                        :null
                    } 
                    
                    </div>
                    </Row>
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

export default ProductList;