
import React            from 'react';
import { Tabs,Button,Icon } from 'antd';
import { Link }     from 'react-router-dom';

import MyThing from './myThing.jsx';
import MUtil        from 'util/mm.jsx'
const _mm   = new MUtil();

const TabPane = Tabs.TabPane;
let defaultScrollTop = 0;

class RoadProtect extends React.Component{

    constructor(props){
        super(props);
        // this.state = {
        //     // roleId  : _mm.getStorage('userInfo').roleId,
        //     type    :'0',
        // };
        // props.cacheLifecycles.didCache(()=>this.componentDidCache());
        // props.cacheLifecycles.didRecover(()=>this.componentDidRecover());

        this.type='1';
        if (_mm.getStorage('searchParameterProtect')) { //是从check过来的，希望保存原来的所有数据
          switch(_mm.getStorage('searchParameterProtect').type){
            case '0':this.type='1';break;
            case '1':this.type='4';break;
            case '2':this.type='3';break;
            case '3':this.type='2';break;
            default:this.type='1';break;
          }
        }
        this.state = {
          roleId  : _mm.getStorage('userInfo').roleId,
          type    :_mm.getStorage('searchParameterProtect').type||'0',
          activeTab:this.type,
        };
    }
    componentWillMount(){
      document.title = "道路养护" ;
    }

  //   componentDidCache(){   //缓存页面
  //     _mm.setSessionStorage('scrollTop',defaultScrollTop);
  //  }
 
  //  componentDidRecover(){ //渲染页面
  //    this.scrollTest.scrollTop=_mm.getSessionStorage('scrollTop');
  //  }

  componentWillUnmount(){
     _mm.removeStorage('searchParameterProtect');
  }

  //  onScrollHandle(){
  //   defaultScrollTop=this.scrollTest.scrollTop;
  // }

    onTabsChange(key){
        // if(key=='1'){
        //   this.setState({
        //     type:'0'
        //   })
        // }
        // if(key=='2'){
        //   this.setState({
        //     type:'3'
        //   })
        // }
        // if(key=='3'){
        //   this.setState({
        //     type:'2'
        //   })
        // }
        // if(key=='4'){
        //   this.setState({
        //     type:'1'
        //   })
        // }

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
        return (
            <div 
            // style={{ height: '659px', overflowY: 'scroll' }}
            // onScrollCapture={() =>this.onScrollHandle()} ref={(c) => { this.scrollTest = c; }}
            >
            {/* <Button  style={{float:'right',marginTop:'8px'}}><Icon type="plus" theme="outlined" /><Link to="/roadprotect/add">新增</Link></Button>  */}
            <Tabs activeKey={this.state.activeTab}  history={this.props.history} onChange={(e)=>this.onTabsChange(e)} >
            <TabPane tab="所有事件" key="1"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的待办" key="2"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的在办" key="3"   history={this.props.history}><MyThing   history={this.props.history} type={this.state.type}/></TabPane>
            <TabPane tab="我的办结" key="4"   history={this.props.history}><MyThing  history={this.props.history} type={this.state.type}/></TabPane>
          </Tabs>
          </div>
        )
    }
}
export default RoadProtect;