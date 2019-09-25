import React, { Component } from 'react';

/*
饼图路由
*/
import { Card, Button } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' }
            ],
            inventorys: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
            ]
        }
    }
    //返回饼图的配置对象
    getOption1 = () => {
        const { sales } = this.state;
        return {
            backgroundColor: '#2c343c',
            title: {
                text: '南丁格尔图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: sales.sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
    }
    getOption2 = () => {
        const { inventorys } = this.state;
        return {
            title: {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: inventorys,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
    update = () => {
        const sales = this.state.sales.map(sale => {
            sale.value = sale.value + 50;
            return sale;
        });
        const inventorys = this.state.inventorys.map(inventory => {
            inventory.value = inventory.value + 100;
            return inventory;
        });
        this.setState({
            sales,
            inventorys
        })
    }
    render() {
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card title='饼图一'>
                    <ReactEcharts option={this.getOption1()} style={{ height: 300 }} />
                </Card>
                <Card title='饼图二'>
                    <ReactEcharts option={this.getOption2()} style={{ height: 300 }} />
                </Card>
            </div>
        )
    }
}