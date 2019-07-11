import React from 'react';
import { Tabs} from 'antd';
import CheckPlan from './teamplan.js';
import Report from './report.js';
import MyTasklist from './myTasklist.js';
import RoadPlan from './roadPlan.js';
import RoadStatus from './roadStatus.js';
import ConstructionPlan from './constructionPlan.jsx';
import ConstructionStatus from './constructionStatus.jsx';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

//import WrappedAdvancedSearchForm from './t1';
const TabPane = Tabs.TabPane;

class RoadBuild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          roleId  : _mm.getStorage('userInfo').roleId,
        }
    }

    componentWillMount(){
      document.title = "道路建设" ;
    }
  render() {
   
    let index_roadbuild=null;
    switch(this.state.roleId){
      case 8: index_roadbuild=(
        
        <Tabs defaultActiveKey="1" history={this.props.history}>
          {/* <TabPane tab="巡检任务" key="1"><Inspection/></TabPane> */}
          <TabPane tab="道路建设情况" key="1" history={this.props.history}><Report/></TabPane>
          <TabPane tab="巡检任务" key="2"><CheckPlan/></TabPane>
          <TabPane tab="我的任务列表" key="3"><MyTasklist/></TabPane> 
        </Tabs>
      
      ); 
      break;

      case 9: index_roadbuild=(
        
        <Tabs defaultActiveKey="1">
          <TabPane tab="道路建设情况" key="1"><RoadStatus/></TabPane>
          <TabPane tab="道路建设计划" key="2"><RoadPlan/></TabPane>
         
        </Tabs>
      
      ); 
      break;

      case 10: index_roadbuild=(
        
        <Tabs defaultActiveKey="1">
          <TabPane tab="道路建设计划" key="1"><ConstructionPlan/></TabPane>
          <TabPane tab="道路建设情况" key="2"><ConstructionStatus/></TabPane>
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

export default RoadBuild;





  








