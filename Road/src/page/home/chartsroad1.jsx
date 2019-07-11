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


class ChartsRoad extends React.Component {

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

        if(this.state.roleId==8){
          $.ajax({
            type        :  'post',
            url         :  '/patrolStatisticApp/roadChiefPatrol',
            dataType    :  'json',
            data        : {
                            userId:this.state.userId,
                            token:this.state.token,
                            beginTime: `${new Date().getFullYear()}-${new Date().getMonth()+1}-01`,
                            endTime:`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
                            pageNum:0,
                            pageSize:18,
                            type:1
                          },
            success     : res => {
  
              console.log('chartsroad:',res);
  
              if(res.result==1){
                let Data=[]
                res.patrol.map(item=>{
                  Data.push({
                    key:item.realName,
                    // value:item.mileage,
                    value:item.patrolCount
                  })
                })
                this.setState({
                    data: Data
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
        if(this.state.roleId==9){
            $.ajax({
              type        :  'post',
              url         :  'patrolStatisticApp/townPatrol',
              dataType    :  'json',
              data        : {
                              userId:this.state.userId,
                              token:this.state.token,
                              beginTime: `${new Date().getFullYear()}-${new Date().getMonth()+1}-01`,
                              endTime:`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
                              // pageNum:0,
                              // pageSize:18,
                              type:1
                            },
              success     : res => {
    
                console.log('whole:',res);
    
                if(res.result==1){
                  let Data=[]
                  res.patrol.map(item=>{
                    Data.push({
                      key:item.realName,
                      // value: item.mileage,
                      value:item.patrolCount,
                      regionId:item.regionId
                    })
                  })
                  this.setState({
                      data: Data
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

        $.ajax({
          type        :  'post',
          url         :  '/patrolStatisticApp/roadChiefPatrol',
          dataType    :  'json',
          data        : {
                          userId:this.state.userId,
                          token:this.state.token,
                          beginTime: '2018-11-10',
                          endTime:`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
                          type:1
                        },
          success     : res => {

            console.log('chartsroad:',res);

            if(res.result==1){
              this.props.countryPatrol(res.countryPatrol);
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
        // const _this = this;
        // var newData = [];
        // setInterval(function() {
        //   for(var i=1;i<21;i++){
        //     newData.push({
        //                 question:`分类${i}`,
        //                 percent:(Math.random()*10).toFixed(1)
        //             })
        //     }

        //   _this.setState({
        //     data: newData
        //   });
        // }
        // , 120);}
   
    render() {
     

    // const data=[];
    // for(var i=1;i<21;i++){
    //         data.push({
    //             key:`分类${i}`,
    //             value: i
    //         })
    // }

    const cols = {
        value: {
          min: 0
        }
    };
        return (
            <div>
            <Chart
              height={300}
              data={this.state.data}
              scale={cols}
              padding={[40, 170, 60, 0]}
              forceFit
              // onPlotClick={ev=> {
              //   console.log(ev);
              //   if(ev.data._origin&&this.state.roleId==9){
              //     _mm.setStorage('patrolRegionId',{regionId:ev.data._origin.regionId,regionName:ev.data._origin.key});
              //     window.location.href='#/roadprotect/patrolcondition'
              //   }
              // }}
            >
              <Coord type="polar" />
              <Axis
                name="value"
                label={null}
                tickLine={null}
                line={{
                  stroke: "#E9E9E9",
                  lineDash: [3, 3]
                }}
              />
              <Axis
                name="key"
                grid={{
                  align: "center"
                }}
                tickLine={null}
                label={{
                  Offset: 10,
                  textStyle: {
                    textAlign: "center" // 设置坐标轴 label 的文本对齐方向
                  },
                  formatter(text, item, index) {
                    return `${text.slice(0,5)}`;
                  },
                }}
              />
              <Legend name="key" position="right" offsetX={-20}  offsetY={-10} 
              itemFormatter= {(item) => {
                return item.slice(0,5)
              }}/>
              {/* <Legend name="type" position="top"  offsetY={-10}  visible={true}/> */}
              <Tooltip />
              <Geom
                type="interval"
                position="key*value"
                color="key"
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
                tooltip={['key*value', (key, value) => {
                  return {
                    //自定义 tooltip 上显示的 title 显示内容等。
                    // name: '巡路里程(公里)',
                    name: '巡路次数(次)',
                    title: key,
                    value: value
                  };
                }]}
              >
                {/* <Label
                  content="value"
                  offset={10}
                  textStyle={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 11
                  }}
                /> */}
              </Geom>
            </Chart>
          </div>
        );
      }
}

export default ChartsRoad;