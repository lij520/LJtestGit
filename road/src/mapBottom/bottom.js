import React from 'react';
import { Button } from 'antd';
// 引入 echarts 主模块
import * as echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
// 引入提示框组件、标题组件、工具箱组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import './bottom.scss'
// import $ from 'jquery';

//各地区事件派发数据
const eventData={
    'fuzhou':[635,85,50],
    'xiamen':[300,60,30],
    'quanzhou':[400,40,30],
    'zhangzhou':[564,78,50],
    'ningde':[223,25,46],
    'putian':[500,75,30],
    'sanming':[450,85,40],
    'nanping':[335,65,30],
    'longyan':[278,65,30],
    'pingtan':[537,30,25]
}

class Bottom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            totalAmount:eventData.fuzhou[0],
            addedNum:eventData.fuzhou[1],
            solvedNum:eventData.fuzhou[2]
        }
        this.buttonClick = this.buttonClick.bind(this);
        this.getEchartsOption = this.getEchartsOption.bind(this);
    }
    
    buttonClick(e){
        let place = e.target.value
        this.setState({
            totalAmount:eventData[place][0],
            addedNum:eventData[place][1],
            solvedNum:eventData[place][2]
        })
    }

    getEchartsOption(){

        var placeHolderStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                color: "rgba(0,0,0,0)",
                borderWidth: 0
            },
            emphasis: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0
            }
        };
        
        
        var dataStyle = {
            normal: {
                formatter: '{c}件',
                position: 'center',
                show: true,
                textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal',
                    color: '#fff'
                }
            }
        };
        
        var option = {
            backgroundColor: 'transparent',
            title: [
            {
                text: '任务总量',
                left:'16%',
                top:'18%',
                textAlign:'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '14',
                    color: '#01FFFC',
                    textShadowColor:'rgba(255,255,255,0.7)',
                    textShadowBlur:5
                },
            }, {
                text: '今日新增',
                left: '46%',
                top: '18%',
                textAlign: 'center',
                textStyle: {
                    color: 'yellow',
                    fontWeight: 'normal',
                    fontSize: '14',
                    textShadowColor:'rgba(255,255,255,0.7)',
                    textShadowBlur:5
                },
            }, {
                text: '今日解决',
                left: '77%',
                top: '18%',
                textAlign: 'center',
                textStyle: {
                    color: '#FF4500',
                    fontWeight: 'normal',
                    fontSize: '14',
                    textShadowColor:'rgba(255,255,255,0.7)',
                    textShadowBlur:5
                },
            }],
            series: [{
                    type: 'pie',
                    hoverAnimation: false, //鼠标经过的特效
                    radius: ['44%', '50%'],
                    center: ['16%', '60%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: this.state.totalAmount,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#33ffff'
                                    }, {
                                        offset: 1,
                                        color: '#3399ff'
                                    }]),
                                    // color:'#01FFFC'
                                }
                            },
                            label: dataStyle,
                        }, {
                            value: 280,
                            itemStyle: placeHolderStyle,
                        },
        
                    ]
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['44%', '50%'],
                    center: ['46%', '60%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: this.state.addedNum,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#ccff33'
                                    }, {
                                        offset: 1,
                                        color: '#ffcc33'
                                    }]),
                                    // color:'yellow'
                                }
                            },
                            label: dataStyle,
                        }, {
                            value: 280,
                            itemStyle: placeHolderStyle,
                        },
        
                    ]
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['44%', '50%'],
                    center: ['77%', '60%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: this.state.solvedNum,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#ff6600'
                                    }, {
                                        offset: 1,
                                        color: '#ff9900'
                                    }]),
                                    // color:'#FF4500'
                                }
                            },
                            label: dataStyle,
                        }, {
                            value: 280,
                            itemStyle: placeHolderStyle,
                        },
        
                    ]
                },
                
                //外圈的边框
                {
                    // name: '总人数',
                    type: 'pie',
                    hoverAnimation: false, //鼠标经过的特效
                    radius: ['50%', '51%'],
                    center: ['16%', '60%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: 75,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#01babc'
                                    }, {
                                        offset: 1,
                                        color: '#99da69'
                                    }]),
                                }
                            },
                        }, {
                            value: 25,
                            itemStyle: placeHolderStyle,
                        },
        
                    ]
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['50%', '51%'],
                    center: ['46%', '60%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: 75,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#4897f6'
                                    }, {
                                        offset: 1,
                                        color: '#9f3edd'
                                    }]),
                                }
                            },
                        }, {
                            value: 25,
                            itemStyle: placeHolderStyle,
                        },
        
                    ]
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['50%', '51%'],
                    center: ['77%', '60%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: 75,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#4897f6'
                                    }, {
                                        offset: 1,
                                        color: '#9f3edd'
                                    }]),
                                }
                            },
                        }, {
                            value: 25,
                            itemStyle: placeHolderStyle,
                        },
        
                    ]
                }
            ]
        };
        return option;
        
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var bottomCharts=echarts.init(document.getElementById('bottomCharts'));
        var option = this.getEchartsOption();
        bottomCharts.setOption(option);
    }
    componentDidUpdate(){
        var bottomCharts=echarts.init(document.getElementById('bottomCharts'));
        var option = this.getEchartsOption();
        bottomCharts.setOption(option);
    }
            
    render(){
        
        return(
            <div id="chart-panel" style={{display:'flex',height:'100%'}}>
                <div id='cityText' style={{flex:'5'}}>
                    <div id='text'>
                        <div style={{fontSize:'15px'}}>今日实时数据</div>
                        <div style={{fontSize:'12px'}}>全省数据</div>
                        <Button onClick={this.buttonClick} value='fuzhou'>福州市</Button>
                        <Button onClick={this.buttonClick} value='xiamen'>厦门市</Button>
                        <Button onClick={this.buttonClick} value='quanzhou'>泉州市</Button>
                        <Button onClick={this.buttonClick} value='zhangzhou'>漳州市</Button>
                        <Button onClick={this.buttonClick} value='ningde'>宁德市</Button>
                        <Button onClick={this.buttonClick} value='putian'>莆田市</Button>
                        <Button onClick={this.buttonClick} value='sanming'>三明市</Button>
                        <Button onClick={this.buttonClick} value='nanping'>南平市</Button>
                        <Button onClick={this.buttonClick} value='longyan'>龙岩市</Button>
                        <Button onClick={this.buttonClick} value='pingtan'>平潭综合实验区</Button>
                    </div>
                </div>
                <div id='bottomCharts' style={{flex:'6'}}></div>
            </div>
            
        )
    }
}

export default Bottom;