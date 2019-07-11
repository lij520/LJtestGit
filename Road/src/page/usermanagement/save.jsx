
import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Product              from 'service/product-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import {  Card, Col, Row,Icon,Form, Input,Button,message,Select} from 'antd';
import Encode from 'util/md5.js'; //引入js文件
import $ from 'jquery';

const FormItem = Form.Item;
const Option = Select.Option;
const _mm           = new MUtil();
const _product      = new Product();



class UserSaveCreateForm extends React.Component {
        constructor(props){
          super(props);
          this.state = {
            confirmDirty:false,
            countyRegion:[],
            townRegion:[],
            villageRegion:[],
            regionId:'',
            organizationId:'',
            countyOrganization:[],
            townOrganization:[],
            role:[],
            roleId:'',
          } 
      }
    // state = {
    //     confirmDirty: false,
    //     autoCompleteResult: [],
    //   };

    getRegionId(){
        if(this.state.regionId!='')return this.state.regionId;
        else return this.props.regionId;
      }

    getOrganizationId(){
        if(this.state.organizationId!='')return this.state.organizationId;
        else return this.props.organizationId;
    }

    getRoleId(){
        if(this.state.roleId!='')return this.state.roleId;
        else return this.props.roleId;
    }
   
    handleConfirmBlur (e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }

    compareToFirstPassword (rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
    
    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        console.log(this.state.confirmDirty);
        if (value && this.state.confirmDirty) {
            this.props.form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    oncountyRegion(e){
        $.ajax({
            type        :  'post',
            url         :  '/region/getByParentId', 
            dataType    :  'json',
            data        :  {userId:this.props.struserId,token:this.props.token,regionId:this.props.regionId,parentId:'350000000000'},
            success     : res => {
                console.log(res);

                this.setState({ 
                    countyRegion: res,
                  
                  });
            },
            error       : err => {
                message.error('error!');
               
            }
        });
    }

    oncountyRegionIdChange(value){
        console.log(value);
        this.setState({
            regionId:value,
        })
        $.ajax({
            type        :  'post',
            url         :  '/region/getByParentId', 
            dataType    :  'json',
            data        :  {userId:this.props.struserId,token:this.props.token,regionId:this.props.regionId,parentId:value},
            success     : res => {
                console.log(res);

                this.setState({ 
                    townRegion: res,
                  
                  });
            },
            error       : err => {
                message.error('error!');
               
            }
        });

    }
    
    onTownRegionIdChange(value){
        console.log(value);
        this.setState({
            regionId:value,
        })
        $.ajax({
            type        :  'post',
            url         :  '/region/getByParentId', 
            dataType    :  'json',
            data        :  {userId:this.props.struserId,token:this.props.token,regionId:this.props.regionId,parentId:value},
            success     : res => {
                console.log(res);

                this.setState({ 
                    villageRegion: res,
                  
                  });
            },
            error       : err => {
                message.error('error!');
               
            }
        });
    }

    onVillageRegionIdChange(value){
        console.log(value);
        this.setState({
            regionId:value,
        })
    }

    onCountyOrganization(value){
        $.ajax({
            type        :  'post',
            url         :  '/organization/getByParentId', 
            dataType    :  'json',
            data        :  {userId:this.props.struserId,token:this.props.token,regionId:this.props.regionId,parentId:'0',
                            tempRoleId:(_mm.getStorage('userInfo').roleId==13||_mm.getStorage('userInfo').roleId==14)?12:2,
                        },
            success     : res => {
                console.log(res);

                this.setState({ 
                    countyOrganization: res,
                  
                  });
            },
            error       : err => {
                message.error('error!');
               
            }
        });
    }

    onCountyOrganizationIdChange(value){
        console.log(value);
        this.setState({
            organizationId:value,
        })
        $.ajax({
            type        :  'post',
            url         :  '/organization/getByParentId', 
            dataType    :  'json',
            data        :  {userId:this.props.struserId,token:this.props.token,regionId:this.props.regionId,parentId:value,tempRoleId:(_mm.getStorage('userInfo').roleId==13||_mm.getStorage('userInfo').roleId==14)?12:2,},
            success     : res => {
                console.log(res);

                this.setState({ 
                    townOrganization: res,
                  
                  });
            },
            error       : err => {
                message.error('error!');
               
            }
        });
    }

    onTownOrganizationIdChange(value){
        this.setState({
            organizationId:value,
        })
    }

    onRole(e){
        $.ajax({
            type        :  'post',
            url         :  '/role/list', 
            dataType    :  'json',
            data        :  {userId:this.props.struserId,token:this.props.token},
            success     : res => {
                console.log(res);

                this.setState({ 
                    role: res,
                  });
            },
            error       : err => {
                message.error('error!');
               
            }
        });
    }

    onRoleIdChange(value){

        console.log(value);
        this.setState({
           roleId:value,
        })
    }
    
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
        const formItemLayout2 = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
          const { getFieldDecorator } = this.props.form;
        //   console.log(this.props.userId)

        return(
            <Form >
            <Row>
                <Col span={12}>
                    <FormItem
                    {...formItemLayout}
                    label="用户名"
                    >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                        initialValue:this.props.userName,
                    })(
                        <Input  />
                    )}
                    </FormItem>
                    {this.props.userId?null:
                    (
                        <div>
                            <FormItem
                            {...formItemLayout}
                            label="密码"
                            >
                            {getFieldDecorator('password', {
                                rules: [{
                                required: true, message: '请输入密码!',
                                }, {
                                validator:(rule, value, callback)=> this.validateToNextPassword(rule, value, callback),
                                }],
                                initialValue:this.props.password,
                            })(
                                <Input type="password" />
                            )}
                            </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                required: true, message: '请再次输入密码!',
                                }, {
                                validator:(rule, value, callback)=> this.compareToFirstPassword(rule, value, callback),
                                }],
                                initialValue:this.props.password,
                            })(
                                <Input type="password" onBlur={(e)=>this.handleConfirmBlur(e)} />
                            )}
                            </FormItem>
                        </div>
                    )
                    }
                    
                    <FormItem
                    {...formItemLayout}
                    label="职位"
                    >
                    {getFieldDecorator('roleId',{
                         rules: [{
                            required: true, message: '请选择职位!',
                            }],
                        initialValue:this.props.roleName,  
                    })
                    (
                        <Select placeholder="选择职位" onFocus={(e)=>this.onRole(e)}  onChange={(e)=>this.onRoleIdChange(e)}>
                        {this.state.role.map(role=> <Option key={role.roleId}>{role.roleName}</Option>)}
                        </Select>
                    )}
                    </FormItem>

                </Col>
                <Col span={12}>
                    <FormItem
                    {...formItemLayout}
                    label="真实姓名"
                    >
                    {getFieldDecorator('realName',{
                        initialValue:this.props.realName,  
                    })
                    (
                        <Input  />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="电话"
                    >
                    {getFieldDecorator('phone',{
                        rules: [{
                            required: true, message: '请输入电话!',
                            }],
                        initialValue:this.props.phone,  
                    })
                    (
                        <Input  />
                    )}
                    </FormItem>
                    <Row>
                    
                    </Row>
                    {/* <FormItem
                    {...formItemLayout}
                    label="邮箱地址"
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                        type: 'email', message: '请输入正确的邮箱地址',
                        }],
                        initialValue:this.props.email,  
                    })(
                        <Input />
                    )}
                    </FormItem>    */}
                </Col>
            </Row>
            <FormItem
                    {...formItemLayout2}
                    label="区域"
                    >
                        <Row gutter={16}>
                        <Col span={8}>
                        {getFieldDecorator('countyRegionId', {
                            rules: [{required: true, message: '请选择县级区域'}],
                            // initialValue:this.props.countyRegionName,
                            initialValue:this.props.regionName,
                        })
                        (
                            <Select placeholder="选择县级区域" onFocus={(e)=>this.oncountyRegion(e)} onChange={(e)=>this.oncountyRegionIdChange(e)} >
                            {this.state.countyRegion.map(countyRegion=> <Option key={countyRegion.regionId}>{countyRegion.regionName}</Option>)}
                            </Select>
                        )}
                        </Col>
                        <Col span={8} >
                        {getFieldDecorator('townRegionId', {
                            // initialValue:this.props.townRegionName,
                        })
                        (
                            <Select placeholder="选择镇级区域"  onChange={(e)=>this.onTownRegionIdChange(e)}>
                            {this.state.townRegion.map(townRegion=> <Option key={townRegion.regionId}>{townRegion.regionName}</Option>)}
                            </Select>
                        )}
                        </Col>
                        
                            {/* <Col span={8}>
                            {getFieldDecorator('villageRegionId', {
                            // initialValue:this.props.villageRegionName,
                            })
                            (
                            <Select placeholder="选择村级区域"  onChange={(e)=>this.onVillageRegionIdChange(e)} >
                            {this.state.villageRegion.map(villageRegion=> <Option key={villageRegion.regionId}>{villageRegion.regionName}</Option>)}
                            </Select>
                            )}
                            </Col> */}
                        </Row>  
            </FormItem>
            <FormItem
                    {...formItemLayout2}
                    label="组织"
                    >
                    <Row gutter={16}>
                        <Col span={8}>
                        {getFieldDecorator('countyOrganizationId', {
                            rules: [{required: true, message: '请选择县级组织'}],
                            initialValue:this.props.organizationName,
                        })
                        (
                            <Select placeholder="选择县级区域" onFocus={(e)=>this.onCountyOrganization(e)} onChange={(e)=>this.onCountyOrganizationIdChange(e)} >
                            {this.state.countyOrganization.map(countyOrganization=> <Option key={countyOrganization.organizationId}>{countyOrganization.organizationName}</Option>)}
                            </Select> 
                        )}
                        </Col>
                        <Col span={8} >
                        {getFieldDecorator('townOrganizationId', {
                        })
                        (
                            <Select placeholder="选择镇级组织"  onChange={(e)=>this.onTownOrganizationIdChange(e)}>
                            {this.state.townOrganization.map(townOrganization=> <Option key={townOrganization.organizationId}>{townOrganization.organizationName}</Option>)}
                            </Select>
                        )}
                        </Col>
                        </Row>  
            </FormItem>
            </Form>
        )
    }
}

const  UserSaveForm = Form.create()(UserSaveCreateForm);

class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId              : this.props.match.params.pid,
            userName            : '',
            password            : '',
            roleId              : '',
            regionId            : '',
            organizationId      : '',
            realName            : '',
            phone               : '',
            struserId           : _mm.getStorage('userInfo').userId,
            token               : _mm.getStorage('userInfo').token,
            // countyRegionName    :'',
            // townRegionName      :'',
            // villageRegionName   :'',
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    // 加载商品详情
    loadProduct(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.userId ){
            $.ajax({
                type        :  'post',
                url         :  '/user/getbyuserid', 
                dataType    :  'json',
                data        : {struserId:this.state.struserId,token:this.state.token,userId:this.state.userId},
                success     : res => {

                    if(res.result==1){
                        let list=res.userlist;

                        switch(list[0].level){
                            case 3:this.setState({countyRegionName:list[0].regionName});break;
                            case 4:this.setState({townRegionName:list[0].regionName});break;
                            case 5:this.setState({villageRegionName:list[0].regionName});break;
                        }
                        this.setState({
                            userName            : list[0].userName,
                            password            : list[0].password,
                            status              : list[0].status,
                            roleId              : list[0].roleId,
                            roleName            : list[0].roleName,
                            regionId            : list[0].regionId,
                            regionName          : list[0].regionName,
                            organizationId      : list[0].organizationId,
                            organizationName    : list[0].organizationName,
                            realName            : list[0].realName,
                            phone               : list[0].phone,
                        });
                        console.log(list[0]);
                        console.log(list[0].userName);
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
        else{
            this.setState({
                regionId               : _mm.getStorage('userInfo').regionId,
                organizationId         : _mm.getStorage('userInfo').organizationId,

            });
        }
    }
    // 简单字段的改变，比如商品名称，描述，价格，库存
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    
    // 提交表单
    onSubmit(){
        // var encode=CHAT.hex_md5(this.state.password);
        // console.log(encode);

        const form = this.formRef.props.form;
      
        form.validateFields((err, values) => {
            if (err) {
            return;
            }
            delete values.confirm;
            delete values.countyRegionId;
            delete values.townRegionId;
            delete values.villageRegionId;
            delete values.countyOrganizationId;
            delete values.townOrganizationId;
            delete values.roleId;

            var RegionId=this.formRef.getRegionId();
            var OrganizationId=this.formRef.getOrganizationId();
            values.regionId=RegionId;
            values.organizationId=OrganizationId;
            var RoleId=this.formRef.getRoleId();
            values.roleId=RoleId;
            console.log('Received values of form: ', values);
            if(this.state.userId){ //修改密码部分，不能修改密码
                values.userId = parseInt(this.state.userId);
                values.struserId=this.state.struserId;
                values.token=this.state.token;
                
                
                // console.log(user);
                $.ajax({
                    type        :  'post',
                    url         :  '/user/updateUser', 
                    dataType    :  'json',
                    data        :  values,
                    success     : res => {

                        if(res.result==1){
                            message.success('已成功修改!');
                            this.props.history.push('/user');
                            form.resetFields();
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
            else{
                values.userId=this.state.struserId;
                values.token=this.state.token;
                values.password=Encode.hex_md5(values.password);

                
                
                console.log(values);
                $.ajax({
                    type        :  'post',
                    url         :  '/user/insertUser', 
                    dataType    :  'json',
                    data        :  values,
                    success     : res => {
                    
                        if(res.result==1){
                            message.success('已成功添加!');
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
            }
         


        })
       
        }
    render(){
        
        return (
            <div style={{height:'100%'}}>   
                <Row style={{height:'100%',paddingTop: '10px',paddingBottom:' 60px'}}>
                    <Col span={24} style={{height:'100%'}}>
                    <Card  bordered className='card_home'>
                        <div  className='card_title_background'  >
                        <div className='card_news'>
                        <h1 className='save_title'> <Icon type="highlight" theme="outlined"  style={{fontSize: '30px',marginLeft: '15px',marginRight: '8px'}}/>{this.state.userId ? '修改用户' : '添加用户'}</h1>
                        </div>
                        </div>
                      
                            <div style={{padding:'40px', verticalAlign:'middle'}}>
                                < UserSaveForm wrappedComponentRef={(form) => this.formRef = form}
                                userName={this.state.userName}  password={this.state.password} roleId={this.state.roleId}   roleName={this.state.roleName} regionId={this.state.regionId} regionName={this.state.regionName} struserId={this.state.struserId}
                                organizationId={this.state.organizationId}  organizationName={this.state.organizationName} realName={this.state.realName} phone={this.state.phone} email={this.state.email} userId={this.state.userId} token={this.state.token}
                                countyRegionName={this.state.countyRegionName}  townRegionName={this.state.townRegionName} villageRegionName={this.state.villageRegionName}/>
                                <div style={{ textAlign: 'center',marginBottom:'10px'}}>
                                <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.onSubmit()}>保存</Button>
                                <Button type="primary" style={{marginLeft:'100px'}} onClick={()=>this.props.history.push('/user')}>取消</Button>
                            </div>
                            </div>
                            
                        </Card>
                    </Col>
                </Row>
             </div>

        )
    }
}
export default ProductSave;