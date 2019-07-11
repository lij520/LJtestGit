import React from 'react';
import { Menu, Dropdown, Icon,Avatar, Row, Col,Button } from 'antd';
import MUtil        from 'util/mm.jsx';
import { Link} from 'react-router-dom';
import quitImage from './r.png';
import warnImage from './t.png';
// import logo from 'component/header/logo3.png';

import './index.scss';
const _mm   = new MUtil();

// const divStyle = {
   
//     backgroundImage: 'url(' + logo + ')',

//     height:'100%',
// };

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu: <Menu onClick={()=>this.onLogout()}>
            <Menu.Item key="1">退出</Menu.Item>
          </Menu>,
            userName: _mm.getStorage('userInfo'). userName,
            realName:_mm.getStorage('userInfo').realName
        }
    }
  

    onLogout(){
        // _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            _mm.removeStorage('searchParameter');
            _mm.removeStorage('searchParameterProtect');
    
            window.location.href = '/';
        // }, errMsg => {
        //     _mm.errorTips(errMsg);
        // });
    }
    
    render(){
        return(
            <div >
                <div className='navbar__logo' >
                    {/* <img src={logo} style={{height:'45px'}}/> */}
                </div>
                <div className='navbar' style={{height:50,backgroundColor:'white'}}>
                <div className="navbar__body" >
                    <div className="navbar__brand">
                        <Row>
                            <Col span={5}><span style={{color:'rgb(255,77,4)'}}>智慧路长平台</span></Col>
                            <Row>
                                <Col span={7} offset={12}>
                                <Row style={{fontSize:'16px',lineHeight:'50px'}}>
                                    <Col span={8}><img src={warnImage} style={{height:'25px',marginRight:5}} alt=""/><span>事件提醒</span></Col>
                                    <Col span={4}>
                                    <a href="" onClick={()=>this.onLogout()}><img src={quitImage} style={{height:'25px',marginRight:5}}  alt=""/><span style={{color:'rgb(153,153,153)'}} >退出</span></a>
                                    </Col>
                                    <Col span={12} className="navbar__image">
                                    <div  style={{float:'right',marginRight:20}}><Icon type="user" style={{fontSize:25}} />{this.state.realName}</div>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </Row>
                        {/* <div className="navbar__menu" style={{ float: 'right',marginRight:'30px'}}>
                            <Dropdown overlay={this.state.menu}>
                                <div>
                                    <Avatar size={35} icon="user" style={{verticalAalign: 'middle'}}/>
                                    <Icon type="down" />
                                    {
                                        this.state.realName
                                     ? <span style={{fontSize:'17px',color:'#4d77b5'}}>{this.state.realName}</span>
                                    : <span style={{fontSize:'17px',color:'#4d77b5'}}>欢迎您</span>
                                    }
                                </div>
                            </Dropdown>
                        </div> */}
                      
                        {/* <div className="navbar__image" >

                        </div> */}
                    </div> 
                </div>
                </div>
                <div className='header_menu'>
                    <Row>
                        <Col offset={7} span={9}>
                        <Row gutter={16} style={{marginLeft:'2vw'}}>
                            <Col span={5}><Link to='/roadbuildchart'> <span>道路建设</span></Link></Col>
                            <Col span={5}>
                                <Link to='/roadmanagechart'><span>道路管理</span></Link>
                            </Col>
                            <Col span={4}><Link to='/map'><span>一张图</span></Link></Col>
                            <Col span={5}><Link to='/roadprotectchart'><span>道路养护</span></Link></Col>
                            <Col span={5}><Link to='/mapOperation'> <span>道路运营</span></Link></Col>
                        </Row>
                        </Col>
                    </Row>
                </div>
              
            </div>
            
        );
    }
}

export default Header;