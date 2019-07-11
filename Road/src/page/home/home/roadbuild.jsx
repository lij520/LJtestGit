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

class RoadBuild extends React.Component {
  render() {
    const data = [
      {
        realName: "临城镇",
        patrolCount: 10,
        index:1,
      },
      {
        realName: "临江镇",
        patrolCount: 4,
        index:2,
      },
      {
        realName: "蓝溪镇",
        patrolCount: 15,
        index:3,
      },
      {
        realName: "步云乡",
        patrolCount: 30,
        index:4,
      },
      {
        realName: "白砂镇",
        patrolCount: 20,
        index:5,
      },
      {
        realName: "溪口镇",
        patrolCount: 7,
        index:30,
      },
      {
        realName: "南阳镇",
        patrolCount: 9,
        index:7,
      },
      {
        realName: "蛟洋镇",
        patrolCount: 18,
        index:8,
      },
      {
        realName: "泮境乡",
        patrolCount: 8,
        index:9,
      },
    ];


    // for(let i=0;i<this.props.patrolCountData.length;i++){
    //   this.props.patrolCountData[i].index=i+1;
    // }
    return (
      <div>
        <Chart height={280} data={data}  padding={[30, 30, 25, 'auto']} forceFit>
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
              return 'rgb(72,211,254)';
            else
              return 'rgb(50,150,249)';
          }]}
          tooltip={['realName*patrolCount', (realName,patrolCount) => {
            return {
              //自定义 tooltip 上显示的 title 显示内容等。
              // name: '巡路里程(公里)',
              name: '道路建设(条数)',
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

export default RoadBuild;