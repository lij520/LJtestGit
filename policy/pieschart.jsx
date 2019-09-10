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
import DataSet from "@antv/data-set";

class Labelline extends Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "步云乡",
        count: 597
      },
      {
        item: "蛟洋镇",
        count: 312
      },
      {
        item: "临江镇",
        count: 64
      },
      {
        item: "临城镇",
        count: 170
      },
      {
        item: "白砂镇",
        count: 287
      },
      {
        item: "湖洋镇",
        count: 173
      },
      {
        item: "才溪镇",
        count: 469
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div style={{height:'100%',marginLeft:'-15px'}}>
        <Chart
          height={350}
          style={{marginTop:'-110px'}}
          data={dv}
          scale={cols}
          padding={[140, 100, 'auto', 80]}
          forceFit
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          {/* <Legend
            position="right"
            offsetY={-30}
            offsetX={40}
          /> */}
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = parseFloat(percent * 100).toFixed(2) + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
            // color= "item"
            color={["item",(item)=>{
              if(item ==="步云乡")
                return '#5EBAFA';
              else if(item ==="才溪镇")
                return '#8DD412';
              else if(item ==="蛟洋镇")
                return '#EBB78F';
              else if(item ==="湖洋镇")
                return '#1AD6BD';
              else if(item ==="白砂镇")
                return '#FEA43B';
              else if(item ==="临城镇")
                return '#3296F9';
              else
                return '#48D3FE';
            }]}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " +parseFloat(val).toFixed(2) +'%';
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Labelline;