//道路养护--巡路
import React from 'react';
import { Button, Icon, Tabs, Row, Col, } from 'antd';
import moment from 'moment';
import './index.scss';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

import PatrolPlan from './patrolPlan.jsx';
import PatrolLog from './patrolLog.jsx';
import RoadArchives from './roadArchives.jsx';

const TabPane = Tabs.TabPane;

class PatrolCondition extends React.Component{
	constructor(props){
		super(props);
		this.state={
        tabKey: 2,
        roleId: _mm.getStorage('userInfo').roleId,
		}
	}

	componentDidMount(){
	  // console.log("2018-10-19T03:31:12.000+0000");
    // console.log(moment("2018-10-19T03:31:12.000+0000").subtract(8,'hours').format("YYYY-MM-DD HH:mm:ss"));
	}

  tabsCallback(key) {
      console.log(key);
      (key == 2) ? this.setState({ tabKey:1}) : this.setState({ tabKey:2});
      console.log('tabKey:',this.state.tabKey);
	}

	render(){
		return(
     	// tabBarStyle={{backgroundImage: 'linear-gradient(to bottom,#ffffff,#c7c7c7)'}}
      	<Tabs className="tabsStyle" defaultActiveKey="1" tabBarGutter={0} onChange={(key) => this.tabsCallback(key)}>
          	{/* <TabPane tab="巡路计划" key="1">
              	<PatrolPlan/>
            </TabPane>
            <TabPane tab="巡路日志" key="2">
                <PatrolLog/>
            </TabPane> */}
			{
				this.state.roleId == 8
				?
				<TabPane tab="巡路计划" key="1">
					<PatrolPlan/>
				</TabPane>
				:""
			}
			<TabPane tab="巡路日志" key={this.state.roleId == 8? "2":"1"}>
				<PatrolLog/>
			</TabPane>
			<TabPane tab="道路分配" key={this.state.roleId == 8? "3":"2"}>
				<RoadArchives/>
			</TabPane>	
        </Tabs>
		);
	}
}

export default PatrolCondition;