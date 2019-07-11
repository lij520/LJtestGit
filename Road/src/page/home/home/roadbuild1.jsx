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


class RoadBuild extends React.Component {

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

    $.ajax({
      type        :  'post',
      url         :  '/statistics/roadsConstructionInFo',
      dataType    :  'json',
      data        : {
                      userId:this.state.userId,
                      token:this.state.token,
                      beginTime: '2018-9-1',
                      endTime:'2019-12-31',
                    },
      success     : res => {

        console.log('roadbuild:',res);

        if(res.result==1){
          let Data=[]
          
            res.statsList.map(item=>{
                Data.push({
                  '在建道路':item.roadsUnderConstruction,
                  '竣工道路':item.roadsCompleted,
                  regionName:item.regionName,
                })
            })
         
         
          this.setState({
              data:  Data.slice(0,8)
            });
        }
        else if(res.result==-1){
          message.error(res.message);
          window.location.href = '/';
        }
        else{
          message.error(res.message);
        }
           
      },
      error       : err => {
        message.error("失败!");
      }
    })
  }
  render() {
    console.log(this.state.data)
    
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.data);
    dv.transform({
      type: 'fold',
      fields: [ '在建道路', '竣工道路' ], // 展开字段集
      key: 'group',                   // key字段
      value: 'roadConstructioin',               // value字段
      // retains: [ 'country' ]        // 保留字段集，默认为除 fields 以外的所有字段
    });
  
    return (
      <div>
        <Chart height={300} data={dv} forceFit padding={[20, 'auto', 25, 'auto']}>
          {/* <Legend /> */}
          <Axis name='regionName' 
            line={{ stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
            label={{
              textStyle: {
                textAlign: "center" // 设置坐标轴 label 的文本对齐方向
              },
              rotate:0,
              formatter(text, item, index) {
                if(index%2==0){
                  return text
                }
              },}}
              tickLine = {null}
              />
          <Axis name="roadConstructioin" 
            line={{stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
            grid={{lineStyle: {
                stroke: '#e8e8e8', // 网格线的颜色
                lineWidth: 1, // 网格线的宽度复制代码
                lineDash: [0, 0]
              }, // 网格线的样式配置，原有属性为 line
            }}
            />
          <Tooltip />
          <Geom 
            type="intervalStack"
            position="regionName*roadConstructioin"
             color={['group', (value) => {
                if (value === '在建道路') {
                  return 'rgb(50,150,249)';
                }
                if (value ==='竣工道路') {
                  return 'rgb(72,211,254)';
                }
              }]}
            style={{stroke: "#fff",lineWidth: 0.1}}
          />
        </Chart>
      </div>
    );
  }
}

export default RoadBuild;