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
import { message} from 'antd';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm           = new MUtil();

class ChartsEvent extends React.Component {

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
      //   url         :  '/eventStatistic/getEventAmount',
      //   dataType    :  'json',
      //   data        : {
      //                   userId:this.state.userId,
      //                   token:this.state.token,
      //                   time:new Date().getTime(),
      //                 },
      //   success     : res => {

      //     console.log('chartsevent:',res);

      //     if(res.result==1){
      //       let Data=[]
      //       res.eventTypeList.map(item=>{
      //         if(item.code!=3000&&item.code!=3100&&item.code!=3200){
      //           Data.push({
      //             type:item.name,
      //             value:item.eventQuantity,
      //             code:item.code,
      //           })
      //         }
      //       })
      //       this.setState({
      //           data: Data
      //         });
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
      this.setState({
        data:[
          {type:'路基',value:56},
          {type:'路面',value:92},
          {type:'桥梁',value:66},
          {type:'水沟涵洞',value:60},
          {type:'隧道',value:88},
          {type:'设施、标志牌',value:50},
          {type:'路政',value:100}
        ]
      })

    }
  render() {
    // const data = [
    //   {
    //     type: "分类一",
    //     value: 10
    //   },
    //   {
    //     type: "分类二",
    //     value: 18
    //   },
    //   {
    //     type: "分类三",
    //     value: 20
    //   },
    //   {
    //     type: "分类四",
    //     value:30
    //   },
    //   {
    //     type: "Other",
    //     value:14
    //   },
    //   {
    //     type: "分类五",
    //     value: 8
    //   },
    //   {
    //     type: "分类六",
    //     value: 20
    //   }
    // ]; // 根据比例，获取两点之间的点

    function getPoint(p0, p1, ratio) {
      return {
        x: (1 - ratio) * p0.x + ratio * p1.x,
        y: (1 - ratio) * p0.y + ratio * p1.y
      };
    }

    const pointRatio = 0.7; // 设置开始变成三角形的位置 0.7
    // 自定义 other 的图形，增加两条线

    G2.Shape.registerShape("interval", "triangleShape", {
      draw(cfg, container) {
        let centerPoint = {
          x: cfg.points[3].x,
          y: (cfg.points[2].y + cfg.points[3].y) / 2
        };
        centerPoint = this.parsePoint(centerPoint);
        const points = this.parsePoints(cfg.points);
        const tmpPoint1 = getPoint(points[0], points[3], pointRatio);
        const tmpPoint2 = getPoint(points[1], points[2], pointRatio);
        let path = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y]);
        path.push(["L", tmpPoint2.x, tmpPoint2.y]);
        path.push(["L", centerPoint.x, centerPoint.y]);
        path.push(["L", tmpPoint1.x, tmpPoint1.y]);
        path.push("Z");
        return container.addShape("path", {
          attrs: {
            fill: cfg.color,
            path: path,
            lineWidth: 1,
            stroke: "white"
          }
        });
      }
    });

    const others=[];
    let total=0;
    for(let i=0;i<this.state.data.length;i++){
        total+=this.state.data[i].value
    }
    this.state.data.map(item=>{
    
        others.push({
          otherType:item.type,
          value:item.value/total,
          code:item.code,
        })
    })

    
        return (
          <Chart height={300}  padding={[40, 40, 60, 20]} forceFit
            // onPlotClick={ev=> {
            //   console.log(ev);
            //   if(ev.data._origin&&this.state.roleId==9){
            //     _mm.setStorage('problemType',{problemTypeName:ev.data._origin.type,problemTypeCode:ev.data._origin.code});
            //     if(ev.data._origin.type=="路政"||ev.data._origin.otherType=="路政"){
            //       window.location.href='#/roadmanage/list'
            //     }else{
            //       window.location.href='#/roadprotect/list'
            //     }
            //   }
            // }} 
          >
            <Tooltip />
             <View
              data={others}
              start={{
                x: 0,
                y: 0
              }}
              end={{
                x: 0.5,
                y: 1
              }}
            >
            <Coord type="theta" radius={0.8} />
            <Geom
              type="intervalStack"
              position="value"
              shape="triangleShape"
              tooltip={['otherType*value', (otherType, value) => {
                return {
                  //自定义 tooltip 上显示的 title 显示内容等。
                  name: '事件数量',
                  title: otherType,
                  value: `${parseInt(value*100)}%`
            };
          }]}
          color={['otherType',['#58a5cc','#78c38e','#e5d16a','#e2986f','#ca87b8','#a68fdc','#4b73a7']]}
            >
              <Label content="otherType" />
            </Geom>
            </View>
            <View
              data={this.state.data}
              start={{
                x: 0.6,
                y: 0
              }}
              end={{
                x: 1,
                y: 0.9
              }}
            >
            <Axis name="type" 
            label={{ // 数值，设置坐标轴文本 label 距离坐标轴线的距离
              formatter(text, item, index) {
                if(index%4==0){
                  return text
                }
              },
              rotate:0
            }}
            />
            <Axis name="value"/>
             <Geom type="interval" position="type*value" color={["type", "#FCD7DE-#F04864"]}  tooltip={['type*value', (type, value) => {
                  return {
                    //自定义 tooltip 上显示的 title 显示内容等。
                    name: '事件数量',
                    title: type,
                    value: value
              };
            }]}>
                <Label content="value" offset={10} />
              </Geom>
            </View>
          </Chart>
        );
    }

}
export default ChartsEvent;
