import React,{Component} from 'react';
import { Card, Col, Row, Button, Carousel, Modal, Icon, Collapse, notification,message,Statistic} from 'antd';
import Basiccolumn from './columnbar.jsx';
import Labelline from './pieschart.jsx';
import Stacked from './stackedchart.jsx';
class StatisticReports extends Component{

    render() {

        return (
            <div className="chartStatics">
                <div className="chart_title">
                    <Icon type="bar-chart" theme="outlined" style={{fontSize: '20px',color:'#E14D04'}}/>
                    <span style={{fontSize: '20px',color:'#E14D04',fontWeight:'bold',marginLeft:'15px'}}>统计报表</span>
                </div>
                {/* <div className="column">
                    <Basiccolumn/>
                </div>
                <div className="labelPie">
                    <Labelline/>
                </div>
                <div className="stacked">
                    <Stacked/>
                </div> */}
                <Row>
                    <Col span={8}><Basiccolumn/></Col>
                    <Col span={8}><Labelline/></Col>
                    <Col span={8}><Stacked/></Col>
                </Row>
            </div>
        );
    }
}


export default StatisticReports;