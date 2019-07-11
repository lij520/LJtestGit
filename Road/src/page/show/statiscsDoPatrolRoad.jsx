/* 道路巡查统计 */

import React from 'react';
import {Table, message, Select, DatePicker, Row, Col, Input} from 'antd';
import moment from 'moment';
import './index.scss';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();
import $ from 'jquery';
const Option = Select.Option;
const Search = Input.Search;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const nowDate = new Date();

class StatiscsDoPatrolRoad extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           data: new Array(),
           regionId: _mm.getStorage('userInfo').regionId,
           userId: _mm.getStorage('userInfo').userId,
           token: _mm.getStorage('userInfo').token,
           roleId: _mm.getStorage('userInfo').roleId,
           regionList: [],
           loading: true,
        //    startTime: '2018-1-1',
        //    endTime: '2019-1-1',
           startTime: moment(nowDate).subtract(1,'year').format("YYYY-MM-DD"),
           endTime: moment(nowDate).format("YYYY-MM-DD"),
           roadName: '',
        }
    }

    componentDidMount(){
        console.log("今天",moment(nowDate).format("YYYY-MM-DD") )
        const {regionId, startTime, endTime, roadName} = this.state;

        this.loadStatiscs(regionId,startTime,endTime,roadName);
        this.queryRegionList();
    }
        
    loadStatiscs(regionId,startTime,endTime,roadName) {
        this.setState({
            loading: true,
        });

        $.ajax({
            type      :  'get',
            url       :  '/patrolRecord/statiscsDoPatrolRoad?regionId='+regionId+"&startTime="+startTime+"&endTime="+endTime+"&roadName="+roadName,
            success   : res => {
                this.setState({
                    data: res.result,
                    loading: false,
                },() => {
                    console.log("查询结果：",this.state.data.length+"条");
                })
            },
            error     : err => {
                message.error('error!');
            }
        });
    }

    //县级所属地区下拉框
    queryRegionList() {
        $.ajax({
            type    :  'get',
            url     :  '/patrol/regionList?regionId='+ _mm.getStorage('userInfo').regionId,
            data    :  {},
            success : res => {
                console.log(res);
                this.setState({
                    regionList: res
                })
            },
            error   : err => {
                message.error('error!');
            }
        });
    }

    onSelectChange(value,option) {
        console.log(value);
        if(value == undefined){
            value = _mm.getStorage('userInfo').regionId;
        }
        this.setState({
            regionId: value,
        });
        const {startTime, endTime, roadName} = this.state;

        this.loadStatiscs(value,startTime,endTime,roadName);
    }

    onDateChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            startTime: dateString[0],
            endTime: dateString[1],
        });
        const {regionId, roadName} = this.state;
        this.loadStatiscs(regionId,dateString[0],dateString[1],roadName);
    }

    onSearchBtn(value, event) {
        console.log(value, event);
        this.setState({
            roadName: value,
        });
        const {regionId, startTime, endTime} = this.state;
        this.loadStatiscs(regionId,startTime,endTime,value);
    }
    onInputChange(e) {
        this.setState({
            roadName: e.target.value,
        });
    }
 
    render(){
        const columns = [{
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            align: 'center',
            className: 'table-td',
            width: "64px"
          },{
            title: '路段名称',
            dataIndex: 'roadName',
            key: 'roadName',
            align: 'center',
            className: 'table-td',
          },{
            title: '路段编号',
            dataIndex: 'roadId',
            key: 'roadId',
            align: 'center',
            className: 'table-td',
          },{
            title: '最近巡查时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            align: 'center',
            className: 'table-td',
          },{
            title: '累计巡查次数',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
            className: 'table-td',
            render: text => {
                return <span>{text} 次</span>
            }
          }
        ];

        const data = [];
        this.state.data.map((item, index) => {
            data.push({
                key: index,
                num: index + 1,
                roadName: item.roadName,
                roadId: item.roadId,
                updateTime: moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
                count: item.count,
            });        
        });

        const {startTime, endTime} = this.state;

        return(
          	<div style={{marginTop:'30px'}}>
                <Row>
                    {
                        this.state.roleId === 9
                        ? 
                        <Col span={6}>
                            <span>选择地区：</span>
                            <Select
                                style={{width: '200px'}}
                                onChange={(value,option) => this.onSelectChange(value,option)}
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                allowClear
                                >
                                {
                                    this.state.regionList.map(item => <Option key={item.regionId}>{item.regionName}</Option>)
                                }
                            </Select>
                        </Col>
                        : ''
                    }
                    <Col span={9}>
                        <span>统计时段：</span>
                        <RangePicker
                            onChange={(date, dateString) => this.onDateChange(date, dateString)}
                            placeholder={['起始时间','终止时间']}
                            value={[moment(startTime,dateFormat),moment(endTime,dateFormat)]}
                            format={dateFormat}
                            // value={[moment(startTime),moment(endTime)]}
                            />
                    </Col>

                    <Col span={9}>
                        <span>路段名称：</span>
                        <Search
                            style={{width:'300px'}}
                            enterButton
                            onSearch={(value, event) => this.onSearchBtn(value, event)}
                            onChange={(e) => this.onInputChange(e)}
                            />
                    </Col>
                </Row>
        
                <Table
                    style={{marginBottom:'10px'}}
                    bordered={true}
                    loading={this.state.loading}
                    rowClassName={
                        (record,index) => index % 2 === 0 ? "grayRow" : "whiteRow"
                    } 
                    pagination={{
                        pageSize: 20
                    }}
                    columns={columns}
                    dataSource={data}
                    />
            </div>   
        );
    }
}

export default StatiscsDoPatrolRoad;
