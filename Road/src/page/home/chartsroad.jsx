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


class ChartsRoad extends React.Component{
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chartRoad_pie'));
        var data = getData();
        myChart.setOption({
            color:['#ca87b8','#e5d16a','#58a5cc','#e2986f','#78c38e'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                top:20,
                left:15,
                data: data.legendData,
                selected: data.selected,
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['30%', '44%'],
                    center: ['55%', '65%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data.seriesData,
                }
            ]
        })
        var myChart_bar= echarts.init(document.getElementById('chartRoad_bar'));
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
        function getData() {
            var legendData = [];
            var seriesData = [];
            var selected = {};
            // var receiveData=['临江镇','中都镇','古田镇','南阳镇','旧县镇'];//上杭版
            // var receiveData=['山城镇','丰田镇','靖城镇','龙山镇','金山镇'];//南靖版
            // var receiveData=['武安镇','岩溪镇','陈巷镇','枋洋镇','坂里乡'];//长泰版
            // var receiveData=['蓝田镇','步文镇','郭坑镇','朝阳镇','蓝田开发区管委会'];//龙文镇
            // var receiveData=['共和街居委会','解放街居委会','石美街居委会','侨兴街居委会','团结居委会'];//角美镇
            // var receiveData=['双溪街道','建西镇','洋口镇','元坑镇','埔上镇'];//顺昌
            // var receiveData=['吴航街道','漳港街道','首占镇','玉田镇','松下镇'];//长乐
            // var receiveData=['松城街道','松港街道','长春镇','牙城镇','溪南镇'];//霞浦
            // var receiveData=['青阳街道','梅岭街道','西园街道'];//晋江
            // var receiveData=['石码镇','海澄镇','角美镇','白水镇','浮宫镇'];//龙海
            // var receiveData=['小溪镇','山格镇','文峰镇','南胜镇','坂仔镇'];//平和
            // var receiveData=['鳌阳镇','斜滩镇','南阳镇','武曲镇','犀溪镇'];//寿宁
            // var receiveData=['浦南镇','天宝镇','芝山镇','石亭镇','芗城区奶牛场'];//芗城区
            // var receiveData=['贯岭镇','前岐镇','沙埕镇','店下镇','太姥山镇'];//福鼎
            var receiveData=['白竹村委会','观阳村委会','埔径村委会','坪岭村委会','常山管区生活区'];//常山
            var namesLast = {};

            receiveData.map((event,index)=>{   
                legendData.push(event);
                seriesData.push({
                    name: event,
                    value: Math.round(Math.random() * 100)
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
                <div id="chartRoad_pie" style={{width:'50%',height:'100%',display:'inline-block' }}></div>
                <div id="chartRoad_bar" style={{width:'50%',height:'100%',float:'right',display:'inline-block' }}></div>
        </div>
      );
    }
  }
  
  
  export default ChartsRoad;