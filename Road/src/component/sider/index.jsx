import React from 'react';
import {  Menu, Icon,Layout } from 'antd';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import menuImage from './menu.png';
import './index.less';

import MUtil        from 'util/mm.jsx'

const SubMenu = Menu.SubMenu;
const {  Content, Sider } = Layout;

const _mm   = new MUtil();
class SiderRight extends React.Component{
  constructor(props){
    super(props);
    this.state={
        collapsed: false,
        roleId: _mm.getStorage('userInfo').roleId
    }
  }
  onCollapse (collapse) {
      this.setState({ collapsed:{collapse}});
    }

  onClick(){
    <Link to='/user'></Link>
  }  
    render(){

      let roadProtect=null;
      switch(this.state.roleId){
        case 8:roadProtect=(
        <SubMenu  key="sub2" title={<span><Icon type="safety" theme="outlined" className='menu_icon' /><span className="menu_text">道路养护</span></span>}>
          <Menu.Item key="7">
            <Link to='/roadprotect'>事件管理</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to='/roadprotect/protectplan'>养护计划</Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to='/roadprotect/patrolcondition'>巡路情况</Link>
          </Menu.Item>
        </SubMenu>  
        );break;
          case 9:roadProtect=(
            <SubMenu  key="sub2" title={<span><Icon type="safety" theme="outlined" className='menu_icon' /><span className="menu_text">道路养护</span></span>}>
              <Menu.Item key="7">
              <Link to='/roadprotect'>事件管理</Link>
            </Menu.Item>
              <Menu.Item key="8">
                <Link to='/roadprotect/protectplan'>养护计划</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to='/roadprotect/protectchart'>统计报表</Link>
              </Menu.Item>
              <Menu.Item key="17">
                <Link to='/roadprotect/patrolcondition'>巡路情况</Link>
              </Menu.Item>
            </SubMenu>  
            );break;
            case 10:roadProtect=(
              <SubMenu  key="sub2" title={<span><Icon type="safety" theme="outlined" className='menu_icon' /><span className="menu_text">道路养护</span></span>}>
                <Menu.Item key="7">
                <Link to='/roadprotect'>事件管理</Link>
              </Menu.Item>
                <Menu.Item key="8">
                  <Link to='/roadprotect/protectplan'>养护计划</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to='/roadprotect/protectchart'>统计报表</Link>
                </Menu.Item>
              </SubMenu>  
              );break;
          case 11:roadProtect=(
            <SubMenu  key="sub2" title={<span><Icon type="safety" theme="outlined" className='menu_icon' /><span className="menu_text">道路养护</span></span>}>
              <Menu.Item key="7">
                <Link to='/roadprotect'>事件管理</Link>
              </Menu.Item>
            </SubMenu>  
            );break;
      }  
    
        return(
          <div >
            <Sider width={185}  className='sider'>
            <Menu  mode="vertical" inlineIndent={16}
            // defaultSelectedKeys={['1']} 
            // defaultOpenKeys={['sub1']} 
            style={{ height: '100%', borderRight: 0 }}>
              <Menu.Item key='1' >
              <Link to='/home'  className='link_text'><Icon type="home" theme="outlined" className='menu_icon' /><span className="menu_text">首页</span></Link>
              </Menu.Item>
             
              <Menu.Item key="2">
                {/* {
                   this.state.roleId=='1'
                   ?   */}
                   <Link to='/user'><Icon type="user" theme="outlined" className='menu_icon' /><span className="menu_text">用户信息</span></Link>
                   {/* : 
                   <Link to='/userothers'><Icon type="user" theme="outlined" className='menu_icon' /><span className="menu_text">用户信息</span></Link>
                } */}
               
              </Menu.Item>
              
             
              <Menu.Item key="3">
                <Link to='/file'><Icon type="file-text" theme="outlined" className='menu_icon'/><span className="menu_text">文件管理</span></Link>
              </Menu.Item>
              
             
              <Menu.Item key="4">
                <Link to='/appactivity'><Icon type="bar-chart" theme="outlined" className='menu_icon' /><span className="menu_text">活跃度展示</span></Link>
              </Menu.Item>

              <Menu.Item key='10' >
                <Link to='/roadbuild'><Icon type="schedule" theme="outlined" className='menu_icon' /><span className="menu_text">道路建设</span></Link>
              </Menu.Item>

              {
                  this.state.roleId=='8'|| this.state.roleId=='9'||this.state.roleId=='10'
                  ?  
                  (
                    <SubMenu  key="sub1" title={ <span><Icon type="bars" theme="outlined" className='menu_icon' /><span className="menu_text">道路管理</span></span>}>
                      <Menu.Item key="5">
                        <Link to='/roadmanage'>事件管理</Link>
                      </Menu.Item>
                      {
                         this.state.roleId=='8'
                         ?(
                            <Menu.Item key="6">
                              <Link to='/roadmanage/roadConditions'>道路情况</Link>
                            </Menu.Item>
                         )
                         :null
                      } 
                    </SubMenu>  
                  )
                  : null
              }

              {roadProtect}
            {/* <SubMenu key="sub3" title={<span><Icon type="bulb" theme="outlined" className='menu_icon' /><span className="menu_text">道路运营</span></span>}>
                <Menu.Item key="14">
                  <Link to='/roadoperation/plan'>运营计划</Link>
                </Menu.Item>
                <Menu.Item key="15">
                  <Link to='/roadoperation/manage'>运营管理</Link>
                </Menu.Item>
            </SubMenu>  */}

             <Menu.Item key='14' >
                <Link to='/roadoperation/plan'><Icon type="bulb" theme="outlined" className='menu_icon' /><span className="menu_text">道路运营</span></Link>
              </Menu.Item>
              
              <Menu.Item key='11' >
                <Link to='/map'><Icon type="environment" theme="outlined" className='menu_icon' /><span className="menu_text">地图展示</span></Link>
              </Menu.Item>
              <Menu.Item key='12'>
                <Link to='/affiche'>
                  <Icon type="mail" theme="outlined" className='menu_icon' /><span className="menu_text">通知公告</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='13'>
                <Link to='/meeting'>
                  <Icon type="message" theme="outlined" className='menu_icon' /><span className="menu_text">会议管理</span>
                </Link>
              </Menu.Item>

              {/* <SubMenu key="sub3" title={<span><Icon type="bulb" theme="outlined" className='menu_icon' /><span className="menu_text">道路运营</span></span>}>
                  <Menu.Item key="14">
                    <Link to='/roadoperation/bus'>公交运营</Link>
                  </Menu.Item>
                  <Menu.Item key="15">
                    <Link to='/roadoperation/transport'>客运运营</Link>
                  </Menu.Item>
              </SubMenu>  */}

           

              {/* <Menu.Item key='14'>
                <Link to='/check'>
                  <Icon type="profile" theme="outlined" className='menu_icon' /><span className="menu_text">考核管理</span>
                </Link>
              </Menu.Item> */}
             
              {/* <Menu.Item key='6'>
                <Icon type="environment" theme="outlined" />
                地图展示
              </Menu.Item> */}
              <Menu.Item key="16" >
                <Link to='/check'><Icon type="profile" theme="outlined" className='menu_icon' /><span className="menu_text">考核管理</span></Link>
              </Menu.Item>
             
            </Menu>
            </Sider> 
            <div>
            <img src={menuImage} alt="" style={{width:'100%',position:'absolute',bottom:0}}/>
            </div>
          </div>
        );
    }
}

export default SiderRight;