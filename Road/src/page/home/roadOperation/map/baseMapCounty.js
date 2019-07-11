import React,{ Component } from 'react';
//import Draggable from 'react-draggable';
// import './baseMap.scss';
// import './baseMap.less';
import 'ol/ol.css';
import {Map, View,Feature,Sphere} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {defaults, ScaleLine,OverviewMap} from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style, Text, Icon as olIcon,Circle,Circle as CircleStyle,Size} from 'ol/style';
import Select from 'ol/interaction/Select';
import {click, pointerMove} from 'ol/events/condition';
import Overlay from 'ol/Overlay';
import {Draw, Modify, Snap} from 'ol/interaction.js';
import {unByKey} from 'ol/Observable.js';
import Polygon from 'ol/geom/Polygon.js';
import LineString from 'ol/geom/LineString.js';
import Point from 'ol/geom/Point.js';

import {Button,Icon} from 'antd';
// import { MapNav } from '../map-nav/mapNav';//不需要侧边栏
import earth from './icons/earth.png';
import busStop from './icons/busStop.png';

// import bridge_icon from './icons/bridge_icon.png';
// import manager_icon from './icons/manager_icon.png';
// import manager_icon_grey from './icons/manager_icon_grey.png';

// ////////////////代码中没有添加图层，也没有ajax代码///////////////////
// import culvert_icon from './icons/culvert_icon.png';
// import tunnel_icon from './icons/tunnel_icon.png';
// import countryRoad_tech from './icons/countryRoad_tech.png';
// //////////////////////////////////
// import video from './icons/video.png';

// import IllegalEncroach_icon from './icons/illegal_encroach.png';
// import IllegalBuilding_icon from './icons/illegal_building.png';
// import Encroach_icon from './icons/encroach.png';
// import IllegalOperation_icon from './icons/illegal_operation.png';
// import OverloadUltra_icon from './icons/overload_ultra.png';
// import Embankment_icon from './icons/embankment.png';
// import SlopeDamage_icon from './icons/slope_damage.png';
// import WallCollapse_icon from './icons/wall_collapse.png';
// import ShoulderWeed_icon from './icons/shoulder_weed.png';
// import PilesDebris_icon from './icons/piles_debris.png';
// import SlopeWeeds_icon from './icons/slope_weeds.png';
// import SlopeRockfall_icon from './icons/slope_rockfall.png';
// import RoadDirt_icon from './icons/road_dirt.png';
// import PavementDamage_icon from './icons/pavement_damage.png';
// import RoadDebris_icon from './icons/road_debris.png';
// import MissingJoint_icon from './icons/missing_joint.png';
// import AccessoryDamaged_icon from './icons/accessory_damaged.png';
// import BridgeDamage_icon from './icons/bridge_damaged.png';
// import BridgeUnderstructure_icon from './icons/bridge_understructure.png';
// import BridgeWashed_icon from './icons/bridge_washed.png';
// import LiningCrack_icon from './icons/lining_crack.png';
// import LiningLeaking_icon from './icons/lining_leaking.png';
// import TunnelDamaged_icon from './icons/tunnel_damaged.png';
// import DrainPlug_icon from './icons/drain_plug.png';
// import CollapseDamage_icon from './icons/collapse_damaged.png';
// import MarkDamage_icon from './icons/mark_damaged.png';
// import BarrierDamage_icon from './icons/barrier_damaged.png';
// import DamageColumn_icon from './icons/column_damaged.png';
// import WideAngleDamaged_icon from './icons/wide_angle_damaged.png';
// import LineLoss_icon from './icons/line_loss.png';
// import OtherThing_icon from './icons/other_things.png';

import $ from 'jquery';
import gcoord from 'gcoord';

//引入道路路径
//
import Groad_shanghang from './ShangHangJson/SHguodao.json';
import Sroad_shanghang from './ShangHangJson/SHshengdao.json';
import Xroad_shanghang from './ShangHangJson/SHxiandao.json';
// import Yroad_fujian from './fujianJson/LX_Y.json';
// import Croad_fujian from './fujianJson/LX_C.json';

//引入边界数据
import border_shanghang from './ShangHangJson/shanghang_border.json';

// const URL='http://36.250.234.57:13077'
// const URL='http://192.168.0.128:8080'
// const URL='http://10.19.1.159:13077'
const URL = ''

// const managerURL='http://36.250.234.57:13077';
const managerURL='';

//图片地址
//const picUrl="http://36.250.234.57:13077";
const picUrl='';

//创建边界图层
const vectorLayer_border = new VectorLayer({
    // source: new VectorSource({
    //     //url:'./fuding.json',
    //     format: new GeoJSON(),
    //     features: (new GeoJSON()).readFeatures(border_nanjing,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    // }),
    title:'border',
    style: new Style({
        // fill: new Fill({
        //   color: 'rgba(255, 255, 255, 0)'
        // }),
        stroke: new Stroke({
          color:'red'/* '#D2691E' */,
          width: 3
        }),
        text: new Text({
          font: '12px Calibri,sans-serif',
          fill: new Fill({
            color: '#000'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 3
          })
        })
      })
  });
  

//定义道路图层
//国道
const vectorLayer_Groad = new VectorLayer({
    source: new VectorSource({
        //url: './LX_G_fuding.geojson',
        // format: new GeoJSON(),
        features: (new GeoJSON()).readFeatures(Groad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    }),
    title:'Groad',
    style: new Style({
        stroke: new Stroke({
          color:'#FF6347',
          width: 4
        })
      }),
    visible:true,
    zIndex:55
  }); 

//省道
const vectorLayer_Sroad = new VectorLayer({
    title:'Sroad',
    source: new VectorSource({
        //url: './LX_G_fuding.geojson',
        // format: new GeoJSON(),
        features: (new GeoJSON()).readFeatures(Sroad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    }),
    style: new Style({
        stroke: new Stroke({
          color:'#FF4500',
          width: 2
        })
      }),
    visible:true,
    zIndex:54
  }); 

//县道
const vectorLayer_Xroad = new VectorLayer({
    title:'Xroad',
    source: new VectorSource({
        // //url:'./LX_X_fuding.geojson',
        // format: new GeoJSON(),
        features: (new GeoJSON()).readFeatures(Xroad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    }),
    style: new Style({
        stroke: new Stroke({
          color:'#FF7F00',
          width: 2
        })
      }),
    visible:true,
    zIndex:53
  }); 

//乡道
const vectorLayer_Yroad = new VectorLayer({
    title:'Yroad',
    source: new VectorSource({
        //url: './LX_Y_fuding.geojson',
        // format: new GeoJSON(),
        // features: (new GeoJSON()).readFeatures(Yroad_jinjiang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    }),
    style: new Style({
        stroke: new Stroke({
          color:'#FF8072',
          width: 2.5
        })
      }),
    visible:true,
    zIndex:52
  }); 

//村道
const vectorLayer_Croad = new VectorLayer({
    title:'Croad',
    source: new VectorSource({
        //url: './LX_C_fuding.geojson',
        // format: new GeoJSON(),
        // features: (new GeoJSON()).readFeatures(Croad_jinjiang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    }),
    style: new Style({
        stroke: new Stroke({
          color:'#FFA07A',
          width: 1
        })
      }),
    visible:true,
    zIndex:51
  }); 
//专管员图层
const manager_layer = new VectorLayer({
    title:'manager',
    source: new VectorSource({
    }),
    zIndex:1000,
    visible:true,
    style:
        function(feature){
            let managerStyle;
            if(feature.get('online')===false){
                managerStyle=new Style({
                    image: new olIcon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        crossOrigin: 'anonymous',
                        src: manager_icon_grey,
                        // size:[20,24.59]
                    }))
                });
            }else if(feature.get('online')===true){
                managerStyle=new Style({
                    image: new olIcon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        crossOrigin: 'anonymous',
                        // src: manager_icon,
                        
                    }))
                })   
            }
            return managerStyle;
        }
})

//巡路
const trackLoop_layer = new VectorLayer({
    title:'trackLoop',
    source: new VectorSource(),
    zIndex:1000,
    visible:true,
    style:new Style({
        stroke: new Stroke({
          color:'#00FA9A',
          width: 3
        })
    }),
});
const pathLoop_layer = new VectorLayer({
    title:'pathLoop',
    source: new VectorSource(),
    zIndex:1001,
    visible:true,
    style:new Style({
        stroke: new Stroke({
          color:'darkgreen',
          width: 3
        })
    }),
});

const tian_di_tu_road_layer = new TileLayer({
    title: "tian_di_tu_road_layer",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible:false
});



const tian_di_tu_annotation = new TileLayer({
    title: "tian_di_tu_annotation",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible:false,
    zIndex:999
});
const tian_di_tu_img_layer = new TileLayer({
    title: "tian_di_tu_img_layer",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015',
        maxZoom:16
    }),
    visible:false,
});

const tian_di_tu_img_annotation = new TileLayer({
    title: "tian_di_tu_img_annotation",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=6a6808a7890958ff8df61d2c49323015',
        maxZoom:16
    }),
    visible:false,
    zIndex:999
});
//比例尺和中心点
var mapZoom=10;
var centCoor = [116.55, 25.1];
// var mapZoom=null;
// var centCoor = [];

//巡路视频点位数据
const stopsGeo = 
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {"name":"上杭汽车站","address":"龙岩市上杭县北环路506号","type":"stop","longitude":"116.420957","latitude":"25.060517","id":"1"},
            "geometry": {
              "type": "Point",
              "coordinates": [
                116.420957,25.060517
              ]
            }
        },
        {
            "type": "Feature",
            "properties": {"name":"蓝溪客运站","address":"福建省龙岩市上杭县蓝溪客运站","type":"stop","longitude":"116.621642","latitude":"24.913903","id":"2"},
            "geometry": {
              "type": "Point",
              "coordinates": [
                116.621642,24.913903
              ]
            }
        },
        {
            "type": "Feature",
            "properties": {"name":"中都客运站","address":"福建省龙岩市上杭县中都镇中都客运站","type":"stop","longitude":"116.45522","latitude":"24.881616","id":"3"},
            "geometry": {
              "type": "Point",
              "coordinates": [
                116.45522,24.881616
              ]
            }
        },
        {
            "type": "Feature",
            "properties": {"name":"湖洋客运站","address":"龙岩市上杭县205国道北50米 ","type":"stop","longitude":"116.339263","latitude":"25.045863","id":"4"},
            "geometry": {
              "type": "Point",
              "coordinates": [
                116.339263,25.045863
              ]
            }
        },
        {
            "type": "Feature",
            "properties": {"name":"官庄客运站","address":"福建省龙岩市上杭县乡府路  ","type":"stop","longitude":"116.349273","latitude":"25.312242","id":"5"},
            "geometry": {
              "type": "Point",
              "coordinates": [
                116.349273,25.312242
              ]
            }
        }

    ]
}
//巡路视频图层
const stop_layer = new VectorLayer({
    source: new VectorSource({
        features: (new GeoJSON()).readFeatures(stopsGeo,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
    }),
    title:'videos',
    style: new Style({
        image: new olIcon(({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            crossOrigin: 'anonymous',
            src: busStop,
            
        }))
      }),
    visible:true,
    zIndex:1000
  }); 

class BaseMapCounty extends Component{
    constructor(props){
        super(props);
        this.showInfo = this.showInfo.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeCounty = this.changeCounty.bind(this);
        this.changeFeatures = this.changeFeatures.bind(this);
        //this.mapClick = this.mapClick.bind(this);
        //this.selectFeature = this.selectFeature.bind(this);
        this.setMapCenter = this.setMapCenter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getJsonObject = this.getJsonObject.bind(this);
        this.addMapLayers = this.addMapLayers.bind(this);
        this.sendAjax = this.sendAjax.bind(this);
        this.vecLayerClick = this.vecLayerClick.bind(this);
        this.imgLayerClick = this.imgLayerClick.bind(this);
        this.initMapClick = this.initMapClick.bind(this);

        this.handleChangeRoad=this.handleChangeRoad.bind(this);
        this.handleChangeTimer= this.handleChangeTimer.bind(this);
        this.onChangeroad=this.onChangeroad.bind(this);

        this.state ={
            currentLocation:this.props.regionId,//'350582000000',//jinjiang
            currentCity:'',//quanzhou
            currentCounty:this.props.regionId,//'350582000000',//jinjiang
            currentFeatures:[],
            initLayers:[
                tian_di_tu_img_layer,
                tian_di_tu_img_annotation,
                tian_di_tu_road_layer,
                tian_di_tu_annotation,
                
                stop_layer,
                //vectorLayer_border,
                //vectorLayer_Croad,
                //vectorLayer_Yroad,
                vectorLayer_Xroad,
                vectorLayer_Sroad,
                vectorLayer_Groad,
                ],
            //popupTitle: '',
            //popupContent :'',
            IconName:"double-left",
            navRight:'-18.5%',
            buttonRight:'0',
            collapsed:'none',
            
            currentRoads:[],
            currentstartValue: null,
            currentendValue: null,
        }  
        this.map = new Map({
            controls: new defaults({
                attributionOptions: {
                  collapsible: false
                }
              }).extend([
                new ScaleLine({
                    className:'olScaleLine',
                }),
                new OverviewMap()
              ]),
            //target:'basemap',
            layers:
                this.state.initLayers,
            view:new View({
                center:fromLonLat([118.217006,26.035721]),//福建省
                zoom:7
            })
        });
        this.interval = null; 
        
    };

    //巡路轨迹
    handleChangeRoad=(targetchangefes)=>{  
        this.setState({
          currentRoads:targetchangefes,
        });
        console.log('FES',targetchangefes);
    }

    //时间选择
    handleChangeTimer=(timer)=>{  
        var startValue=timer[0].format('YYYY-MM-DD');
        var endValue=timer[1].format('YYYY-MM-DD');
        
        this.setState({
            currentstartValue:startValue,
            currentendValue:endValue
        });
        // console.log('1',startValue);  
        // console.log('2',endValue);  
    }

    changeLocation=(loc)=>{
        this.setState({
            currentLocation:loc
        });
        console.log('changeLocation', loc)
    }
    changeCity=(city)=>{
        this.setState({
            currentCity:city,
            //currentCounty:''
        });
        console.log('currentCity',city)
    }
    changeCounty=(county)=>{
        this.setState({
            currentCounty:county
        });
        console.log('currentCounty',county)
    }
    changeFeatures=(feas)=>{
        this.setState({
            currentFeatures:feas,
        });
        console.log('changeFeatures',feas);
    }

    setMapCenter=(bool)=>{
        if(bool=='block'){
            //this.map.getView().setCenter(fromLonLat([120.3,27.2]))
            this.map.getView().animate({
                center: fromLonLat([centCoor[0]+0.2,centCoor[1]]),
                duration: 500
              });
        }else if(bool=='none'){
            //this.map.getView().setCenter(fromLonLat([120.23,27.2]))
            this.map.getView().animate({
                center: fromLonLat(centCoor),
                duration: 500
              });
        }
    }
   
    //加载巡路图层
    onChangeroad = () => {
        let that=this;
        var roadIndex=this.state.currentRoads;
        var startTime=this.state.currentstartValue;
        var endTime=this.state.currentendValue;
        console.log('roadIndex,startTime,endTime',roadIndex,startTime,endTime);
        
        let locChange;
        var regionId = this.props.regionId;
        if(this.props.roleId===12||this.props.roleId===8){
            locChange="town";
        }else if(this.props.roleId===13||this.props.roleId===9){
            locChange="country";
        }else if(this.props.roleId===14||this.props.roleId===10){
            locChange="city";
        }

        var index=0;
        judageRoad(roadIndex,startTime,endTime);
        function judageRoad(roadIndex,startTime,endTime){
            if((RegExp("Loop").test(roadIndex[index]))){
                if(roadIndex[index]==="trackLoop"){
                    let currentLayerURL = URL+'/app_manageRoad/getTaskRoad?';
                    console.log(currentLayerURL);
                    $.ajax({ 
                        type:"get", 
                        url:currentLayerURL,
                        data:{CityType:locChange,region_id:regionId},
                        //dataType:'json',
                        success:
                            function(data){
                                console.log('data',data);
                                let trackLoopSource=new VectorSource({
                                    features: (new GeoJSON()).readFeatures(data,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                                });
                                trackLoop_layer.setSource(trackLoopSource);
                                that.map.addLayer(trackLoop_layer);
                            }, 
                        error: function () { 
                            console.log("Request error"); 
                        } 
                    });
                }else if(roadIndex[index]==="pathLoop"){
                    if(startTime===null||endTime===null){
                        alert("请选择起止时间");
                    }else{
                        let currentLayerURL = URL+'/app_manageRoad/pathFinding_web?StartDate='+startTime+'&EndDate='+endTime;
                        console.log(currentLayerURL)
                        $.ajax({ 
                            type:"get", 
                            url:currentLayerURL,
                            data:{CityType:locChange,region_id:regionId},
                            //dataType:'json',
                            success:
                                function(data){ 
                                    let pathLoopSource=new VectorSource({
                                        features: (new GeoJSON()).readFeatures(data,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                                    });
                                    pathLoop_layer.setSource(pathLoopSource);
                                    that.map.addLayer(pathLoop_layer);
                                }, 
                            error: function () { 
                                console.log("Request error"); 
                            } 
                        });
                    }
                }
                index++;
                judageRoad(roadIndex,startTime,endTime);
            }
        }
    } 


    handleClick = () =>{
        if(this.state.collapsed=="block"){
            this.setState({collapsed: 'none',IconName:'double-left',navRight:'-18.5%',buttonRight:'0'}); 
            if(this.map.getView().getZoom()<=mapZoom){
                this.setMapCenter("none") 
            }
              
        }else{
            this.setState({collapsed: 'block',IconName:'double-right',navRight:'0',buttonRight:'18.5%'});
            if(this.map.getView().getZoom()<=mapZoom){
                this.setMapCenter("block") 
            } 
        }   
        
    }
    vecLayerClick = () =>{
        // let layers = this.state.initLayers;
        // layers.splice(0,2,tian_di_tu_road_layer,tian_di_tu_annotation);
        // this.setState({
        //     initLayers:layers
        // })
        this.state.initLayers[0].setVisible(false);
        this.state.initLayers[1].setVisible(false);
        this.state.initLayers[2].setVisible(true);
        this.state.initLayers[3].setVisible(true);

       
        let objVec = document.getElementById('vecLayer');
        objVec.style.backgroundColor='rgba(246,112,42, 0.8)';
        objVec.style.color='white';
        objVec.style.borderColor='transparent';
    
        let objImg = document.getElementById('imgLayer');
        objImg.style.backgroundColor='rgba(255,255,255,0.8)';
        objImg.style.color='rgba(0,0,0,0.65)';
        objImg.style.borderColor='rgba(246,112,42, 0.8)';
        
    }
    imgLayerClick = () =>{
        // let layers = this.state.initLayers;
        // layers.splice(0,2,tian_di_tu_img_layer,tian_di_tu_img_annotation);
        // this.setState({
        //     initLayers:layers
        // })
        this.state.initLayers[0].setVisible(true);
        this.state.initLayers[1].setVisible(true);
        this.state.initLayers[2].setVisible(false);
        this.state.initLayers[3].setVisible(false);

        let objImg = document.getElementById('imgLayer');
        objImg.style.backgroundColor='rgba(246,112,42, 0.8)';
        objImg.style.color='white';
        objImg.style.borderColor='transparent';
    
        let objVec = document.getElementById('vecLayer');
        objVec.style.backgroundColor='rgba(255,255,255,0.8)';
        objVec.style.color='rgba(0,0,0,0.65)';
        objVec.style.borderColor='rgba(246,112,42, 0.8)';
    }

    showInfo = (data) =>{
        console.log(data)
    }
    addMapLayers = (arr,featureList) =>{
        let featuresModified = []
        for(let k=0;k<featureList.length;k++){
            if(featureList[k].length<4){
                continue;
            }else if(RegExp(/Road/).test(featureList[k])){
                continue;
            }else if(featureList[k]==='manager'){
                continue;
            }else if(featureList[k]==='videos'){
                continue;
            }
            else{
                featuresModified.push(featureList[k]);
            }
        }
        console.log('featuresModified',featuresModified)
        
        //featuresModified和arr元素一一对应
        for(let i=0;i<arr.length;i++){
            let src;
            //设置不同事件点图层的图标
            if(arr[i].features.length!==0){//如果geojson数据不为空
                if(arr[i].features[0].properties.fsmc!==undefined){
                    if(/* featuresModified[i]==='bridge' */arr[i].features[0].properties.fsmc[arr[i].features[0].properties.fsmc.length-1]==='桥'){//判断附属名称的最后一个字是“桥”
                        src = bridge_icon;
                    }
                }
                else if(arr[i].features[0].properties.report_type==='违章占道'){
                    src=IllegalEncroach_icon;
                }else if(arr[i].features[0].properties.report_type==='违章搭建'){
                    src=IllegalBuilding_icon;
                }else if(arr[i].features[0].properties.report_type==='侵占公路设施'){
                    src = Encroach_icon;
                }else if(arr[i].features[0].properties.report_type==='非法营运'){
                    src = IllegalOperation_icon;
                }else if(arr[i].features[0].properties.report_type==='超载超高'){
                    src = OverloadUltra_icon;
                }else if(arr[i].features[0].properties.report_type==='路基坍塌'){
                    src = Embankment_icon;
                }else if(arr[i].features[0].properties.report_type==='边坡坍塌'){
                    src = SlopeDamage_icon;
                }else if(arr[i].features[0].properties.report_type==='挡墙坍塌'){
                    src = WallCollapse_icon;
                }else if(arr[i].features[0].properties.report_type==='路肩杂草'){
                    src = ShoulderWeed_icon;
                }else if(arr[i].features[0].properties.report_type==='路肩堆放杂物'){
                    src = PilesDebris_icon;
                }else if(arr[i].features[0].properties.report_type==='边坡杂草'){
                    src = SlopeWeeds_icon;
                }else if(arr[i].features[0].properties.report_type==='边坡落石'){
                    src = SlopeRockfall_icon;
                }else if(arr[i].features[0].properties.report_type==='路面脏污'){
                    src = RoadDirt_icon;
                }else if(arr[i].features[0].properties.report_type==='路面破损'){
                    src = PavementDamage_icon;
                }else if(arr[i].features[0].properties.report_type==='路面堆放杂物'){
                    src = RoadDebris_icon;
                }else if(arr[i].features[0].properties.report_type==='接缝填料缺失'){
                    src = MissingJoint_icon;
                }else if(arr[i].features[0].properties.report_type==='附属设施损坏'){
                    src = AccessoryDamaged_icon;
                }else if(arr[i].features[0].properties.report_type==='桥梁基础损坏'){
                    src = BridgeDamage_icon;
                }else if(arr[i].features[0].properties.report_type==='桥梁下部结构损坏'){
                    src = BridgeUnderstructure_icon;
                }else if(arr[i].features[0].properties.report_type==='桥梁冲毁'){
                    src = BridgeWashed_icon;
                }else if(arr[i].features[0].properties.report_type==='衬砌裂缝'){
                    src = LiningCrack_icon;
                }else if(arr[i].features[0].properties.report_type==='衬砌漏水'){
                    src = LiningLeaking_icon;
                }else if(arr[i].features[0].properties.report_type==='隧道附属设施损坏'){
                    src = TunnelDamaged_icon;
                }else if(arr[i].features[0].properties.report_type==='排水堵塞'){
                    src = DrainPlug_icon;
                }else if(arr[i].features[0].properties.report_type==='倒塌破损'){
                    src = CollapseDamage_icon;
                }else if(arr[i].features[0].properties.report_type==='标志牌损坏'){
                    src = MarkDamage_icon;
                }else if(arr[i].features[0].properties.report_type==='护栏损坏'){
                    src = BarrierDamage_icon;
                }else if(arr[i].features[0].properties.report_type==='警示柱损坏'){
                    src = DamageColumn_icon;
                }else if(arr[i].features[0].properties.report_type==='广角镜损坏'){
                    src = WideAngleDamaged_icon;
                }else if(arr[i].features[0].properties.report_type==='标线脱落'){
                    src = LineLoss_icon;
                }else if(arr[i].features[0].properties.report_type==='其他'){
                    src = OtherThing_icon;
                }
                else{
                    src = OtherThing_icon;//其他事件
                }
            }else{
                src = OtherThing_icon;//空值图层也设置src，但是不会显示
            }

            if(arr[i].features.length!==0){
                if(arr[i].features[0].properties.fsmc!==undefined){
                    if(arr[i].features[0].properties.fsmc[arr[i].features[0].properties.fsmc.length-1]==='桥'){
                        var dataTran=arr[i];//如果是桥梁数据，不转换，因为本来就是WGS84坐标
                    }
                }else{
                    var dataTran=gcoord.transform(arr[i], gcoord.GCJ02, gcoord.WGS84);
                } 
            }else{
                var dataTran=gcoord.transform(arr[i], gcoord.GCJ02, gcoord.WGS84);
            }

            let newLayer= new VectorLayer({
                source: new VectorSource({
                    features: (new GeoJSON()).readFeatures(dataTran,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                }),
                zIndex:1000,
                style:
                    new Style({
                        image: new olIcon(({
                            anchor: [0.5, 1],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            crossOrigin: 'anonymous',
                            src: src,
                            // size:[20,20]
                        }))
                    })    
            })
            
            this.map.addLayer(newLayer)
        } 
    }
    
    
    sendAjax = (ftures,loc,index,arr)=>{
        let that = this;

        //改变url
        //console.log('roleid',this.props.roleId)
        let locChange;
        
        if(this.props.roleId===12||this.props.roleId===8){
            locChange="townId";
        }else if(this.props.roleId===13||this.props.roleId===9){
            locChange="countryId";
        }else if(this.props.roleId===14||this.props.roleId===10){
            locChange="cityId";
        }

        if(index>=ftures.length){
            console.log('LayersToBeAdded-f',arr)
            
            //地图添加多个图层
            this.addMapLayers(arr,ftures);
            return;//返回空值 
        }
        
        if((ftures[index].length>=4)){
            if((RegExp(/Road/).test(ftures[index]))){//判断道路图层是否被选中
                if((RegExp("^(350823)").test(this.props.regionId))){
                    if(ftures[index]==='nationalRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Groad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Groad.setSource(source);
                        this.map.addLayer(vectorLayer_Groad);
                    }else if(ftures[index]==='countyRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Xroad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Xroad.setSource(source);
                        this.map.addLayer(vectorLayer_Xroad);
                    }else if(ftures[index]==='countryRoad'){
                        // let source = new VectorSource();
                        // source.addFeatures((new GeoJSON()).readFeatures(Yroad_fujian,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        // vectorLayer_Yroad.setSource(source);
                        // this.map.addLayer(vectorLayer_Yroad);
                    }else if(ftures[index]==='villageRoad'){
                        // let source = new VectorSource();
                        // source.addFeatures((new GeoJSON()).readFeatures(Croad_fujian,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        // vectorLayer_Croad.setSource(source);
                        // this.map.addLayer(vectorLayer_Croad);
                    }else if(ftures[index]==='provincialRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Sroad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Sroad.setSource(source);
                        this.map.addLayer(vectorLayer_Sroad);
                    }
                }
                index++;
                that.sendAjax(ftures,loc,index,arr); 

            }else if(ftures[index]==='videos'){//显示视频点
                
                video_layer.setVisible(true);
                this.map.addLayer(video_layer);

                index++;
                that.sendAjax(ftures,loc,index,arr); 
            }
            else if(ftures[index]==='bridge'){
                    
                let currentLayerURL = URL+'/total?title='+ftures[index]+loc;
                console.log(currentLayerURL)
                $.ajax({ 
                    type:"get", 
                    url:currentLayerURL,
                    //dataType:'json',
                    success:
                        function(data){ 
                            arr.push(data)
                            console.log('LayersToBeAdded',arr)
                            index++;
                            that.sendAjax(ftures,loc,index,arr);
                        }, 
                    error: function () { 
                        console.log("Request error"); 
                    } 
                });
            }else if(ftures[index]==='manager'){
                // let currentLayerURL = URL+'/total?title='+ftures[index]+loc;
                let currentLayerURL = managerURL+'/getCityPositionByRegionId';
                console.log(currentLayerURL);
                console.log('userId',that.props.userId);
                $.ajax({ 
                    type:"post", 
                    url:currentLayerURL,
                    data:{userId:that.props.userId},
                    //token:that.props.token,
                    //dataType:'json',
                    success:
                        function(data){ 
                            let managerTranData=gcoord.transform(data, gcoord.GCJ02, gcoord.WGS84);
                            let managerSource=new VectorSource({
                                features: (new GeoJSON()).readFeatures(managerTranData,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                            })
                            manager_layer.setSource(managerSource);
                            // manager_layer.setTitle();
                            that.map.addLayer(manager_layer);

                            index++;
                            that.sendAjax(ftures,loc,index,arr);
                            that.interval=setInterval(function(){
                                $.ajax({ 
                                    type:"post", 
                                    url:currentLayerURL,
                                    data:{userId:that.props.userId},
                                    //token:that.props.token,
                                    //dataType:'json',
                                    success:
                                        function(data){ 
                                            console.log(data);
                                            manager_layer.setSource(new VectorSource({
                                                features: (new GeoJSON()).readFeatures(gcoord.transform(data, gcoord.GCJ02, gcoord.WGS84),{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                                            }));
                                        }, 
                                        error: function(){ 
                                            console.log("Request error");
                                            clearInterval(that.interval);
                                        } 
                                })}, 300000); //300000毫秒是5分钟
                        }, 
                    error: function () { 
                        console.log("Request error"); 
                    } 
                });
            }
            else if(ftures[index].slice(0,1)==='2'){
                let currentLayerURL = URL+"/total?title=matiance&"+locChange+"="+this.props.regionId+"&problem_id="+ftures[index];
                console.log(currentLayerURL)
                $.ajax({ 
                    type:"get", 
                    url:currentLayerURL,
                    //dataType:'json',
                    success:
                        function(data){
                            arr.push(data)
                            console.log('LayersToBeAdded',arr)
                            index++;
                            that.sendAjax(ftures,loc,index,arr);
                        }, 
                    error: function () { 
                        console.log("Request error"); 
                    } 
                });
            }
            else{   
                let currentLayerURL = URL+"/total?title=roadEvent&"+locChange+"="+this.props.regionId+"&problem_id="+ftures[index];
                console.log(currentLayerURL)
                $.ajax({ 
                    type:"get", 
                    url:currentLayerURL,
                    //dataType:'json',
                    success:
                        function(data){
                            arr.push(data)
                            console.log('LayersToBeAdded',arr)
                            index++;
                            that.sendAjax(ftures,loc,index,arr);
                        }, 
                    error: function () { 
                        console.log("Request error"); 
                    } 
                });
            }//如果要加事件上报，把事件上报的key改成对应的problem_id,然后在else这里添加
            // else{
            //     index++;
            //     that.sendAjax(ftures,loc,index,arr);
            // } 
        }else{
            index++;
            that.sendAjax(ftures,loc,index,arr);
        }
        
    }
    getJsonObject = () =>{
        let LayersToBeAdded = [];
        let features = [];
        let index = 0
        
        //判断城市还是区县
        let loc;
        let cty = this.state.currentCity;
        let cnty = this.state.currentCounty;
        if(cnty===''||cnty==='无'){
            loc = '&cityId='+cty
        }else{
            loc = '&countryId='+cnty
        }
        console.log(loc)

        features = this.state.currentFeatures;
        console.log('this.state.features;',this.state.currentFeatures)
        console.log('features:',features)

        if((features.length !== 0)&&(loc!=='')){
            this.sendAjax(features,loc,index,LayersToBeAdded);
        }
        
    }

    initMapClick = () =>{
        if(this.state.collapsed=="none"){
            this.map.getView().animate({
                center: fromLonLat(centCoor),
                zoom:mapZoom,
                duration: 500
              });
        }else if(this.state.collapsed=="block"){
            this.map.getView().animate({
                center: fromLonLat([centCoor[0]+0.2,centCoor[1]]),
                zoom:mapZoom,
                duration: 500
              });
        }

        
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        
        $('#vecLayer').trigger('click');
        this.map.setTarget("basemap");
        
        let that = this;

        this.map.getView().setCenter(fromLonLat(centCoor));
        this.map.getView().setZoom(mapZoom);

        //添加边界
        let source = new VectorSource();
        source.addFeatures((new GeoJSON()).readFeatures(border_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
        vectorLayer_border.setSource(source);
        that.map.addLayer(vectorLayer_border);

        
        //点击空的地方会消失
        //this.map.on('singleclick',this.mapClick);

        //点击空的地方不会消失，必须点击“X”才会消失
        var element = $('#popup').get(0);
        var title = $('#popup-title').get(0);
        var content = $('#popup-content').get(0);
        var closer = $("#popup-closer").get(0);
        
        var startP = $('#startPoint').get(0);
        var endP = $('#endPoint').get(0);
        
        var popup = new Overlay({
            title:'popup',
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -60],
            autoPan:true,
            autoPanAnimation:250
        });
        var startPopup= new Overlay({
            title:'popup',
            element:startP,
            positioning:'bottom-center',
            stopEvent:false,
            offset:[0, -7],
            autoPan:true,
            autoPanAnimation:250
        })
        var endPopup = new Overlay({
            title:'popup',
            element:endP,
            positioning:'bottom-center',
            stopEvent:false,
            offset:[0, -7],
            autoPan:true,
            autoPanAnimation:250
        })
        

        this.map.on('click',function(e){
            that.map.addOverlay(popup);
            that.map.addOverlay(startPopup);
            that.map.addOverlay(endPopup);
            let feature = that.map.forEachFeatureAtPixel(e.pixel,
                function(feature) {
                    return feature;
                })
            if(feature!==undefined){
                //let coordinates = feature.getGeometry().getCoordinates();
                let coordinate = e.coordinate;
                let startCoor=[];
                let endCoor=[];
    
                let featureType = feature.getGeometry().getType();

                //图片加载
                var picsUrl=feature.get('event_file_url');
                // var UrlLOC=picUrl+picsUrl;
                var test=document.getElementById("pics").innerHTML="<img src="+picUrl+picsUrl+" alt='未上传图片' width='160px' height='160px'>"

                if(featureType=='Point'){
                    if(feature.get('name')==='路管员'){
                        title.innerHTML= '<h3><b>路管员信息</b></h3>';
                        if(feature.get('online')===true){
                            content.innerHTML=`<div><p>名称：${feature.get('fsmc')}</p><p>编码：${feature.get('fsbm')}</p><p>状态：在线</p><p>当前位置：${feature.get('address')}</p>
                            <p>当前位置经度：${feature.get('longitude')}E</p> 
                            <p>当前位置纬度：${feature.get('latitude')}N</p></div>`;
                        }else if(feature.get('online')===false){
                            content.innerHTML=`<div><p>名称：${feature.get('fsmc')}</p><p>编码：${feature.get('fsbm')}</p><p>状态：不在线</p><p>最后位置：${feature.get('address')}</p>
                            <p>最后位置经度：${feature.get('longitude')}E</p> 
                            <p>最后位置纬度：${feature.get('latitude')}N</p></div>`;
                        }
                        popup.setPosition(coordinate);
                    }else if(feature.get('type')==='stop'){
                        
                        title.innerHTML= '<h3><b>客运站点</b></h3>';
                        content.innerHTML=`<div><p>名称：${feature.get('name')}</p><p>地址：${feature.get('address')}</p>
                        <p>当前位置经度：${feature.get('longitude')}E</p> 
                        <p>当前位置纬度：${feature.get('latitude')}N</p></div>`;
                        popup.setPosition(coordinate);
                    }
                    else if(feature.get('report_type')!==undefined){
                        //var rangezs,rangeys;
                        var qdzh= Math.round((parseFloat(feature.get('qdzh'))-Math.floor(feature.get('qdzh')))*1000);
                        // $.ajax({
                        //     type:"get",
                        //     url:URL+"/road/ranging?ldbm="+feature.get('roadID')+"&incidentJD="+feature.get('longitude')+"&incidentWD="+feature.get('latitude'),
                        //     dataType:"json",
                        //     //清除浏览器换存
                        //     cache:false,
                        //     success:function(data){
                        //     console.log('AJAX获取数据成功！roadDamagerange',data);
                        //     var weizhis=parseFloat(data)+qdzh;
                        //     window.localStorage.setItem("name", weizhis);
                        //     },
                        //     error:function(){
                        //     console.log('AJAX获取数据失败！dataManager');
                        //     }
                        // });
                        // var weizhi=window.localStorage.getItem("name");
                        // console.log('weizhi',weizhi)
                        // if(weizhi>=1000){
                        //     rangezs=Math.floor(Math.floor(weizhi)/1000)+Math.floor(feature.get('qdzh'));
                        //     rangeys=Math.round(weizhi-Math.floor(Math.floor(weizhi)/1000)*1000);
                        //     console.log(rangezs,rangeys);
                        // }else{
                        //     rangezs=Math.floor(feature.get('qdzh'));
                        //     rangeys=Math.floor(weizhi);
                        //     // console.log(ranges);
                        // }
                        title.innerHTML = '<h3><b>事件信息</b></h3>'
                        content.innerHTML = '<p>上报事件类型：' + feature.get('report_type') + '</p>'
                                            +'<p>上报人：' + feature.get('report_man') + '</p>'
                                            +'<p>上报内容：' + feature.get('report_content') + '</p>'
                                            /* +'<p>位置桩号：' +'K'+ rangezs+ '+'+rangeys + '</p>' */
                                            // +'<p>道路起始桩号：' +'K'+ Math.floor(feature.get('qdzh'))+ '+'+qdzh +  '</p>'
                                            +'<p>经度：' + feature.get('longitude') + '</p>'
                                            +'<p>纬度：' + feature.get('latitude') + '</p>'
                                            // +'<p>图片：' + test + '</p>';
                                            +'<p>图片：' + "<img src="+picUrl+picsUrl+" alt='未上传图片' width='160px' height='160px'>" + '</p>';
                        
                        popup.setPosition(coordinate);
                    }else if(feature.get('fsmc')===undefined){//清除测距功能时点击出现的弹框
                        popup.setPosition(undefined);
                    }
                    else{
                        title.innerHTML= '<h3><b>地物信息</b></h3>';
                        content.innerHTML=`<div><p>名称：${feature.get('fsmc')}</p><p>编码：${feature.get('fsbm')}</p></div>`;
                        
                        popup.setPosition(coordinate);
                    }
                    startPopup.setPosition(undefined);
                    endPopup.setPosition(undefined);
                }else if(featureType=='LineString'){
                    if(feature.get('LDBM')===undefined){//清除测距功能时点击出现的弹框
                        popup.setPosition(undefined);
                        startPopup.setPosition(undefined);
                        endPopup.setPosition(undefined);
                    }
                    else{
                        

                        //修改计算起止点桩号
                        let qdMeter = Math.round((parseFloat(feature.get('QDZH'))-Math.floor(feature.get('QDZH')))*1000);
                        let zdMeter = Math.round((parseFloat(feature.get('ZDZH'))-Math.floor(feature.get('ZDZH')))*1000);

                        

                        title.innerHTML= '<h3><b>道路信息</b></h3>';
                        // content.innerHTML=`<div><p>名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p><p>路管员：李钊</p><p>电话号码：18605915906</p><p>起点桩号：K${Math.floor(feature.get('QDZH'))}+${qdMeter}</p><p>止点桩号：K${Math.floor(feature.get('ZDZH'))}+${zdMeter}</p>`;//数据未获取到时，设置为“loading...”

                        if((RegExp("G").test(feature.get('LXMC')))){
                            content.innerHTML=`<div><p>名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p><p>起点桩号：K200+347</p><p>止点桩号：K350+312</p></div>`;
                        }else if((RegExp("S").test(feature.get('LXMC')))){
                            content.innerHTML=`<div><p>名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p><p>起点桩号：K100+541</p><p>止点桩号：K300+222</p></div>`;
                        }else if((RegExp("X").test(feature.get('LXMC')))){
                            content.innerHTML=`<div><p>名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p><p>起点桩号：K150+220</p><p>止点桩号：K250+800</p></div>`;
                        }

                        $.ajax({ 
                            type:"get", 
                            url:URL+'/app_manageRoad/seachRoadByRoadId_web',
                            data:{roadid:feature.get('LDBM'),zdzh:feature.get('ZDZH')},
                            dataType:'json',
                            success:
                                function(data){ 
                    
                                    // window.localStorage.setItem('attribute',data);
                                    let length=data["length"];
                                    let width=data['width'];
                                    let startName=data["StartName"];
                                    let endName=data["EndName"];
                                    let phone = data['phone'];
                                    let username = data['userName'];

                                    if(length===null||length===''){
                                        length="无数据";
                                    }
                                    if(width===null||width===''){
                                        width="无数据";
                                    }
                                    if(startName===null||startName===''){
                                        startName="无数据";
                                    }
                                    if(endName===null||endName===''){
                                        endName="无数据";
                                    }
                                    if(phone===null||phone===''){
                                        phone="无数据";
                                    }
                                    if(username===null||username===''){
                                        username="无数据";
                                    }

                                    content.innerHTML=`<div><p>名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p><p>路管员：${username}</p>
                                    <p>电话号码：${phone}</p><p>起点桩号：K${Math.floor(feature.get('QDZH'))}+${qdMeter}</p><p>止点桩号：K${Math.floor(feature.get('ZDZH'))}+${zdMeter}</p>
                        <p>路长：${length}</p><p>路宽：${width}</p><p>起始点名称：${startName}</p><p>终止点名称：${endName}</p></div>`;
                                }, 
                            error: function () { 
                                console.log("Request error"); 
                            } 
                        });
                        
                        startP.innerHTML=`K${Math.floor(feature.get('QDZH'))}+${qdMeter}`;
                        endP.innerHTML=`K${Math.floor(feature.get('ZDZH'))}+${zdMeter}`;
                        
                        startCoor[0] = parseFloat(feature.get('QDJD'));
                        startCoor[1] = parseFloat(feature.get('QDWD'));
                        endCoor[0] = parseFloat(feature.get('ZDJD'));
                        endCoor[1] = parseFloat(feature.get('ZDWD'));
                        
                        popup.setPosition(coordinate);
                        startPopup.setPosition(fromLonLat(startCoor));
                        endPopup.setPosition(fromLonLat(endCoor));
    
                    }   
                }    
            }
            // else{
            //     popup.setPosition(undefined);
            // }
        })
        
        closer.onclick = function(){
            popup.setPosition(undefined);
            startPopup.setPosition(undefined);
            endPopup.setPosition(undefined);
            closer.blur();
            return false;
        }

        var selectClick = new Select({
            condition: pointerMove,
            //condition:click,
            //layers:this.map.getLayers().getArray().slice(5,this.map.getLayers().getArray().length)
          });
    
        this.map.addInteraction(selectClick);
        //selectClick.on('select',this.selectFeature)
        //selectClick.on('select',function(){})


        //测距
        const sourceMeasure = new VectorSource();
        var layer =new VectorLayer({
        title:'Measure',
        source:sourceMeasure,
        style: new Style({
            fill: new Fill({
            color: 'rgba(255,255,255,0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new Circle({
            radius: 5,
            fill: new Fill({
                color: '#ffcc33'
            })
            }),
        }),
        zIndex:'3030',
        });
        this.map.addLayer(layer);

        function  deletDiv(){
            var allOverlay = that.map.getOverlays();
            var arrlen=allOverlay.getArray()
            for(var i=0;i<arrlen.length;i++){   //删除测量提示框和帮助提示框
                var layername=arrlen[i].options.title
                if(layername==='overlayname'||layername==='helpTool'){
                    that.map.removeOverlay(arrlen[i]);
                }
            }
        }

        //创建一个当前要绘制的对象
        var sketch = new Feature();
        //创建一个帮助提示框对象
        var helpTooltipElement;
        //创建一个帮助提示信息对象
        var helpTooltip;
        //创建一个测量提示框对象
        var measureTooltipElement;
        //创建一个测量提示信息对象
        var measureTooltip;
        //继续绘制多边形的提示信息
        var continuePolygonMsg = '单击以继续绘制多边形';
        //继续绘制线段的提示信息
        var continueLineMsg = '单击以继续绘制直线';

        //鼠标移动触发的函数
        var pointerMoveHandler = function (evt) {
        //如果是平移地图则直接结束
            if (evt.dragging) {
                return;
            }
            //帮助提示信息
            var helpMsg = '单击开始';

            if (sketch) {
                //获取绘图对象的几何要素
                var geom = sketch.getGeometry();
                //如果当前绘制的几何要素是多线段，则将绘制提示信息设置为多线段绘制提示信息
                if (geom instanceof Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            //设置帮助提示要素的内标签为帮助提示信息
            helpTooltipElement.innerHTML = helpMsg;
            //设置帮助提示信息的位置
            helpTooltip.setPosition(evt.coordinate);
            //移除帮助提示要素的隐藏样式
            helpTooltipElement.classList.remove('hidden');
        };

        //获取类型
        var typeSelect = document.getElementById('types');
        var typed=typeSelect.value;
        //定义一个交互式绘图对象
        var draw ;
        //添加交互式绘图对象的函数

        function addInteraction() {
            // if(element){
            //     element.parentNode.removeChild(element);
            // }
            //触发pointermove事件
            that.map.on('pointermove', pointerMoveHandler);
            
            var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
            //创建一个交互式绘图对象
            draw = new Draw({
                //绘制的数据源
                source: sourceMeasure,
                //绘制类型
                type: type,
                style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
                })
            });
            //将交互绘图对象添加到地图中
            that.map.addInteraction(draw);

            //创建测量提示框
            createMeasureTooltip();
            //创建帮助提示框
            createHelpTooltip();

            //定义一个事件监听
            var listener;
            //定义一个控制鼠标点击次数的变量
            var count = 0;
            //绘制开始事件
            draw.on('drawstart', function (evt) {
                //The feature being drawn.
                sketch = evt.feature;
                //提示框的坐标
                var tooltipCoord = evt.coordinate;
                //监听几何要素的change事件
                //Increases the revision counter and dispatches a 'change' event.
                //this.map.removeOverlay(popup); 
                listener = sketch.getGeometry().on('change', function (evt) {
                    //The event target.
                    //获取绘制的几何对象
                    var geom = evt.target;
                    //定义一个输出对象，用于记录面积和长度
                    var output;
                    if (geom instanceof Polygon) {
                    //输出多边形的面积
                    output = formatArea(geom);
                    //获取多变形内部点的坐标
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                    //输出多线段的长度
                    output = formatLength(geom);
                    //获取多线段的最后一个点的坐标
                    tooltipCoord = geom.getLastCoordinate();
                    }
                    //设置测量提示框的内标签为最终输出结果
                    measureTooltipElement.innerHTML = output;
                    //设置测量提示信息的位置坐标
                    measureTooltip.setPosition(tooltipCoord);
                });

                //地图单击事件
                that.map.on('singleclick', function (evt) {
                //设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
                    measureTooltip.setPosition(evt.coordinate);
                    //如果是第一次点击，则设置测量提示框的文本内容为起点
                    if (count == 0) {
                        measureTooltipElement.innerHTML = "起点";
                    }
                    //根据鼠标点击位置生成一个点
                    var point = new Point(evt.coordinate);
                    //将该点要素添加到矢量数据源中
                    sourceMeasure.addFeature(new Feature(point));
                    //更改测量提示框的样式，使测量提示框可见
                    measureTooltipElement.className = 'tooltip tooltip-static';
                    if (measureTooltipElement) {
                         measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                    }
                    //创建测量提示框
                    createMeasureTooltip();
                    //点击次数增加
                    count++;
                });

                //地图双击事件
                that.map.on('dblclick', function (evt) {
                    var point = new Point(evt.coordinate);
                    sourceMeasure.addFeature(new Feature(point));
                });
            }, this);
            //绘制结束事件
            draw.on('drawend', function () {
                count = 0;
                //设置测量提示框的样式
                measureTooltipElement.className = 'tooltip tooltip-static';
                //设置偏移量
                measureTooltip.setOffset([0, -10]);
                //清空绘制要素
                sketch = null;
                //清空测量提示要素
                measureTooltipElement = null;
                //创建测量提示框
                createMeasureTooltip();
                
                //移除事件监听
                unByKey(listener);
                //移除地图单击事件
                that.map.removeEventListener('singleclick');
            }, this);
        }

        //创建帮助提示框
        function createHelpTooltip() {
            //如果已经存在帮助提示框则移除
            // if (helpTooltipElement) {
            //     helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            // }
            //创建帮助提示要素的div
            helpTooltipElement = document.createElement('div');
            //设置帮助提示要素的样式
            helpTooltipElement.className = 'tooltip hidden';
            //创建一个帮助提示的覆盖标注
            helpTooltip = new Overlay({
                title:'helpTool',
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            //将帮助提示的覆盖标注添加到地图中
            that.map.addOverlay(helpTooltip);
        }
        //创建测量提示框
        function createMeasureTooltip() {
            //创建测量提示框的div
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.setAttribute('id', 'lengthLabel');
            //设置测量提示要素的样式
            measureTooltipElement.className = 'tooltip tooltip-measure';
            //创建一个测量提示的覆盖标注
            measureTooltip = new Overlay({
                title:'overlayname',
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            //将测量提示的覆盖标注添加到地图中
            that.map.addOverlay(measureTooltip)
        }

        //测量类型发生改变时触发事件
        typeSelect.onchange = function () {
            //移除之前的绘制对象
            that.map.removeInteraction(draw);
            //重新进行绘制
            if(typeSelect.value==='无'){
                sourceMeasure.clear();
                for(var i=0;i<7;i++){
                    deletDiv();
                }

            }else{
                addInteraction();
            }
        };
        
        if(typed==="无"){ 
            sourceMeasure.clear();
        }

        //格式化测量长度
        var formatLength = function (line) {
        //定义长度变量
        var length;
        length = Math.round(line.getLength() * 100) / 100;
        //定义输出变量
        var output;
        //如果长度大于1000，则使用km单位，否则使用m单位
        if (length > 1000) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; //换算成KM单位
        } else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm'; //m为单位
        }
        return output;
        };

        //格式化测量面积
        var formatArea = function (polygon) {
        //定义面积变量
        var area;
        area = polygon.getArea();
        //定义输出变量
        var output;
        //当面积大于10000时，转换为平方千米，否则为平方米
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        }
            return output;
        };

     
        //清除drag的图层
        const clear = document.getElementById('clear');
        clear.addEventListener('click', function() {
            // that.map.removeOverlay(popup);
            sourceMeasure.clear();
            for(var i=0;i<7;i++){
                deletDiv();
            }

            that.map.removeInteraction(draw);
            that.map.removeEventListener('singleclick');

            typeSelect.value="无"
        }); 

    //测距
        
    }

    componentDidUpdate(){
        
        if(mapZoom!==null&centCoor!==[]){
            //动态获取图层
            
            //删除除了底图，注记以及边界的已有图层
            var currentLayers = this.map.getLayers().getArray()
            console.log('current layers:',currentLayers.length)
            
            for(let j=currentLayers.length-1;j>=0;j--){
                console.log('current layer titles:',currentLayers[j].values_.title);
                if(currentLayers[j].values_.title!==undefined){
                    if((RegExp(/tian_di_tu/).test(currentLayers[j].values_.title))||(RegExp(/Measure/).test(currentLayers[j].values_.title))||(RegExp(/border/).test(currentLayers[j].values_.title))){
                        
                        //保留底图，注记以及边界 以及测量图层
                        continue;

                    } else{

                        //删除道路图层以及视频点图层
                        this.map.removeLayer(currentLayers[j]);  
                    }
                }else{

                    //删除除道以及视频点以外的图层
                    this.map.removeLayer(currentLayers[j]);                   
                }
            }
            clearInterval(this.interval);
            this.interval=null;

            // for(let j=currentLayers.length-1;j>=5;j--){
            //     this.map.removeLayer(currentLayers[j])
            //     console.log('removed layer:'+j)
            // }
            
            // for(let h=5;h<this.state.initLayers.length;h++){
            //     this.state.initLayers[h].setVisible(false);//设置道路图层为不可见
            // }
            
            
            //地图添加多个图层
            this.getJsonObject();
            this.onChangeroad();
        }       

    }
        
    
    render(){
        let Groad=true;
        let Sroad=true;
        let Xroad=true;
        let Yroad=true;
        let Croad=true;

        if(this.props.regionId==='350800000000'){//龙岩 
        }else if((RegExp("^(350823)").test(this.props.regionId))){//上杭
            Yroad = false;
            Croad = false;
        }else if((RegExp("^(350582)").test(this.props.regionId))){//晋江
            Sroad = false;
        }else if((RegExp("^(350982)").test(this.props.regionId))){//福鼎
            Sroad = false;
        }else if((RegExp("^(350627)").test(this.props.regionId))){//南靖
        }else if((RegExp("^(350625)").test(this.props.regionId))){//长泰
        }

        
        return(
            <div id='mapWithNav'>
           {/* style={{margin: '-35px'}}  */}
                    
                {/* <MapNav right={this.state.navRight} changeFeatures={this.changeFeatures} changeLocation={this.changeLocation} changeCity={this.changeCity} changeCounty={this.changeCounty} handleChangeRoad={this.handleChangeRoad} handleChangeTimer={this.handleChangeTimer} Groad={Groad}Sroad={Sroad} Xroad={Xroad} Yroad={Yroad} Croad={Croad} cityOrCounty='county'roleId={this.props.roleId} regionId={this.props.regionId}/> */}
                
                <div style={{marginLeft:'0.6em',float:'left',marginTop:'5em',zIndex:'9',position:'absolute',height:'1.8em',width:'1.8em'}}>
                    <img src={earth} alt='reset' /* height='22' width='22' */ onClick={this.initMapClick} style={{height:'100%',width:'100%'}} />
                </div>
                
                
                <span className='baseMapButton' style={{marginLeft:'5em',marginTop:'.8em',float:'left',zIndex:'9'}}>
                    <Button id="vecLayer" type="button" onClick={this.vecLayerClick} style={{position:'absolute',zIndex:'10'}}>
                        平面图
                    </Button> 
                    <Button id="imgLayer" type="button" onClick={this.imgLayerClick} style={{position:'absolute',zIndex:'10',left:'calc(220px + 5em + 74px'}}>
                        影像图
                    </Button> 

                    <span id='orignalOP'>
                        
                            <span style={{display:'inline-block',height:'25px',/* lineHeight:'25px', */borderRadius:'3px', border:'1px solid rgb(246, 112, 42)',backgroundColor:'rgb(246, 112, 42)',opacity:'0.8',color:'white',textAlign:'center',fontSize:'14px'}}>&nbsp;&nbsp;测距&nbsp;&nbsp;</span>

                            <select id="types" style={{height:'25px',borderRadius:'3px',textAlign:'center',fontSize:'14px',opacity:'0.8',verticalAlign:'top'}}>
                                <option value="无">选择类型</option>
                                <option value="length">长度</option>
                                <option value="area">面积</option>
                            </select> 
                        
                            <a id="clear" style={{height:'25px',borderRadius:'3px',float:'right',textAlign:'center',fontSize:'14px',border:'1px solid rgb(246, 112, 42)',backgroundColor:'rgb(246, 112, 42)',opacity:'0.8',color:'white'}}>&nbsp;&nbsp;一键清除&nbsp;&nbsp;</a>
                        
                    </span>
                    <div style={{height:'40px',width:'100px',lineHeight:'40px',position:'absolute',zIndex:'10',right:'1em',background:'white',borderRadius:'5px',textAlign:'center'}}><img src={busStop}></img>
                    &nbsp;&nbsp;&nbsp;客运站</div>
                </span>
                
                <div className='baseMapButton'>
                {/* <Draggable> */}
                {/* <Button id="navButton" type="button" onClick={this.handleClick} style={{right:this.state.buttonRight}}>
                    图层控制<Icon type={this.state.IconName} theme="outlined" />
                </Button>  */}
                {/* </Draggable> */}
                </div>
                
                <div id="basemap" className='basemap'></div>
                {/*<Draggable> */}
                    <div id="popup" className="popup" style={{zIndex:'4000'}}>
                        {/* <div id="popup-title" >{this.state.popupTitle}</div>
                        <div id="popup-content">{this.state.popupContent}</div> */}
                        <div id="popup-title" style={{zIndex:'4000'}}></div>
                        <a href="javascript:void(0)" id="popup-closer" style={{zIndex:'4000'}}>✖</a>
                        <div id="popup-content" style={{zIndex:'4000'}}></div> 
                    </div>
                {/* </Draggable> */}
                
                <div id="startPoint"></div>
                <div id="endPoint"></div>
                <div id="pics" style={{display:"none"}}></div>
            </div>
            
        )
    }
}

export default BaseMapCounty;