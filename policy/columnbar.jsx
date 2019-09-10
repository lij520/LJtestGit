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
  Util
} from "bizcharts";

class Basiccolumn extends Component {
  render() {
    const data = [
      {
        zone: "临江镇",
        事件上报: 64
      },
      {
        zone: "临城镇",
        事件上报: 201
      },
      {
        zone: "白砂镇",
        事件上报: 311
      },
      {
        zone: "步云乡",
        事件上报: 577
      },
      {
        zone: "才溪镇",
        事件上报: 429
      },
      {
        zone: "蛟洋镇",
        事件上报: 282
      },
      {
        zone: "湖洋镇",
        事件上报: 133 
      },
    ];
    const cols = {
      事件上报: {
        tickInterval: 100
      }
    };
    return (
      <div style={{marginLeft:'-40px'}}>
        <Chart height={350} data={data} scale={cols} forceFit>
          <Axis name="zone" />
          <Axis name="事件上报" 
            line={{stroke: 'rgba(112, 112, 112, 0.4)',lineDash: [0, 0, 0],lineWidth: 1}}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="zone*事件上报" color={['事件上报',(事件上报)=>{
          //some code
            if((事件上报 < 600 && 事件上报>500)||(事件上报 < 300 && 事件上报>200))
              return '#3296F9';
            else
              return '#48D3FE';}]}/>
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;