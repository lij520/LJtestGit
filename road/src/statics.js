import React, { Component } from 'react';
import { Row, Col,Statistic,Icon } from 'antd';

class Statics extends Component {
    constructor(props){
        super(props);
        this.state = {
          undo:50,
          doing:10,
          examine:2,
          done:20,
        };
    
      }
    
      tick_undo = () => {
        this.setState({
            undo: --this.state.undo
        })
        if(this.state.undo<0){
          this.setState({
            undo:50
          })
        }
      }
    
      tick_doing = () => {
        this.setState({
            doing: --this.state.doing
        })
        if(this.state.doing<0){
          this.setState({
            doing:10
          })
        }
      }
    
      tick_examine = () => {
        this.setState({
          examine: ++this.state.examine
        })
        if(this.state.examine>=100){
          this.setState({
            examine:0
          })
        }
      }
    
      tick_done = () => {
        this.setState({
          done: ++this.state.done
        })
        if(this.state.done>=100){
          this.setState({
            done:0
          })
        }
      }
    
    
      componentDidMount(){
        this.interval_undo = setInterval(() => this.tick_undo(), 10000);  
        this.interval_doing= setInterval(() => this.tick_doing(), 3000); 
        this.interval_examine= setInterval(() => this.tick_examine(), 20000); 
        this.interval_done= setInterval(() => this.tick_done(), 5000); 
      }
    render(){
        return(
            <div className="gutter-statics">
              <Row gutter={8} className="gutter-statics-row">
                <Col  span={6}>
                  <div className="gutter-statics-box">
                  <text ></text>
                  <div className="gutter-statics-box-center">
                  <Row className="gutter-statics-title"><Col span={18} offset={3}>未处理(件)</Col></Row>
                  <div > 
                  <Row className="gutter-statics-box-row">
                    <Col span={8} offset={2}><span className="gutter-statics-box-text">{this.state.undo}</span></Col>
                    <Col span={13} offset={1} className="gutter-statics-box-number" > 
                    <div>
                      <span >日环比:</span>
                      <span>+1.2%</span><span><Icon type="arrow-up" /></span>
                      {/* <Statistic value={1.2} precision={1} valueStyle={{ color:'rgb(244,67,54)'}} prefix={<Icon type="arrow-up" />}suffix="%" className='gutter-statics-box-number' 
                      style={{display:'inline'}}
                      /> */}
                    </div> 
                    <div>
                      <span >周环比:</span>
                      <span>+0.5%</span><span><Icon type="arrow-up" /></span>
                      {/* <Statistic value={0.5} precision={1} valueStyle={{ color:'rgb(244,67,54)'}} prefix={<Icon type="arrow-up" />}suffix="%" className='gutter-statics-box-number' style={{display:'inline'}}/> */}
                    </div>
                    </Col>
                  </Row>
                  </div>
                  </div>
                  </div>
                </Col>
                <Col  span={6}>
                  <div className="gutter-statics-box">
                  <text ></text>
                  <div className="gutter-statics-box-center">
                  <Row className="gutter-statics-title"><Col span={18} offset={3}>处理中(件)</Col></Row>
                  <div > 
                  <Row className="gutter-statics-box-row">
                    <Col span={8} offset={2}><span className="gutter-statics-box-text">{this.state.doing}</span></Col>
                    <Col span={13} offset={1} className="gutter-statics-box-number" > 
                    <div>
                      <span >日环比:</span>
                      <span>+2.1%</span><span><Icon type="arrow-up" /></span>
                    </div> 
                    <div  className="gutter-statics-box-number-down">
                      <span >周环比:</span>
                      <span>-1.7%</span><span><Icon type="arrow-down" /></span>
                    </div>
                    </Col>
                  </Row>
                  </div>
                  </div>
                  </div>
                </Col>
                <Col  span={6}>
                  <div className="gutter-statics-box">
                  <text ></text>
                  <div className="gutter-statics-box-center">
                  <Row className="gutter-statics-title"><Col span={18} offset={3}>待审核(件)</Col></Row>
                  <div > 
                  <Row className="gutter-statics-box-row">
                    <Col span={8} offset={2}><span className="gutter-statics-box-text">{this.state.examine}</span></Col>
                    <Col span={13} offset={1} className="gutter-statics-box-number" > 
                    <div className="gutter-statics-box-number-down">
                      <span >日环比:</span>
                      <span>-0.5%</span><span><Icon type="arrow-down" /></span>
                    </div> 
                    <div className="gutter-statics-box-number-down">
                      <span >周环比:</span>
                      <span>-0.9%</span><span><Icon type="arrow-down" /></span>
                    </div>
                    </Col>
                  </Row>
                  </div>
                  </div>
                  </div>
                </Col>
                <Col  span={6}>
                  <div className="gutter-statics-box">
                  <text ></text>
                  <div className="gutter-statics-box-center">
                  <Row className="gutter-statics-title"><Col span={18} offset={3}>已办结(件)</Col></Row>
                  <div > 
                  <Row className="gutter-statics-box-row">
                    <Col span={8} offset={2}><span className="gutter-statics-box-text">{this.state.done}</span></Col>
                    <Col span={13} offset={1} className="gutter-statics-box-number" > 
                    <div style={{lineHeight:'2.1vw'}}>
                      <span >日环比:</span>
                      <span>+1.8%</span><span><Icon type="arrow-up" /></span>
                    </div> 
                    <div>
                      <span >周环比:</span>
                      <span>+0.6%</span><span><Icon type="arrow-up" /></span>
                    </div>
                    </Col>
                  </Row>
                  </div>
                  </div>
                  </div>
                </Col>
              </Row>
            </div> 
        )
    }
}

export default Statics;