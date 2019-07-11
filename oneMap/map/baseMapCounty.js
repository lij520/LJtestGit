import React,{ Component } from 'react';
//import Draggable from 'react-draggable';
import './baseMap.scss';
import './baseMap.less';
import 'ol/ol.css';
import {Map, View,Feature,Sphere} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {defaults, ScaleLine,OverviewMap} from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style, Text, Icon as olIcon,Circle,Circle as CircleStyle} from 'ol/style';
import Select from 'ol/interaction/Select';
import {click, pointerMove} from 'ol/events/condition';
import Overlay from 'ol/Overlay';
// import {Draw, Modify, Snap} from 'ol/interaction.js';
// import {unByKey} from 'ol/Observable.js';
// import Polygon from 'ol/geom/Polygon.js';
// import LineString from 'ol/geom/LineString.js';
// import Point from 'ol/geom/Point.js';

import {Button,Icon, message} from 'antd';
import { MapNav } from '../map-nav/mapNav';

import bridge_icon from './icons/bridge-icon.png';
import manager_icon from './icons/manager-icon.png';
import manager_icon_test from './icons/manager-icon-test.png';
import manager_icon_grey from './icons/manager-icon-grey.png'
import manager_icon_grey_test from './icons/manager-icon-grey-test.png'
import init_map from './icons/init-map.png';
import earth from './icons/earth.png';
import roadDamage_icon from './icons/event-icon.png';

import IllegalEncroach_icon from './icons/event-icon4.png';
import IllegalBuilding_icon from './icons/event-icon5.png';
import Encroach_icon from './icons/event-icon6.png';
import IllegalOperation_icon from './icons/event-icon7.png';
import OverloadUltra_icon from './icons/event-icon8.png';
import Embankment_icon from './icons/event-icon9.png';
import SlopeDamage_icon from './icons/event-icon10.png';
import WallCollapse_icon from './icons/event-icon11.png';
import ShoulderWeed_icon from './icons/event-icon12.png';
import PilesDebris_icon from './icons/event-icon13.png';
import SlopeWeeds_icon from './icons/event-icon14.png';
import SlopeRockfall_icon from './icons/event-icon15.png';
import RoadDirt_icon from './icons/event-icon16.png';
import PavementDamage_icon from './icons/event-icon17.png';
import RoadDebris_icon from './icons/event-icon18.png';
import MissingJoint_icon from './icons/event-icon19.png';
import AccessoryDamaged_icon from './icons/event-icon20.png';
import BridgeDamage_icon from './icons/event-icon21.png';
import BridgeUnderstructure_icon from './icons/event-icon22.png';
import BridgeWashed_icon from './icons/event-icon23.png';
import LiningCrack_icon from './icons/event-icon24.png';
import LiningLeaking_icon from './icons/event-icon25.png';
import TunnelDamaged_icon from './icons/event-icon26.png';
import DrainPlug_icon from './icons/event-icon27.png';
import CollapseDamage_icon from './icons/event-icon28.png';
import MarkDamage_icon from './icons/event-icon29.png';
import BarrierDamage_icon from './icons/event-icon30.png';
import DamageColumn_icon from './icons/event-icon31.png';
import WideAngleDamaged_icon from './icons/event-icon32.png';
import LineLoss_icon from './icons/event-icon33.png';
import OtherThing_icon from './icons/event-icon34.png';

import $ from 'jquery';
import gcoord from 'gcoord';


//引入道路路径
//长泰
import Groad_changtai from './ZhangZhouJson/ChangTaiJson/LX_G.json';
import Sroad_changtai from './ZhangZhouJson/ChangTaiJson/LX_S.json';
import Xroad_changtai from './ZhangZhouJson/ChangTaiJson/LX_X.json';
import Yroad_changtai from './ZhangZhouJson/ChangTaiJson/LX_Y.json';
import Croad_changtai from './ZhangZhouJson/ChangTaiJson/LX_C.json';

//引入边界数据
import border_changtai from './ZhangZhouJson/ChangTaiJson/ChangTai.json';
import {reqgetBridge,reqgetManager,reqgetMatiance,reqgetRoadEvent,reqCenter} from '../api/index.jsx';

// const URL='http://36.250.234.57:13077'
const URL='http://36.250.234.160:13077'
// const URL='http://10.19.1.159:13077'
// const URL = ''

const managerURL='http://36.250.234.160:13077';
// const managerURL='';

//图片地址
const picUrl="http://36.250.234.160:13077";
// const picUrl='';
//创建边界图层
const vectorLayer_border = new VectorLayer({
    title:'border',
    style: new Style({
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
    title:'Groad',
    style: new Style({
        stroke: new Stroke({
          color:'#FF6347',
          width: 5
        })
      }),
    visible:true,
    zIndex:55
  }); 

//省道
const vectorLayer_Sroad = new VectorLayer({
    title:'Sroad',
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
          color:'#FF4500',
          width: 3
        })
      }),
    visible:true,
    zIndex:54
  }); 

//县道
const vectorLayer_Xroad = new VectorLayer({
    title:'Xroad',
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
          color:'#FF7F00',
          width: 3
        })
      }),
    visible:true,
    zIndex:53
  }); 

//乡道
const vectorLayer_Yroad = new VectorLayer({
    title:'Yroad',
    source: new VectorSource(),
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
    source: new VectorSource(),
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
                        src: manager_icon_grey_test
                    }))
                });
            }else if(feature.get('online')===true){
                managerStyle=new Style({
                    image: new olIcon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        crossOrigin: 'anonymous',
                        src: manager_icon_test
                    }))
                })   
            }
            return managerStyle;
        }
})

const tian_di_tu_road_layer = new TileLayer({
    title: "tian_di_tu_road_layer",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    })
});
const tian_di_tu_annotation = new TileLayer({
    title: "tian_di_tu_annotation",
    source: new XYZ({
        url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible:true,
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
// var mapZoom=10.5;
// var centCoor = [117.32,24.72];
var mapZoom=null;
var centCoor = [];

class BaseMapCounty extends Component{
    constructor(props){
        super(props);
        this.showInfo = this.showInfo.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeCounty = this.changeCounty.bind(this);
        this.changeFeatures = this.changeFeatures.bind(this);
        this.setMapCenter = this.setMapCenter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getJsonObject = this.getJsonObject.bind(this);
        this.addMapLayers = this.addMapLayers.bind(this);
        this.sendAjax = this.sendAjax.bind(this);
        this.vecLayerClick = this.vecLayerClick.bind(this);
        this.imgLayerClick = this.imgLayerClick.bind(this);
        this.initMapClick = this.initMapClick.bind(this);
        this.callback= this.callback.bind(this);
        this.getCenter=this.getCenter.bind(this);

        this.state ={
            currentLocation:this.props.regionId,
            currentCity:'',
            currentCounty:this.props.regionId,
            currentFeatures:[],
            initLayers:[
                tian_di_tu_img_layer,
                tian_di_tu_img_annotation,
                tian_di_tu_road_layer,
                tian_di_tu_annotation,
                ],
            //popupTitle: '',
            //popupContent :'',
            IconName:"double-left",
            navRight:'-20.4%',
            buttonRight:'2%',
            collapsed:'none',
            
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
                center: fromLonLat([centCoor[0]+0.1,centCoor[1]]),
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

    handleClick = () =>{
        if(this.state.collapsed=="block"){
            this.setState({collapsed: 'none',IconName:'double-left',navRight:'-20.4%',buttonRight:'2%'}); 
            if(this.map.getView().getZoom()<=mapZoom){
                this.setMapCenter("none") 
            }
              
        }else{
            this.setState({collapsed: 'block',IconName:'double-right',navRight:'0',buttonRight:'22.4%'});
            if(this.map.getView().getZoom()<=mapZoom){
                this.setMapCenter("block") 
            } 
        }   
        
    }
    vecLayerClick = () =>{
        this.state.initLayers[0].setVisible(false);
        this.state.initLayers[1].setVisible(false);
        this.state.initLayers[2].setVisible(true);
        this.state.initLayers[3].setVisible(true);

       
        let objVec = document.getElementById('vecLayer');
        objVec.style.backgroundColor='rgba(77, 119, 181, 0.8)';
        objVec.style.color='white';
        objVec.style.borderColor='transparent';
    
        let objImg = document.getElementById('imgLayer');
        objImg.style.backgroundColor='rgba(255,255,255,0.8)';
        objImg.style.color='rgba(0,0,0,0.65)';
        objImg.style.borderColor='#d9d9d9';
        
    }
    imgLayerClick = () =>{
        this.state.initLayers[0].setVisible(true);
        this.state.initLayers[1].setVisible(true);
        this.state.initLayers[2].setVisible(false);
        this.state.initLayers[3].setVisible(false);

        let objImg = document.getElementById('imgLayer');
        objImg.style.backgroundColor='rgba(77, 119, 181, 0.8)';
        objImg.style.color='white';
        objImg.style.borderColor='transparent';
    
        let objVec = document.getElementById('vecLayer');
        objVec.style.backgroundColor='rgba(255,255,255,0.8)';
        objVec.style.color='rgba(0,0,0,0.65)';
        objVec.style.borderColor='#d9d9d9';
    }

    showInfo = (data) =>{
        console.log(data)
    }

    callback=()=>{
        console.log('in here is the callback function');
    }

    addMapLayers = (arr,featureList) =>{
        // console.log('arr',arr)
        let featuresModified = []
        
        if(featureList.length<4){
            return;
        }else if(RegExp(/Road/).test(featureList)){
            return;
        }else if(featureList==='manager'){
            return;
        }else{
            featuresModified.push(featureList);
        }
        // console.log('featuresModified',featuresModified);

        let src;
        if(arr===""){
            return;
        }else if(arr.features.length!==0){//如果geojson数据不为空
            if(arr.features[0].properties.fsmc!==undefined){
                if(/* featuresModified[i]==='bridge' */arr.features[0].properties.fsmc[arr.features[0].properties.fsmc.length-1]==='桥'){//判断附属名称的最后一个字是“桥”
                    src = bridge_icon;
                }
            }
            else if(arr.features[0].properties.report_type==='违章占道'){
                src=IllegalEncroach_icon;
            }else if(arr.features[0].properties.report_type==='违章搭建'){
                src=IllegalBuilding_icon;
            }else if(arr.features[0].properties.report_type==='侵占公路设施'){
                src = Encroach_icon;
            }else if(arr.features[0].properties.report_type==='非法营运'){
                src = IllegalOperation_icon;
            }else if(arr.features[0].properties.report_type==='超载超高'){
                src = OverloadUltra_icon;
            }else if(arr.features[0].properties.report_type==='路基坍塌'){
                src = Embankment_icon;
            }else if(arr.features[0].properties.report_type==='边坡坍塌'){
                src = SlopeDamage_icon;
            }else if(arr.features[0].properties.report_type==='挡墙坍塌'){
                src = WallCollapse_icon;
            }else if(arr.features[0].properties.report_type==='路肩杂草'){
                src = ShoulderWeed_icon;
            }else if(arr.features[0].properties.report_type==='路肩堆放杂物'){
                src = PilesDebris_icon;
            }else if(arr.features[0].properties.report_type==='边坡杂草'){
                src = SlopeWeeds_icon;
            }else if(arr.features[0].properties.report_type==='边坡落石'){
                src = SlopeRockfall_icon;
            }else if(arr.features[0].properties.report_type==='路面脏污'){
                src = RoadDirt_icon;
            }else if(arr.features[0].properties.report_type==='路面破损'){
                src = PavementDamage_icon;
            }else if(arr.features[0].properties.report_type==='路面堆放杂物'){
                src = RoadDebris_icon;
            }else if(arr.features[0].properties.report_type==='接缝填料缺失'){
                src = MissingJoint_icon;
            }else if(arr.features[0].properties.report_type==='附属设施损坏'){
                src = AccessoryDamaged_icon;
            }else if(arr.features[0].properties.report_type==='桥梁基础损坏'){
                src = BridgeDamage_icon;
            }else if(arr.features[0].properties.report_type==='桥梁下部结构损坏'){
                src = BridgeUnderstructure_icon;
            }else if(arr.features[0].properties.report_type==='桥梁冲毁'){
                src = BridgeWashed_icon;
            }else if(arr.features[0].properties.report_type==='衬砌裂缝'){
                src = LiningCrack_icon;
            }else if(arr.features[0].properties.report_type==='衬砌漏水'){
                src = LiningLeaking_icon;
            }else if(arr.features[0].properties.report_type==='隧道附属设施损坏'){
                src = TunnelDamaged_icon;
            }else if(arr.features[0].properties.report_type==='排水堵塞'){
                src = DrainPlug_icon;
            }else if(arr.features[0].properties.report_type==='倒塌破损'){
                src = CollapseDamage_icon;
            }else if(arr.features[0].properties.report_type==='标志牌损坏'){
                src = MarkDamage_icon;
            }else if(arr.features[0].properties.report_type==='护栏损坏'){
                src = BarrierDamage_icon;
            }else if(arr.features[0].properties.report_type==='警示柱损坏'){
                src = DamageColumn_icon;
            }else if(arr.features[0].properties.report_type==='广角镜损坏'){
                src = WideAngleDamaged_icon;
            }else if(arr.features[0].properties.report_type==='标线脱落'){
                src = LineLoss_icon;
            }else if(arr.features[0].properties.report_type==='其他'){
                src = OtherThing_icon;
            }else{
                src = roadDamage_icon;//其他事件
            }
        }else{
            src = roadDamage_icon;//空值图层也设置src，但是不会显示
        }

        if(arr.features.length!==0){
            if(arr.features[0].properties.fsmc!==undefined){
                if(arr.features[0].properties.fsmc[arr.features[0].properties.fsmc.length-1]==='桥'){
                    var dataTran=arr;//如果是桥梁数据，不转换，因为本来就是WGS84坐标
                }
            }else{
                var dataTran=gcoord.transform(arr, gcoord.GCJ02, gcoord.WGS84);
            } 
        }else{
            var dataTran=gcoord.transform(arr, gcoord.GCJ02, gcoord.WGS84);
        } 
        // console.log('dataTran',dataTran);
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
                        src: src
                    }))
                })    
        })
        
        this.map.addLayer(newLayer)
    }

    
    sendAjax =async (a,callback,ftures,index,arr)=>{
       
        let that = this;
        //改变url
        let locChange;
        if(this.props.roleId===12||this.props.roleId===8){
            locChange="townId";
        }else if(this.props.roleId===13||this.props.roleId===9){
            locChange="countryId";
        }else if(this.props.roleId===14||this.props.roleId===10){
            locChange="cityId";
        }
        
        //判断城市还是区县
        let loc,areaId;
        let cty = this.state.currentCity;
        let cnty = this.state.currentCounty;
        if(cnty===''||cnty==='无'){
            loc = 'cityId';
            areaId = cty;
        }else{
            loc = 'countryId';
            areaId = cnty;
        }

        if(index>=ftures.length){
            console.log('LayersToBeAdded-f',arr)
            
            //地图添加多个图层
            // this.addMapLayers(arr,ftures);
            return;//返回空值 
        }
        // console.log('index,ftures',index,ftures[index])
        if((ftures[index].length>=4)){
            if((RegExp(/Road/).test(ftures[index]))){//判断道路图层是否被选中
                if((RegExp("^(350625)").test(this.props.regionId))){//长泰
                    if(ftures[index]==='nationalRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Groad_changtai,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Groad.setSource(source);
                        this.map.addLayer(vectorLayer_Groad);
                    }else if(ftures[index]==='countyRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Xroad_changtai,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Xroad.setSource(source);
                        this.map.addLayer(vectorLayer_Xroad);
                    }else if(ftures[index]==='countryRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Yroad_changtai,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Yroad.setSource(source);
                        this.map.addLayer(vectorLayer_Yroad);
                    }else if(ftures[index]==='villageRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Croad_changtai,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Croad.setSource(source);
                        this.map.addLayer(vectorLayer_Croad);
                    }else if(ftures[index]==='provincialRoad'){
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Sroad_changtai,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        vectorLayer_Sroad.setSource(source);
                        this.map.addLayer(vectorLayer_Sroad);
                    }
                }

                index++;
                // that.sendAjax(ftures,loc,index,arr); 
                that.sendAjax(a,callback,ftures,index,arr);

            }else if(ftures[index]==='bridge'){
                const resbridge = await reqgetBridge(ftures[index],loc,areaId)
                // console.log('resbridge',resbridge);
                if(resbridge){
                    arr.push(resbridge);
                    callback(arr[arr.length-1],ftures[index]);
                    index++;
                    that.sendAjax(null,callback,ftures,index,arr);
                }else{
                    message.error('数据获取失败');
                }

            }else if(ftures[index]==='manager'){
                let currentLayerURL = managerURL+'/getCityPositionByRegionId';
                
                // const userId = that.props.userId;
                // const resultManager = await reqgetManager(userId);
                // console.log('resultmanager',resultManager);

                $.ajax({ 
                    type:"post", 
                    url:currentLayerURL,
                    data:{userId:that.props.userId},
                    //token:that.props.token,
                    //dataType:'json',
                    success:
                        function(data){ 
                            console.log('datat',data);
                            var managerTranData=gcoord.transform(data, gcoord.GCJ02, gcoord.WGS84);
                            let managerSource=new VectorSource({
                                features: (new GeoJSON()).readFeatures(managerTranData,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                            })
                            manager_layer.setSource(managerSource);
                            that.map.addLayer(manager_layer);

                            index++;
                            that.sendAjax(null,callback,ftures,index,arr);
                            that.interval=setInterval(function(){
                                $.ajax({ 
                                    type:"post", 
                                    url:currentLayerURL,
                                    data:{userId:that.props.userId},
                                    //token:that.props.token,
                                    //dataType:'json',
                                    success:
                                        function(data){ 
                                            console.log('datat1',data);
                                            manager_layer.setSource(new VectorSource({
                                                features: (new GeoJSON()).readFeatures(gcoord.transform(data, gcoord.GCJ02, gcoord.WGS84),{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'})
                                            }));
                                        }, 
                                        error: function(){ 
                                            console.log("Request error");
                                            clearInterval(that.interval);
                                        } 
                                })}, 3000); //300000毫秒是5分钟
                        }, 
                    error: function () { 
                        console.log("Request error"); 
                    } 
                });
            }else if(ftures[index].slice(0,1)==='2'){ 
                const resultmatiance  =await reqgetMatiance(locChange,this.props.regionId,ftures[index]);
                if(resultmatiance){
                    arr.push(resultmatiance);
                    callback(arr[arr.length-1],ftures[index]);
                    index++;
                    that.sendAjax(null,callback,ftures,index,arr);
                }else{
                    message.error('获取数据失败');
                }
            }else{   
                const resultEvent = await reqgetRoadEvent(locChange,this.props.regionId,ftures[index]);
                if(resultEvent){
                    arr.push(resultEvent);
                    callback(arr[arr.length-1],ftures[index]);
                    index++;
                    that.sendAjax(null,callback,ftures,index,arr);
                }else{
                    message.error('获取数据失败');
                }
            }
            // else{
            //     index++;
            //     that.sendAjax(ftures,loc,index,arr);
            // } 
        }else{
            index++;
            that.sendAjax(null,callback,ftures,index,arr);
        }//如果要加事件上报，把事件上报的key改成对应的problem_id,然后在else这里添加
    // }

        
    }
    getJsonObject = () =>{
        let LayersToBeAdded = [];
        let features = [];
        let index = 0;
        features = this.state.currentFeatures;
        if((features.length !== 0)){
            this.sendAjax(null,this.addMapLayers,features,index,LayersToBeAdded);
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
                center: fromLonLat([centCoor[0]+0.1,centCoor[1]]),
                zoom:mapZoom,
                duration: 500
              });
        }

        
    }

    getCenter =async ()=>{
        const centerData = await reqCenter(this.props.roleId,this.props.regionId);
        // console.log('center',centerData);
        if(centerData){
            centCoor = centerData.center;
            mapZoom = centerData.scale;
            console.log(centCoor,mapZoom);
            this.map.getView().setCenter(fromLonLat(centCoor));
            this.map.getView().setZoom(mapZoom);
            //添加边界
            if((RegExp("^(350625)").test(this.props.regionId))){//长泰
                let source = new VectorSource();
                source.addFeatures((new GeoJSON()).readFeatures(border_changtai,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                vectorLayer_border.setSource(source);
                this.map.addLayer(vectorLayer_border);
            }
        }else{
            message.error('数据获取失败');
        }
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        console.log('stupid!');
        
        $('#vecLayer').trigger('click');
        this.map.setTarget("basemap");
        
        let that = this;
        that.getCenter();

        //点击空的地方不会消失，必须点击“X”才会消失
        var element = $('#popup').get(0);
        var title = $('#popup-title').get(0);
        var content = $('#popup-content').get(0);
        var closer = $("#popup-closer").get(0);
        
        var startP = $('#startPoint').get(0);
        var endP = $('#endPoint').get(0);
        
        var popup = new Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -60],
            autoPan:true,
            autoPanAnimation:250
        });
        var startPopup= new Overlay({
            element:startP,
            positioning:'bottom-center',
            stopEvent:false,
            offset:[0, -7],
            autoPan:true,
            autoPanAnimation:250
        })
        var endPopup = new Overlay({
            element:endP,
            positioning:'bottom-center',
            stopEvent:false,
            offset:[0, -7],
            autoPan:true,
            autoPanAnimation:250
        })
        
        this.map.addOverlay(popup);
        this.map.addOverlay(startPopup);
        this.map.addOverlay(endPopup);

        this.map.on('singleclick',function(e){
            let feature = that.map.forEachFeatureAtPixel(e.pixel,
                function(feature) {
                    return feature;
                })
            if(feature){
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

                    }else if(feature.get('report_type')!==undefined){
                        var rangezs,rangeys;
                        var qdzh= Math.round((parseFloat(feature.get('qdzh'))-Math.floor(feature.get('qdzh')))*1000);
                        var weizhi = feature.get('smileageoffset');
                        console.log('weizhi',weizhi);
                        if(weizhi==="错误"){
                            rangezs=Math.floor(feature.get('qdzh'));
                            rangeys=0;
                        }else{
                            if(weizhi>=1000){
                                rangezs=Math.floor(Math.floor(weizhi)/1000)+Math.floor(feature.get('qdzh'));
                                rangeys=Math.round(weizhi-Math.floor(Math.floor(weizhi)/1000)*1000);
                                console.log(rangezs,rangeys);
                            }else{
                                rangezs=Math.floor(feature.get('qdzh'));
                                rangeys=Math.floor(weizhi);
                                // console.log(ranges);
                            }
                        }
                        
                        title.innerHTML= '<h3><b>事件信息</b></h3>';
                        content.innerHTML = '<p>上报事件类型：' + feature.get('report_type') + '</p>'
                                            +'<p>上报人：' + feature.get('report_man') + '</p>'
                                            +'<p>上报内容：' + feature.get('report_content') + '</p>'
                                            +'<p>位置桩号：' +'K'+ rangezs+ '+'+rangeys + '</p>'
                                            +'<p>道路起始桩号：' +'K'+ Math.floor(feature.get('qdzh'))+ '+'+qdzh +  '</p>'
                                            +'<p>维度：' + feature.get('latitude') + '</p>'
                                            +'<p>经度：' + feature.get('longitude') + '</p>'
                                            +'<p>图片：' + test + '</p >'
                        ;
                    }
                    else{
                        title.innerHTML= '<h3><b>地物信息</b></h3>';
                        content.innerHTML=`<div><p>名称：${feature.get('fsmc')}</p><p>编码：${feature.get('fsbm')}</p></div>`;
                    }
                    popup.setPosition(coordinate);

                    startPopup.setPosition(undefined);
                    endPopup.setPosition(undefined);
                }else if(featureType=='LineString'){
                    
                        let qdMeter = Math.round((parseFloat(feature.get('QDZH'))-Math.floor(feature.get('QDZH')))*1000);
                        let zdMeter = Math.round((parseFloat(feature.get('ZDZH'))-Math.floor(feature.get('ZDZH')))*1000);
    
                        title.innerHTML= '<h3><b>地物信息</b></h3>';
                        content.innerHTML=`<div><p>名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p><p>路管员：loading..</p><p>电话号码：loading..</p><p>起点桩号：K${Math.floor(feature.get('QDZH'))}+${qdMeter}</p><p>止点桩号：K${Math.floor(feature.get('ZDZH'))}+${zdMeter}</p><p>路长：loading..</p><p>路宽：loading..</p><p>起始点名称：loading..</p><p>终止点名称：loading..</p></div>`;//数据未获取到时，设置为“loading...”

                        $.ajax({ 
                            type:"get", 
                            url:URL+'/app_manageRoad/seachRoadByRoadId_web',
                            data:{roadid:feature.get('LDBM'),zdzh:feature.get('ZDZH')},
                            dataType:'json',
                            success:
                                function(data){ 
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
                        
                        startCoor[0] = feature.get('QDJD');
                        startCoor[1] = feature.get('QDWD');
                        endCoor[0] = feature.get('ZDJD');
                        endCoor[1] = feature.get('ZDWD');
                        
                        popup.setPosition(coordinate);
                        startPopup.setPosition(fromLonLat(startCoor));
                        endPopup.setPosition(fromLonLat(endCoor));
                     
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
            //condition: pointerMove,
            condition:click,
            //layers:this.map.getLayers().getArray().slice(5,this.map.getLayers().getArray().length)
          });
    
        this.map.addInteraction(selectClick);
        //selectClick.on('select',this.selectFeature)
        //selectClick.on('select',function(){})


        //测距
        //测距
        
    }

    componentDidUpdate(){
        
        if(mapZoom!==null&centCoor!==[]){
            //动态获取图层
            
            //删除除了底图，注记以及边界的已有图层
            var currentLayers = this.map.getLayers().getArray()
            console.log('current layers:',currentLayers.length)
            
            for(let j=currentLayers.length-1;j>=0;j--){
                console.log(currentLayers[j].values_.title);
                //console.log((RegExp(/tian_di_tu/).test(currentLayers[j].values_.title)));
                if(currentLayers[j].values_.title!==undefined){
                    if((RegExp(/tian_di_tu/).test(currentLayers[j].values_.title))||(RegExp(/border/).test(currentLayers[j].values_.title))){
                        //保留底图，注记以及边界
                        continue;
                    }else{
                        //删除道路图层
                        this.map.removeLayer(currentLayers[j]);
                       
                    }
                }else{
                    //删除除道路以外的图层
                    this.map.removeLayer(currentLayers[j]);
                    
                }
            }
            clearInterval(this.interval);
            this.interval=null;

            //地图添加多个图层
            this.getJsonObject();
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
                    
                <MapNav right={this.state.navRight} changeFeatures={this.changeFeatures} changeLocation={this.changeLocation} changeCity={this.changeCity} changeCounty={this.changeCounty} Groad={Groad}Sroad={Sroad} Xroad={Xroad} Yroad={Yroad} Croad={Croad} cityOrCounty='county'roleId={this.props.roleId} regionId={this.props.regionId}/>
                
                <div style={{marginLeft:'0.6em',float:'left',marginTop:'5em',zIndex:'9',position:'absolute',height:'1.8em',width:'1.8em'}}>
                    <img src={earth} alt='reset' /* height='22' width='22' */ onClick={this.initMapClick} style={{height:'100%',width:'100%'}} />
                </div>
                
                
                <div className='baseMapButton' style={{marginLeft:'5%',marginTop:'1%',float:'left',zIndex:'9'}}>
                    <Button id="vecLayer" type="button" onClick={this.vecLayerClick} style={{float:'left',zIndex:'9'}}>
                        平面图
                    </Button> 
                    <Button id="imgLayer" type="button" onClick={this.imgLayerClick} style={{float:'left',zIndex:'9'}}>
                        影像图
                    </Button> 
                </div>
                
                <div className='baseMapButton'>
                {/* <Draggable> */}
                <Button id="navButton" type="button" onClick={this.handleClick} style={{right:this.state.buttonRight}}>
                    图层控制<Icon type={this.state.IconName} theme="outlined" />
                </Button> 
                {/* </Draggable> */}
                </div>
                
                <div id="basemap" className='basemap'></div>
                {/*<Draggable> */}
                    <div id="popup" className="popup" >
                        {/* <div id="popup-title" >{this.state.popupTitle}</div>
                        <div id="popup-content">{this.state.popupContent}</div> */}
                        <div id="popup-title" ></div>
                        <a href="javascript:void(0)" id="popup-closer" >✖</a>
                        <div id="popup-content"></div> 
                    </div>
                {/* </Draggable> */}
                
                <div id="startPoint"></div>
                <div id="endPoint"></div>

                <div id="pics" style={{visibility:"hidden",position:'absolute'}}></div>
            </div>
            
        )
    }
}

export default BaseMapCounty;