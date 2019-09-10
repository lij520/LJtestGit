import React, { Component } from 'react';
import './baseMap.scss';
import './baseMap.less';
import 'ol/ol.css';
import { Map, View, Feature, Sphere } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import { defaults, ScaleLine, OverviewMap } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text, Icon as olIcon, Circle, Circle as CircleStyle, Size } from 'ol/style';
import Select from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import Overlay from 'ol/Overlay';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { unByKey } from 'ol/Observable.js';
import Polygon from 'ol/geom/Polygon.js';
import LineString from 'ol/geom/LineString.js';
import Point from 'ol/geom/Point.js';

import { Button, Icon, Timeline, Steps } from 'antd';
import { MapNav } from '../map-nav/mapNav';

import bridge_icon from './icons/bridge_icon.png';
import manager_icon from './icons/manager_icon.png';
import manager_icon_grey from './icons/manager_icon_grey.png';

////////////////代码中没有添加图层，也没有ajax代码///////////////////
import culvert_icon from './icons/culvert_icon.png';
import tunnel_icon from './icons/tunnel_icon.png';
import countryRoad_tech from './icons/countryRoad_tech.png';
//////////////////////////////////

import earth from './icons/earth.png';
import video from './icons/video.png';

import IllegalEncroach_icon from './icons/illegal_encroach.png';
import IllegalBuilding_icon from './icons/illegal_building.png';
import Encroach_icon from './icons/encroach.png';
import IllegalOperation_icon from './icons/illegal_operation.png';
import OverloadUltra_icon from './icons/overload_ultra.png';
import Embankment_icon from './icons/embankment.png';
import SlopeDamage_icon from './icons/slope_damage.png';
import WallCollapse_icon from './icons/wall_collapse.png';
import ShoulderWeed_icon from './icons/shoulder_weed.png';
import PilesDebris_icon from './icons/piles_debris.png';
import SlopeWeeds_icon from './icons/slope_weeds.png';
import SlopeRockfall_icon from './icons/slope_rockfall.png';
import RoadDirt_icon from './icons/road_dirt.png';
import PavementDamage_icon from './icons/pavement_damage.png';
import RoadDebris_icon from './icons/road_debris.png';
import MissingJoint_icon from './icons/missing_joint.png';
import AccessoryDamaged_icon from './icons/accessory_damaged.png';
import BridgeDamage_icon from './icons/bridge_damaged.png';
import BridgeUnderstructure_icon from './icons/bridge_understructure.png';
import BridgeWashed_icon from './icons/bridge_washed.png';
import LiningCrack_icon from './icons/lining_crack.png';
import LiningLeaking_icon from './icons/lining_leaking.png';
import TunnelDamaged_icon from './icons/tunnel_damaged.png';
import DrainPlug_icon from './icons/drain_plug.png';
import CollapseDamage_icon from './icons/collapse_damaged.png';
import MarkDamage_icon from './icons/mark_damaged.png';
import BarrierDamage_icon from './icons/barrier_damaged.png';
import DamageColumn_icon from './icons/column_damaged.png';
import WideAngleDamaged_icon from './icons/wide_angle_damaged.png';
import LineLoss_icon from './icons/line_loss.png';
import OtherThing_icon from './icons/other_things.png';

import $ from 'jquery';
import gcoord from 'gcoord';


//引入边界/道路数据
import border_jianning from './jianning/jianning.json';
import Xroad_jianningBD from './jianning/LX_X.json';
import Yroad_jianningBD from './jianning/LX_Y.json';
import Croad_jianningBD from './jianning/LX_C.json';

//引入接口
import { reqRoadtailForm, reqglUserTypeList, reqReportType, reqManagerOnOff, reqBridgeLonLat } from '../../../ajax-lj/index.jsx';

const Step = Steps.Step;

const Xroad_jianning = gcoord.transform(Xroad_jianningBD, gcoord.BD09, gcoord.WGS84);
const Yroad_jianning = gcoord.transform(Yroad_jianningBD, gcoord.BD09, gcoord.WGS84);
const Croad_jianning = gcoord.transform(Croad_jianningBD, gcoord.BD09, gcoord.WGS84);


// const URL = 'http://42.180.0.28:13066';
const URL = ''

//图片地址
const picUrl = URL;

//视频地址
const videoUrl = URL + '/video/';

//创建边界图层
const vectorLayer_border = new VectorLayer({
    title: 'border',
    style: new Style({
        stroke: new Stroke({
            color: 'red'/* '#D2691E' */,
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
    source: new VectorSource(),
    title: 'Groad',
    style: new Style({
        stroke: new Stroke({
            color: '#FF6347',
            width: 4
        })
    }),
    visible: true,
    zIndex: 55
});

//省道
const vectorLayer_Sroad = new VectorLayer({
    title: 'Sroad',
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
            color: '#FF4500',
            width: 2
        })
    }),
    visible: true,
    zIndex: 54
});

//县道
const vectorLayer_Xroad = new VectorLayer({
    title: 'Xroad',
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
            color: '#FF7F00',
            width: 3
        })
    }),
    visible: true,
    zIndex: 53
});

//乡道
const vectorLayer_Yroad = new VectorLayer({
    title: 'Yroad',
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
            color: '#FF8072',
            width: 2.5
        })
    }),
    visible: true,
    zIndex: 52
});

//村道
const vectorLayer_Croad = new VectorLayer({
    title: 'Croad',
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
            color: '#FFA07A',
            width: 1
        })
    }),
    visible: true,
    zIndex: 51
});
//专管员图层
const manager_layer = new VectorLayer({
    title: 'manager',
    source: new VectorSource(),
    zIndex: 1000,
    visible: true,
    style:
        function (feature) {
            // console.log('features!!!!!!!!!!', feature);
            const Info = feature.get('Info');
            // console.log('info', Info);
            let managerStyle;
            if (Info.state === "0") {
                managerStyle = new Style({
                    image: new olIcon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        crossOrigin: 'anonymous',
                        src: manager_icon_grey,
                        // size:[20,24.59]
                    }))
                });
            } else if (Info.state === "1") {
                managerStyle = new Style({
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
    title: 'trackLoop',
    source: new VectorSource(),
    zIndex: 1000,
    visible: true,
    style: new Style({
        stroke: new Stroke({
            color: '#00FA9A',
            width: 3
        })
    }),
});
const pathLoop_layer = new VectorLayer({
    title: 'pathLoop',
    source: new VectorSource(),
    zIndex: 1001,
    visible: true,
    style: new Style({
        stroke: new Stroke({
            color: 'darkgreen',
            width: 3
        })
    }),
});

const tian_di_tu_road_layer = new TileLayer({
    title: "tian_di_tu_road_layer",
    source: new XYZ({
        url: 'http://t' + Math.round(Math.random() * 7) + '.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible: false
});



const tian_di_tu_annotation = new TileLayer({
    title: "tian_di_tu_annotation",
    source: new XYZ({
        url: 'http://t' + Math.round(Math.random() * 7) + '.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible: false,
    zIndex: 999
});
const tian_di_tu_img_layer = new TileLayer({
    title: "tian_di_tu_img_layer",
    source: new XYZ({
        url: 'http://t' + Math.round(Math.random() * 7) + '.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015',
        maxZoom: 16
    }),
    visible: false,
});

const tian_di_tu_img_annotation = new TileLayer({
    title: "tian_di_tu_img_annotation",
    source: new XYZ({
        url: 'http://t' + Math.round(Math.random() * 7) + '.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=6a6808a7890958ff8df61d2c49323015',
        maxZoom: 16
    }),
    visible: false,
    zIndex: 999
});
//比例尺和中心点
var mapZoom = 10.5;
var centCoor = [116.82, 26.82];
// var mapZoom=null;
// var centCoor = [];

//巡路视频点位数据
const videosGeo =
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "LXMC": "S308", "LDBM": "30", "name": "video", "longitude": "116.79428100585936", "latitude": "26.896353366896435", "id": "1" },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    116.79428100585936,
                    26.896353366896435
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "LXMC": "G208", "LDBM": "26", "name": "video", "longitude": "116.65145874023438", "latitude": "26.79588031886341", "id": "2" },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    116.65145874023438,
                    26.79588031886341
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "LXMC": "X210", "LDBM": "38", "name": "video", "longitude": "116.80252075195312", "latitude": "26.725986812271756", "id": "3" },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    116.80252075195312,
                    26.725986812271756
                ]
            }
        }

    ]
}
//巡路视频图层
const video_layer = new VectorLayer({
    source: new VectorSource({
        features: (new GeoJSON()).readFeatures(videosGeo, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
    }),
    title: 'videos',
    style: new Style({
        image: new olIcon(({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            crossOrigin: 'anonymous',
            src: video,

        }))
    }),
    visible: true,
    zIndex: 60
});

class BaseMapCounty extends Component {
    constructor(props) {
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

        this.handleChangeRoad = this.handleChangeRoad.bind(this);
        this.handleChangeTimer = this.handleChangeTimer.bind(this);
        this.onChangeroad = this.onChangeroad.bind(this);

        this.state = {
            currentLocation: this.props.regionId,//'350582000000',//jinjiang
            currentCity: '',//quanzhou
            currentCounty: this.props.regionId,//'350582000000',//jinjiang
            currentFeatures: [],
            initLayers: [
                tian_di_tu_img_layer,
                tian_di_tu_img_annotation,
                tian_di_tu_road_layer,
                tian_di_tu_annotation,
            ],
            IconName: "double-left",
            navRight: '-18.5%',
            buttonRight: '0',
            collapsed: 'none',

            currentRoads: [],
            currentstartValue: null,
            currentendValue: null,
            showModals: false,
            progress: [],
            reportType: null
        }
        this.map = new Map({
            controls: new defaults({
                attributionOptions: {
                    collapsible: false
                }
            }).extend([
                new ScaleLine({
                    className: 'olScaleLine',
                }),
                new OverviewMap()
            ]),
            //target:'basemap',
            layers:
                this.state.initLayers,
            view: new View({
                center: fromLonLat([118.217006, 26.035721]),//福建省
                zoom: 7
            })
        });
        this.interval = null;

    };

    //巡路轨迹
    handleChangeRoad = (targetchangefes) => {
        this.setState({
            currentRoads: targetchangefes,
        });
        console.log('FES', targetchangefes);
    }

    //时间选择
    handleChangeTimer = (timer) => {
        var startValue = timer[0].format('YYYY-MM-DD');
        var endValue = timer[1].format('YYYY-MM-DD');

        this.setState({
            currentstartValue: startValue,
            currentendValue: endValue
        });
    }

    changeLocation = (loc) => {
        this.setState({
            currentLocation: loc
        });
        console.log('changeLocation', loc)
    }
    changeCity = (city) => {
        this.setState({
            currentCity: city,
            //currentCounty:''
        });
        console.log('currentCity', city)
    }
    changeCounty = (county) => {
        this.setState({
            currentCounty: county
        });
        console.log('currentCounty', county)
    }
    changeFeatures = (feas) => {
        this.setState({
            currentFeatures: feas,
        });
        console.log('changeFeatures', feas);
    }

    setMapCenter = (bool) => {
        if (bool == 'block') {
            //this.map.getView().setCenter(fromLonLat([120.3,27.2]))
            this.map.getView().animate({
                center: fromLonLat([centCoor[0] + 0.1, centCoor[1]]),
                duration: 500
            });
        } else if (bool == 'none') {
            //this.map.getView().setCenter(fromLonLat([120.23,27.2]))
            this.map.getView().animate({
                center: fromLonLat(centCoor),
                duration: 500
            });
        }
    }

    //加载巡路图层
    onChangeroad = () => {
        let that = this;
        var roadIndex = this.state.currentRoads;
        var startTime = this.state.currentstartValue;
        var endTime = this.state.currentendValue;
        console.log('roadIndex,startTime,endTime', roadIndex, startTime, endTime);

        let locChange;
        var regionId = this.props.regionId;
        if (this.props.roleId === 12 || this.props.roleId === 8) {
            locChange = "town";
        } else if (this.props.roleId === 13 || this.props.roleId === 9) {
            locChange = "country";
        } else if (this.props.roleId === 14 || this.props.roleId === 10) {
            locChange = "city";
        }

        var index = 0;
        judageRoad(roadIndex, startTime, endTime);
        function judageRoad(roadIndex, startTime, endTime) {
            if ((RegExp("Loop").test(roadIndex[index]))) {
                if (roadIndex[index] === "trackLoop") {
                    let currentLayerURL = URL + '/app_manageRoad/getTaskRoad?';
                    console.log(currentLayerURL);
                    $.ajax({
                        type: "get",
                        url: currentLayerURL,
                        data: { CityType: locChange, region_id: regionId },
                        //dataType:'json',
                        success:
                            function (data) {
                                console.log('data', data);
                                let trackLoopSource = new VectorSource({
                                    features: (new GeoJSON()).readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
                                });
                                trackLoop_layer.setSource(trackLoopSource);
                                that.map.addLayer(trackLoop_layer);
                            },
                        error: function () {
                            console.log("Request error");
                        }
                    });
                } else if (roadIndex[index] === "pathLoop") {
                    if (startTime === null || endTime === null) {
                        alert("请选择起止时间");
                    } else {
                        let currentLayerURL = URL + '/app_manageRoad/pathFinding_web?StartDate=' + startTime + '&EndDate=' + endTime;
                        console.log(currentLayerURL)
                        $.ajax({
                            type: "get",
                            url: currentLayerURL,
                            data: { CityType: locChange, region_id: regionId },
                            //dataType:'json',
                            success:
                                function (data) {
                                    let pathLoopSource = new VectorSource({
                                        features: (new GeoJSON()).readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
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
                judageRoad(roadIndex, startTime, endTime);
            }
        }
    }


    handleClick = () => {
        if (this.state.collapsed == "block") {
            this.setState({ collapsed: 'none', IconName: 'double-left', navRight: '-18.5%', buttonRight: '0' });
            if (this.map.getView().getZoom() <= mapZoom) {
                this.setMapCenter("none")
            }

        } else {
            this.setState({ collapsed: 'block', IconName: 'double-right', navRight: '0', buttonRight: '18.5%' });
            if (this.map.getView().getZoom() <= mapZoom) {
                this.setMapCenter("block")
            }
        }

    }
    vecLayerClick = () => {
        this.state.initLayers[0].setVisible(false);
        this.state.initLayers[1].setVisible(false);
        this.state.initLayers[2].setVisible(true);
        this.state.initLayers[3].setVisible(true);


        let objVec = document.getElementById('vecLayer');
        objVec.style.backgroundColor = 'rgba(246,112,42,0.8)';
        objVec.style.color = 'white';
        objVec.style.borderColor = 'transparent';

        let objImg = document.getElementById('imgLayer');
        objImg.style.backgroundColor = 'rgba(255,255,255,0.8)';
        objImg.style.color = 'rgba(0,0,0,0.65)';
        objImg.style.borderColor = 'rgba(246,112,42,0.8)';

    }
    imgLayerClick = () => {
        this.state.initLayers[0].setVisible(true);
        this.state.initLayers[1].setVisible(true);
        this.state.initLayers[2].setVisible(false);
        this.state.initLayers[3].setVisible(false);

        let objImg = document.getElementById('imgLayer');
        objImg.style.backgroundColor = 'rgba(246,112,42,0.8)';
        objImg.style.color = 'white';
        objImg.style.borderColor = 'transparent';

        let objVec = document.getElementById('vecLayer');
        objVec.style.backgroundColor = 'rgba(255,255,255,0.8)';
        objVec.style.color = 'rgba(0,0,0,0.65)';
        objVec.style.borderColor = 'rgba(246,112,42,0.8)';
    }

    showInfo = (data) => {
        console.log(data)
    }
    addMapLayers = (arr, featureList) => {
        let featuresModified = []
        // for (let k = 0; k < featureList.length; k++) {
        if (featureList.length < 4) {
            return;
        } else if (RegExp(/Road/).test(featureList)) {
            return;
        } else if (featureList === 'manager') {
            return;
        } else if (featureList === 'videos') {
            return;
        }
        else {
            featuresModified.push(featureList);
        }
        // }
        // console.log('featuresModified', featuresModified)
        console.log('featuresModified', arr);
        //featuresModified和arr元素一一对应
        // for (let i = 0; i < arr.length; i++) {
        let src;
        //设置不同事件点图层的图标
        if (arr === "") {
            return;
        } else if (arr.features.length !== 0) {//如果geojson数据不为空
            if (arr.features[0].properties.glBridgeInFo !== undefined) {
                src = bridge_icon;
            } else if (arr.features[0].properties.eventInfo !== undefined) {
                const eventInfo = arr.features[0].properties.eventInfo;
                if (eventInfo.problemTypeName === '违规占道') {
                    src = IllegalEncroach_icon;
                } else if (eventInfo.problemTypeName === '违章搭建') {
                    src = IllegalBuilding_icon;
                } else if (eventInfo.problemTypeName === '侵占公路设施') {
                    src = Encroach_icon;
                } else if (eventInfo.problemTypeName === '非法营运') {
                    src = IllegalOperation_icon;
                } else if (eventInfo.problemTypeName === '超载超高') {
                    src = OverloadUltra_icon;
                } else if (eventInfo.problemTypeName === '路基塌陷') {
                    src = Embankment_icon;
                } else if (eventInfo.problemTypeName === '边坡坍塌') {
                    src = SlopeDamage_icon;
                } else if (eventInfo.problemTypeName === '挡墙坍塌') {
                    src = WallCollapse_icon;
                } else if (eventInfo.problemTypeName === '路肩杂草') {
                    src = ShoulderWeed_icon;
                } else if (eventInfo.problemTypeName === '路肩堆放杂物') {
                    src = PilesDebris_icon;
                } else if (eventInfo.problemTypeName === '边坡杂草') {
                    src = SlopeWeeds_icon;
                } else if (eventInfo.problemTypeName === '边坡落石') {
                    src = SlopeRockfall_icon;
                } else if (eventInfo.problemTypeName === '路面脏污') {
                    src = RoadDirt_icon;
                } else if (eventInfo.problemTypeName === '路面破损') {
                    src = PavementDamage_icon;
                } else if (eventInfo.problemTypeName === '路面堆放杂物') {
                    src = RoadDebris_icon;
                } else if (eventInfo.problemTypeName === '接缝填料缺失') {
                    src = MissingJoint_icon;
                } else if (eventInfo.problemTypeName === '附属设施损坏') {
                    src = AccessoryDamaged_icon;
                } else if (eventInfo.problemTypeName === '桥梁基础损坏') {
                    src = BridgeDamage_icon;
                } else if (eventInfo.problemTypeName === '桥梁下部结构损坏') {
                    src = BridgeUnderstructure_icon;
                } else if (eventInfo.problemTypeName === '桥梁冲毁') {
                    src = BridgeWashed_icon;
                }
                //  else if (eventInfo.problemTypeName === '衬砌裂缝') {//
                //     src = LiningCrack_icon;
                // } else if (eventInfo.problemTypeName === '衬砌漏水') {//
                //     src = LiningLeaking_icon;
                // } 
                else if (eventInfo.problemTypeName === '保险上报') {
                    src = TunnelDamaged_icon;
                } else if (eventInfo.problemTypeName === '排水堵塞') {
                    src = DrainPlug_icon;
                } else if (eventInfo.problemTypeName === '倒塌破损') {
                    src = CollapseDamage_icon;
                } else if (eventInfo.problemTypeName === '标志牌损坏') {
                    src = MarkDamage_icon;
                } else if (eventInfo.problemTypeName === '护栏损坏') {
                    src = BarrierDamage_icon;
                } else if (eventInfo.problemTypeName === '警示柱损坏') {
                    src = DamageColumn_icon;
                } else if (eventInfo.problemTypeName === '广角镜老化损坏') {
                    src = WideAngleDamaged_icon;
                } else if (eventInfo.problemTypeName === '标线脱落') {
                    src = LineLoss_icon;
                } else if (eventInfo.problemTypeName === '其他') {
                    src = OtherThing_icon;
                }
                else {
                    src = OtherThing_icon;//其他事件
                }
            }
        } else {
            src = OtherThing_icon;//空值图层也设置src，但是不会显示
        }

        let newLayer = new VectorLayer({
            source: new VectorSource({
                features: (new GeoJSON()).readFeatures(arr, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            }),
            zIndex: 1000,
            style:
                new Style({
                    image: new olIcon(({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        crossOrigin: 'anonymous',
                        src: src,
                    }))
                })
        })

        this.map.addLayer(newLayer)
        // }
    }


    sendAjax = async (a, callback, ftures, loc, index, arr) => {
        const { account } = this.props;

        let that = this;

        if (index >= ftures.length) {
            console.log('LayersToBeAdded-f', arr)

            //地图添加多个图层
            // this.addMapLayers(arr, ftures);
            return;//返回空值 
        }

        if ((ftures[index].length >= 4)) {
            if ((RegExp(/Road/).test(ftures[index]))) {//判断道路图层是否被选中
                if ((RegExp("^(350430)").test(this.props.regionId))) {
                    if (ftures[index] === 'nationalRoad') {
                        // let source = new VectorSource();
                        // source.addFeatures((new GeoJSON()).readFeatures(Groad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        // vectorLayer_Groad.setSource(source);
                        // this.map.addLayer(vectorLayer_Groad);
                    } else if (ftures[index] === 'countyRoad') {
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Xroad_jianning, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }));
                        vectorLayer_Xroad.setSource(source);
                        this.map.addLayer(vectorLayer_Xroad);
                    } else if (ftures[index] === 'countryRoad') {
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Yroad_jianning, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }));
                        vectorLayer_Yroad.setSource(source);
                        this.map.addLayer(vectorLayer_Yroad);
                    } else if (ftures[index] === 'villageRoad') {
                        let source = new VectorSource();
                        source.addFeatures((new GeoJSON()).readFeatures(Croad_jianning, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }));
                        vectorLayer_Croad.setSource(source);
                        this.map.addLayer(vectorLayer_Croad);
                    } else if (ftures[index] === 'provincialRoad') {
                        // let source = new VectorSource();
                        // source.addFeatures((new GeoJSON()).readFeatures(Sroad_shanghang,{dataProjection:'EPSG:4326',featureProjection: 'EPSG:3857'}));
                        // vectorLayer_Sroad.setSource(source);
                        // this.map.addLayer(vectorLayer_Sroad);
                    }
                }
                index++;
                that.sendAjax(ftures, loc, index, arr);

            } else if (ftures[index] === 'videos') {//显示视频点

                video_layer.setVisible(true);
                this.map.addLayer(video_layer);
                index++;
                that.sendAjax(a, callback, ftures, loc, index, arr);
            } else if (ftures[index] === 'bridge') {
                const result = await reqBridgeLonLat();
                if (result.msg === "请求成功") {
                    // console.log('herhehre')
                    const data = result.data;
                    arr.push(data);
                    callback(arr[arr.length - 1], ftures[index]);
                    index++;
                    that.sendAjax(a, callback, ftures, loc, index, arr);
                } else {
                    console.log(result.msg);
                }
            } else if (ftures[index] === 'manager') {
                const result = await reqManagerOnOff(account);
                if (result.msg === "请求成功") {
                    let managerTranData = gcoord.transform(result.data, gcoord.GCJ02, gcoord.WGS84);
                    let managerSource = new VectorSource({
                        features: (new GeoJSON()).readFeatures(managerTranData, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
                    })
                    manager_layer.setSource(managerSource);
                    that.map.addLayer(manager_layer);

                    index++;
                    that.sendAjax(a, callback, ftures, loc, index, arr);
                    that.interval = setInterval(async function () {
                        const result = await reqManagerOnOff(account);
                        if (result.msg === "请求成功") {
                            manager_layer.setSource(new VectorSource({
                                features: (new GeoJSON()).readFeatures(gcoord.transform(result.data, gcoord.GCJ02, gcoord.WGS84), { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
                            }));
                        } else {
                            console.log(result.msg);
                            clearInterval(that.interval);
                        }
                    }, 300000); //300000毫秒是5分钟
                } else {
                    console.log(result.msg)
                }
            }
            else if (ftures[index].slice(0, 2) === 'GG') {
                const result = await reqReportType(account, ftures[index]);
                if (result.msg === "请求成功") {
                    const data = gcoord.transform(result.data, gcoord.GCJ02, gcoord.WGS84);
                    arr.push(data);
                    console.log('LayersToBeAdded', arr);
                    callback(arr[arr.length - 1], ftures[index]);
                    index++;
                    that.sendAjax(a, callback, ftures, loc, index, arr);
                } else {
                    console.log(result.msg);
                }
            }//如果要加事件上报，把事件上报的key改成对应的problem_id,然后在else这里添加
            // else{
            //     index++;
            //     that.sendAjax(ftures,loc,index,arr);
            // } 
        } else {
            index++;
            that.sendAjax(a, callback, ftures, loc, index, arr);
        }

    }
    getJsonObject = () => {
        let LayersToBeAdded = [];
        let features = [];
        let index = 0

        //判断城市还是区县
        let loc;
        let cty = this.state.currentCity;
        let cnty = this.state.currentCounty;
        if (cnty === '' || cnty === '无') {
            loc = '&cityId=' + cty
        } else {
            loc = '&countryId=' + cnty
        }
        console.log(loc)

        features = this.state.currentFeatures;
        console.log('this.state.features;', this.state.currentFeatures)
        console.log('features:', features)

        if ((features.length !== 0) && (loc !== '')) {
            this.sendAjax(null, this.addMapLayers, features, loc, index, LayersToBeAdded);
        }

    }

    initMapClick = () => {
        if (this.state.collapsed == "none") {
            this.map.getView().animate({
                center: fromLonLat(centCoor),
                zoom: mapZoom,
                duration: 500
            });
        } else if (this.state.collapsed == "block") {
            this.map.getView().animate({
                center: fromLonLat([centCoor[0] + 0.1, centCoor[1]]),
                zoom: mapZoom,
                duration: 500
            });
        }


    }

    //处理流程
    renderTimelineItems = (data) => {
        let timeline = [];
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            if (i === data.length - 1) {
                timeline.push(
                    <Timeline.Item color="red">
                        <span id='progressTime' style={{ color: 'black' }}>{data[i].acceptTime}</span>
                        <span id='progressStatus' style={{ color: 'red' }}>{data[i].logStatusName}</span>
                        <br />
                        <p style={{ color: 'black' }}>处理人：{data[i].realName}</p>
                    </Timeline.Item>
                )
            } else {
                timeline.push(
                    <Timeline.Item color="blue">
                        <span id='progressTime' style={{ color: 'black' }}>{data[i].acceptTime}</span>
                        <span id='progressStatus' style={{ color: 'black' }}>{data[i].logStatusName}</span>
                        <br />
                        <p style={{ color: 'black' }}>处理人：{data[i].realName}</p>
                    </Timeline.Item>
                )
            }


        }
        return timeline;
    }

    renderSteps = (data) => {
        return data.map((item) =>
            <Step key={item.taskId}
                title={<span><span id='progressTime'>{item.acceptTime}</span>
                    &nbsp;&nbsp;
                       <span id='progressStatus'>{item.logStatusName}</span></span>}
                description={<p>处理人：{item.realName}</p>} />

        )
    }

    //增加测距功能
    addMeasure = () => {
        let that = this;
        //测距
        const sourceMeasure = new VectorSource();
        var layer = new VectorLayer({
            title: 'Measure',
            source: sourceMeasure,
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
            zIndex: '3030',
        });
        that.map.addLayer(layer);

        function deletDiv() {
            var allOverlay = that.map.getOverlays();
            var arrlen = allOverlay.getArray()
            for (var i = 0; i < arrlen.length; i++) {   //删除测量提示框和帮助提示框
                var layername = arrlen[i].options.title
                if (layername === 'overlayname' || layername === 'helpTool') {
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
        var typed = typeSelect.value;
        //定义一个交互式绘图对象
        var draw;
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
                title: 'helpTool',
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
                title: 'overlayname',
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
            if (typeSelect.value === '无') {
                sourceMeasure.clear();
                for (var i = 0; i < 7; i++) {
                    deletDiv();
                }

            } else {
                addInteraction();
            }
        };

        if (typed === "无") {
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
        clear.addEventListener('click', function () {
            // that.map.removeOverlay(popup);
            sourceMeasure.clear();
            for (var i = 0; i < 7; i++) {
                deletDiv();
            }

            that.map.removeInteraction(draw);
            that.map.removeEventListener('singleclick');

            typeSelect.value = "无"
        });
    }
    //增加属性弹出框
    addPopup = () => {
        //点击空的地方不会消失，必须点击“X”才会消失
        var element = document.getElementById('popupcommon');
        var info = document.getElementById('popupcommon-info');
        var title = document.getElementById('popupcommon-title');
        var content = document.getElementById('popupcommon-content');
        var progress = document.getElementById('popupcommon-progress');
        var closer = document.getElementById('popupcommon-closer');

        var startP = document.getElementById('startPoint');
        var endP = document.getElementById('endPoint');

        var popup = new Overlay({
            title: 'popup',
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -60],
            autoPan: true,
            autoPanAnimation: 250
        });
        var startPopup = new Overlay({
            title: 'popup',
            element: startP,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -7],
            autoPan: true,
            autoPanAnimation: 250
        })
        var endPopup = new Overlay({
            title: 'popup',
            element: endP,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -7],
            autoPan: true,
            autoPanAnimation: 250
        })

        let that = this;
        this.map.on('click', async function (e) {
            that.map.addOverlay(popup);
            that.map.addOverlay(startPopup);
            that.map.addOverlay(endPopup);
            let feature = that.map.forEachFeatureAtPixel(e.pixel,
                function (feature) {
                    return feature;
                })
            console.log('feature', feature);
            if (feature !== undefined) {
                //let coordinates = feature.getGeometry().getCoordinates();
                let coordinate = e.coordinate;
                let startCoor = [];
                let endCoor = [];

                let featureType = feature.getGeometry().getType();

                if (featureType == 'Point') {
                    if (feature.get('user_type') === '路管员') {
                        const Info = feature.get('Info');
                        const { usrname, account, saddress, nlongitude, nlatitude } = Info;
                        title.innerHTML = '<h3><b>路管员信息</b></h3>';
                        if (Info.state === "1") {
                            content.innerHTML = `<div><p>名称：${usrname}</p><p>电话：${account}</p><p>状态：在线</p><p>当前位置：${saddress}</p>
                            <p>当前位置经度：${nlongitude}E</p> 
                            <p>当前位置纬度：${nlatitude}N</p></div>`;
                        } else if (Info.state === "0") {
                            content.innerHTML = `<div><p>名称：${usrname}</p><p>电话：${account}</p><p>状态：不在线</p><p>最后位置：${saddress}</p>
                            <p>最后位置经度：${nlongitude}E</p> 
                            <p>最后位置纬度：${nlatitude}N</p></div>`;
                        }

                        info.style.minWidth = '280px';
                        info.style.padding = '8px';
                        progress.style.display = 'none';
                        content.style.width = '100%';
                        popup.setPosition(coordinate);
                    } else if (feature.get('name') === 'video') {
                        let videoUrls;
                        if (feature.get('id') === '1') {
                            videoUrls = videoUrl + 'VID00080.MP4';
                        } else if (feature.get('id') === '2') {
                            videoUrls = videoUrl + 'VID00081.MP4';
                        } else if (feature.get('id') === '3') {
                            videoUrls = videoUrl + 'VID00082.MP4';
                        }
                        let videoText = `<video height='200' controls autoplay>
                                            <source src=${videoUrls} type="video/mp4">
                                            您的浏览器不支持该视频格式或视频不存在
                                        </video>`

                        title.innerHTML = '<h3><b>巡路视频点</b></h3>';
                        content.innerHTML = `<div><p>路线名称：${feature.get('LXMC')}</p><p>路段编码：${feature.get('LDBM')}</p>
                        <p>当前位置经度：${feature.get('longitude')}E</p> 
                        <p>当前位置纬度：${feature.get('latitude')}N</p></div>` + videoText;
                        // popup.setPosition(coordinate);
                        info.style.minWidth = '280px';
                        info.style.padding = '8px';
                        progress.style.display = 'none';
                        content.style.width = '100%';
                        popup.setPosition(coordinate);
                    }
                    else if (feature.get('eventInfo') !== undefined) {  //事件上报
                        const eventInfo = feature.get('eventInfo');
                        const { problemTypeName, usrname, eventContent, smileageoffset, eventPoint, address, rectification, eventFileList } = eventInfo;
                        const lonlat = eventPoint.split(",");
                        console.log(lonlat);
                        //图片加载

                        var picsUrl = eventFileList.ssmallsavefilepath;
                        // var UrlLOC=picUrl+picsUrl;
                        var test = document.getElementById("pics").innerHTML = "<img src=" + picUrl + picsUrl + " alt='未上传图片' width='160px' height='160px'>"

                        title.innerHTML = '<h3><b>事件信息</b></h3>'
                        content.innerHTML = '<p>上报事件类型：' + problemTypeName + '</p>'
                            + '<p>上报人：' + usrname + '</p>'
                            + '<p>上报内容：' + eventContent + '</p>'
                            + '<p>位置桩号：' + smileageoffset + '</p>'
                            + '<p>经度：' + lonlat[0] + '</p>'
                            + '<p>纬度：' + lonlat[1] + '</p>'
                            + '<p>地址：' + address + '</p>'
                            + '<p>情况反映：' + rectification + '</p>'
                            + '<p>图片：' + test + '</p>';

                        info.style.minWidth = '520px';
                        info.style.padding = '8px';
                        progress.style.display = 'inline-block';
                        content.style.width = '50%';
                        progress.style.width = '50%';

                        if (feature.get('workflowloglist') !== null) {
                            that.setState({
                                progress: feature.get('workflowloglist'),
                                reportType: 'eventReport'
                            })
                        }
                        // else if(feature.get('maintenanceworkflowLog')!==null){
                        //     that.setState({
                        //         progress:feature.get('maintenanceworkflowLog'),
                        //         reportType:'maintenance'
                        //     })
                        // }
                        popup.setPosition(coordinate);
                    } else if (feature.get('glBridgeInFo') === undefined) {//清除测距功能时点击出现的弹框
                        popup.setPosition(undefined);
                    }
                    else { //桥梁
                        const glBridgeInFo = feature.get('glBridgeInFo');
                        const { sname, sbridgecode } = glBridgeInFo;
                        title.innerHTML = '<h3><b>地物信息</b></h3>';
                        content.innerHTML = `<div><p>名称：${sname}</p><p>编码：${sbridgecode}</p></div>`;

                        info.style.minWidth = '280px';
                        info.style.padding = '8px';
                        progress.style.display = 'none';
                        content.style.width = '100%';
                        popup.setPosition(coordinate);
                    }
                    startPopup.setPosition(undefined);
                    endPopup.setPosition(undefined);
                } else if (featureType == 'LineString') {
                    if (feature.get('keyno') === undefined) {//清除测距功能时点击出现的弹框
                        popup.setPosition(undefined);
                        startPopup.setPosition(undefined);
                        endPopup.setPosition(undefined);
                    }
                    else {
                        title.innerHTML = '<h3><b>道路信息</b></h3>';
                        const keyno = feature.get('keyno');
                        const result = await reqRoadtailForm(keyno);

                        info.style.minWidth = '280px';
                        info.style.padding = '8px';
                        progress.style.display = 'none';
                        content.style.width = '100%';

                        // console.log('keyno', result);
                        if (result.msg === "请求成功") {
                            const roadAttr = result.data;
                            let roadname = roadAttr.sshortname === null ? 'loading' : roadAttr.sshortname;
                            let roadcode = roadAttr.slwtzqlxcode === null ? 'loading' : roadAttr.slwtzqlxcode;
                            let QDZH = roadAttr.sbeginpoint === null ? 'loading' : roadAttr.sbeginpoint;
                            let ZDZH = roadAttr.sendpoint === null ? 'loading' : roadAttr.sendpoint;
                            let length = roadAttr.smileage === null ? 'loading' : roadAttr.smileage;
                            let width = roadAttr.sbasewidth === null ? 'loading' : roadAttr.sbasewidth;
                            let startName = roadAttr.sbeginname === null ? 'loading' : roadAttr.sbeginname;
                            let endName = roadAttr.sendname === null ? 'loading' : roadAttr.sendname;
                            let phone = roadAttr.sofficeraccount === null ? 'loading' : roadAttr.sofficeraccount;
                            let username = '' //
                            //根据专管员账户account查询路管员信息
                            if (phone === null) {
                                username = 'loading'
                            } else {
                                const resultM = await reqglUserTypeList(phone);
                                // console.log('resultM!!!!!!!!!',resultM);
                                if (resultM.msg === "请求成功" && resultM.data !== null) {
                                    username = resultM.data.usrname;
                                } else {
                                    username = 'loading'
                                }
                            }

                            const { sbeginlongitude, sbeginlatitude, sendlongitude, sendlatitude } = roadAttr;

                            let qdMeter = Math.round((parseFloat(QDZH) - Math.floor(QDZH)) * 1000);
                            let zdMeter = Math.round((parseFloat(ZDZH) - Math.floor(ZDZH)) * 1000);

                            content.innerHTML = `<div><p>路线名称：${roadname}</p><p>路段编码：${roadcode}</p><p>路管员：${username}</p><p>电话号码：${phone}</p><p>起点桩号：K${Math.floor(QDZH)}+${qdMeter}</p><p>止点桩号：K${Math.floor(ZDZH)}+${zdMeter}</p><p>路长：${length}(公里)</p><p>路宽：${width}(米)</p><p>起始点名称：${startName}</p><p>终止点名称：${endName}</p></div>`;

                            startP.innerHTML = `K${Math.floor(QDZH)}+${qdMeter}`;
                            endP.innerHTML = `K${Math.floor(ZDZH)}+${zdMeter}`;

                            startCoor[0] = parseFloat(sbeginlongitude);
                            startCoor[1] = parseFloat(sbeginlatitude);
                            endCoor[0] = parseFloat(sendlongitude);
                            endCoor[1] = parseFloat(sendlatitude);

                            popup.setPosition(coordinate);
                            startPopup.setPosition(fromLonLat(startCoor));
                            endPopup.setPosition(fromLonLat(endCoor));
                        }
                    }
                }
            }
        })

        closer.onclick = function () {
            popup.setPosition(undefined);
            startPopup.setPosition(undefined);
            endPopup.setPosition(undefined);
            closer.blur();
            return false;
        }

        var selectClick = new Select({
            condition: pointerMove,
        });

        this.map.addInteraction(selectClick);
    }


    componentDidMount() {

        $('#vecLayer').trigger('click');
        this.map.setTarget("basemap");

        let that = this;

        this.map.getView().setCenter(fromLonLat(centCoor));
        this.map.getView().setZoom(mapZoom);

        //添加边界
        let source = new VectorSource();
        source.addFeatures((new GeoJSON()).readFeatures(border_jianning, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }));
        vectorLayer_border.setSource(source);
        that.map.addLayer(vectorLayer_border);

        this.addPopup();  //添加弹出框
        this.addMeasure(); //添加测距功能
    }

    componentDidUpdate() {

        if (mapZoom !== null & centCoor !== []) {
            //动态获取图层

            //删除除了底图，注记以及边界的已有图层
            var currentLayers = this.map.getLayers().getArray()
            console.log('current layers:', currentLayers.length)

            for (let j = currentLayers.length - 1; j >= 0; j--) {
                console.log('current layer titles:', currentLayers[j].values_.title);
                if (currentLayers[j].values_.title !== undefined) {
                    if ((RegExp(/tian_di_tu/).test(currentLayers[j].values_.title)) || (RegExp(/Measure/).test(currentLayers[j].values_.title)) || (RegExp(/border/).test(currentLayers[j].values_.title))) {

                        //保留底图，注记以及边界 以及测量图层
                        continue;

                    } else {

                        //删除道路图层以及视频点图层
                        this.map.removeLayer(currentLayers[j]);
                    }
                } else {

                    //删除除道以及视频点以外的图层
                    this.map.removeLayer(currentLayers[j]);
                }
            }
            clearInterval(this.interval);
            this.interval = null;


            //地图添加多个图层
            this.getJsonObject();
            // this.onChangeroad();
        }

    }


    render() {
        let Groad = true;
        let Sroad = true;
        let Xroad = true;
        let Yroad = true;
        let Croad = true;

        const { token } = this.props;
        if (this.props.regionId === '350800000000') {//龙岩 
        } else if ((RegExp("^(350430)").test(this.props.regionId))) {//建宁
            Groad = false;
            Sroad = false;
        } else if ((RegExp("^(350582)").test(this.props.regionId))) {//晋江
            Sroad = false;
        } else if ((RegExp("^(350982)").test(this.props.regionId))) {//福鼎
            Sroad = false;
        } else if ((RegExp("^(350627)").test(this.props.regionId))) {//南靖
        } else if ((RegExp("^(350625)").test(this.props.regionId))) {//长泰
        }


        return (
            <div id='mapWithNav'>
                {/* style={{margin: '-35px'}}  */}
                {/* {nav_Choice} */}
                <MapNav collapse={this.state.collapsed} right={this.state.navRight} changeFeatures={this.changeFeatures} changeLocation={this.changeLocation} changeCity={this.changeCity} changeCounty={this.changeCounty} handleChangeRoad={this.handleChangeRoad} handleChangeTimer={this.handleChangeTimer} Groad={Groad} Sroad={Sroad} Xroad={Xroad} Yroad={Yroad} Croad={Croad} cityOrCounty='county' token={token} />

                <div style={{ marginLeft: '0.6em', float: 'left', marginTop: '5em', zIndex: '9', position: 'absolute', height: '1.8em', width: '1.8em' }}>
                    <img src={earth} alt='reset' /* height='22' width='22' */ onClick={this.initMapClick} style={{ height: '100%', width: '100%' }} />
                </div>


                <span className='baseMapButton' style={{ marginLeft: '5em', marginTop: '.8em', float: 'left', zIndex: '9' }}>
                    <Button id="vecLayer" type="button" onClick={this.vecLayerClick} style={{ position: 'absolute', zIndex: '10' }}>
                        平面图
                    </Button>
                    <Button id="imgLayer" type="button" onClick={this.imgLayerClick} style={{ position: 'absolute', zIndex: '10', left: 'calc(220px + 5em + 74px' }}>
                        影像图
                    </Button>
                    {/* <Button id="butLayer" type="button" onClick={() => this.setState({showModals:true})} style={{position:'absolute',zIndex:'10',top:'150px'}}>
                        获取经纬度
                    </Button> */}
                    <span id='orignalOP'>

                        <span style={{ display: 'inline-block', height: '25px',/* lineHeight:'25px', */borderRadius: '3px', border: '1px solid rgb(246,112,42)', backgroundColor: 'rgb(246,112,42)', opacity: '0.8', color: 'white', textAlign: 'center', fontSize: '14px' }}>&nbsp;&nbsp;测距&nbsp;&nbsp;</span>

                        <select id="types" style={{ height: '25px', borderRadius: '3px', textAlign: 'center', fontSize: '14px', opacity: '0.8', verticalAlign: 'top' }}>
                            <option value="无">选择类型</option>
                            <option value="length">长度</option>
                            <option value="area">面积</option>
                        </select>

                        <a id="clear" style={{ height: '25px', borderRadius: '3px', float: 'right', textAlign: 'center', fontSize: '14px', border: '1px solid rgb(246,112,42)', backgroundColor: 'rgb(246,112,42)', opacity: '0.8', color: 'white' }}>&nbsp;&nbsp;一键清除&nbsp;&nbsp;</a>

                    </span>
                </span>

                <div className='baseMapButton'>
                    {/* <Draggable> */}
                    <Button id="navButton" type="button" onClick={this.handleClick} style={{ right: this.state.buttonRight }}>
                        图层控制<Icon type={this.state.IconName} theme="outlined" />
                    </Button>
                    {/* </Draggable> */}
                </div>

                <div id="basemap" className='basemap'></div>

                <div id="popupcommon" className="popupcommon" style={{ zIndex: '4000' }}>
                    <div id="popupcommon-title" ></div>
                    <a href="javascript:void(0)" id="popupcommon-closer" >✖</a>
                    <div id="popupcommon-info">
                        <div id="popupcommon-content" style={{ width: "50%", height: '100%', float: 'left', display: 'inline-block' }}></div>
                        <div id='popupcommon-progress' style={{ width: "50%", height: '100%', float: 'left', display: 'inline-block' }}>
                            <p>处理进度:</p>
                            <Steps direction="vertical" size='small' current={this.state.progress.length - 1}>
                                {this.renderSteps(this.state.progress)}
                            </Steps>
                        </div>
                    </div>
                </div>

                <div id="startPoint"></div>
                <div id="endPoint"></div>
                <div id="pics" style={{ display: "none" }}></div>

            </div>

        )
    }
}

export default BaseMapCounty;