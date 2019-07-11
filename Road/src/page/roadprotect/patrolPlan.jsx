//巡路计划
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Tabs, Collapse, Modal, Table, message, Popconfirm, Select, Row, Col, Tooltip, Pagination, LocaleProvider, Tag} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import $ from 'jquery';
import './index.scss';

import SearchPlan from './searchplan.jsx';
import AddPatrolPlanForm from './addpatrolplan.jsx';
import OneKey from './oneKey.jsx';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Option = Select.Option;

class PatrolPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            patrolList: [],
            loading: true,
            oneKeyVisible: false,
            pageSize: 5,
            page: 1,
            total: 0,
            searchFormData: new FormData(),
        }
    }

    planQuery(formData) {
        this.setState({
            page: 1,     //搜索时页面回到1
            searchFormData:formData
        });
    }
    
    componentDidMount(){
        const {page,pageSize} = this.state;
        this.loadPlanList(page,pageSize);
        // console.log("2018-10-19T03:31:12.000+0000");
        // console.log(moment("2018-10-19T03:31:12.000+0000").subtract(8,'hours').format("YYYY-MM-DD HH:mm:ss"));
    }
        
    loadPlanList(page,pageSize) {
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("appType",'2');
        formData.append("regionId",_mm.getStorage('userInfo').regionId);
        
        this.queryPatrol(formData,page,pageSize);
    }

    queryPatrol(formData,page,pageSize) {
        this.setState({ loading: true});
        formData.set("pageNo",page);
        formData.set("pageSize",pageSize);

        //任务列表
        $.ajax({
            type        :  'post',
            url         :  '/patrol/queryPatrol',
            data        :  formData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     : res => {
              if(res.result == 1){
                  //message.success(res.message);
                this.setState({
                  patrolList:res.Patrol,
                  total: res.countPatrol,
                  loading: false,
                });
                console.log('patrolList:',this.state.patrolList);
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

    // 我们可以通过has(key)来判断是否对应的key值
        // formData.append("k1", "v1");
        // formData.append("k2",null);

        // formData.has("k1"); // true
        // formData.has("k2"); // true
        // formData.has("k3"); // false

    //分页页码发生改变时
    onPageChange(page) {
        this.setState({page: page});    //改变页码
        // console.log(this.state.searchFormData.get("userName") )    //确认searchFormData有值
        this.state.searchFormData.get("endPublishTime") == null
        ?  this.loadPlanList(page, this.state.pageSize)
        :  this.queryPatrol(this.state.searchFormData,page,this.state.pageSize)
    }

    //设置pageSize
    onShowSizeChange(current, pageSize) {
        this.setState({pageSize: pageSize,page: 1});
        this.loadPlanList(1,pageSize);
    }
    
    //新建巡路计划 Modal
    addPatrolplan() {
        this.setState({ visible: true });
    }
    handleClick() {
        this.setState({ visible:false,page: 1});
    }
    
    //删除巡路计划
    deletePlan(e,record) {
        const i = `${record.key}`;
        console.log('delete-patrolId:',this.state.patrolList[i].patrolId);
    
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("patrolId",this.state.patrolList[i].patrolId);
    
        $.ajax({
          type        :  'post',
          url         :  '/patrol/deletePatrol',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            if(res.result == 1){
                //message.success(res.message);
                let {total,pageSize,page,searchFormData} = this.state;

                if(total > 1){
                    total - ((page-1)*pageSize) == 1 ? (page = page - 1) : null   //最后一页只有一项，删除后页码回退一页
                    this.setState({page: page});
                }

                this.state.searchFormData.get("endPublishTime") == null
                ?  this.loadPlanList(page,pageSize)
                :  this.queryPatrol(searchFormData,page,pageSize)
            }
            else if(res.result == 0){
                message.error(res.message);
            }
            else if(res.result == -1){
              message.error(res.message);
              window.location.href = '/';
            }
            else{
                message.error('error!');
            }
          },
          error       : err => {
              message.error('error!');
          }
        });
    
    }
    
    //一键派发
    oneKeyDistribution() {
        this.setState({ oneKeyVisible:true })
    }
    oneKeyHandleCancel() {
        this.setState({ oneKeyVisible:false,page: 1})
    }
        
    render(){
        const columnsPlan = [{
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            align: 'center',
            className: 'table-td',
            width: "64px"
          }, {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
            align: 'center',
            className: 'table-td',
            width: "200px"
          }, {
            title: '巡路人员',
            dataIndex: 'inspector',
            key: 'inspector',
            align: 'center',
            className: 'table-td',
          }, {
            title: '路段名称',
            key: 'sectionName',
            dataIndex: 'sectionName',
            align: 'center',
            className: 'table-td',
          }, {
            title: '巡路次数',
            key: 'patrolNum',
            dataIndex: 'patrolNum',
            align: 'center',
            className: 'table-td',
            width: "95px"
          }, {
            title: '完成次数',
            key: 'completeNum',
            dataIndex: 'completeNum',
            align: 'center',
            className: 'table-td',
            width: "95px"
          }, {
            title: '任务状态',
            key: 'timeOut',
            dataIndex: 'timeOut',
            align: 'center',
            className: 'table-td',
            width: "95px",
            render: (text,record) => {
                switch(text) {
                    case "1":return (record.patrolNum === record.completeNum)
                                ?<Tag color="magenta">已完成</Tag>
                                :<Tag color="#f50">超时</Tag>
                                // : `${record.patrolNum}`-`${record.completeNum}`
                                ; break;
                    case "0":return <Tag color="#87d068">正常</Tag>; break;
                    default:return <Tag color="#2db7f5">无状态</Tag>;
                }
            }   
          }, {
            title: '新建时间',
            key: 'newTime',
            dataIndex: 'newTime',
            align: 'center',
            className: 'table-td',
            width: "170px"
          }, {
            title: '操作',
            key: 'action',
            align: 'center',
            className: 'table-td',
            width: "100px",
            render: (text, record) => (
                <Popconfirm placement="topRight" title="确认删除此计划?" onConfirm={(e) => this.deletePlan(e,record)} okText="Yes" cancelText="No">
                    <a href="javascript:;">删除</a>
                </Popconfirm>) 
        }];

        const planData = [];
        this.state.patrolList.map((patrol, index) => {
            planData.push({
                key: index,
                num: index + 1 + ((this.state.page - 1)*this.state.pageSize),                      
                taskName:patrol.taskName,
                inspector:patrol.userName,
                sectionName: (patrol.roadName != null ? patrol.roadName : (patrol.roadLineName !=null) ? patrol.roadLineName : ''),
                newTime:moment(patrol.publishTime).format("YYYY-MM-DD HH:mm:ss"),
                patrolNum:patrol.patrolNum,
                completeNum:patrol.completeNum,
                timeOut: patrol.timeOut,
            });        
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
                        <SearchPlan
                            queryPatrol={(formData,page,pageSize) => this.queryPatrol(formData,page,pageSize)} 
                            loadPlanList={(page,pageSize) => this.loadPlanList(page,pageSize)} 
                            planQuery={(formData) => this.planQuery(formData)}
                            pageSize={this.state.pageSize}
                            />
				    </Panel>
				</Collapse>
                <Row>
                    <Col span={4}>
                    <Button type="primary" onClick={() => this.addPatrolplan()} style={{marginTop:10,marginBottom:10}}><Icon type="plus" theme="outlined" />新建巡路计划</Button>
                    <Modal
                        title="新建巡路计划"
                        className="modalStyle"
                        visible={this.state.visible} 
                        onOk={() => this.handleClick()}
                        onCancel={() => this.handleClick()} 
                        destroyOnClose={true}
                        footer={null}
                        >
                        <AddPatrolPlanForm
                            handleClick={() => this.handleClick()} 
                            loadPlanList={(page,pageSize) => this.loadPlanList(page,pageSize)}
                            pageSize={this.state.pageSize}
                            />
                    </Modal>
                    </Col>
                   
                    {/* 一键派发 */}
                    <Col span={20}>
                        <div style={{float:"right"}}>
                            <Button type="primary" onClick={() => this.oneKeyDistribution()} style={{marginTop:10,marginBottom:10}}>一键派发</Button>
                            <Modal
                                title="一键派发"
                                centered={true}
                                visible={this.state.oneKeyVisible}
                                onCancel={() => this.oneKeyHandleCancel()}
                                destroyOnClose={true}
                                footer={null}
                                >
                                <OneKey
                                    loadPlanList={(page,pageSize) => this.loadPlanList(page,pageSize)}
                                    oneKeyHandleCancel={() => this.oneKeyHandleCancel()}
                                    pageSize={this.state.pageSize}
                                    />
                            </Modal>

                        </div>
                    
                    </Col>
                </Row>
          
                <Table
                    className="table-color"
                    bordered={true}
                    loading={this.state.loading}
                    rowClassName={
                        (record,index) => index % 2 === 0 ? "grayRow" : "whiteRow"
                    } 
                    pagination={false}
                    columns={columnsPlan}
                    dataSource={planData}
                    />

                <LocaleProvider locale={zhCN}>
                    <Pagination
                        style={{float:'right',marginBottom:"100px",marginTop:"10px"}} 
                        pageSize={this.state.pageSize}
                        current={this.state.page}
                        total={this.state.total}
                        onChange={(page) => this.onPageChange(page)}
                        showSizeChanger
                        pageSizeOptions={['5','10', '20', '30', '40','50']}
                        onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
                        />
                </LocaleProvider>   
            </div>   
        );
    }
}

export default PatrolPlan;
