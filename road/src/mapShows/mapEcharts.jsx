import React from 'react';
// 引入 echarts 主模块
import * as echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/map';
// 引入提示框组件、标题组件、工具箱组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/graphic';
import fujianJson from '../mapShows/FJJD.json';
import fujianData from '../mapShows/fujian.json';
import Bottom from '../mapShows/bottomH.js';
// import Bottom from '../mapShows/bottom.jsx';
// import CityTxt from '../mapShows/cityText.jsx';
// import TopTXT from '../mapShows/top.jsx';
import '../mapShows/style.scss';
// import $ from 'jquery';

class MapEcharts extends React.Component{
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        echarts.registerMap('fujian', fujianJson);
        echarts.registerMap('FJMap',fujianData);
        var myChart=echarts.init(document.getElementById('main'));

        var colorFlow = ['#ffff33','#ff6600','#33ff00','#8DEEEE','#fff'];
        function colorChange(params){
            var params = parseInt(params/10);
            // console.log('pa',params);
            switch(params){
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:var colorI = colorFlow[4]; break;
                case 5:var colorI = colorFlow[3]; break;
                case 6:var colorI = colorFlow[2]; break;
                case 7:
                case 8:var colorI = colorFlow[1]; break;
                case 9:
                case 10: var colorI = colorFlow[0]; break;

            }
			return colorI;
        }
        
        var geoCoordMapScatter = {
            '厦门': [118.11022,24.490474],
            '泉州': [118.589421,24.908853],
            '宁德': [119.527082,26.65924],
            '南平': [118.178459,26.635627],
            '龙岩': [117.02978,25.091603],
            '莆田': [119.007558,25.431011],
            "同安": [118.15,24.73],
            "仙游": [118.33,25.70],
            "永春": [118.29,25.33],
            "南靖": [117.35,24.12],
            "明溪": [117.19,26.01],
            "鼓楼": [119.29,26.05],
            "浦城": [118.55,27.92],
            "邵武": [117.48,27.34],
            "崇安": [118.02,27.76],
            "光泽": [117.34,27.54],
            "松溪": [118.77,27.53],
            "连江": [119.53,26.2],
            "霞浦": [120,26.89],
            "罗源": [119.55,26.49],
            "长乐": [119.52,25.96],
            "金门": [118.34,24.43],
            "诏安": [117.16,23.73],
            "长泰": [117.75,24.62],
            "长汀": [116.37,25.85],
            "宁化": [116.64,26.26],
            "清流": [116.81,26.12],
            "泰宁": [117.15,26.92],
            "永定": [116.81,24.76],
            "武平": [116.1,25.11],
            "漳平": [117.4,25.3],
            "尤溪": [118.17,26.18],
            "大田": [117.83,25.69],
            "建宁": [116.82,26.85],
            "屏南": [118.98,26.92],
            "柘荣": [119.89,27.25],
            "寿宁": [119.5,27.47],
            "政和": [118.85,27.38],
            "松溪": [118.77,27.53],
            "崇安": [118.02,27.76],
            "浦城": [118.55,27.92],
            "吉田": [118.74,26.59],
            "大田": [117.83,25.69],
            "建宁": [116.82,26.85],
            "L1": [115.98,24.92],
            "L2": [116.29,25.15],
            "L3": [116.4,24.47],
            "L4": [116.65,25.38],
            "L5": [116.87,24.53],
            "L6": [117.02,25.76],
            "L7": [117.25,25.92],
            "L8": [117.44,26.09],
            "L9": [117.63,25.69],
            "L10": [117.82,26.05],
            "S1": [118.68,26.92],
            "S2": [117.89,27.05],
            "S3": [116.5,26.47],
            "S4": [117.85,25.38],
            "S5": [116.77,26.53],
            "S6": [118.02,26.86],
            "S7": [116.55,26.92],
            "S8": [117.74,26.59],
            "S9": [116.83,25.69],
            "S10": [117.82,26.85],
            "N1": [118.98,26.92],
            "N2": [119.39,27.25],
            "N3": [118.5,27.17],
            "N4": [118.85,27.38],
            "N5": [117.77,28.23],
            "N6": [119.32,27.76],
            "N7": [118.85,26.92],
            "N8": [118.24,26.59],
            "N9": [117.23,27.69],
            "N10": [117.82,26.85],
            "Z1": [117.08,24.92],
            "Z2": [117.29,24.25],
            "Z3": [117.45,24.47],
            "Z4": [117.65,24.38],
            "Z5": [117.77,24.53],
            "Z6": [117.32,24.76],
            "Z7": [117.15,23.92],
            "Z8": [117.84,24.59],
            "Z9": [117.53,24.69],
            "Z10": [116.92,23.85],
            "Q1": [118.98,25.92],
            "Q2": [117.89,25.25],
            "Q3": [119.05,25.47],
            "Q4": [118.85,25.38],
            "Q5": [118.77,25.53],
            "Q6": [118.02,25.76],
            "Q7": [118.55,25.92],
            "Q8": [118.74,24.59],
            "Q9": [117.83,24.69],
            "Q10": [117.52,24.85],
            "NI1": [118.78,26.42],
            "NI2": [118.97,27.25],
            "NI3": [119.15,27.47],
            "NI4": [119.35,27.38],
            "NI5": [119.57,27.53],
            "NI6": [119.72,27.76],
            "NI7": [119.95,26.92],
            "NI8": [120.14,26.59],
            "NI9": [120.33,26.69],
            "NI10": [120.52,26.85],
            "F1": [118.98,26.62],
            "F2": [118.69,25.45],
            "F3": [119.5,25.77],
            "F4": [119.85,25.38],
            "F5": [119.67,25.53],
            "F6": [119.02,25.96],
            "F7": [119.25,26.32],
            "F8": [120.1,26.59],
        }

        var FJDataScatter = [
            {name:'厦门',value:85},
            {name:'泉州',value:80},
            {name:'宁德',value:75},
            {name:'莆田',value:69},
            {name:'龙岩',value:52},
            {name:'南平',value:41},
            {name:'同安',value:40},
            {name:'仙游',value:20},
            {name:'永春',value:45},
            {name:'南靖',value:61},
            {name:'明溪',value:74},
            {name:'鼓楼',value:24},
            {name:'浦城',value:34},
            {name:'邵武',value:24},
            {name:'崇安',value:50},
            {name:'光泽',value:39},
            {name:'松溪',value:26},
            {name:'连江',value:33},
            {name:'霞浦',value:45},
            {name:'罗源',value:21},
            {name:'长乐',value:43},
            {name:'金门',value:77},
            {name:'诏安',value:29},
            {name:'长泰',value:42},
            {name:'长汀',value:64},
            {name:'宁化',value:35},
            {name:'清流',value:38},
            {name:'泰宁',value:49},
            {name:'永定',value:39},
            {name:'武平',value:31},
            {name:'漳平',value:34},
            {name:'尤溪',value:35},
            {name:'大田',value:48},
            {name:'建宁',value:87},
            {name:'屏南',value:43},
            {name:'柘荣',value:42},
            {name:'寿宁',value:41},
            {name:'政和',value:76},
            {name:'松溪',value:90},
            {name:'崇安',value:42},
            {name:'浦城',value:65},
            {name:'吉田',value:44},
            {name:'L1',value:44},
            {name:'L2',value:44},
            {name:'L3',value:44},
            {name:'4',value:24},
            {name:'L5',value:44},
            {name:'L6',value:24},
            {name:'L7',value:44},
            {name:'L8',value:44},
            {name:'L9',value:34},
            {name:'L10',value:44},
            {name:'S1',value:44},
            {name:'S2',value:24},
            {name:'S3',value:44},
            {name:'S4',value:44},
            {name:'S5',value:24},
            {name:'S6',value:44},
            {name:'S7',value:44},
            {name:'S8',value:34},
            {name:'S9',value:44},
            {name:'S10',value:44},
            {name:'N1',value:44},
            {name:'N2',value:44},
            {name:'N3',value:24},
            {name:'N4',value:44},
            {name:'N5',value:44},
            {name:'N6',value:44},
            {name:'N7',value:34},
            {name:'N8',value:44},
            {name:'N9',value:44},
            {name:'N10',value:44},
            {name:'Z1',value:44},
            {name:'Z2',value:24},
            {name:'Z3',value:44},
            {name:'Z4',value:44},
            {name:'Z5',value:44},
            {name:'Z6',value:34},
            {name:'Z7',value:44},
            {name:'Z8',value:44},
            {name:'Z9',value:44},
            {name:'Z10',value:44},
            {name:'Q1',value:44},
            {name:'Q2',value:44},
            {name:'Q3',value:44},
            {name:'Q4',value:34},
            {name:'Q5',value:44},
            {name:'Q6',value:44},
            {name:'Q7',value:44},
            {name:'Q8',value:34},
            {name:'Q9',value:44},
            {name:'Q10',value:24},
            {name:'NI1',value:44},
            {name:'NI2',value:44},
            {name:'NI3',value:44},
            {name:'NI4',value:24},
            {name:'NI5',value:44},
            {name:'NI6',value:44},
            {name:'NI7',value:44},
            {name:'NI8',value:34},
            {name:'NI9',value:44},
            {name:'NI10',value:44},
            {name:'F1',value:24},
            {name:'F2',value:44},
            {name:'F3',value:44},
            {name:'F4',value:34},
            {name:'F5',value:44},
            {name:'F6',value:44},
            {name:'F7',value:34},
            {name:'F8',value:44},
        ]

        //散点图
        var convertDataScatter = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoordScatter = geoCoordMapScatter[data[i].name];
                if (geoCoordScatter) {
                    res.push(geoCoordScatter.concat(data[i].value));
                }
            }
            return res;
        };

        var geoCoordMap = {
            '福建省': [119.306239,26.075302],
            '福州': [119.306239,26.075302],
            '厦门': [118.11022,24.490474],
            '泉州': [118.589421,24.908853],
            '漳州': [117.661801,24.510897],
            '宁德': [119.527082,26.65924],
            '三明': [117.635001,26.265444],
            '南平': [118.178459,26.635627],
            '龙岩': [117.02978,25.091603],
            '平潭综合实验区': [119.78,25.50],
            '莆田': [119.007558,25.431011]
        };
        
        var FJData = [
            [{name:'福建省'}, {name:'厦门',value:95}],
            [{name:'福建省'}, {name:'漳州',value:90}],
            [{name:'福建省'}, {name:'泉州',value:80}],
            [{name:'福建省'}, {name:'宁德',value:70}],
            [{name:'福建省'}, {name:'莆田',value:60}],
            [{name:'福建省'}, {name:'三明',value:50}],
            [{name:'福建省'}, {name:'龙岩',value:40}],
            [{name:'福建省'}, {name:'南平',value:30}],
            [{name:'福建省'}, {name:'平潭综合实验区',value:20}],
            [{name:'福建省'}, {name:'福州',value:100}]
        ];
        
        
        var convertData = function (data) {
            console.log('1',data);
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value
                    });
                }
            }
            return res;
        };
        
        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];
        [['福建省任务派发量', FJData]].forEach(function (item, i) {
            console.log('2',item);
            console.log('3',i);
            series.push({
                name: item[0] /* + ' Top10' */,
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],  //线条的颜色
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] /* + ' Top10' */,
                type: 'lines',
                zlevel: 2,
                // symbol: ['none', 'arrow'],
                symbol: ['none', 'none'],
                symbolSize: 7,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    // symbol: planePath,
                    symbol: 'circle',
                    symbolSize: 5,
                    color:'#fff'
                },
                lineStyle: {
                    normal: {
                        // color: color[1],   //箭头的颜色
                        color: '#46bee9',
                        width: 2,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] /* + ' Top10' */,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        // color: '#1BC7FB',
                        color: '#fff',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        // color: color[i],    //气泡图的颜色
                        color: function(params){
                            if(params.name==="福州"){
                                var colorCity = color[1]
                            }else{
                                var colorCity = '#fff'
                            }
                            return colorCity
                        },
                        shadowBlur: 6,
                        shadowColor: '#333'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            },
            {
                // name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertDataScatter(FJDataScatter),
                symbolSize: function(params){
                    // console.log('p',params[2]);
                    return params[2]/15;
                },
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal:{
                        color:function(params){
                            // console.log('p',params.value)
                            return colorChange(params.value[2])
                        },
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            });
        });
        console.log('4',series)
        
        var option = {
            backgroundColor: 'transparent',
            title : {
                text: '智慧公路+大数据',
                subtext: '福建省数据展示平台',
                x: '30',
                y: '40',
                // left: 'left',
                textStyle : {
                    color: '#fff',
                    fontSize: '28',
                },
                subtextStyle : {
                    color: '#fff',
                    fontSize : '20'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter:function(params, ticket, callback){
                    console.log(params);
                    if(params.seriesType=="effectScatter") {
                        return "福建省任务派发量："+params.data.name+""+params.data.value[2];
                    }else if(params.seriesType=="lines"){
                        return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                    }else{
                        return params.name;
                    }
                }
            },
            geo: [{
                map: 'fujian',
                zlevel: 0,
                zoom:1.25,
                center:[118.306239,25.975302],
                label: {
                    emphasis: {
                        show: false,
                        color:'#46bee9'
                        // color: '#fff'
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        // areaColor: '#071A44',
                        areaColor: 'transparent',
                        borderColor: '#1BC7FB',
                    },
                    emphasis: {
                        areaColor: 'transparent'
                    }
                }
            },
            {
                map:'FJMap',
                zlevel: 1,
                zoom:1.25,
                center:[118.306239,25.975302],
                roam: false,
                itemStyle: {
                    // normal: {
                    //     // areaColor: '#071A44',
                    //     areaColor: 'transparent',
                    //     borderColor: '#01FFFC',
                    // },
                    normal: {
                        areaColor: 'none',
                        borderColor: '#01FFFC',
                        // borderWidth:0.5,
                        shadowColor: 'rgba(255,255,255,0.5)',
                        shadowBlur: 1
                    },
                    emphasis: {
                        areaColor: 'transparent'
                    }
                }
            }
            ],
            series: series
        };
        myChart.setOption(option);
    }
            
    render(){
        
        return(
            <div id="map" >
                <div id="borderLT" ></div>
                <div id="borderRT"></div>
                <div id="borderLB"></div>
                <div id="borderRB"></div>
                <div id="main" >
                </div>
                <div id="bottom">
                    {/* <div id="text">
                        <CityTxt/>
                    </div> */}
                    <Bottom/>
                </div>
            </div>
        )
    }
}

export default MapEcharts;