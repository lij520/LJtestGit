import { Progress,Row,Col } from 'antd';
import React from 'react';
class PatrolMileage extends React.Component {
    render(){
        return(
            <div>
                    {this.props.patrolMileage.map((item,index)=>{
                      return(
                        <div key={index} >
                        <Row>
                          <Col span={4} style={{lineHeight:'50px'}}>{item.realName}</Col>
                          <Col span={14}>
                            <Progress 
                              strokeColor={{
                                  '0%': 'rgb(27,228,177)',
                                  '100%': 'rgb(4,187,221)',
                              }}
                              percent={(item.mileage/1200)*100}
                              strokeWidth={20}
                              style={{lineHeight:'50px'}}
                              showInfo={false}
                            />
                          </Col>
                          <Col span={5} offset={1} style={{lineHeight:'50px'}}>{item.mileage}公里</Col>
                        </Row>
                        </div>
                      )
                    })}
          </div>
        )
    }
}

export default PatrolMileage;