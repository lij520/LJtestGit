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

class RoadOperation extends React.Component {
  render() {
    const { Text } = Guide;
    const data = [
      {
        question: "临城镇",
        percent: 0.4,
        index:1,
      },
      {
        question: "古田镇",
        percent: 0.6,
        index:2,
      },
      {
        question: "中都镇",
        percent: 0.8,
        index:3,
      },
      // {
      //   question: "蛟阳镇",
      //   percent: 0.6
      // },
      // {
      //   question: "步云乡",
      //   percent: 0.84
      // },
     
    ];
    const cols = {
      percent: {
        min: 0,
        max: 1
      }
    };
    return (
      <div>
        <Chart height={300} data={data} scale={cols} forceFit padding={[0, 'auto', 10, 'auto']}>
          <Coord type="polar" innerRadius={0.1} transpose />
          <Tooltip title="question" />
          <Geom
            type="interval"
            position="question*percent"
            color={["percent",
            "#64ffda-#00bfa5"
          ]}
            tooltip={[
              "percent",
              val => {
                return {
                  name: "占比",
                  value: val * 100 + "%"
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
           
            color={['percent*index', (percent,index) => {
              if (index === 1) {
                return ['l (90) 0:rgb(53,156,243) 0.2:rgb(92,184,249) 1:rgb(53,156,243)'];
              }
              if (index ===2) {
                return ['l (90) 0:rgb(246,136,50) 0.2:rgb(247,178,56) 1:rgb(246,136,50)'];
              }
              if (index ===3) {
                return ['l (90) 0:rgb(32,225,177) 0.2:rgb(17,194,211) 1:rgb(32,225,177)'];
              }
            }]}
          >
            <Label content="percent" offset={-5} />
          </Geom >
          <Guide>
            {data.map(obj => {
              return (
                <Text 
                  key={obj.question}
                  position={[obj.question, 0]}
                  content={obj.question + " "}
                  style={{
                    textAlign: "right"
                  }}
                />
              );
            })}
          </Guide>
        </Chart>
      </div>
    );
  }
}

export default RoadOperation;