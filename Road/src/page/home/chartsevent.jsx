import React from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入折线图
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';


class ChartsEvent extends React.Component{

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_pie'));
        var data = genData();
        myChart.setOption({
            color:['#58a5cc','#78c38e','#e5d16a','#e2986f','#ca87b8','#a68fdc','#4b73a7'],
            tooltip : {
                trigger: 'item',
                position: 'right',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: [{
                orient: 'horizontal',
                top:20,
                left:15,
                data: data.legendData,
                selected: data.selected,
                },
            ],
           
            series : [
                {
                    name: '事件类型',
                    type: 'pie',
                    radius: '40%',
                    center: ['55%', '65%'],
                    data: data.seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },  
                },
               
            ]
        })
        var myChart_bar= echarts.init(document.getElementById('chart_bar'));
        myChart_bar.setOption({
           
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
            grid: [{
                top: 40,
                left:1,
                width: '95%',
                bottom: '10%',
                right: 30,
                containLabel: true
            }, ],

                xAxis : [
                    {
                        type : 'category',
                        data : Object.keys(data.namesLast),
                    }
                ],
                yAxis : [
                    {
                        name: '数量(件)',
                        type : 'value'
                    }
                ],
        //     xAxis: [{
        //         type: 'value',
        //         // max: builderJson.all,
        //         splitLine: {
        //             show: false
        //         }
        //     },],
        //     yAxis: [{
        //         type: 'category',
        //         data: Object.keys(data.namesLast),
        //         axisLabel: {
        //             interval: 0,
        //             rotate: 30
        //         },
        //         splitLine: {
        //             show: false
        //         }
        //     },],
            series : [
                {
                    name: '事件类型',
                    type: 'bar',
                    stack: '事件类型',
                    z: 3,
                    itemStyle: {
                        normal: {
                            color: '#7793c5'
                        }
                    },
                    label: {
                        normal: {
                            position: 'top',
                            show: true
                        }
                    },
                    data:Object.keys(data.namesLast).map(function (key) {
                        return data.namesLast[key];
                    }),
                }, 
               
            ]
        })


        // myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
        function genData() {
            var legendData = [];
            var seriesData = [];
            var selected = {};
            var receiveData=[ 
            {name:'路基',value:56},
            {name:'路面',value:92},
            {name:'桥梁',value:66},
            {name:'水沟涵洞',value:60},
            {name:'隧道',value:88},
            {name:'设施、标志牌',value:50},
            {name:'路政',value:100}];
            var namesLast = {};

            receiveData.map((event,index)=>{   
                legendData.push(event.name);
                seriesData.push({
                    name: event.name,
                    value: event.value,
                 });
                 selected[name] = index<4;
   
            })

            seriesData.map((event,index)=>{
                namesLast[event.name]=event.value;
            })

      
            console.log(legendData);
            console.log(seriesData);
            console.log(selected);
            console.log(namesLast);
            

            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected,
                namesLast:namesLast,
            };
        }



       
    }
    render(){
      return (
          <div style={{height:'100%',width:'100%',float:'left'}}>
                <div id="chart_pie" style={{width:'52%',height:'100%',display:'inline-block' }}></div>
                <div id="chart_bar" style={{width:'48%',height:'100%',float:'right',display:'inline-block' }}></div>
                
        </div>
      );
    }
  }

  export default  ChartsEvent;
  
 