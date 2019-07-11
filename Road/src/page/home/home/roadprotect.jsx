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
import $ from 'jquery';
import { message} from 'antd';
import MUtil        from 'util/mm.jsx';
const _mm           = new MUtil();

class RoadProtect extends React.Component {
  constructor() {
    super();
    this.state={
      userId          : _mm.getStorage('userInfo').userId,
      token           : _mm.getStorage('userInfo').token,
      roleId          : _mm.getStorage('userInfo').roleId,
      data            :[],
    }
  }

  componentDidMount() {

    // $.ajax({
    //   type        :  'post',
    //   url         :  'patrolStatisticApp/townPatrol',
    //   dataType    :  'json',
    //   data        : {
    //                   userId:this.state.userId,
    //                   token:this.state.token,
    //                   beginTime: '2018-9-1',
    //                   endTime:`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
    //                 },
    //   success     : res => {

    //     console.log('roadprotect:',res.patrol);

    //     if(res.result==1){
    //       let Data=[]
    //       res.patrol.map(item=>{
    //           Data.push({
    //             item:item.realName,
    //             count:item.mileage,
    //           })
    //       })
    //       Data[5].item='其他';
    //       Data[5].count=0;
    //       for(let i=5;i<Data.length;i++){
    //         Data[5].count+=Data[i].count;
    //       }
    //       this.setState({
    //         data: Data.slice(0,6)
    //       });
    //     }
    //     else if(res.result==-1){
    //       message.error(res.message);
    //       window.location.href = '/';
    //     }
    //     else{
    //       message.error(res.message);
    //     }
           
    //   },
    //   error       : err => {
    //     message.error("失败!");
    //   }
    // })

    const data = [
      {
        item: "步云乡",
        count: 40,
        index:1,
      },
      {
        item: "蛟洋镇",
        count: 21,
        index:2,
      },
      {
        item: "才溪镇",
        count: 17,
        index:3,
      },
      {
        item: "泮境乡",
        count: 13,
        index:4,
      },
      {
        item: "白砂镇",
        count: 9,
        index:5,
      }
    ];
    this.setState({
      data:data
    })
  }

  render() {
    const { DataView } = DataSet;
    console.log(this.state.data)
    const dv = new DataView();
   
    dv.source(this.state.data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });

   

    const cols = {
      percent: {
        formatter: val => {
          val = parseInt(val * 100) + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} padding={[0, 'auto', 10, 'auto']} forceFit>
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          {/* <Legend
            position="right"
            offsetY={}
            offsetX={-200}
          /> */}
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
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
            color={['item',['rgb(90,182,249)','rgb(153,212,18)','rgb(235,178,137)','rgb(31,222,180)','rgb(254,164,59)']]}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default RoadProtect;