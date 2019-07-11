//巡路日志
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Card, Tabs, Collapse, Modal, Table, message, Divider, Popconfirm, Select, Input, Row, Col, Tooltip, Pagination, LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import $ from 'jquery';
import './index.scss';

import SearchLog from './searchlog.jsx';
import LogCalendar from './logCalendar.jsx';
import LogDetail from './logDetail.jsx';
import LogExport from './logExport.jsx';
import gcoord from 'gcoord';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Option = Select.Option;

class PatrolLog extends React.Component {
    constructor(props) {
        super(props);
        this.state={
			logList: [],
            loading: true,
            detailVisible: false,
            logData: [],
            modal_taskName: '',
            mapData: {},
            mapFullData:{},
            pageSize: 5,
            page: 1,
            total: 0,
            searchFormData: new FormData(),
        }
    }

    logQuery(formData) {
        this.setState({
            page: 1,     //搜索时页面回到1
            searchFormData:formData
        });
    }
    
    componentDidMount(){
        const {page,pageSize} = this.state;
        this.loadLogList(page,pageSize);
    }
    
    loadLogList(page,pageSize) {
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("appType",'2');
        formData.append("regionId",_mm.getStorage('userInfo').regionId);

        this.queryPatrolRecord(formData,page,pageSize);
    }

    queryPatrolRecord(formData,page,pageSize) {
        this.setState({ loading: true});
        formData.set("pageNo",page);
        formData.set("pageSize",pageSize);

        //日志列表
        $.ajax({
            type        :  'post',
            url         :  '/patrolRecord/queryPatrolRecord',
            data        :  formData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     : res => {
                if(res.result == 1){
                    this.setState({
                    logList:res.PatrolRecord,
                    total: res.countPatrolRecord,
                    loading: false,
                    });
                    console.log('logList:',this.state.logList);
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

    //分页页码发生改变时
    onPageChange(page) {
        this.setState({page: page});    //改变页码
        // console.log(this.state.searchFormData.get("userName") )    //确认searchFormData有值
        this.state.searchFormData.get("endTime") == null
        ?  this.loadLogList(page, this.state.pageSize)
        :  this.queryPatrolRecord(this.state.searchFormData,page,this.state.pageSize)
    }

    //设置pageSize
    onShowSizeChange(current, pageSize) {
        this.setState({pageSize: pageSize,page: 1});
        this.loadLogList(1,pageSize);
    }
    
    //删除巡路日志
    deleteLog(e,record) {
        const i = `${record.key}`;
        console.log('delete-patrolRecordId:',this.state.logList[i].patrolRecordId);
    
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("patrolRecordId",this.state.logList[i].patrolRecordId);
    
        $.ajax({
          type        :  'post',
          url         :  '/patrolRecord/deletePatrolRecordByPatrolRecordId',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
            if(res.result == 1){
                let {total,pageSize,page,searchFormData} = this.state;

                if(total > 1){
                    total - ((page-1)*pageSize) == 1 ? (page = page - 1) : null   //最后一页只有一项，删除后页码回退一页
                    this.setState({page: page});
                }
                
                this.state.searchFormData.get("endTime") == null
                ?  this.loadLogList(page,pageSize)
                :  this.queryPatrolRecord(searchFormData,page,pageSize)
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
      
    //巡路日志查看 Modal
    checkDetail(e,record) {
        const i = `${record.key}`;
        console.log('日志Id：',this.state.logList[i].patrolRecordId);
    
        var formData = new FormData();
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);
        formData.append("patrolRecordId",this.state.logList[i].patrolRecordId);
    
        var ajax1 = $.ajax({
            type        :  'post',
            url         :  '/patrolRecord/queryPointFromPatrolRecord',
            data        :  formData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     : res => {
                if(res.result == 1){
                    console.log('一条日志：',res.PatrolRecord);
                    this.setState({ 
                        logData: res.PatrolRecord[0],
                        modal_taskName: res.PatrolRecord[0].taskName,
                    });
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
    
        var logFormData = new FormData();
        logFormData.append("patrolRecordId",this.state.logList[i].patrolRecordId);
        var ajax2 = $.ajax({
            type        :  'post',
            url         :  '/patrolRecord/mapqueryPointFromPatrolRecord',
            data        :  logFormData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须
            success     :  res => {
                // console.log("ditu",res);
                this.setState({
                    mapData: res,
                })
            },
            error       :  err => {
                message.error('error!');
            }
        });

        console.log('record',record)
        //获取路管员负责道路数据
        var ajax3 = $.ajax({
            type        :  'post',
            url         :  '/app_manageRoad/seachRoadByRoadId_app'/* ?roadid='+ record.roadId + "&region_id="+ record.regionId */,
            data        :  {roadid:record.roadId,region_id:record.regionId},
            cache       :  false,//上传文件无需缓存
            //processData :  false,//用于对data参数进行序列化处理 这里必须false
            //contentType :  false, //必须
            success     :  res => {
                console.log("ditu",res);
                //判断是否需要座标转换
                let mapFullDataTran;
                if(res.features.length>0){
                    if(res.features[0].properties.mapZuoBiaoXi==='高德'){
                        mapFullDataTran = gcoord.transform(res, gcoord.GCJ02, gcoord.WGS84);       
                    }
                    else if(RegExp("^(350921|350924)").test(record.regionId)){//如果是霞浦或者寿宁地区，X/Y/C道路是百度坐标系,该地区没有国道和省道
                        // console.log('xiapu or shouning')
                        mapFullDataTran = gcoord.transform(res, gcoord.BD09, gcoord.WGS84);  
                    }
                    else{
                        mapFullDataTran = res;
                    }
                }else{
                    mapFullDataTran = res;
                }
                
                this.setState({
                    mapFullData: mapFullDataTran,
                })
            },
            error       :  err => {
                message.error('error!');
            }
        });
        $.when(ajax1,ajax2,ajax3).done((res1,res2,res3) => {
            this.setState({detailVisible: true})
            //console.log(res3)
        })
        // $.when(ajax1).done((res1) => {
        //     this.setState({detailVisible: true})
        // })
    
    
    }
    detailHandleClick() {
        this.setState({ 
            detailVisible:false,
            logData: [],
            modal_taskName: '',
            mapData: {},
            mapFullData:{},
        });
    }

    render(){
        const columnsLog = [{
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            align: 'center',
            className: 'table-td',
            width: "7%"
          }, {
            title: '日志名称',
            dataIndex: 'taskName',
            key: 'taskName',
            align: 'center',
            className: 'table-td',
          }, {
            title: '巡路人员',
            dataIndex: 'inspector',
            key: 'inspector',
            align: 'center',
            className: 'table-td',
            width: "10%"
          }, {
            title: '路段名称',
            key: 'sectionName',
            dataIndex: 'sectionName',
            align: 'center',
            className: 'table-td',
          }, 
          {
            title: '巡路时长',
            key: 'totalTime',
            dataIndex: 'totalTime',
            align: 'center',
            className: 'table-td',
          }, 
          {
            title: '巡路里程',
            key: 'totalMileage',
            dataIndex: 'totalMileage',
            align: 'center',
            className: 'table-td',
          }, 
          {
            title: '新建时间',
            key: 'newTime',
            dataIndex: 'newTime',
            align: 'center',
            className: 'table-td',
          }, 
          {
            title: '操作',
            key: 'action',
            align: 'center',
            className: 'table-td',
            width: "120px",
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={(e) => this.checkDetail(e,record)}>查看</a>
                <Divider type="vertical" />
                <Popconfirm placement="topRight" title="确认删除此日志?" onConfirm={(e) => this.deleteLog(e,record)} okText="Yes" cancelText="No">
                <a href="javascript:;">删除</a>
            </Popconfirm>   
              </span>
            ),
        }];

        const logData = []; 
        this.state.logList.map((log, index) => {
            logData.push({
                key: index,
                num: index + 1 + ((this.state.page - 1)*this.state.pageSize),                      
                taskName:log.taskName,
                inspector:log.userName,
                sectionName: (log.roadName != null ? log.roadName : (log.roadLineName !=null) ? log.roadLineName : ''),
                newTime:moment(log.endTime).format("YYYY-MM-DD HH:mm:ss"),
                regionId:log.regionId,
                roadId:log.roadId,
                totalTime:log.totalTime,
                totalMileage:log.totalMileage,
            });        
        });

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
                        <SearchLog
                            queryPatrolRecord={(formData,page,pageSize) => this.queryPatrolRecord(formData,page,pageSize)}
                            loadLogList={(page,pageSize) => this.loadLogList(page,pageSize)} 
                            logQuery={(formData) => this.logQuery(formData)}
                            pageSize={this.state.pageSize}
                            />
				    </Panel>
				</Collapse>

                <Row style={{margin:'10px 0px'}}>
                    {/* <Col span={3}><LogExport/></Col> */}
                    <Col span={3}><LogCalendar/></Col>
                </Row>

                <Table
                    className="table-color"
                    bordered={true}
                    loading={this.state.loading}
                    rowClassName={
                        (record,index) => index % 2 === 0 ? "grayRow" : "whiteRow"
                    } 
                    columns={columnsLog}
                    dataSource={logData} 
                    pagination={false}
                    />
                    <Modal
                        width={"75%"}
                        destroyOnClose={true}
                        visible={this.state.detailVisible} 
                        onOk={() => this.detailHandleClick()}
                        onCancel={() => this.detailHandleClick()}
                        footer={null}
                        >
                        <Card
                            className='log-detail-card'
                            bordered={false}
                            title={<span>日志名称：{this.state.modal_taskName}</span>}
                            >
                            <Row gutter={16} style={{height:'100%',display:'flex',marginRight:'8px'}}>
                                {/* <Col span={20} offset={2}> */}
                                <Col span={12} offset={0} style={{flex:'1'}}>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>巡路人员：</label><Input value={this.state.logData.userName} readOnly/>
                                    </div>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>路段名称：</label><Input value={this.state.logData.roadName != null ? this.state.logData.roadName : (this.state.logData.roadLineName !=null) ? this.state.logData.roadLineName : ''} readOnly/>
                                    </div>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>路段编号：</label><Input value={this.state.logData.roadId} readOnly/>
                                    </div>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>巡路距离：</label><Input id='logDetail-totalMileage' value={this.state.logData.totalMileage} readOnly/><span style={{ marginLeft:'10px' }}>米</span>
                                    </div>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>巡路时间：</label><Input value={this.state.logData.totalTime} readOnly/>
                                    </div>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>开始时间：</label><Input value={moment(this.state.logData.startTime).format("YYYY-MM-DD HH:mm:ss")} readOnly/>
                                    </div>
                                    <div className="log--detail--content">
                                        <label style={{ marginLeft:'15px' }}>结束时间：</label><Input value={moment(this.state.logData.endTime).format("YYYY-MM-DD HH:mm:ss")} readOnly/>
                                    </div>              

                                </Col>

                                <LogDetail
                                    mapData={this.state.mapData}
                                    mapFullData={this.state.mapFullData}
                                    logData={this.state.logData}
                                    />
                            </Row>
                        </Card>
                    </Modal>
                
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

export default PatrolLog;