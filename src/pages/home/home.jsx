import React, { Component } from 'react';

import './home.less';
import { Card, Tabs, Timeline, DatePicker, Icon, Statistic } from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import Basic from './gupiao';
import moment from 'moment';
import { data, data1 } from './constnumber'
/*
首页路由
*/
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


const cols = {
    month: {
        range: [0, 1]
    }
};

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: "fold",
    fields: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],
    // 展开字段集
    key: "月份",
    // key字段
    value: "月均降雨量" // value字段
});
export default class Home extends Component {

    callback = (key) => {
        console.log(key);
    }

    render() {
        const number = 12478956;
        const operations = <span>
            <RangePicker
                defaultValue={[moment('2019/01/01', dateFormat), moment('2019/09/24', dateFormat)]}
                format={dateFormat}
            />
        </span>;

        const extra = <span>
            <Icon type="redo" />
        </span>
        return (
            <div className='home'>
                <div style={{ position: 'relative', width: '100%', marginTop: '1%' }}>
                    <Card title="商品总量" style={{ position: 'absolute', width: '20%', left: '5%' }}>
                        <Statistic value={number} suffix="个"/>
                        <Statistic
                            // title="周同比"
                            value={15}
                            precision={0}
                            valueStyle={{ fontSize:'16px',color: 'black' }}
                            prefix={<span>周同比</span>}
                            suffix={<span>%<Icon type="arrow-down" style={{color:'#cf1322'}}/></span>}
                        />
                        <Statistic
                            // title="日同比"
                            value={10}
                            precision={0}
                            valueStyle={{ fontSize:'16px',color: 'black' }}
                            prefix={<span>日同比</span>}
                            suffix={<span>%<Icon type="arrow-up" style={{color:'#3f8600'}}/></span>}
                        />
                    </Card>
                    <Chart height={400} data={data1} scale={cols} forceFit style={{ position: 'absolute', width: '60%', left: '35%' }}>
                        <Legend />
                        <Axis name="month" />
                        <Axis
                            name="temperature"
                            label={{
                                formatter: val => `${val}°C`
                            }}
                        />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom
                            type="line"
                            position="month*temperature"
                            size={2}
                            color={"city"}
                            shape={"smooth"}
                        />
                        <Geom
                            type="point"
                            position="month*temperature"
                            size={4}
                            shape={"circle"}
                            color={"city"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                    <Card style={{ position: 'absolute', top: '65%', width: '100%' }}>
                        <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={operations}>
                            <TabPane tab="访问量" key="1" style={{ position: 'relative', height: '350px' }}>
                                <Card title="访问趋势" style={{ width: '60%' }} extra={extra}>
                                    <Chart height={300} data={dv} forceFit >
                                        <Axis name="月份" />
                                        <Axis name="月均降雨量" />
                                        <Legend />
                                        <Tooltip
                                            crosshairs={{
                                                type: "y"
                                            }}
                                        />
                                        <Geom
                                            type="interval"
                                            position="月份*月均降雨量"
                                            color={"name"}
                                            adjust={[
                                                {
                                                    type: "dodge",
                                                    marginRatio: 1 / 32
                                                }
                                            ]}
                                        />
                                    </Chart>
                                </Card>
                                <Card title="任务" style={{ left: '65%', width: '30%', marginTop: '-410px' }} extra={extra}>
                                    <Timeline>
                                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                    </Timeline>
                                </Card>
                            </TabPane>
                            <TabPane tab="销量" key="2">
                                <Basic />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        )
    }
}