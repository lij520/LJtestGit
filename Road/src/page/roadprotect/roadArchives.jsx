/**
 * 道路档案
 */

import React from 'react';
import {Button, Collapse, Table, message, Popconfirm, Select, Pagination, LocaleProvider, Tag, Row, Modal, Form} from 'antd';
import SearchRoad from './searchRoad.jsx';
import MUtil from 'util/mm.jsx';
import $ from 'jquery';
import './index.less';

const _mm   = new MUtil();
const Panel = Collapse.Panel;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

class RoadAllocationForm extends React.Component {
   
    handleSubmit(e) {
        let dataInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(dataInfo));

        e.preventDefault();
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            for(var i = 0; i < dataInfo.roadName.length; i++){
                this.props.updateRoadUser(dataInfo.roadName[i],dataInfo.userId);
            }
            const roadName = '';
            const userId = '';
            this.props.loadTableAndSelectList(roadName, userId);
            this.props.openOrCloseModal();
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem {...formItemLayout} label="巡路人员：">
              {getFieldDecorator('userId', {
                rules: [{
                  required: true,
                  message: '巡路人员不能为空！',
                }],
              })(
                <Select
                    showArrow
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                    {
                      this.props.realName.map(item => <Option key={item.user_id}>{item.real_name}</Option>)
                    }
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="路段名称：">
              {getFieldDecorator('roadName', {
                rules: [{
                  required: true,
                  message: '路段名称不能为空！',
                }],
              })(
                <Select
                    placeholder="请选择路段名称"
                    mode="multiple"
                    showArrow
                    showSearch
                    allowClear
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                    {
                      this.props.list.map(item => <Option key={item.roadId}>{item.roadName}</Option>)
                    }
                </Select>
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 11 }}>
              <Button type="primary" htmlType="submit">分配</Button>
            </FormItem>
          </Form>  
        )
    }

}
const RoadAllocation = Form.create()(RoadAllocationForm);

class RoadArchives extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            loading: false,
            realName: new Array(),
            list: new Array(),
            roadId: '',
        }
    }

    componentDidMount(){
      const roadName = '';
      const userId = '';

      this.loadTableAndSelectList(roadName, userId);
      this.loadSelectUserList();
    }

    loadSelectUserList() {
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("roleType",'50');
        formData.append("regionId",_mm.getStorage('userInfo').regionId);
       
        $.ajax({
          type        :  'post',
          url         :  '/patrol/queryUserList',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            if(res.result == 1){
              this.setState({
                realName:res.userList,
              });
            }
            else if(res.result == -1){
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

    loadTableAndSelectList(roadName, userId) {
        var formData = new FormData();
        formData.set("regionId",_mm.getStorage('userInfo').regionId);
        formData.set("roadName", roadName);
        formData.set("userId", userId);
      
        $.ajax({
          type        :  'post',
          url         :  '/patrol/queryRoad',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            //   const arr = [];
            //   for(var i = 0;i < res.roads.length;i++){
            //     if('realName' in res.roads[i]){
            //       arr.push(res.roads[i].realName);
            //     }
            //   }
            //   var realName = [];
            //   for(var i = 0; i < arr.length; i++){
            //       if(realName.indexOf(arr[i]) == -1){
            //         realName.push(arr[i]);
            //       }
            //   }
  
              this.setState({
                list:res.roads,
                // realName: realName,
              });
              console.log('queryList',this.state.list);
          },
          error       : err => {
              message.error('error!');
          }
        });
    }

    openOrCloseModal() {
        this.setState({
            // visible: true,
            visible: !this.state.visible
        })
    }

    onRealNameChange(value, option) {
        // console.log(value,option);
        console.log(this.state.roadId);
        const {roadId} = this.state;
        this.updateRoadUser(roadId, value);
    }

    updateRoadUser(roadId, userId) {
        $.ajax({
            type: 'get',
            url: '/checkRecord/updateRoadUser',
            data: {
                userId: userId,
                roadId: roadId,
            },
            success: res => {
                console.log(res);
                this.loadTableAndSelectList();
            },
            error: err => {
                message.error('error!');
            }

        })
    }

    check(record) {
        console.log(record);
    }
        
    render(){
        const columns = [{
            title: '路线编码',
            dataIndex: 'roadId',
            key: 'roadId',
            align: 'center',
            className: 'table-td',
          },{
            title: '路段名称',
            dataIndex: 'roadName',
            key: 'roadName',
            align: 'center',
            className: 'table-td',
          },{
            title: '巡路人员',
            dataIndex: 'realName',
            key: 'realName',
            align: 'center',
            className: 'table-td',
            width: '300px',
            render: (text,record) => {
                return (
                    <Select
                        className={record.key % 2 === 0 ?"user-select-gray":"user-select-white"}
                        style={{width:'80%'}}
                        value={text}
                        onFocus={() => this.setState({roadId: record.roadId})}
                        onChange={(value, option) => this.onRealNameChange(value, option)}
                        // showSearch
                        // optionFilterProp="children"
                        showArrow={false}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        >
                        {
                            this.state.realName.map(item => <Option key={item.user_id}>{item.real_name}</Option>)
                        }
                    </Select>
                )
            }
          },
        //   {
        //     title: '操作',
        //     key: 'action',
        //     align: 'center',
        //     className: 'table-td',
        //     width: "100px",
        //     render: (text, record) => (
        //         // <Popconfirm placement="topRight" title="确认删除此计划?" onConfirm={(e) => this.deletePlan(e,record)} okText="Yes" cancelText="No">
        //         //     <a href="javascript:;">删除</a>
        //         // </Popconfirm>
        //         <a href="javascript:;" onClick={() => this.check(record)}>查看</a>
        //         ) 
        //   }
        ];

        const data = [];
        this.state.list.map((item,index) => {
            data.push({
                key: index,
                roadId: item.roadId,
                roadName: item.roadName,
                realName: 'realName' in item ? item.realName : '',
            })
        })

        return(
          	<div>
                <Collapse
                    defaultActiveKey={['1']}
                    accordion
                    bordered={false}
                    >
				    <Panel
                        header="高级查询"
                        key="1"
                        style={{backgroundColor:'#efefef'}}
                        >
				        {/*查询表单*/}
                        <SearchRoad
                            realName={this.state.realName}
                            list={this.state.list}
                            loadTableAndSelectList={(roadName, userId) => this.loadTableAndSelectList(roadName, userId)}
                            />
				    </Panel>
				</Collapse>

                <Row style={{marginTop:'10px'}}>
                    <Button type='primary' onClick={() => this.openOrCloseModal()}>道路分配</Button>
                    <Modal
                        title='道路分配'
                        centered
                        width={'700px'}
                        destroyOnClose
                        visible={this.state.visible}
                        onCancel={() => this.openOrCloseModal()}
                        footer={null}
                        >
                        <RoadAllocation
                            realName={this.state.realName}
                            list={this.state.list}
                            openOrCloseModal={() => this.openOrCloseModal()}
                            updateRoadUser={(roadId, userId) => this.updateRoadUser(roadId, userId)}
                            loadTableAndSelectList={(roadName, userId) => this.loadTableAndSelectList(roadName, userId)}
                            openOrCloseModal={() => this.openOrCloseModal()}
                            />
                    </Modal>
                </Row>
                
                <Table
                    style={{marginBottom:'80px'}}
                    className="table-color"
                    bordered={true}
                    loading={this.state.loading}
                    rowClassName={
                        (record,index) => index % 2 === 0 ? "grayRow" : "whiteRow"
                    } 
                    pagination={{
                        pageSize: 20,
                    }}
                    columns={columns}
                    dataSource={data}
                    />
            </div>   
        );
    }
}

export default RoadArchives;
