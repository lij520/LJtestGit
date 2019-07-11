import React from "react";
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

class Show extends React.Component {
  render() {
    const data = [
      {
        year: "1991",
        value: 3
      },
      {
        year: "1992",
        value: 4
      },
      {
        year: "1993",
        value: 3.5
      },
      {
        year: "1994",
        value: 5
      },
      {
        year: "1995",
        value: 4.9
      },
      {
        year: "1996",
        value: 6
      },
      {
        year: "1997",
        value: 7
      },
      {
        year: "1998",
        value: 9
      },
      {
        year: "1999",
        value: 13
      }
    ];
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };

    console.log('test',this.props.showData)
    return (
      <div>
        <Chart height={260} data={this.props.showData} scale={cols} forceFit padding={[20, 30, 30,'auto']}>
          <Axis name="region_name" 
           line={{ stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
           tickLine = {null}/>
          <Axis name="count" 
          line={{stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
          grid={{lineStyle: {
              stroke: '#e8e8e8', // 网格线的颜色
              lineWidth: 1, // 网格线的宽度复制代码
              lineDash: [0, 0]
            }, // 网格线的样式配置，原有属性为 line
          }}/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="region_name*count" size={2}  
          style={{
                stroke: 'rgb(254,126,63)',
            }}
            color='rgb(254,126,63)'
            tooltip={['region_name*count', (region_name,count) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                // name: '巡路里程(公里)',
                title:'累计登录次数(次)',
                name: region_name,
                value: count
              };
            }]}
            />
          <Geom
            type="point"
            position="region_name*count"
            size={4}
            shape={"circle"}
            style={{
                fill:'white',
                stroke: "rgb(254,126,63)",
                lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Show;