import React,{Component} from 'react';
import './centerMap.css'
//引入echarts主模块
import echarts from 'echarts/lib/echarts';
//引入echarts地图
import 'echarts/lib/chart/map';
//引入echarts柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/effectScatter';
// 引入提示框和标题组件（按需加载）
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/geo';

//引入地图json数据
import fujian_border from './geojson/fujian_border.json';
import fujian from 'echarts/map/json/province/fujian.json';
import Bottom from './mapBottom/bottom';
import { white } from 'ansi-colors';

//定义地理座标点
const geoCoordMap = {
    '福州':[119.3,26.08],
    '宁德':[119.52,26.65],
    '南平':[118.11,27.34],
    '三明':[117.61,26.23],
    '龙岩':[117.01,25.12],
    '漳州':[117.35,24.52],
    '厦门':[118.1,24.46],
    '泉州':[118.58,24.93],
    '莆田':[119,25.44]
}

// const geoData = [
//     [{name:'福州'},{name:'宁德',value:95}],
//     [{name:'福州'},{name:'南平',value:90}],
//     [{name:'福州'},{name:'三明',value:80}],
//     [{name:'福州'},{name:'龙岩',value:70}],
//     [{name:'福州'},{name:'漳州',value:60}],
//     [{name:'福州'},{name:'厦门',value:50}],
//     [{name:'福州'},{name:'泉州',value:40}],
//     [{name:'福州'},{name:'莆田',value:30}],
// ]
//定义福州到各地市的数据
const geoData = [
        {fromName:'福州',toName:'宁德',value:95},
        {fromName:'福州',toName:'南平',value:90},
        {fromName:'福州',toName:'三明',value:80},
        {fromName:'福州',toName:'龙岩',value:70},
        {fromName:'福州',toName:'漳州',value:60},
        {fromName:'福州',toName:'厦门',value:50},
        {fromName:'福州',toName:'泉州',value:40},
        {fromName:'福州',toName:'莆田',value:30},
]


class CenterMap extends Component{
    constructor(props){
        super(props);
        this.convertData = this.convertData.bind(this);
    }

    convertData (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem.fromName];
            var toCoord = geoCoordMap[dataItem.toName];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem.fromName,
                    toName: dataItem.toName,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };
    componentDidMount(){
        //地图散点部分所需数据
        var scatterData = geoData.map(function (dataItem) {
            return {
                name: dataItem.toName,
                value: geoCoordMap[dataItem.toName].concat([dataItem.value])
            };
        });
        scatterData.push({
            name:'福州',
            value:[119.3,26.08,60],
            label:{
                normal:{
                    color:'#fff',
                    fontSize:14
                }
            },
            itemStyle:{
                normal:{
                    // color:'yellow'
                    color:'#ffa022'
                }
            },
            rippleEffect: {
                brushType: 'fill'
            },
        })
        // console.log(scatterData);

        // 基于准备好的dom，初始化echarts实例
        var centerMap = echarts.init(document.getElementById('centerMap'));
        //添加矢量数据
        echarts.registerMap('fujian', fujian);
        echarts.registerMap('fujian_border',fujian_border);
        var option = {
            // backgroundColor: '#404a59',
            title: {
                text: '事件派发+大数据',
                subtext:'福建省路长大数据分析平台',
                textStyle : {
                    color: '#fff'
                },
                left:'5%',
                top:'2%'
            },
            geo:[
                {
                    map:'fujian',
                    zoom:1.1,
                    z:2,
                    itemStyle: {
                        normal: {
                            areaColor: 'none',
                            borderColor: '#46bee9',
                            borderWidth:0.5,
                            opacity:0.5
                        },
                        emphasis: {
                            areaColor: 'none'
                        }
                    },
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                },
                {
                    map:'fujian_border',
                    zoom:1.1,
                    z:3,
                    itemStyle: {
                        normal: {
                            areaColor: 'none',
                            borderColor: '#01FFFC',
                            borderWidth:2,
                            shadowColor: 'rgba(255,255,255,1)',
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: 'none'
                        }
                    }
                }

            ],
            series:[
                //白色荧光效果
                {
                    name: '福州到各地市',
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        // color:'#ffa022',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            // color: '#46bee9',
                            color:'#ffa022',
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: this.convertData(geoData)
                },
                //有颜色的弧线
                {
                    name: '福州到各地市',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    // effect: {
                    //     show: true,
                    //     period: 6,
                    //     trailLength: 0,
                    //     symbol: 'circle',
                    //     symbolSize: 3,
                    // },
                    lineStyle: {
                        normal: {
                            color: '#46bee9',
                            // color:'#ffa022',
                            width: 2,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: this.convertData(geoData)
                },
                //各地市圆圈大小表示数量多少
                {
                    name: '福州到各地市',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            formatter: '{b}',
                            distance: 10,
                            color:'#fff'
                        }
                    },
                    symbolSize: function (val) {
                        return val[2] / 8;//val[2]是value中的第三个值，是派发事件数量多少
                    },
                    itemStyle: {
                        normal: {
                            // color: '#46bee9'
                            color:'#ccffff'
                        }
                    },
                    data: scatterData
                
                }
            ]
        
            
        };

        // 使用刚指定的配置项和数据显示图表。
        centerMap.setOption(option);
        

        
    }
    render(){
        return(
            <div id='grid'  style={{height:'100%',position:'relative'}}>
                <div id='edge' style={{top:'0',left:'0',borderStyle:'solid none none solid'}}></div>
                <div id='edge' style={{top:'0',right:'0',borderStyle:'solid solid none none'}}></div>
                <div id='edge' style={{bottom:'0',right:'0',borderStyle:'none solid solid none'}}></div>
                <div id='edge' style={{bottom:'0',left:'0',borderStyle:'none none solid solid'}}></div>
                <div id='centerMap' style={{height:'100%',zIndex:'0'}}></div>
                <div id='bottom'><Bottom /></div>
            </div>
        )
    }
}

export default CenterMap;