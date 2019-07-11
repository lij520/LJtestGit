import React from 'react';
import { Tabs, Select, Dropdown, Menu} from 'antd';
import Xmanagementroad from './xmanagementroad.js';
import XRoadconstruction from './xroadconstruction.js';
import XRoadmaintenance from './xroadmaintenance.js';
import Smanagementroad from './smanagementroad.js';
import SRoadconstruction from './sroadconstruction.js';
import SRoadmaintenance from './sroadmaintenance.js';
import XAssessment from './xassessment.js';
import SAssessment from './sassessment.js';
import Roadstatistics from './roadstatistics.js';
 import Dassessment from './Dassessment.js';
 import XroadKeeper from './xroadKeeper.js';

// import Report from './report.js';
// import MyTasklist from './myTasklist.js';0
// import RoadPlan from './roadPlan.js';
// import RoadStatus from './roadStatus.js';
// import ConstructionPlan from './constructionPlan.jsx';
// import ConstructionStatus from './constructionStatus.jsx';
import MUtil        from '../../util/mm.jsx';
const _mm   = new MUtil();

//import WrappedAdvancedSearchForm from './t1';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          roleId  : _mm.getStorage('userInfo').roleId,
          selectTab : '道路养护',
        }
    }

    onClick(name){
      this.setState({
        selectTab: name
      })
      // console.log(name)
    }

  render() {
   
    let index_roadbuild=null;
    switch(this.state.roleId){
      case 8: index_roadbuild=(
        
        
        <Tabs style={{height:'100%'}}>
        <TabPane tab="考核管理" key="2" style={{height:'100%'}}><Dassessment/></TabPane>
          <TabPane tab="道路统计" key="1" style={{height:'100%'}}><Roadstatistics/></TabPane>
          
        </Tabs>
      
      ); 
      break;

      case 9: index_roadbuild=(
        
       
          <Tabs style={{height:'100%'}}>
        <TabPane tab="道路建设" key="1" style={{height:'100%'}}><Xmanagementroad/></TabPane>
        <TabPane tab="道路管理" key="2" style={{height:'100%'}}><XRoadconstruction/></TabPane>
        {/* <TabPane tab="道路养护" key="3" style={{height:'100%'}}><XRoadmaintenance/></TabPane> */}
        <TabPane tab="考核管理" key="4" style={{height:'100%'}}><XAssessment/></TabPane>
        {/* <TabPane tab="路官员" key="5" style={{height:'100%'}}><XroadKeeper/></TabPane> */}
        <TabPane tab={<Dropdown overlay={<Menu>
                  <Menu.Item><a onClick={() => this.onClick('道路养护')}>道路养护</a></Menu.Item>
                  <Menu.Item><a onClick={() => this.onClick('路官员')}>路官员</a></Menu.Item> 
              </Menu>}>
                <a>{this.state.selectTab}</a>
            </Dropdown>} key="544" style={{height:'100%'}}>
              {
                this.state.selectTab == '道路养护'
                ? <XRoadmaintenance/>
                : <XroadKeeper/>
              }
        </TabPane>
      </Tabs>
      
      ); 
      break;

      case 10: index_roadbuild=(
        
        <Tabs style={{height:'100%'}}>
        <TabPane tab="道路建设" key="1" style={{height:'100%'}}><Smanagementroad/></TabPane>
        <TabPane tab="道路管理" key="2" style={{height:'100%'}}><SRoadconstruction/></TabPane>
        <TabPane tab="道路养护" key="3" style={{height:'100%'}}><SRoadmaintenance/></TabPane>
        <TabPane tab="考核管理" key="4" style={{height:'100%'}}><SAssessment/></TabPane>
      </Tabs>
      
      ); 
      break;
    }
    return (
       <div>
         {index_roadbuild}
       </div>
    );
  }
}

export default Check;





  








