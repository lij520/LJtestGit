import React,{Component} from 'react';
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
  Util,
} from "bizcharts";
import DataSet from "@antv/data-set";
  
  class Stacked extends Component {
    render() {
      const data = [
        {
          country: '临城镇',
          month: '11月',
          value: 402,
        },
        {
          country: '临城镇',
          month: '12月',
          value: 502,
        },
        {
          country: '临城镇',
          month: '1月',
          value: 635,
        },
        {
          country: '临城镇',
          month: '2月',
          value: 809,
        },
        {
          country: '临城镇',
          month: '3月',
          value: 568,
        },
        {
          country: '临城镇',
          month: '4月',
          value: 400,
        },
        {
          country: '才溪镇',
          month: '11月',
          value: 634,
        },
        {
          country: '才溪镇',
          month: '12月',
          value: 134,
        },
        {
          country: '才溪镇',
          month: '1月',
          value: 247,
        },
        {
          country: '才溪镇',
          month: '2月',
          value: 106,
        },
        {
          country: '才溪镇',
          month: '3月',
          value: 497,
        },
        {
          country: '才溪镇',
          month: '4月',
          value: 611,
        },
        {
          country: '湖洋镇',
          month: '11月',
          value: 566,
        },
        {
          country: '湖洋镇',
          month: '12月',
          value: 416,
        },
        {
          country: '湖洋镇',
          month: '1月',
          value: 421,
        },
        {
          country: '湖洋镇',
          month: '2月',
          value: 667,
        },
        {
          country: '湖洋镇',
          month: '3月',
          value: 733,
        },
        {
          country: '湖洋镇',
          month: '4月',
          value: 433,
        },
        {
          country: '临江镇',
          month: '11月',
          value: 436,
        },
        {
          country: '临江镇',
          month: '12月',
          value: 366,
        },
        {
          country: '临江镇',
          month: '1月',
          value: 421,
        },
        {
          country: '临江镇',
          month: '2月',
          value: 567,
        },
        {
          country: '临江镇',
          month: '3月',
          value: 793,
        },
        {
          country: '临江镇',
          month: '4月',
          value: 933,
        },
        {
          country: '白砂镇',
          month: '11月',
          value: 366,
        },
        {
          country: '白砂镇',
          month: '12月',
          value: 346,
        },
        {
          country: '白砂镇',
          month: '1月',
          value: 411,
        },
        {
          country: '白砂镇',
          month: '2月',
          value: 267,
        },
        {
          country: '白砂镇',
          month: '3月',
          value: 763,
        },
        {
          country: '白砂镇',
          month: '4月',
          value: 633,
        },
        {
          country: '步云乡',
          month: '11月',
          value: 526,
        },
        {
          country: '步云乡',
          month: '12月',
          value: 466,
        },
        {
          country: '步云乡',
          month: '1月',
          value: 721,
        },
        {
          country: '步云乡',
          month: '2月',
          value: 867,
        },
        {
          country: '步云乡',
          month: '3月',
          value: 1193,
        },
        {
          country: '步云乡',
          month: '4月',
          value: 1013,
        },
        {
          country: '蛟洋镇',
          month: '11月',
          value: 516,
        },
        {
          country: '蛟洋镇',
          month: '12月',
          value: 816,
        },
        {
          country: '蛟洋镇',
          month: '1月',
          value: 721,
        },
        {
          country: '蛟洋镇',
          month: '2月',
          value: 517,
        },
        {
          country: '蛟洋镇',
          month: '3月',
          value: 1203,
        },
        {
          country: '蛟洋镇',
          month: '4月',
          value: 1033,
        }
      ];

      return (
        <div style={{height:'100%',marginLeft:'-30px',marginTop:'20px'}}>
        <Chart height={350} data={data} /* scale={cols} */ forceFit>
          <Axis name="month" />
          <Axis name="value" 
            line={{stroke: 'rgba(112, 112, 112, 0.4)',lineDash: [0, 0, 0],lineWidth: 1}}
          />
          {/* <Legend 
          position="bottom"
          offsetX={15}
          /> */}
          <Tooltip
            crosshairs={{
              type: "line"
            }}
          />
          <Geom type="areaStack" position="month*value" color={['country', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)','l (90) 0:rgba(29, 219, 184, 1) 1:rgba(29, 219, 184, 0.1)', 'l (90) 0:rgba(139, 212, 18, 1) 1:rgba(139, 212, 18, 0.1)','l (90) 0:rgba(235, 180, 140, 1) 1:rgba(235, 180, 140, 0.1)', 'l (90) 0:rgba(16, 192, 213, 1) 1:rgba(16, 192, 213, 0.1)']]} 
           tooltip={[
            "month*value*country",(month,value,country) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                title:`上杭县${month}数据`,
                name:country,
                value:value,
              };
          }
        ]}
          />
          <Geom type="lineStack" position="month*value" size={2} color={['country', ['rgba(0, 146, 255, 1)', '#00ff00','rgba(29, 219, 184, 1)', 'rgba(139, 212, 18, 1)','rgba(235, 180, 140, 1)', 'rgba(16, 192, 213, 1)']]} />
        </Chart>
      </div>
      );
    }
  }

  export default Stacked;