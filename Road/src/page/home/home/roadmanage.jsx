import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts';
import DataSet from "@antv/data-set";
import $ from 'jquery';
import { message} from 'antd';
import MUtil        from 'util/mm.jsx';
const _mm           = new MUtil();

class RoadManage extends React.Component {

  constructor() {
    super();
    this.state={
      userId          : _mm.getStorage('userInfo').userId,
      token           : _mm.getStorage('userInfo').token,
      roleId          : _mm.getStorage('userInfo').roleId,
      data            :[],
    }
    this.Data=[];
  }

  componentDidMount() {
    // const beginTime=['2018-11-1','2018-12-1','2019-1-1','2019-2-1','2019-3-1','2019-4-1']
    // const endTime=['2018-11-30','2018-12-31','2019-1-31','2019-2-28','2019-3-31','2019-4-30']

   
    //     for(let i=0;i<beginTime.length;i++){
    //       $.ajax({
    //         type        :  'post',
    //         url         :  '/statistics/getManage.do',
    //         dataType    :  'json',
    //         async       :false ,
    //         data        : {
    //                         userId:this.state.userId,
    //                         token:this.state.token,
    //                         beginTime: beginTime[i],
    //                         endTime:endTime[i],
    //                       },
    //         success     : res => {
      
    //           console.log('roadmanage:',res);
      
    //           if(res.result==1){
    //               this.Data.push({
    //                 '未处理事件':res.manageStatistics[1].countNotProcess, 
    //                 '已处理事件':res.manageStatistics[1].countProcess,
    //                 '处理中事件':res.manageStatistics[1].countProcessing
    //               });
    //           }
    //           else if(res.result==-1){
    //             message.error(res.message);
    //             window.location.href = '/';
    //           }
    //           else{
    //             message.error(res.message);
    //           }
                
    //         },
    //         error       : err => {
    //           message.error("失败!");
    //         }
    //       })
    //   }


      this.Data=[{ '未处理事件':2, 
                    '已处理事件':3,
                    '处理中事件':2,
                  },
                  { '未处理事件':3, 
                    '已处理事件':5,
                    '处理中事件':4,
                  },
                  { '未处理事件':5, 
                    '已处理事件':10,
                    '处理中事件':2,
                  },
                  { '未处理事件':2, 
                    '已处理事件':8,
                    '处理中事件':3,
                  },
                  { '未处理事件':1, 
                    '已处理事件':3,
                    '处理中事件':2,
                  },
                  { '未处理事件':1, 
                    '已处理事件':6,
                    '处理中事件':3,
                  },
                ];

        for(let i=0,j=11;i<this.Data.length;i++,j++){
          if(j==13){
            j=1;
          }
          this.Data[i].month=`${j}月`;
      }

      this.setState({
        data:  this.Data
      });

  }
  render() {

    const ds = new DataSet();
    const dv = ds.createView().source(this.state.data);
    dv.transform({
      type: 'fold',
      fields: [ '未处理事件','处理中事件','已处理事件', ], // 展开字段集
      key: 'group',                   // key字段
      value: 'roadManage',               // value字段
    });
    return (
      <div>
        <Chart height={300} data={dv}  forceFit padding={[30, 65, 30, 'auto']}>
          <Axis name="month"  line={{ stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}/>
          <Axis name="roadManage" 
           line={{stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
           grid={{lineStyle: {
               stroke: '#e8e8e8', // 网格线的颜色
               lineWidth: 1, // 网格线的宽度复制代码
               lineDash: [0, 0]
             }, // 网格线的样式配置，原有属性为 line
           }}
          />
          <Legend />
          <Tooltip />
          <Geom type="areaStack" position="month*roadManage" color={['group', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)','l (90) 0:rgba(252,213,47, 1) 1:rgba(252,213,47, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} 
            tooltip={[
              "month*roadManage*group",(month,roadManage,group) => {
                return {
                  //自定义 tooltip 上显示的 title 显示内容等。
                  title:`临城镇${month}数据`,
                  name:group,
                  value:roadManage,
                };
            }
          ]}
          />
          <Geom type="lineStack" position="month*roadManage" size={2} color={['group', ['rgba(0, 146, 255, 1)','rgba(252,213,47, 1)', '#00ff00']]} tooltip='null'/>
        </Chart>
      </div>
    );
  }
}

export default RoadManage;