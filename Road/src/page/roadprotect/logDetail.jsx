import React from 'react';
import { Row, Col, Input,Button,Modal,message} from 'antd';
import moment from 'moment';

const confirm = Modal.confirm;

//openlayers组件
import 'ol/ol.css';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {defaults, ScaleLine,OverviewMap} from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style, Text, Icon as olIcon} from 'ol/style';
import gcoord from 'gcoord';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import start from './mapData/startPoint.png';
import terminal from './mapData/endPoint.png';
import geoMarker from './mapData/cars.png';
//import边界数据
import border_shanghang from './mapData/shanghang_border.json';



//起始点的图标
var styles={
    'icon':new Style({
      image:new olIcon({
        anchor:[0.5,1],
        src:start
      })
    }),
    'icons':new Style({
      image:new olIcon({
        anchor:[0.5,1],
        src: terminal
      })
    }),
    'geoMarker': new Style({
        image:new olIcon({
          anchor:[0.5,1],
          src: geoMarker,
        })
      }),
  }

//创建边界图层
const vectorLayer_border = new VectorLayer({
    title:'border',
    style: new Style({
        stroke: new Stroke({
        //   color:'#4d77b5',
            color:'red',
            width: 3
        })
  })
})

//定义道路轨迹图层
const vectorLayer_track = new VectorLayer({
    title:'track',
    style: new Style({
        stroke: new Stroke({
          color:'green',
          width: 3
        })
      }),
    visible:true,
    zIndex:55
  }); 

//定义巡路员负责道路图层
const vectorLayer_fullTrack = new VectorLayer({
    title:'FullTrack',
    style: new Style({
        stroke: new Stroke({
          color:'red',
          width: 5
        })
      }),
    visible:true,
    zIndex:54
  }); 

//天地图路网
  const tian_di_tu_road_layer = new TileLayer({
    title: "tian_di_tu_road_layer",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    })
});


//天地图路网注记
const tian_di_tu_annotation = new TileLayer({
    title: "tian_di_tu_annotation",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible:true,
    zIndex:999
});
//上杭中心点和比例尺
// const centCoorSH = [116.56,25.07];
// const mapZoomSH = 9;
//中心点比例尺初始化
var centCoorF = [];//应巡道路的中心点
var centCoor = [];//已巡道路的中心点
const mapZoom = 13.5;
// //长泰中心点和比例尺
// const centCoorCT = [117.78,24.72];
// const mapZoomCT = 10;


class LogDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

           mapData: this.props.mapData,
           mapFullData:this.props.mapFullData,
           test:'00000'
        };
        this.trackCorrect = this.trackCorrect.bind(this);
        this.trackDisplay = this.trackDisplay.bind(this);
        this.map = new Map({
            controls: new defaults({
                attributionOptions: {
                  collapsible: false
                }
              }).extend([
                new ScaleLine({
                    //className:'olScaleLine',
                }),
                //new OverviewMap()
              ]),
            // target:'trackMap',
            layers:[
                tian_di_tu_road_layer,
                tian_di_tu_annotation,
                vectorLayer_border,
                vectorLayer_fullTrack,
                vectorLayer_track
            ]
        });
        // this.interval = null;
    }

    trackCorrect(){
      let that = this;
      //console.log(that.props.logData.patrolRecordId)
      confirm({
        title: '确定要校正轨迹吗？',
        content: '',
        onOk() {
          $.ajax({
            type        :  'post',
            url         :  '/road/updateRoad?patrolRecodeId='+that.props.logData.patrolRecordId,
            //data        :  {patrolRecodeId:that.props.logData.patrolRecordId},
            cache       :  false,//上传文件无需缓存
            success     :  res => {
                // console.log("ditu",res);
                if(res.result==='更新成功'){
                    
                    $.ajax({
                      type        :  'post',
                      url         :  '/app_manageRoad/seachRoadByRoadId_app',
                      data        :  {roadid:that.props.logData.roadId,region_id:that.props.logData.regionId},
                      cache       :  false,//上传文件无需缓存
                      success     :  res => {
                          //判断是否需要座标转换
                          let mapFullDataTran;
                          if(res.features[0].properties.mapZuoBiaoXi==='高德'){
                              mapFullDataTran = gcoord.transform(res, gcoord.GCJ02, gcoord.WGS84);       
                          }else{
                              mapFullDataTran = res;
                          }
                          //更新应巡路图层数据
                          vectorLayer_fullTrack.setSource(new VectorSource({features: (new GeoJSON()).readFeatures(mapFullDataTran,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})}));
                          
                          vectorLayer_fullTrack.setStyle(
                            new Style({
                              stroke: new Stroke({
                                color:'red',
                                width: 7
                              })
                          }));
                          //重新计算地图中心点
                          let coorFullT = mapFullDataTran.features;
                          let coors = coorFullT[0].geometry.coordinates;
                          let lengFull = coors.length;

                          if(lengFull/2===0){
                              centCoorF=coors[lengFull/2]
                          }else if(lengFull/2===1){//当道路为只有两个点组成的直线
                              centCoorF=[(coors[0][0]+coors[1][0])/2,(coors[0][1]+coors[1][1])/2];
                          }
                          else{
                              centCoorF=coors[parseInt(lengFull/2)+1];
                          }
                          that.map.getView().setCenter(fromLonLat(centCoorF));
                          
                          message.success('更新成功！');


                      },
                      error       :  err => {
                          message.error('error!');
                      }
                    });
                }

            },
            error       :  err => {
                message.error('error!');
            }
          });
        },
        onCancel() {},
      });
    }

    trackDisplay(coordinates,centCoor,leng){
      //先删除已有图层
       var currentLayers = this.map.getLayers().getArray();
       for(let i=0;i<currentLayers.length;i++){
            if(currentLayers[i].values_.title==='路桩'){
                this.map.removeLayer(currentLayers[i]);
            }       
       }
       //在新的函数定义体中function(){}this.map需要改成that.map
       let that = this;
        //添加起止点图标

        //增加起始点的桩号
        var startMarker=new Feature({
          type:'icon',
          geometry:new Point(fromLonLat(coordinates[0]))
        });
        var endMarker=new Feature({
            type:'icons',
            geometry:new Point(fromLonLat(coordinates[leng-1]))
        });
        var geoMarkers = new Feature({
            type: 'geoMarker',
            geometry: new Point(fromLonLat(coordinates[0]))
          });

      
        var animating = false;
        var speed, now;
        var speedInput = document.getElementById('speed');
        var startButton = document.getElementById('start-animation');

        var markerLayer = new VectorLayer({
            title:"路桩",
            source: new VectorSource({
                features: [startMarker, endMarker, geoMarkers]
            }),
            style: function(feature) {
                // hide geoMarker if animation is active
                if (animating && feature.get('type') === 'geoMarker') {
                    return null;
                }
                return styles[feature.get('type')];
            },
            zIndex:'2030'
        });
        this.map.addLayer(markerLayer);

        var moveFeature = function(event) {
            // let that=this;
            var vectorContext = event.vectorContext;
            var frameState = event.frameState;
    
            if (animating) {
              var elapsedTime = frameState.time - now;
              // here the trick to increase speed is to jump some indexes
              // on lineString coordinates
              var index = Math.round(speed * elapsedTime / 1000);
    
              if (index >= leng) {
                stopAnimation(true);
                return;
              }
    
              var currentPoint = new Point(fromLonLat(coordinates[index]));
              var feature = new Feature(currentPoint);
              vectorContext.drawFeature(feature, styles.geoMarker);
            }
            // tell OpenLayers to continue the postcompose animation
            that.map.render();
          };
    
          function startAnimation() {
            // let that=this;
            if (animating) {
              stopAnimation(false);
            } else {
              animating = true;
              now = new Date().getTime();
              speed = speedInput.value;
            //   startButton.textContent = 'Cancel Animation';
              // hide geoMarker
              geoMarkers.setStyle(null);
              // just in case you pan somewhere else
              that.map.getView().setCenter(fromLonLat(centCoor));
              that.map.on('postcompose', moveFeature);
              that.map.render();
            }
          }
    
    
          /**
           * @param {boolean} ended end of animation.
           */
          function stopAnimation(ended) {
            // let that=this; 
            animating = false;
            // startButton.textContent = 'Start Animation';
            // if animation cancelled set the marker at the beginning
            var coord = ended ? coordinates[leng - 1] : coordinates[0];
            /** @type {module:ol/geom/Point~Point} */ (geoMarkers.getGeometry())
              .setCoordinates(coord);
            //remove listener
            that.map.un('postcompose', moveFeature);
          }
    
          startButton.addEventListener('click', startAnimation, false);   
    }

    componentDidMount(){

        // const map = new Map({
        //     controls: new defaults({
        //         attributionOptions: {
        //           collapsible: false
        //         }
        //       }).extend([
        //         new ScaleLine({
        //             //className:'olScaleLine',
        //         }),
        //         //new OverviewMap()
        //       ]),
        //     // target:'trackMap',
        //     layers:[
        //         tian_di_tu_road_layer,
        //         tian_di_tu_annotation,
        //         vectorLayer_border,
        //         vectorLayer_fullTrack,
        //         vectorLayer_track,
                
        //     ]
        // });
        this.map.setTarget('trackMap');
        
        if((RegExp("^(350823)").test(this.props.logData.regionId))){//上杭
            
            // vectorLayer_border.setSource(new VectorSource({
            //     features: (new GeoJSON()).readFeatures(border_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
            // }));//添加边界
        }
        
        //清除两个图层原有的source
        if(vectorLayer_fullTrack.getSource()!==null){
          vectorLayer_fullTrack.getSource().clear();
        }
        if(vectorLayer_track.getSource()!==null){
          vectorLayer_track.getSource().clear();
        }

        //添加已巡路路段
        console.log('trackData',this.state.mapData);
        let mapDataTran=gcoord.transform(this.state.mapData, gcoord.GCJ02, gcoord.WGS84);
        if(mapDataTran.features.length>0){
          vectorLayer_track.setSource(new VectorSource({
              features: (new GeoJSON()).readFeatures(mapDataTran,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
          }));
          //获取已巡路路段座标
          var coordinatesT = mapDataTran.features;
          var coordinates =coordinatesT[0].geometry.coordinates;
          var leng=coordinates.length;

          if(leng/2===0){
            centCoor=coordinates[leng/2]
          }else if(leng/2===1){//当道路为只有两个点组成的直线
              centCoor=[(coordinates[0][0]+coordinates[1][0])/2,(coordinates[0][1]+coordinates[1][1])/2];
          }
          else{
              centCoor=coordinates[parseInt(leng/2)+1];
          }
        }
        console.log('mapDataTran',mapDataTran);

        //添加负责巡路路段(在获取数据的时候已经判断过是否需要做座标转换)
        console.log('fullTrackData',this.state.mapFullData);
        
        if(this.state.mapFullData.features.length>0){
          vectorLayer_fullTrack.setSource(new VectorSource({
            features: (new GeoJSON()).readFeatures(this.state.mapFullData,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
          }));

          //如果有应巡路路段数据，以负责的总巡路路段中点作为地图中心点
          var coorFullT = this.state.mapFullData.features;
          var coors = coorFullT[0].geometry.coordinates;
          var lengFull = coors.length;

          if(lengFull/2===0){
              centCoorF=coors[lengFull/2]
          }else if(lengFull/2===1){//当道路为只有两个点组成的直线
              centCoorF=[(coors[0][0]+coors[1][0])/2,(coors[0][1]+coors[1][1])/2];
          }
          else{
              centCoorF=coors[parseInt(lengFull/2)+1];
          }
          //设置中心点和比例尺
          this.map.getView().setCenter(fromLonLat(centCoorF));
          this.map.getView().setZoom(mapZoom);
        }else if(this.state.mapFullData.features.length===0 && mapDataTran.features.length>0){
          //如果没有应巡路路段，以已巡路路段中点作为地图中心点
          
          //设置中心点和比例尺
          this.map.getView().setCenter(fromLonLat(centCoor));
          this.map.getView().setZoom(mapZoom);
        }else{
          alert('巡路数据不存在');
          this.map.getView().setCenter(fromLonLat([118.217006,26.035721]));//福建省中心点
          this.map.getView().setZoom(7);
        }
        
        this.trackDisplay(coordinates,centCoor,leng);
       
        
    }

    render(){
        return( 
            <Col span={12} id='trackMap' style={{flex:'1',paddingTop:'8px'}}>
                <label id="speeds" style={{position:'absolute',zIndex:'2010',right:'100px',top:'5px'}}>
                    速度:&nbsp;
                    <input id="speed" type="range" min="5" max="999" step="10" defaultValue="10"/>
                </label>
                <Button id="start-animation" style={{position:'absolute',zIndex:'2010',right:'10px',background: 'rgba(254,166,59,0.8)',color: 'white',border:'1px rgba(254,166,59,0.8)'}}>轨迹回放</Button>
                {/* <Button id="start-animation" style={{position:'absolute',zIndex:'2010',right:'10px',top:'50px',background: 'rgba(0,60,136,0.5)',color: 'white',border:'1px rgba(0,60,136,0.5)'}} onClick={this.trackCorrect}>轨迹更正</Button> */}
                
                <div id='legend' style={{background:'rgba(255,255,255,0.6)',position:'absolute',zIndex:'2010',width:'30%',height:'25%',right:'0',bottom:'0',textAlign:'center',padding:'2px'}}>
                    <b>图例</b>
                    <div style={{width:'100%',height:'100%'}}>
                      <div style={{height:'30%',lineHeight:'30%',display:'inline-block',padding:'5%',textAlign:'left'}}>
                          <svg style={{verticalAlign:'middle'}} width='20%' height='100%' version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10%" y1="50%" x2="90%" y2="50%" style={{stroke:'green',strokeWidth:'3'}}/>
                          </svg>
                          &nbsp;
                          已巡路轨迹
                      </div>
                      <div style={{height:'30%',lineHeight:'30%',display:'inline-block',padding:'5%',textAlign:'left'}}>
                          <svg style={{verticalAlign:'middle'}} width="20%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10%" y1="50%" x2="90%" y2="50%" style={{stroke:'red',strokeWidth:'5'}}/>
                          </svg>
                          &nbsp;
                          负责巡路轨迹
                      </div>
                    </div>
                </div>
                
            </Col>
            
        )
    }
}

export default LogDetail;