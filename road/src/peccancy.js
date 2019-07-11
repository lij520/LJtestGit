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
import DataSet from "@antv/data-set";

class Peccancy extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "超速",
        value: 880,
      },
      {
        item: "闯红灯",
        value: 780,
      },
      {
        item: "逆行",
        value: 520,
      },
      {
        item: "违停",
        value: 1689,
      },
      {
        item: "酒驾",
        value: 10,
      },
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["value"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });
    const cols = {
      score: {
        min: 0,
        max: 1700
      }
    };
    return (
      <div>
        <Chart
          height={230}
          data={dv}
          padding={[20, 'auto',0, 'auto']}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={null}
            label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
                textStyle: {
                    fill: 'white',
                  }, // 坐标轴文本属性配置
              }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                stroke: ' rgba(17, 215,255,0.7)', // 网格线的颜色
                lineDash: null
              },
              alternateColor: " rgba(17, 215,255,0.3)"
            }}
            label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
                textStyle: {
                    fill: 'white',
                  }, // 坐标轴文本属性配置
              }}
          />
          {/* <Legend name="user" marker="circle" offset={30} /> */}
          <Geom type="area" position="item*score" color={["user",'rgb(250,210,72)']} 
           tooltip={[
            'item*score', (item,score) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                title:'违章项目',
                name:item,
                value:score,
              };
          }
          ]}
          />
          <Geom type="line" position="item*score" color={["user",'rgb(250,210,72)']} size={2} tooltip={null}/>
          <Geom
            type="point"
            position="item*score"
            color={["user",'rgb(250,210,72)']}
            shape="circle"
            size={4}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Peccancy;