import React, { Component } from 'react';
import { Rate, Icon,Row,Col } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1084087_e86f3qpzbeg.js',
});

class PatrolTop5 extends Component {
    render(){
        return(
            <div className="gutter-patrol">
            <div className="gutter-patrol-block">
            <Row gutter={8} style={{width: '100%'}}>
              <Col  span={5}>
                <div >区域</div>
              </Col>
              <Col  span={14}>
                <div >专管员分布数</div>
              </Col>
              <Col  span={5}>
                <div className="gutter-patrol-box" style={{textAlign:'-webkit-right'}}>周环比</div>
              </Col>
            </Row>
            <Row gutter={8} className="gutter-patrol-item" >
              <Col  span={5}>
                <div >福州市</div>
              </Col>
              <Col  span={16}>
                <div >  <Rate character={<IconFont  type="icon-xunjianrenyuan" />} allowHalf disabled defaultValue={82/100*6} count={6} className='patrol-rate-first'/> <span className="patrol-person-text">82</span></div>
              </Col>
              <Col  span={3}>
                <div className='patrol-week-up'>+12</div>
              </Col>
            </Row>
            <Row gutter={8} className="gutter-patrol-item" >
              <Col  span={5}>
                <div >厦门市</div>
              </Col>
              <Col  span={16}>
                <div>  <Rate character={<IconFont  type="icon-xunjianrenyuan" />} allowHalf disabled defaultValue={50/100*6} count={6}/><span className="patrol-person-text">50</span></div>
              </Col>
              <Col  span={3}>
                <div className='patrol-week-up'>+3</div>
              </Col>
            </Row>
            <Row gutter={8} className="gutter-patrol-item" >
              <Col  span={5}>
                <div >泉州市</div>
              </Col>
              <Col  span={16}>
                <div >  <Rate character={<IconFont  type="icon-xunjianrenyuan" />} allowHalf disabled defaultValue={76/100*6} count={6}/> <span className="patrol-person-text">76</span></div>
              </Col>
              <Col  span={3}>
                <div className='patrol-week-up'>+1</div>
              </Col>
            </Row>
            <Row gutter={8} className="gutter-patrol-item" >
              <Col  span={5}>
                <div >三明市</div>
              </Col>
              <Col  span={16}>
                <div >  <Rate character={<IconFont  type="icon-xunjianrenyuan" />} allowHalf disabled defaultValue={63/100*6} count={6}/> <span className="patrol-person-text">63</span></div>
              </Col>
              <Col  span={3}>
                <div className='patrol-week-down'>-5</div>
              </Col>
            </Row>
            <Row gutter={8} className="gutter-patrol-item" >
              <Col  span={5}>
                <div >宁德市</div>
              </Col>
              <Col  span={16}>
                <div >  <Rate character={<IconFont  type="icon-xunjianrenyuan" />} allowHalf disabled defaultValue={42/100*6} count={6}/> <span className="patrol-person-text">42</span></div>
              </Col>
              <Col  span={3}>
                <div className='patrol-week-up'>+7</div>
              </Col>
            </Row>
            </div>
          </div>
        )
    }
}

export default PatrolTop5;