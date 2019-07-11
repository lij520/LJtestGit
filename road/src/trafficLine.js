// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend,G2 } from 'bizcharts';
import DataSet from '@antv/data-set';


// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  { label: '2013', 乡镇公路养护:40538, 公路通车:99535,养护同比:(40986-40538)/40538,},
  { label: '2014', 乡镇公路养护:40986, 公路通车:101190, 养护同比:(40986-40538)/40538,},
  { label: '2015', 乡镇公路养护:41167, 公路通车:104585, 养护同比:(41167-40986)/40986,},
  { label: '2016', 乡镇公路养护:41134, 公路通车:106757, 养护同比:(41134-41167)/41167,},
  { label: '2017', 乡镇公路养护:41810, 公路通车:108012, 养护同比:(41810-41134)/41134,}
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['乡镇公路养护', '公路通车'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  养护同比: {
    type: 'linear',
    min: 0,
    max: 0.02,
  },
};

let chartIns = null;

const getG2Instance = (chart) => {
  chartIns = chart;
};

class TrafficLine extends React.Component {
  render() {
    const grid = {
       
        lineStyle: {
          stroke: 'rgb(67,75,94)', // 网格线的颜色
          lineWidth: 1, // 网格线的宽度复制代码
          lineDash: [0, 0]
        }, // 网格线的样式配置，原有属性为 line
      }
    return (<Chart height={230}  forceFit data={dv} scale={scale}  padding={[50, 'auto', 20, 'auto']} onGetG2Instance={getG2Instance}>
      <Legend
        custom
        position="top" offsetY={-2}
        items={[
          { value: '乡镇公路养护', marker: { symbol: 'square', fill: 'rgb(0,191,165)', radius: 5 } },
          { value: '公路通车', marker: { symbol: 'square', fill: 'rgb(255,97,6)', radius: 5 } },
          // { value: '养护同比', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
        ]}
        textStyle={{
            fill: 'white', // 文本的颜色
          }}
      />
      <Axis name="label" 
       label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
        rotate:0,
        textStyle: {
            fill: 'white',
          }, // 坐标轴文本属性配置
      }}
      />
      <Axis name="value" position={'left'} grid={grid}
       label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
            fill: 'white',
          }, // 坐标轴文本属性配置
      }}/>
      <Axis name="养护同比"   label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
            fill: 'white',
          }, // 坐标轴文本属性配置
      }}/>
      <Tooltip 
       g2-tooltip={{
        opacity: '0.9',
      }}
      />
      <Geom 
        type="interval"
        position="label*value"
        color={['type', (value) => {
          if (value === '乡镇公路养护') {
            return 'rgba(0,191,165,0.8)';
          }
          if (value === '公路通车') {
            return 'rgba(255,97,6,0.8)';
          }
        }]}
        adjust={[{
          type: 'dodge',
          marginRatio: 1 /4,
        }]}
        tooltip={[
          'type*value', (type, value) => {
            return {
              //自定义 tooltip 上显示的 title 显示内容等。
              name:type,
              value: `${value}(公里)`
            };
        }
        ]}
        style={['type*value', {
          lineWidth:2,
          stroke:(type, value)=>{
            if (value === '乡镇公路养护') {
              return 'rgba(0,191,165,0.2)';
            }
            if (value === '公路通车') {
              return 'rgbargba(9,111,100,0.2)';
            }
            // return "rgba(255,255,255,0.5)";
          },
          shadowColor:'rgba(255,255,255,0.4)',
          shadowBlur:10,
          shadowOffsetX:0,
          shadowOffsetY:-2,
         }]}
      />
      {/* <Geom type="line" 
      position="label*养护同比" 
      color="#fad248" size={3} 
      tooltip={[
        'type*养护同比', (type,value) => {
          return {
            //自定义 tooltip 上显示的 title 显示内容等。
            name:"养护同比",
            value: `${parseInt(value*100)}%`
          };
      }
      ]}
      /> */}

    </Chart>
    );
  }
}

// CDN END
export default TrafficLine;