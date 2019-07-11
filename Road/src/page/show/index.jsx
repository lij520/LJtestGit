import React from 'react';
import { Row, Col, Card, message} from 'antd';

import ActivityLevel from './activityLevel.jsx';
import PatrolMileage from './patrolMileage.jsx';
import PatrolNum from './patrolNum.jsx';
import TopThree from './topThree.jsx';
import StatiscsDoPatrolRoad from './statiscsDoPatrolRoad.jsx';
import MUtil from 'util/mm.jsx';
import $ from 'jquery';
import './index.less';
import './index.scss';

const _mm   = new MUtil();

class AppActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patrolData: [],
            topThree: '',
        }
    }

    componentWillMount(){
        document.title = "活跃度展示" ;
    }
    componentDidMount() {
        this.loadPatrolStatisticApp();
    }

    loadPatrolStatisticApp() {
        var queryUrl = '';
        switch(_mm.getStorage('userInfo').roleId){
            case 8: queryUrl = '/patrolStatisticApp/roadChiefPatrol';break;
            case 9: queryUrl = '/patrolStatisticApp/townPatrol';break;
            default: queryUrl = '';break;
        }

        $.ajax({
            type        :  'post',
            url         :  queryUrl+'?userId='+_mm.getStorage('userInfo').userId+'&token='+_mm.getStorage('userInfo').token+'&beginTime='+'2018-01-01'+'&endTime='+'2019-12-31'+'&pageNum='+'0'+'&pageSize='+'1000',
            data        :  {},
            success     : res => {
                if(res.result === 1){
                    // var patrolMileage = Math.max.apply(Math, res.patrol.map(function(o) {return o.mileage}));
                    var patrolMileage = this.sortBy(res.patrol,'mileage')[0];
                    var patrolHour = this.sortBy(res.patrol,'hour')[0];
                    var patrolNum = this.sortBy(res.patrol,'patrolCount')[0];
                    var topThree = {};
                        topThree.patrolMileage = patrolMileage;
                        topThree.patrolHour = patrolHour;
                        topThree.patrolNum = patrolNum;

                    this.setState({
                        patrolData: res.patrol,
                        topThree: topThree,
                    });
                }
                else if(res.result === -1){
                    message.error(res.message);
                    window.location.href = '/';
                }
                else{
                    message.error('Query PatrolStatisticApp Error!');
                }
            },
            error       : err => {
                message.error('error!');
            }
        });
    }

    //按对象数组的属性值进行降序
    sortBy(arr,attr) {
        var obj = arr.sort(function(a, b){
            return -(a[attr] - b[attr])
        });
        return obj;
    }

    render(){
        return(   
            <div style={{marginBottom: '60px'}}>
                <div className='topThree-Statistic'>
                    <TopThree topThree={this.state.topThree}/>
                </div>

                <div className='activityLevel-body'>
                    <ActivityLevel/>
                </div>

                <div className='patrolMileage-body'>
                    <PatrolMileage patrolData={this.state.patrolData}/>
                </div>

                <div className='patrolNum-body'>
                    <PatrolNum patrolData={this.state.patrolData}/>
                </div>

                {/* <StatiscsDoPatrolRoad/> */}
                
            </div>
                            
        )
    }
}

export default AppActivity;
