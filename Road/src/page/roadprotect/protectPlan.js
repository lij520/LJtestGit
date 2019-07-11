import React from 'react';
import { Table,Button, Modal, Form, Input, DatePicker,Select, Row, Col, Alert, notification, Divider,message,Tag} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import FormIssue from './formissue.js';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();


const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';

notification.config({
  duration: 1,
});

const openNotificationWithIcon = (type,message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

const RoadProtectAddCreateForm = Form.create()(
    class extends React.Component {

      constructor(props){
        super(props);
        this.state = {
          townRoad    :[],
          villageRoad :[],
          roadId:'',
          team:[],
        } 
    }


    getRoadId(){
      if(this.state.roadId!='')return this.state.roadId;
      else return this.props.roadId;
    }


      onCountyRoadChange(value){
        console.log(value);
        this.setState({
          roadId:value,
        })
        var formData = new FormData();
        formData.append("userId",this.props.userId);
        formData.append("token",this.props.token);
        formData.append("parentId",value);


        $.ajax({
            type        :  'post',
            url         :  '/maintenance/getByParentId', 
            data        :  formData,
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success     : res => { 
              console.log(res);
              this.setState({ 
                townRoad: res,
              
              });
            },
            error       : err => {
              message.error('error!');
              
            }
        });

      }

      onTownRoadChange(value){
        this.setState({
          roadId:value,
        })
        var formData = new FormData();
        formData.append("userId",this.props.userId);
        formData.append("token",this.props.token);
        formData.append("parentId",value);


        $.ajax({
            type        :  'post',
            url         :  '/maintenance/getByParentId', 
            data        :  formData,
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success     : res => { 
              console.log(res);
              this.setState({ 
                villageRoad: res,
              
              });
            },
            error       : err => {
              message.error('error!');
              
            }
        });

      }

      onVillageRoadChange(value){
        this.setState({
          roadId:value,
        })
      }

      onIssueTeam(){
        var formData = new FormData();
        formData.append("userId",this.props.userId);
        formData.append("token",this.props.token);
        formData.append("regionId",_mm.getStorage('userInfo').regionId);
        formData.append("roleId",8);
        

        $.ajax({
          type        :  'post',
          url         :  '/maintenance/getNextRoadChiefTeam', 
          data        :  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => { 
            console.log(res);
    
            if(res.result==1){
              this.setState({ team:res.userList});
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

      }


      render() {
     
        const { visible, onCancel, onSubmit, form } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },

        };
     
        return (
          <Modal
            visible={visible}
            title="添加道路养护计划"
            okText="上报" cancelText='取消'
            onCancel={onCancel}
            onOk={onSubmit}
            destroyOnClose={true}
          >
            <Form layout="vertical">

              <FormItem {...formItemLayout} label="计划名称">
                {getFieldDecorator('planName', {
                  rules: [{ required: true, message: '请填写计划名称' }],
                  initialValue:this.props.maintenancePlanName,
                })
                (<Input type="textarea" />)}
              </FormItem>

{/* 一个formItem里面存在多个child怎样实现校验 */}
              <FormItem {...formItemLayout} label="路段"  > 
                  <Row gutter={16}>
                  <Col span={8}>
                    <Select placeholder="选择县道"  onChange={(e)=>this.onCountyRoadChange(e)} >
                      {this.props.countyRoad.map(countyRoad=> <Option key={countyRoad.roadId}>{countyRoad.roadName}</Option>)}
                    </Select>
                  </Col>
                  <Col span={8} >
                    <Select placeholder="选择镇道"  onChange={(e)=>this.onTownRoadChange(e)}>
                    {this.state.townRoad.map(townRoad=> <Option key={townRoad.roadId}>{townRoad.roadName}</Option>)}
                    </Select>
                  </Col>
                  <Col span={24}>
                  {getFieldDecorator('villageRoad', {
                    rules: [{required: true, message: '请选择村道'}],
                    initialValue:this.props.roadName,
                  })
                  (
                    <Select placeholder="选择村道"  onChange={(e)=>this.onVillageRoadChange(e)} style={{marginTop:'7px'}}>
                    {this.state.villageRoad.map(villageRoad=> <Option key={villageRoad.roadId}>{villageRoad.roadName}</Option>)}
                    </Select>
                  )}
                    </Col>
                    </Row>
              </FormItem>

              <FormItem {...formItemLayout}label="起止时间">
                {getFieldDecorator('timeout', {
                  rules: [{ required: true, message: '请设置起止时间' }],
                  initialValue:[moment(this.props.startTime, dateFormat), moment(this.props.endTime, dateFormat)],
                })(
                  <RangePicker 
                  //  defaultValue={[moment(this.props.startTime, dateFormat), moment(this.props.endTime, dateFormat)]}
                  format={dateFormat} />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="周期">
                {getFieldDecorator('period', {
                  rules: [{ required: true, message: '请填写周期' }],
                  initialValue:this.props.cycle,
                })
                (<Input type="textarea" />)}
              </FormItem>

               <FormItem {...formItemLayout} label="下发人员">
                {getFieldDecorator('nextUserId', {
                  rules: [{ required: true, message: '请选择下发大队' }],
                  initialValue:this.props.nextRealName,
                })
                (
                  <Select placeholder="请选择下发人员" onFocus={(e)=>this.onIssueTeam(e)}>
                  {this.state.team.map(team=> <Option key={team.userId}>{team.realName}</Option>)}
                 </Select>//路管员应该为上报的人员，只能单选
                )}
              </FormItem>
  
             
            </Form>
          </Modal>
        );
      }
    }
  );

class ProtectPlan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          userId                  : _mm.getStorage('userInfo').userId,
          token                   : _mm.getStorage('userInfo').token,
          regionId                : _mm.getStorage('userInfo').regionId,
          roleId                  :_mm.getStorage('userInfo').roleId,
          list                    :[],
          loading                 : false,
          visible                 : false,
          countyRoad              :[],
          maintenancePlanId       :'',
          roadId                  :'',
          startTime               :moment().startOf('day').subtract(7, 'days'),
          endTime                 :moment().endOf('day'),
          roadName                :'',
        } 
    }

    componentDidMount(){
        this.loadEventList();
    }
    
    loadEventList(){
     
        this.setState({loading:true});
        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token",this.state.token);
        if(this.state.roleId==8){
          formData.append("type",2);
        }
        if(this.state.roleId==9){
          formData.append("type",1);
        }
        if(this.state.roleId==10){
          formData.append("type",0);
          formData.append("maintenancePlanStatus",0);
        }

        
        $.ajax({
          type        :  'post',
          url         :  '/maintenance/queryMaintenancePlan',
          data:  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => {
          
              console.log(res);

              if(res.result==1){
                this.setState({
                    list:res.maintenanceList,
                    loading:false
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

    // state = {
    //   visible: false,
    // };
  
    showModal = () => {
      this.setState({ visible: true });
      var formData = new FormData();
      formData.append("userId",this.state.userId);
      formData.append("token",this.state.token);
      formData.append("parentId",'00000000000000');
      formData.append("regionId",this.state.regionId);

      $.ajax({
          type        :  'post',
          url         :  '/maintenance/getByParentId', 
          data        :  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => { 
            // this.props.history.push('/roadmanage')
            console.log(res);
            this.setState({ 
              countyRoad: res,
             
            });
          },
          error       : err => {
            message.error('error!');
             
          }
      });

    }
  
    handleCancel = () => {
      const form = this.formRef.props.form;
      form.resetFields();
      this.setState({ 
        visible: false,
        maintenancePlanId:'',
        maintenancePlanName:'',
        startTime:'',
        endTime:'',
        roadId:'',
        cycle:'',
        nextRealName:'',
        roadName:'',
        startTime               :moment().startOf('day').subtract(7, 'days'),
        endTime                 :moment().endOf('day'),
      });
    }
  
    dateToString(date) {   
      var y = date.getFullYear();    
      var m = date.getMonth() + 1;    
      m = m < 10 ? '0' + m : m;    
      var d = date.getDate();    
      d = d < 10 ? ('0' + d) : d;    
      return y + '-' + m + '-' + d;
   };
  
    handleSubmit = () => {
      const form = this.formRef.props.form;
      var RoadId=this.formRef.getRoadId();
      console.log(RoadId,this.state.maintenancePlanId)
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        values.timeout={'startTime':this.dateToString(values.timeout[0]._d),'endTime':this.dateToString(values.timeout[1]._d)}
        console.log('Received values of form: ', values);

        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token",this.state.token);
        formData.append("maintenancePlanId",this.state.maintenancePlanId);
        formData.append("maintenancePlanName",values.planName);
        formData.append("startTime",values.timeout.startTime);
        formData.append("endTime",values.timeout.endTime);
        formData.append("roadId",RoadId);
        formData.append("cycle",values.period);
        formData.append("maintenancePlanStatus",3);
        

        if(this.state.maintenancePlanId!=''){

          $.ajax({
            type        :  'post',
            url         :  '/maintenance/updateMaintenancePlan', 
            data        :  formData,
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success     : res => { 
              
              console.log(res);

              if(res.result==1){
                message.success('修改养护计划成功!');
                this.loadEventList(); 
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

          this.setState({
            maintenancePlanId:'',
          })
        }
        else{
          formData.append("regionId",this.state.regionId);
          formData.append("nextUserId",values.nextUserId);
          console.log(values.nextUserId)

            $.ajax({
              type        :  'post',
              url         :  '/maintenance/newMaintenancePlan', 
              data        :  formData,
              cache: false,//上传文件无需缓存
              processData: false,//用于对data参数进行序列化处理 这里必须false
              contentType: false, //必须
              success     : res => { 
                
                console.log(res);

                if(res.result==1){
                  message.success('养护计划上报成功!');
                  this.loadEventList(); 
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

        }
        form.resetFields();
        this.setState({ 
          maintenancePlanId:'',
          maintenancePlanName:'',
          startTime:'',
          endTime:'',
          roadId:'',
          cycle:'',
          nextRealName:'',
          roadName:'',
          startTime               :moment().startOf('day').subtract(7, 'days'),
          endTime                 :moment().endOf('day'),
          visible: false,
        });  
     
      });
     
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }

  //   //下发功能
  // issue(e,record){

    
    
  //   openNotificationWithIcon('success','Success','已成功下发');
  //   var formData = new FormData();
  //   formData.append("userId",this.state.userId);
  //   formData.append("token",this.state.token);
  //   formData.append("maintenancePlanId",record.planId);
  //   formData.append("maintenancePlanStatus",3);
  //   formData.append("nextUserId",4);
  //   $.ajax({
  //     type        :  'post',
  //     url         :  '/maintenance/updateMaintenancePlan', 
  //     data        :  formData,
  //     cache: false,//上传文件无需缓存
  //     processData: false,//用于对data参数进行序列化处理 这里必须false
  //     contentType: false, //必须
  //     success     : res => { 

  //        console.log(res);
  //       if(res.result==1){
         
  //         this.loadEventList(); 
  //       }
  //       else if(res.result==-1){
  //         message.error(res.message);
  //         window.location.href = '/';
  //       }
  //       else{
  //         message.error(res.message);
  //       }
        
       
  //     },
  //     error       : err => {
  //       message.error('error!');
  //     }
  // });
 
  // }

  modify= (e,record) => { //修改
    console.log(record);

    // switch(record.roadLevel){
    //       case 0:this.setState({countyRoadName:record.road});break;
    //       case 1:this.setState({townRoadName:record.road});break;
    //       case 2:this.setState({villageRoadName:record.road});break;
    //     }

    this.setState({
      maintenancePlanId:record.planId,
      maintenancePlanName:record.planName,
      startTime:record.startTime,
      endTime:record.endTime,
      roadId:record.roadId,
      cycle:record.period,
      nextRealName:record.nextRealName,
      roadName:record.road,
    })
    this.showModal();
  }

  // accept(e,record){
    
  //   openNotificationWithIcon('success','Accept','已同意实施该养护计划！');
  //   var formData = new FormData();
  //   formData.append("userId",this.state.userId);
  //   formData.append("token",this.state.token);
  //   formData.append("maintenancePlanId",record.planId);
  //   formData.append("maintenancePlanStatus",1);

  //   $.ajax({
  //     type        :  'post',
  //     url         :  '/maintenance/updateMaintenancePlan', 
  //     data        :  formData,
  //     cache: false,//上传文件无需缓存
  //     processData: false,//用于对data参数进行序列化处理 这里必须false
  //     contentType: false, //必须
  //     success     : res => { 
      

  //       if(res.result==1){
  //         this.loadEventList(); 
  //       }
  //       else if(res.result==-1){
  //         message.error(res.message);
  //         window.location.href = '/';
  //       }
  //       else{
  //         message.error(res.message);
  //       }
  //     },
  //     error       : err => {
  //       message.error('error!');
         
  //     }
  //   });
   
  // }

  // retreat(e,record){
  //   openNotificationWithIcon('error','Retreat','不同意实施该养护计划，退回重新修改！');

  //   var formData = new FormData();
  //   formData.append("userId",this.state.userId);
  //   formData.append("token",this.state.token);
  //   formData.append("maintenancePlanId",record.planId);
  //   formData.append("maintenancePlanStatus",2);
    
  //   $.ajax({
  //     type        :  'post',
  //     url         :  '/maintenance/updateMaintenancePlan', 
  //     data        :  formData,
  //     cache: false,//上传文件无需缓存
  //     processData: false,//用于对data参数进行序列化处理 这里必须false
  //     contentType: false, //必须
  //     success     : res => { 
       
  //       console.log(res);

  //       if(res.result==1){
         
  //         this.loadEventList(); 
  //       }
  //       else if(res.result==-1){
  //         message.error(res.message);
  //         window.location.href = '/';
  //       }
  //       else{
  //         message.error(res.message);
  //       }
  //     },
  //     error       : err => {
  //       message.error('error!');
         
  //     }
  // });
    
  // }

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

  delete(e,record){

    this.showConfirm().then(res => {
        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token",this.state.token);
        formData.append("maintenancePlanId",record.planId);


        $.ajax({
          type        :  'post',
          url         :  '/maintenance/deleteMaintenancePlan', 
          data        :  formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          success     : res => { 
          

            if(res.result==1){
              message.success('成功删除此事件!');
              this.loadEventList(); 
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
    .catch(reject =>console.log('cancel'))

      
  }


  

  render(){

  let  columns=[];

//大队仅能查看养护计划，不能进行任何操作
  if(this.state.roleId==8){
    columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
      title: '序号',
      dataIndex: 'number',
    },
    {
      title: '计划名',
      dataIndex: 'planName',
    }, 
    {                    
      title: '路段编号',
      dataIndex: 'roadId',
    },
    {                    
      title: '路段',
      dataIndex: 'road',
    },
    {                    
      title: '人员',
      dataIndex: 'person',
    },{                    
      title: '周期',
      dataIndex: 'period',
    },
    {                    
      title: '开始时间',
      dataIndex: 'startTime',
    },{                    
      title: '结束时间',
      dataIndex: 'endTime',
    },
    {                    
      title: '修改时间',
      dataIndex: 'remark',
    },
    {                    
      title: '状态',
      dataIndex: 'state',
      render: (text,record) => (
        <div>
          {record.remark==''?
              <Tag color="#4cbf5e">下发</Tag>:
              <Tag color="#e60012">修改</Tag>
          }
        
        </div>) //record为列表中某一行的值
    }]

  }
  //县级能进行下发或修改，显示所有状态的表格，市级只显示上报状态的表格，可进行同意或退回。
  else{
    columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
      title: '序号',
      dataIndex: 'number',
      width:'6%',
    }, 
    {
      title: '计划名',
      dataIndex: 'planName',
      width:'8%',
    }, 
    // {                    
    //   title: '路段编号',
    //   dataIndex: 'roadId',
    // },
    {                    
      title: '路段',
      dataIndex: 'road',
      width:'15%',
    },
    {                    
      title: '人员',
      dataIndex: 'person',
    },
    {                    
      title: '下发人员',
      dataIndex: 'nextRealName',
      width:'10%',
    },
    {                    
      title: '周期',
      dataIndex: 'period',
      width:'6%',
    },
    {                    
      title: '开始时间',
      dataIndex: 'startTime',
    },{                    
      title: '结束时间',
      dataIndex: 'endTime',
    },
    {                    
      title: '修改时间',
      dataIndex: 'remark',
    },
    {                    
      title: '状态',
      dataIndex: 'state',
      render: (text,record) => (
        <div>
          {record.remark==''?
              <Tag color="#4cbf5e">下发</Tag>:
              <Tag color="#e60012">修改</Tag>
          }
        
        </div>) //record为列表中某一行的值
    }
    ,{ 
      title: '操作',
      dataIndex: 'action',
      render: (text,record) => (
        // record.state=='同意'|| record.state=='退回'?
        // (
        //   record.state=='同意'?
        //   (
        //     <div>
        //       {/* <Button  size="small"  onClick={(e)=>this.issue(e,record)} >下发</Button>  */}
        //       <FormIssue planId={record.planId} loadEventList={()=>this.loadEventList()}/>
        //     </div>
        //   )
        //   :
        //   (
        //     <div>
        //       <Button  size="small"  onClick={(e)=>this.modify(e,record)} >修改</Button> 
        //     </div>
        //   )
          
        // )
        // :
        // (
        //   record.state=='上报'&&this.state.roleId==10?
        //   (
        //     <div>
        //       <Button  size="small" onClick={(e)=>this.accept(e,record)}>同意</Button>
        //       < Divider type="vertical" />
        //       <Button  size="small"  onClick={(e)=>this.retreat(e,record)} >退回</Button>
        //     </div>
        //   )
        //   :null
        // )

          <div>
            <Button  size="small"  onClick={(e)=>this.modify(e,record)} >修改</Button> 
            <Button  size="small"  onClick={(e)=>this.delete(e,record)} >删除</Button> 
          </div>
        ) //record为列表中某一行的值                
    }
    ];
  }
    
  
  
      const data = [];
      
      this.state.list.map((plan,index)=>{
        data.push({
                  key: index,
                  number:`${index+1}`,
                  planId:plan.maintenancePlanId,
                  planName:plan.maintenancePlanName,
                  roadId:plan.roadId,
                  road:plan.roadName,
                  person:plan.realName,
                  period:plan.cycle,
                  nextRealName:plan.nextRealName,
                  startTime:plan.startTime,
                  endTime:plan.endTime,
                  state:plan.maintenancePlanStatusName,
                  remark:plan.remark
                });        
      })
     
      let addButton=null;
      if(this.state.roleId==9){
        addButton=(
        <div style={{display:'inline-block',marginBottom:'10px'}} >
          <Button type="primary" onClick={this.showModal} style={{float:'right'}}>添加道路养护计划</Button>
          <RoadProtectAddCreateForm   userId={this.state.userId}  token={this.state.token}
            countyRoad={this.state.countyRoad}  
            maintenancePlanId={this.state.maintenancePlanId} maintenancePlanName={this.state.maintenancePlanName}
            startTime={this.state.startTime} endTime={this.state.endTime} roadId={this.state.roadId} roadName={this.state.roadName}  
            cycle={this.state.cycle} 
            nextRealName={this.state.nextRealName}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
        </div>
        
        )
      }
     
      return(             
          <div >
              {addButton}
               <Table  columns={columns} dataSource={data}  loading={this.state.loading} style={{marginBottom:'30px'}}
               rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }
               />
              
          </div>               
      )
  }
}

export default ProtectPlan;
