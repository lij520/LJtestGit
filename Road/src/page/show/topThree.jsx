import React from 'react';
import { Row, Col, Card, Icon} from 'antd';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

import './index.less';
import './index.scss';

class TopThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mileage_name: '--',
            mileage     : '--',
            hour_name   : '--',
            hour        : '--',
            num_name    : '--',
            num         : '--',
        }
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) { 
        console.log("打印nextProps")
        console.log(nextProps.topThree);
        const topThree = nextProps.topThree;
        this.setState({
            mileage_name: topThree.patrolMileage.realName,
            mileage: topThree.patrolMileage.mileage,
            hour_name: topThree.patrolHour.realName,
            hour: topThree.patrolHour.hour,
            num_name: topThree.patrolNum.realName,
            num: topThree.patrolNum.patrolCount,
        });
    }

    render(){
        const {mileage_name, mileage, hour_name, hour, num_name, num} = this.state;
        return(
            <Row gutter={24}>
                <Col span={8} offset={0}>
                    <Card className='card_home topThree-card' title={<span className='topThree-card-title'>巡路次数</span>}>
                        <div className="triangle-topleft">
                            <div>Top1</div>
                        </div>
                        <div className='topThree-card-content'>
                            <span className='topThree-name'>
                                {num_name}:<span className='topThree-num'>{num}</span>次
                            </span>
                            
                        </div>
                    </Card>
                </Col>
                <Col span={8} offset={0}>
                    <Card className='card_home topThree-card' title={<span className='topThree-card-title'>巡路里长</span>}>
                        <div className="triangle-topleft">
                            <div>Top1</div>
                        </div>
                        <div className='topThree-card-content'>
                            <span className='topThree-name'>
                                {mileage_name}:<span className='topThree-num'>{mileage}</span>公里
                            </span>
                        </div>
                    </Card>
                </Col>
                <Col span={8} offset={0}>
                    <Card className='card_home topThree-card' title={<span className='topThree-card-title'>巡路时长</span>}>
                        <div className="triangle-topleft">
                            <div>Top1</div>
                        </div>
                        <div className='topThree-card-content'>
                            <span className='topThree-name'>
                                {hour_name}:<span className='topThree-num'>{hour}</span>小时
                            </span>
                        </div>
                    </Card>
                </Col>
            </Row>      
        )
    }
}

export default TopThree;
