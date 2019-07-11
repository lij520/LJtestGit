import React, { Component } from 'react';
import HeaderLine from './image/headerLine.jpg';
import GutterTitleImage from './image/gutterTitle.jpg';
import { Row, Col,Statistic,Icon } from 'antd';
import './App.css';
import TrafficLine from './trafficLine';
import TrafficMachine from './trafficMachine';
import Peccancy from './peccancy';
import AreaThing from './areaThing';
import PatrolTop5 from './patrolTop5';
import CenterMap from './centerMap';
import BackMotion from './mapShows/backMotion.jsx';
import MapEcharts from './mapShows/mapEcharts.jsx';
import VehicleAmount from './vehicleAmount';import Statics from './statics';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="motion" style={{position:'absolute',zIndex:'900'}}>
          <BackMotion/>
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Button type="primary">Button</Button> */}
        <header className="App-header">
        <img src={HeaderLine} alt="" className='App-header-image-left'/>
        智慧路长实时数据监控平台
        <img src={HeaderLine} alt="" className='App-header-image-right'/>
        </header>
        <div className="gutter-example">
        <Row gutter={32} >
          <Col className="gutter-row" span={6}>
            <div className="gutter-title">运输线路里程数</div>
            <div   className="gutter-title-background">
            </div>
            <div className="gutter-charts" style={{minHeight:'11.25vw'}}>
            <TrafficLine/>
            </div>
            <div className="gutter-title">公路运输情况(万)</div>
            <div   className="gutter-title-background">
            </div>
            <div className="gutter-charts">
            <TrafficMachine/>
            </div>
            <div className="gutter-title">客货运输量</div>
            <div   className="gutter-title-background">
            </div>
              <VehicleAmount/>
            <div className="gutter-charts">
           
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <Statics/>
            <div className="gutter-map">
                {/* <CenterMap/> */}
                <MapEcharts/>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-title">危险驾驶数据</div>
            <div   className="gutter-title-background">
            </div>
            <div className="gutter-charts" style={{minHeight:'22vh'}}>
            <Peccancy/>
            </div>
            <div className="gutter-title">区域上报事件集Top4</div>
            <div   className="gutter-title-background">
            </div>
            <div className="gutter-charts" style={{minHeight:'31vh'}}>
            <Row >
              {/* <Col span={18}> */}
                <AreaThing/>
              {/* </Col> */}
            </Row>
            </div>
            <div className="gutter-title">巡检分布TOP5</div>
            <div   className="gutter-title-background">
            </div>
            <div className="gutter-charts">
            <PatrolTop5/>
            </div>
          </Col>
        </Row>
      </div>
      </div>
    );
  }
}

export default App;
