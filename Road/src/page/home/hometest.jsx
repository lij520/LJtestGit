import React from 'react';
import { Card, Col, Row,Divider, Button, Carousel, Modal, Icon, Collapse, notification,message,Statistic} from 'antd';
import roadBuildImage from './img/roadbuild.png';
import roadManageImage from './img/roadmanage.png';
import roadProtectImage from './img/roadprotect.png';
import roadOperationImage from './img/roadoperation.png';
import RoadBuild from './home/roadbuild.jsx';
import RoadManage from './home/roadmanage.jsx';
import RoadProtect from './home/roadprotect.jsx';
import RoadOperation from './home/roadoperation.jsx';
import NoticeBoard from './home/noticeBoard.jsx';

import './home.css';
import './home.less';
class Home extends React.Component{
    render(){
        return(
        <div style={{height:'100%'}}>
        {/* <div className='home_style'>Hello!</div> */}
        <div>
        <div className='home_charts'>
        <Row >
            <Col span={10} offset={1} >
                <div style={{height:'40px'}}>
                <img src={roadBuildImage} alt="" style={{height:'100%'}}/>
                <span className='home_charts_text'>道路建设情况</span>
                </div>
                <div style={{height:'85%'}}>
                <RoadBuild/>
                </div>
            </Col>
            <Col span={11} offset={2} >
                <div style={{height:'40px'}}>
                <img src={roadManageImage} alt="" style={{height:'100%'}}/>
                <span className='home_charts_text'>道路管理数据</span>
                </div>
                <div style={{height:'85%'}}>
                <RoadManage/>
                </div>
            </Col>
        </Row>
        <Divider className='home_divider' style={{margin:'6px 0'}}/>
        <Row style={{height:'48%'}}>
            <Col span={10} offset={1}>
                <div style={{height:'40px'}}>
                    <img src={roadProtectImage} alt="" style={{height:'100%'}}/>
                    <span className='home_charts_text'>道路养护类型</span>
                    </div>
                <div style={{height:'85%'}}>
                    <RoadProtect/>
                </div>
            </Col>
            <Col span={11} offset={2}>
                <div style={{height:'40px'}}>
                    <img src={roadOperationImage} alt="" style={{height:'100%'}}/>
                    <span className='home_charts_text'>道路运营覆盖率</span>
                </div>
                <div style={{height:'85%'}}>
                    <RoadOperation/>
                </div>
            </Col>
        </Row>
        </div>
        <div className='home_notify'>
            <NoticeBoard/>
        </div>
        </div>
        </div>
        )
    }
}

export default Home;