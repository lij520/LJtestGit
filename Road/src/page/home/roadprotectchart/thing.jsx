import React from "react";
import { Chart, Axis, Geom, Tooltip, Shape } from 'bizcharts';
// 如果是 umd 引入，可使用下面的方式
// const { Chart, Axis, Geom, Tooltip, Shape } = window.BizCharts;

class Thing extends React.Component {

    render(){

        Shape.registerShape('interval', 'triangle', {
            getPoints(cfg) {
              const x = cfg.x;
              const y = cfg.y;
              const y0 = cfg.y0;
              const width = cfg.size;
              return [
                { x: x - width / 2, y: y0 },
                { x: x, y: y },
                { x: x + width / 2, y: y0 }
              ]
            },
            draw(cfg, container) {
              const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
              const polygon = container.addShape('polygon', {
                attrs: {
                  points: [
                    [ points[0].x, points[0].y ],
                    [ points[1].x, points[1].y ],
                    [ points[2].x, points[2].y ]
                  ],
                  fill: cfg.color
                }
              });
              return polygon; // 将自定义Shape返回
            }
          });
          
        const data = [
            { genre: '临城镇', sold: 275,index:1 },
            { genre: '蓝溪镇', sold: 115,index:2},
            { genre: '临江镇', sold: 120,index:3 },
            { genre: '步云乡', sold: 350,index:4},
            { genre: '中都镇', sold: 150,index:5 }
        ];
        return(
            <div>
                <Chart height={260} data={data} forceFit padding={[20, 30, 30,'auto']}>
                <Axis name="genre" 
                 line={{ stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
                 tickLine = {null}/>
                <Axis name="sold" 
                 line={{stroke: 'rgb(0,0,0)',lineDash: [0, 0, 0],lineWidth: 1}}
                 grid={{lineStyle: {
                     stroke: '#e8e8e8', // 网格线的颜色
                     lineWidth: 1, // 网格线的宽度复制代码
                     lineDash: [0, 0]
                   }, // 网格线的样式配置，原有属性为 line
                 }}/>
                 <Tooltip/>
                <Geom type="interval" position="genre*sold" color="genre" shape="triangle"  
                color={['genre*sold*index', (genre,sold,index)=>{
                    if(index%3==0)
                    return 'rgb(119,194,210)';
                    else if((index-3)%2==0)
                        return 'rgb(255,172,66)'
                    else
                        return 'rgb(252,132,106)'
                }]}
                tooltip={['genre*sold', (genre,sold) => {
                  return {
                    //自定义 tooltip 上显示的 title 显示内容等。
                    // name: '巡路里程(公里)',
                    title:'事件上报数(件)',
                    name: genre,
                    value: sold
                  };
                }]}
                />
                </Chart>
            </div>
        )
    }
}

export default Thing;