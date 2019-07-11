import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts';

class TrafficMachine extends React.Component {
  render() {
    const data = [
      {
        car: '汽车数',
        year: '2010',
        carvalue: 1996529,
      },
      {
        car: '汽车数',
        year: '2011',
        carvalue: 2422264,
      },
      {
        car: '汽车数',
        year: '2012',
        carvalue: 2861244,
      },
      {
        car: '汽车数',
        year: '2013',
        carvalue: 3349445,
      },
      {
        car: '汽车数',
        year: '2014',
        carvalue: 3884930,
      },
      {
        car: '汽车数',
        year: '2015',
        carvalue: 4368030,
      },
      {
        car: '汽车数',
        year: '2016',
        carvalue: 4950939,
      },
      {
        car: '汽车数',
        year: '2017',
        carvalue:5582343,
      },
      {
        machine: '客运量',
        year: '2010',
        value:70714,
      },
      {
        machine: '客运量',
        year: '2011',
        value:73259,
      },
      {
        machine: '客运量',
        year: '2012',
        value:75044,
      },
      {
        machine: '客运量',
        year: '2013',
        value:46895,
      },
      {
        machine: '客运量',
        year: '2014',
        value:48580,
      },
      {
        machine: '客运量',
        year: '2015',
        value:40394,
      },
      {
        machine: '客运量',
        year: '2016',
        value:39137,
      },
      {
        machine: '客运量',
        year: '2017',
        value: 37585,
      },
      {
        machine: '货运量',
        year: '2010',
        value:45575,
      },
      {
        machine: '货运量',
        year: '2011',
        value:52558,
      },
      {
        machine: '货运量',
        year: '2012',
        value:59431,
      },
      {
        machine: '货运量',
        year: '2013',
        value:69876,
      },
      {
        machine: '货运量',
        year: '2014',
        value:82573,
      },
      {
        machine: '货运量',
        year: '2015',
        value:79802,
      },
      {
        machine: '货运量',
        year: '2016',
        value:85770,
      },
      {
        machine: '货运量',
        year: '2017',
        value:95599,
      },
     
    ];
    const cols = {
      year: {
        type: 'linear',
        tickInterval: 1,
      },
    };
    return (
      <div>
        <Chart height={290} data={data} scale={cols} forceFit padding={[50, 'auto', 20, 'auto']} scale={{
          'value': {
            formatter: (text) => {return `${text/10000}`}, // 格式化文本内容，会影响到轴的label格式
          },
          'carvalue': {
            formatter: (text) => {return `${text/10000}`}, // 格式化文本内容，会影响到轴的label格式
          }
        }}>
          <Axis name="year" 
          label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
            rotate:0,
            formatter(text, item, index) {
                if(index%2==0){
                  return text
                }
              },
            textStyle: {
                fill: 'white',
              }, // 坐标轴文本属性配置
          }}
          />
           <Axis name="carvalue" 
            label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
              textStyle: {
                  fill: 'white',
                }, // 坐标轴文本属性配置
            }}
            // visible={false}
          />
          <Axis name="value" position={'left'}
          label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
            textStyle: {
                fill: 'white',
              }, // 坐标轴文本属性配置
          }}
          />
          <Legend  position="top" offsetY={-5} custom
          items={[
            { value: '汽车数', marker: { symbol: 'square', fill:'rgb(244,67,54)', radius: 5 } },
            { value: '客运量', marker: { symbol: 'square', fill:'rgb(250,210,72)', radius: 5 } },
            { value: '货运量', marker: { symbol: 'square', fill:'rgb(0, 268,0)', radius: 5 } },
          ]}
          textStyle={{
              fill: 'white', // 文本的颜色
            }}
          />
          <Tooltip 
           g2-tooltip={{
            opacity: '0.9',
          }}
          />
          <Geom type="areaStack" position="year*value" color={['machine', ['l (90) 0:rgba(250,210,72, 1) 1:rgba(250,210,72, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} 
           tooltip={[
            'machine*value', (machine,value) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                name:machine,
                value:value,
              };
          }
          ]}/>
           <Geom type="areaStack" position="year*carvalue" color={['car', ['l (90) 0:rgba(244,67,54) 1:rgba(244,67,54, 0.1)']]} 
           tooltip={[
            'car*carvalue', (car,carvalue) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                name:car,
                value: carvalue,
              };
          }
          ]}/>
          <Geom type="lineStack"    shape={"smooth"} position="year*value" size={2} color={['machine', ['rgba(250,210,72,1)', 'rgba(0, 268, 0,1)']]} tooltip='null'/>
          <Geom type="lineStack"    shape={"smooth"} position="year*carvalue" size={2} color={['car', ['rgba(244,67,54, 1)']]} tooltip='null'/>
        </Chart>
      </div>
    );
  }
}

export default TrafficMachine;