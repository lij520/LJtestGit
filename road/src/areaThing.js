import React, { Component } from 'react';
import { Table,Row,Col} from 'antd';
import BackMaps from './mapShows/backmap.jsx';
import './App.less';

class AreaThing extends Component {
    render(){
        const columns = [
            {
                title:'事件类型',
                dataIndex: 'type',
                key: 'type',
                className:'areaThing-thead',
                render: text => <a href="javascript:;" style={{color:'rgb(30,231,247)'}}>{text}</a>,
            },
            {
            title: '福州市',
            dataIndex: 'FuZhou',
            key: 'Fuzhou',
            className:'areaThing-thead',
          },{
            title: '厦门市',
            dataIndex: 'XiaMen',
            key: 'XiaMen',
            className:'areaThing-thead',
          },
           {
            title: '泉州市',
            dataIndex: 'QuanZhou',
            key: 'QuanZhou',
            className:'areaThing-thead',
          }, {
            title: '三明市',
            dataIndex: 'SanMing',
            key: 'SanMing',
            className:'areaThing-thead',
          }];
          
          const data = [{
            key: '1',
            type: '道路建设',
            FuZhou: 32,
            XiaMen:36,
            QuanZhou:50,
            SanMing:44,
          }, {
            key: '2',
            type: '道路管理',
            FuZhou: 115,
            XiaMen:120,
            QuanZhou: 100,
            SanMing: 105,
          }, {
            key: '3',
            type: '道路养护',
            FuZhou: 60,
            XiaMen:55,
            QuanZhou: 50,
            SanMing: 48,
          }, {
            key: '4',
            type: '道路运营',
            FuZhou: 20,
            XiaMen:30,
            QuanZhou:27,
            SanMing:10,
          }
        ];

        return(
          <div>
            <div className="backMap" style={{width:'100%',height:'31vh',position:'absolute'}}>
                <BackMaps/>
            </div>
            <Row>
              <Col span={16} style={{marginTop:10}}>
              <Table columns={columns} dataSource={data} pagination={false} size="small" className='areaThing-table'
            />
              </Col>
            </Row>
        
          </div>
        )
    }
}

export default AreaThing;