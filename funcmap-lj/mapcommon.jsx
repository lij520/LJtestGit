import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import { defaults, ScaleLine, OverviewMap } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import VectorSource from 'ol/source/Vector';
import { Style, Stroke, Icon as olIcon } from 'ol/style';
import { Select as olSelect } from 'ol/interaction';
import { pointerMove } from 'ol/events/condition';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import $ from 'jquery';
import gcoord from 'gcoord';
import bridge_icon from './icons/bridge.png';//引入桥梁图标
import landmark_icon from './icons/landmark.png';//引入路标图标
import scenery_icon from './icons/tourist.png'//引入景点图标
import road from './icons/3.png'; //引入弹出框道路图标
import roadmark_icon from './icons/road.png'; //引入路段图标

//引入antd组件
import { Table, Select, Spin, message } from 'antd';
//引入接口
import { reqAllRoadData, requniqRoadData, reqBridgeLonLat, reqSceneryLonLat, reqRoadMarkLonlat } from '../../../ajax-lj/index.jsx';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const userAera = _mm.getStorage('user');
const { Option } = Select;

const tian_di_tu_road_layer = new TileLayer({
    title: "tian_di_tu_road_layer",
    source: new XYZ({
        url: 'http://t' + Math.round(Math.random() * 7) + '.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible: true
});

const tian_di_tu_annotation = new TileLayer({
    title: "tian_di_tu_annotation",
    source: new XYZ({
        url: 'http://t' + Math.round(Math.random() * 7) + '.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6a6808a7890958ff8df61d2c49323015'
    }),
    visible: true,
    zIndex: 999
});

var element, title, content, closer;

//道路图层
const RoadLayer = new VectorLayer({
    source: new VectorSource({}),
    title: 'Groad',
    style: new Style({
        stroke: new Stroke({
            color: 'red',
            width: 4
        })
    }),
    visible: true,
    zIndex: 55
});

//道路路段图标
var styles = {
    'icon': new Style({
        image: new olIcon({
            anchor: [0.5, 1],
            src: roadmark_icon
        })
    }),
}

//路标点图层
const vectorLayer_landmark = new VectorLayer({
    title: 'landmark',
    source: new VectorSource(),
    style: new Style({
        image: new olIcon(({
            anchor: [0.5, 0.5],
            src: landmark_icon,
        }))
    }),
    visible: true,
    zIndex: 51
});

//桥梁点图层
const vectorLayer_bridge = new VectorLayer({
    title: 'bridge',
    source: new VectorSource(),
    style: new Style({
        image: new olIcon(({
            anchor: [0.5, 0.5],
            src: bridge_icon,
        }))
    }),
    visible: true,
    zIndex: 51
});

//景点图层
const vectorLayer_scenery = new VectorLayer({
    title: 'bridge',
    source: new VectorSource(),
    style: new Style({
        image: new olIcon(({
            anchor: [0.5, 0.5],
            src: scenery_icon,
        }))
    }),
    visible: true,
    zIndex: 51
});


class MapCommon extends Component {

    constructor(props) {
        super(props);
        var keyno;
        if (this.props.location.pathname === '/detailroad') {
            keyno = this.props.selectRow.keyno;
        } else {
            keyno = ''
        }
        this.state = {
            lonlat: [],
            columns: [],
            dataSource: [],
            popups: 'ol-popups',
            spinning: false,// 加载中
            selectKeyno: keyno,
            selectRowhere: this.props.selectRow,
            suserkeyno2: this.props.suserkeyno2,//乡路长
            suserkeyno: this.props.suserkeyno,//村路长
            sofficeraccount: this.props.sofficeraccount,//专管员
            flag: this.props.flag,//双击出现弹出框
        }
    }

    //初始化地图
    initMap = () => {
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
            layers:
                [
                    tian_di_tu_road_layer,
                    tian_di_tu_annotation,
                ],
            view: new View({
                center: fromLonLat([116.82, 26.82]),//福建省
                zoom: 10.5
            })
        });
    }

    //发送ajax请求获取道路数据（总道路数据和定位某段道路数据）
    sendRoadAjax = async (region_id, keyno) => {
        // console.log('region_id,keyno,hrhehr!!!!', region_id, keyno);
        if (keyno !== undefined) {
            const result = await requniqRoadData(keyno);
            if (result.msg === "请求成功") {
                const geometrys = result.data.features;
                const coordinate = gcoord.transform(geometrys[0].geometry.coordinates[0], gcoord.BD09, gcoord.WGS84);
                // console.log('geometrys', coordinate)
                this.map.getView().setCenter(fromLonLat([coordinate[0], coordinate[1] - 0.002]));
                this.map.getView().setZoom(15.5);
                var roadMarker = new Feature({
                    type: 'icon',
                    geometry: new Point(fromLonLat(coordinate))
                });
                var markerLayer = new VectorLayer({
                    title: "道路标识",
                    source: new VectorSource({
                        features: [roadMarker]
                    }),
                    style: function (feature) {
                        return styles[feature.get('type')];
                    },
                    zIndex: '2030'
                });

                //删除已有道路图标图层
                var currentLayers = this.map.getLayers().getArray();
                for (let i = 0; i < currentLayers.length; i++) {
                    if (currentLayers[i].values_.title === '道路标识') {
                        this.map.removeLayer(currentLayers[i]);
                    }
                }
                this.map.addLayer(markerLayer);
                this.setState({ spinning: false })
            } else {
                console.log(result.msg);
            }
        } else {
            const result = await reqAllRoadData(region_id);
            if (result.msg === "请求成功") {
                let roadSource = new VectorSource({
                    features: (new GeoJSON()).readFeatures(gcoord.transform(result.data, gcoord.BD09, gcoord.WGS84), { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
                })
                RoadLayer.setSource(roadSource);
                this.map.addLayer(RoadLayer);
                this.setState({ spinning: false })
            } else {
                console.log(result.msg)
            }
        }
    }
    //添加道路图层和道路路标
    addRoadLayer = () => {
        const { userRegion_id } = this.props;
        const { selectKeyno } = this.state;
        // console.log('userRegion_id', userRegion_id, selectKeyno);

        this.setState({
            spinning: true
        });
        this.sendRoadAjax(userRegion_id, selectKeyno);
    }

    //添加桥梁图层
    addBridgeLayer = async () => {
        this.setState({
            spinning: true
        });
        const result = await reqBridgeLonLat();
        // console.log('result', result);
        if (result.msg === "请求成功") {
            let bridgeSource = new VectorSource({
                features: (new GeoJSON()).readFeatures(result.data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            })
            vectorLayer_bridge.setSource(bridgeSource);
            this.map.addLayer(vectorLayer_bridge);
            this.setState({ spinning: false });
            this.SetZoomCenter();
        } else {
            console.log(result.msg)
        }
    }

    //设置桥梁/路标/景点中心点
    SetZoomCenter = () => {
        const { selectRowhere } = this.state;
        let geometrys = [];
        geometrys[0] = parseFloat(selectRowhere.nlongitude);
        geometrys[1] = parseFloat(selectRowhere.nlatitude);
        // console.log('geometrys', geometrys)
        this.map.getView().setCenter(fromLonLat([geometrys[0], geometrys[1] - 0.002]));
        this.map.getView().setZoom(15.5);
    }

    //添加景点图层
    addSceneryLayer = async () => {
        this.setState({
            spinning: true
        });
        const result = await reqSceneryLonLat();
        if (result.msg === "请求成功") {
            let scenerySource = new VectorSource({
                features: (new GeoJSON()).readFeatures(result.data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            })
            vectorLayer_scenery.setSource(scenerySource);
            this.map.addLayer(vectorLayer_scenery);
            this.setState({ spinning: false });
            this.SetZoomCenter();
        } else {
            console.log(result.msg)
        }
    }

    //添加路标图层
    addRoadMarkLayer = async () => {
        this.setState({
            spinning: true
        });
        const result = await reqRoadMarkLonlat();
        if (result.msg === "请求成功") {
            let roadmarkSource = new VectorSource({
                features: (new GeoJSON()).readFeatures(result.data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            })
            vectorLayer_landmark.setSource(roadmarkSource);
            this.map.addLayer(vectorLayer_landmark);
            this.setState({ spinning: false });
            this.SetZoomCenter();
        } else {
            console.log(result.msg)
        }
    }
    //添加图层
    addLayers = () => {
        const location = this.props.location.pathname;
        console.log('locationhere!!!!', location);
        if (location === '/detailroad') {  //添加路段图层
            this.addRoadLayer();  //添加道路图层
            this.addOverlayRoadDetail();  //添加显示框
        } else if (location === '/landmarks') {  //添加路标图层
            this.addRoadMarkLayer();
            //设置不同的样式
            this.setState({
                popups: 'unpopups'
            });
        } else if (location === '/bridges') {  //添加桥梁图层
            this.addBridgeLayer();
            //设置不同的样式
            this.setState({
                popups: 'unpopups'
            });
        } else if (location === '/scenery') { //景点图层
            this.addSceneryLayer();
            //设置不同的样式
            this.setState({
                popups: 'unpopups'
            });
        }
    }

    //添加道路路段显示框
    addOverlayRoadDetail = () => {

        const { selectRowhere, suserkeyno, suserkeyno2, sofficeraccount } = this.state;
        // console.log('suserkeyno,suserkeyno2,sofficeraccount',suserkeyno,suserkeyno2,sofficeraccount);

        var pop_container = document.getElementById('popups');
        var pop_closer = document.getElementById('popups-closer');

        pop_container.style.display = "inline-block";

        let xroader = [], croader = [], managers = [], mobile;
        suserkeyno.map((item, index) => xroader[index] = item.usrname);
        suserkeyno2.map((item, index) => croader[index] = item.usrname);
        sofficeraccount.map((item, index) => managers[index] = item.usrname);
        mobile = sofficeraccount.length === 0 ? '' : sofficeraccount[0].mobile;

        pop_closer.onclick = function () {
            pop_container.style.display = 'none';
            pop_closer.blur();
            return false;
        };

        const columns = [
            {
                title: 'attribute',
                dataIndex: 'attribute',
                key: 'attribute',
                width: '45%'
            },
            {
                title: 'value',
                dataIndex: 'value',
                key: 'value',
                width: '55%',
                render: (value) => {
                    return value instanceof Array ? (<Select style={{ width: 120 }} defaultValue={value[0]} /* size='small' */ allowClear>{value.map((item, index) => (<Option key={index} value={item}>{item}</Option>))}</Select>) : value
                }
            },
        ];

        const dataSource = [
            {
                key: '1',
                attribute: '路段名称',
                value: selectRowhere.sshortname,
            },
            {
                key: '2',
                attribute: '监管部门',
                value: selectRowhere.supervisearea,
            },
            {
                key: '3',
                attribute: '监管部门电话',
                value: '',
            },
            {
                key: '4',
                attribute: '管养单位',
                value: selectRowhere.smtcorptype,
            },
            {
                key: '5',
                attribute: '乡路长',
                value: xroader.length === 0 ? selectRowhere.suserkeyno2 : xroader,
            },
            {
                key: '6',
                attribute: '村路长',
                value: croader.length === 0 ? selectRowhere.suserkeyno : croader,
            },
            {
                key: '7',
                attribute: '乡村专管员',
                value: managers.length === 0 ? selectRowhere.sofficeraccount : managers,
            },
            {
                key: '8',
                attribute: '乡村专管员电话',
                value: mobile,
            },
        ];

        this.setState({
            columns,
            dataSource
        })
    }

    //弹出框图层
    addPopup = () => {

        const { flag, selectRowhere } = this.state;
        let that = this;
        // var element = document.getElementById('popupS');
        // var title = document.getElementById('popupS-title');
        // var content = document.getElementById('popupS-content');
        // var closer = document.getElementById('popupS-closer');
        // console.log('element,title,content,colser', element, title, content, closer);

        var popup = new Overlay({
            title: 'popup',
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -30],
            autoPan: true,
            autoPanAnimation: { duration: 250 }
        });

        if (flag === 1) {
            const pathname = that.props.location.pathname;
            that.map.addOverlay(popup);
            let geometrys = [];
            geometrys[0] = parseFloat(selectRowhere.nlongitude);
            geometrys[1] = parseFloat(selectRowhere.nlatitude);

            if (that.props.location.pathname === '/landmarks') {
                title.innerHTML = '<h3><b>路标信息</b></h3>';
                content.innerHTML = `<div><p>路标名称：${selectRowhere.sname}</p></div>`;
            }
            else {
                title.innerHTML = pathname === '/bridges' ? '<h3><b>桥梁信息</b></h3>' : '<h3><b>景点信息</b></h3>';
                content.innerHTML = pathname === '/bridges' ? `<div><p>名称：${selectRowhere.sname}</p><p>桥梁编码：${selectRowhere.sbridgecode}</p><p>所属路线名称：${selectRowhere.lxmc}</p></div>` : `<div><p>景点名称：${selectRowhere.sname}</p></div>`;
            }
            popup.setPosition(fromLonLat([geometrys[0], geometrys[1] + 0.0001]));
            // console.log('herhe!!!!!!!!!!!!!!!!!!!!', flag, geometrys);
        } else {
            this.map.on('click', function (e) {
                that.map.addOverlay(popup);
                let feature = that.map.forEachFeatureAtPixel(e.pixel,
                    function (feature) {
                        return feature;
                    })
                console.log('features!!!!!!!!!hehwhrwhr', feature)
                if (feature !== undefined) {
                    let coordinate = e.coordinate;
                    let featureType = feature.getGeometry().getType();

                    if (featureType === 'Point') {
                        console.log('this.location', that.props.location.pathname)
                        if (that.props.location.pathname === '/detailroad') {
                            popup.setPosition(undefined);
                        } else if (that.props.location.pathname === '/bridges') {
                            const glBridgeInFo = feature.get('glBridgeInFo');
                            console.log('flag=====0', flag, coordinate);
                            title.innerHTML = '<h3><b>桥梁信息</b></h3>';
                            content.innerHTML = `<div><p>名称：${glBridgeInFo.sname}</p><p>桥梁编码：${glBridgeInFo.sbridgecode}</p><p>所属路线名称：${glBridgeInFo.lxmc}</p></div>`;

                            popup.setPosition(coordinate);
                        } else if (that.props.location.pathname === '/scenery') {
                            const glViewSpotInFo = feature.get('glViewSpotInFo');
                            // console.log('flag=====0', flag, coordinate);
                            title.innerHTML = '<h3><b>景点信息</b></h3>';
                            content.innerHTML = `<div><p>景点名称：${glViewSpotInFo.sname}</p></div>`;

                            popup.setPosition(coordinate);
                        } else if (that.props.location.pathname === '/landmarks') {
                            const glFacilitiesInFo = feature.get('glFacilitiesInFo');
                            // console.log('flag=====0', flag, coordinate);
                            title.innerHTML = '<h3><b>路标信息</b></h3>';
                            content.innerHTML = `<div><p>路标名称：${glFacilitiesInFo.sname}</p></div>`;

                            popup.setPosition(coordinate);
                        } else {
                            title.innerHTML = '<h3><b>信息</b></h3>';
                            content.innerHTML = `<div><p>名称：${feature.get('sname')}</p><p>编码：${feature.get('sbridgecode')}</p></div>`;
                            popup.setPosition(coordinate);
                        }

                    }
                    else if (featureType === 'LineString') {
                        title.innerHTML = '<h3><b>道路信息</b></h3>';
                        content.innerHTML = `<div><p>道路编码：${feature.get('keyno')}</p></div>`;
                        popup.setPosition(coordinate);
                    }
                }
            });
        }

        closer.onclick = function () {
            popup.setPosition(undefined);
            closer.blur();
            return false;
        }

        var selectClick = new olSelect({
            condition: pointerMove,
        });

        this.map.addInteraction(selectClick);
    }


    componentWillMount() {
        // console.log('hrehrhehreh')
        this.initMap();
    }

    componentDidMount() {
        element = document.getElementById('popupS');
        title = document.getElementById('popupS-title');
        content = document.getElementById('popupS-content');
        closer = document.getElementById('popupS-closer');

        this.map.setTarget("generalMap");
        this.addLayers();
        this.addPopup();
    }



    //根据新传入的keyno来更新selectKeyno状态
    componentWillReceiveProps(nextProps) {  //组件接收新的属性时更新
        // console.log('componentWillReceiveProps', nextProps);
        if (this.props.location.pathname === '/detailroad') {
            const selectKeyno = nextProps.selectRow.keyno,
                selectRowhere = nextProps.selectRow,
                suserkeyno = nextProps.suserkeyno,
                suserkeyno2 = nextProps.suserkeyno2,
                sofficeraccount = nextProps.sofficeraccount;
            // console.log('selectKeyno!!!!!!!!!!!!!',selectKeyno);
            this.setState({
                selectKeyno,
                selectRowhere,
                suserkeyno,
                suserkeyno2,
                sofficeraccount
            }, () => {
                if (selectKeyno !== undefined) {
                    this.addLayers();
                }
            })

        } else if (this.props.location.pathname === '/bridges' || this.props.location.pathname === '/scenery' || this.props.location.pathname === '/landmarks') {
            const selectRowhere = nextProps.selectRow,
                flag = nextProps.flag;
            this.setState({
                selectRowhere,
                flag
            }, () => {
                // this.SetZoomCenter();//前后顺序会有影响
                if (selectRowhere.keyno === undefined) {
                    this.map.getView().setCenter(fromLonLat([116.82, 26.82]));
                    this.map.getView().setZoom(10.5);
                } else {
                    if (this.state.flag === 1) {
                        this.addPopup();
                    }
                    this.SetZoomCenter();
                }
            })
        }
    }

    render() {
        const { columns, dataSource, spinning, selectRowhere } = this.state;
        var roadname;
        if (this.props.location.pathname === '/detailroad') {
            roadname = selectRowhere.sshortname + '(' + selectRowhere.sroadcode + ')';
        }

        return (
            <div>
                <div id="generalMap" className='generalMap' style={{ position: 'absolute', width: '83%'}}></div>
 				<div id="generalMap" className='generalMap' style={{ position: 'absolute', width: 'calc(100% - 260px)', height: 'calc(100% - 130px)' }}></div>                <div id="popupS" className="popupS" style={{ zIndex: '4000' }}>
                    <div id="popupS-title" style={{ zIndex: '4000' }}></div>
                    <a href="#" id="popupS-closer" style={{ zIndex: '4000' }}>✖</a>
                    <div id="popupS-content" style={{ zIndex: '4000' }}></div>
                </div>

                <div id="popups" className={this.state.popups} >
                    <div className="pophead" >
                        <img src={road} alt='img' height="18" width='18' style={{ margin: '4px 4px 0 4px' }} />
                        <span id="popups-title" style={{ font: 'bold 15px sans-serif', align: 'left' }}>{roadname}</span>
                        <a href="#" id="popups-closer" className="ol-popups-closer"></a>
                    </div>
                    <div id="popups-content" className="popups-content" style={{ padding: '5px' }}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                            bordered
                            showHeader={false}
                            size="small"
                            style={{ width: 350 }}
                        />
                    </div>
                </div>
                <div style={{ position: 'absolute', zIndex: '500', left: '50%', top: '40%' }}>
                    <Spin size="large" spinning={spinning} />
                </div>

            </div>

        )
    }
}

export default withRouter(MapCommon);