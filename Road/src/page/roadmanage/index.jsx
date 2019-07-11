import React from 'react';
import { Tabs,Button,Icon } from 'antd';
import { Link }     from 'react-router-dom';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';


import MyThing from './myThing.jsx';
import ChartsRole from './charts.jsx';

import MUtil        from 'util/mm.jsx'
const _mm   = new MUtil();


const TabPane = Tabs.TabPane;
let defaultScrollTop = 0;

class RoadManage extends React.Component{

  constructor(props){
    super(props);

    this.type='1';
    if (_mm.getStorage('searchParameter')) { //是从check过来的，希望保存原来的所有数据
      switch(_mm.getStorage('searchParameter').type){
        case '0':this.type='1';break;
        case '1':this.type='4';break;
        case '2':this.type='3';break;
        case '3':this.type='2';break;
        default:this.type='1';break;
      }
    }
    this.state = {
      roleId      : _mm.getStorage('userInfo').roleId,
      type        :_mm.getStorage('searchParameter').type||'0',
      activeTab   :this.type,
    };
  }

  componentWillMount(){
    document.title = "道路管理" ;
  }

  componentWillUnmount(){
    _mm.removeStorage('searchParameter');
  }

  onTabsChange(key){

    if(key=='1'){
      this.setState({
        type:'0',
        activeTab:'1',
      })
      this.type='1';
    }
    if(key=='2'){
      this.setState({
        type:'3',
        activeTab:'2',
      })
      this.type='2';
    }
    if(key=='3'){
      this.setState({
        type:'2',
        activeTab:'3',
      })
      this.type='3';
    }
    if(key=='4'){
      this.setState({
        type:'1',
        activeTab:'4',
      })
      this.type='4';
    }
   
  }

    render(){
   
      let index_event=null;
      switch(this.state.roleId){
        case 8: index_event=(
        
          <Tabs activeKey={this.state.activeTab} history={this.props.history} onChange={(e)=>this.onTabsChange(e)}  >
            <TabPane tab="所有事件" key="1"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的待办" key="2"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的在办" key="3"   history={this.props.history}><MyThing   history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的办结" key="4"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
          </Tabs>
        
        ); 
        break;
        case 9:index_event=(
          <Tabs activeKey={this.state.activeTab}  history={this.props.history} onChange={(e)=>this.onTabsChange(e)} >
            <TabPane tab="所有事件" key="1"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的待办" key="2"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的在办" key="3"   history={this.props.history}><MyThing   history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的办结" key="4"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
          </Tabs>
        );
        break;
        case 10:index_event=(
          <ChartsRole/>
        );
        break;
        default:index_event=null;break;
      }

      return (
          <div>
            {/* <Button  style={{float:'right',marginTop:'8px'}}><Icon type="plus" theme="outlined" /><Link to="/roadmanage/add">新增</Link></Button>  */}
          {index_event}
          </div>
      );
    }
  }
  
  
  export default RoadManage;