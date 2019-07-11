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

class PatrolNum extends React.Component {
  render() {
    // const data = [
    //   {
    //     year: "1951 年",
    //     sales: 38,
    //     index:1,
    //   },
    //   {
    //     year: "1952 年",
    //     sales: 52,
    //     index:2,
    //   },
    //   {
    //     year: "1956 年",
    //     sales: 61,
    //     index:3,
    //   },
    //   {
    //     year: "1957 年",
    //     sales: 145,
    //     index:4,
    //   },
    //   {
    //     year: "1958 年",
    //     sales: 48,
    //     index:5,
    //   },
    // ];
    const cols = {
      sales: {
        tickInterval: 20
      }
    };

    for(let i=0;i<this.props.patrolCountData.length;i++){
      this.props.patrolCountData[i].index=i+1;
    }
    return (
      <div>
        <Chart height={260} data={this.props.patrolCountData} scale={cols}  padding={[20, 30, 30,'auto']} forceFit>
          <Axis name="realName"  
          line={{ stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
           tickLine = {null}/>
          <Axis name="patrolCount" 
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
          <Geom type="interval" position="realName*patrolCount" 
          color={['patrolCount*index', (patrolCount,index)=>{
            if(index%2==0)
              return 'rgb(4,187,221)';
            else
              return 'rgb(246,112,42)';
          }]}
          tooltip={['realName*patrolCount', (realName,patrolCount) => {
            return {
              //自定义 tooltip 上显示的 title 显示内容等。
              // name: '巡路里程(公里)',
              name: '巡路次数(次)',
              title: realName,
              value: patrolCount
            };
          }]}
          />
        </Chart>
      </div>
    );
  }
}

export default PatrolNum;