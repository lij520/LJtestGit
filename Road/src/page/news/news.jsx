/* 新闻首页 */

import React from 'react';
import { Row, Button, Table, Divider, Tag, message, Tabs, Icon } from 'antd';
import { Link }     from 'react-router-dom';

import './index.scss';
import './index.less';

import NewsList from './newsList.jsx';
import ReviewList from './reviewList.jsx';

import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const TabPane = Tabs.TabPane;

class News extends React.Component{
    constructor(props){
      super(props);
      this.state={
        list : [],
        roleId: _mm.getStorage('userInfo').roleId,
      }
    }

    componentDidMount(){
      
    }

    render(){

      return (
        <div>
          <Row style={{zIndex:2,width:'60%',marginLeft:'40%'}}>
            {
              this.state.roleId == 8
              ? ''
              : <Link to="/news/addNews" style={{margin:'0 5px',float:'right'}}><Button type="primary"><Icon type="plus" theme="outlined" />新增</Button></Link>
            }
            <Link to="/home" style={{margin:'0 5px',float:'right'}}><Button type="primary"><Icon type="double-left" theme="outlined" />返回</Button></Link>
          </Row>

          <div style={{zIndex:1}}>
            <Tabs className="news-tabBar" defaultActiveKey="1" tabBarGutter={0}>
                <TabPane tab="新闻列表" key="1">
                    <NewsList/>
                </TabPane>
                {
                  this.state.roleId == 8
                  ? ''
                  : <TabPane tab="待审阅" key="2">
                    <ReviewList/>
                  </TabPane>
                }
                
            </Tabs>
          </div>
          
         
        </div>
      );
    }
  }

  export default News;