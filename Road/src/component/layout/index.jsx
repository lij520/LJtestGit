import React from 'react';
import Header from '../header/index.jsx';
import SiderRight from '../sider/index.jsx';
import   './index.scss';
import   './index.less';
import Tab from '../tabs/index.jsx';
// import imgURL from './1.png';
import { Col, Row} from 'antd';

import {  Modal, Button, Input, Upload, message, Icon, Table, Divider, Select } from 'antd';


import {
    Layout, Menu, Breadcrumb
  } from 'antd';
  
  const { SubMenu } = Menu;
  const { Content, Sider } = Layout;
  



class HomeLayout extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false,
          selectedRowKeys: [], // Check here to configure the default column
          loading: false,
          }
        }
    
    onCollapse (collapse) {
        console.log(collapse);
        this.setState({ collapsed:{collapse}});
      }

      showModal () {
        this.setState({
          visible: true,
        });
      }
      

    render(){

        return(
                <div style={{height:'100%'}}>
                    <div className='header'>
                    <Header/>
                    </div>
                    {/* <div className='siderright'> 
                    <SiderRight/>
                    </div>
                    <div className='content' style={{overflow:'auto'}}>
                            <div  style={{padding:'20px',height:'100%',paddingRight:'0px'}}   >    
                                {this.props.children}
                            </div>
                     </div>  */}
                    {/* <Row>
                        <Col span={3} style={{background:'red'}}> <SiderRight/></Col>
                        <Col span={19} style={{background:'green'}}></Col>
                    </Row> */}

                    <Layout className='layout_content' style={{background: 'rgb(253,251,252)'}}>
                        <Sider width={185} style={{ background: '#fff',marginLeft:'15px',boxShadow:'1px 1px 7px #e8e8e8',marginTop:'-20px'}}>
                            <SiderRight/>
                        </Sider>
                        <Layout className='layout_content' style={{ margin:'20px 40px 10px 20px',height:'100%',background: 'rgb(253,251,252)'}}>
                            <Content >
                            {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                 
                </div>     
  
        );
    }
}
 

export default HomeLayout;

