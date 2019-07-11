import React from 'react';
import { Table } from 'antd';
import MUtil        from 'util/mm.jsx'
const _mm   = new MUtil();

// var receiveData=['临江镇','中都镇','古田镇','南阳镇','旧县镇'];//上杭版
// var receiveData=['山城镇','丰田镇','靖城镇','龙山镇','金山镇'];//南靖版
// var receiveData=['武安镇','岩溪镇','陈巷镇','枋洋镇','坂里乡'];//长泰版
// var receiveData=['蓝田镇','步文镇','郭坑镇','朝阳镇','蓝田开发区管委会'];//龙文镇
// var receiveData=['共和街居委会','解放街居委会','石美街居委会','侨兴街居委会','团结居委会'];//角美镇
// var receiveData=['双溪街道','建西镇','洋口镇','元坑镇','埔上镇'];//顺昌
// var receiveData=['吴航街道','漳港街道','首占镇','玉田镇','松下镇'];//长乐
// var receiveData=['松城街道','松港街道','长春镇','牙城镇','溪南镇'];//霞浦
// var receiveData=['青阳街道','梅岭街道','西园街道'];//晋江
// var receiveData=['石码镇','海澄镇','角美镇','白水镇','浮宫镇'];//龙海
// var receiveData=['小溪镇','山格镇','文峰镇','南胜镇','坂仔镇'];//平和
// var receiveData=['鳌阳镇','斜滩镇','南阳镇','武曲镇','犀溪镇'];//寿宁
// var receiveData=['浦南镇','天宝镇','芝山镇','石亭镇','芗城区奶牛场'];//芗城区
// var receiveData=['南诏镇','四都镇','梅岭镇','桥东镇','深桥镇'];//诏安
// var receiveData=['贯岭镇','前岐镇','沙埕镇','店下镇','太姥山镇'];//福鼎
var receiveData=['白竹村委会','观阳村委会','埔径村委会','坪岭村委会','常山管区生活区'];//常山

const { Column, ColumnGroup } = Table;
class ProtectChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          roleId                  :_mm.getStorage('userInfo').roleId,
        }
    }

  render(){

    let data=[];
     if(this.state.roleId==9){
      data = [{
        key: '1',
        unit: receiveData[0],
        total: 1000,
        townRoadTransport: 700,
        villageRoadTransport: 100,
        town:10,
        protectCompany:3,
        highway:20,
        roadClass:1,
        more:5,
        protectMileage:200,
        townRoadProtect:100,
        villageRoadProtect:10,
       
      }, {
        key: '2',
        unit: receiveData[1],
        total: 1500,
        townRoadTransport:1300,
        villageRoadTransport: 100,
        town:20,
        protectCompany:4,
        highway:30,
        roadClass:2,
        more:10,
        protectMileage:500,
        townRoadProtect:200,
        villageRoadProtect:50,
        
      }, {
        key: '3',
        unit: receiveData[2],
        total: 2000,
        townRoadTransport:2000,
        villageRoadTransport: 100,
        town:30,
        protectCompany:5,
        highway:40,
        roadClass:3,
        more:15,
        protectMileage:1000,
        townRoadProtect:300,
        villageRoadProtect:200,
      }];
     }

     if(this.state.roleId==10){
      data = [{
        key: '1',
        unit: receiveData[0],
        total: 1000,
        countyRoadTransport: 900,
        townRoadTransport: 700,
        villageRoadTransport: 100,
        county:10,
        protectCompany:3,
        highway:20,
        roadClass:1,
        more:5,
        protectMileage:200,
        countyRoadProtect:150,
        townRoadProtect:100,
        villageRoadProtect:10,
       
      }, {
        key: '2',
        unit: receiveData[1],
        total: 1500,
        countyRoadTransport:1400,
        townRoadTransport: 1300,
        villageRoadTransport: 100,
        county:20,
        protectCompany:4,
        highway:30,
        roadClass:2,
        more:10,
        protectMileage:500,
        countyRoadProtect:300,
        townRoadProtect:200,
        villageRoadProtect:50,
        
      }, {
        key: '3',
        unit: receiveData[2],
        total: 2000,
        countyRoadTransport:2000,
        townRoadTransport: 2000,
        villageRoadTransport: 100,
        county:30,
        protectCompany:5,
        highway:40,
        roadClass:3,
        more:15,
        protectMileage:1000,
        countyRoadProtect:800,
        townRoadProtect:300,
        villageRoadProtect:200,
      }];
     }

     

      return(             
          <div >
              <Table  dataSource={data} bordered  rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }>
                <Column title="单位"  dataIndex="unit" />
                <ColumnGroup title="通车总里程">
                    <Column title="小计" dataIndex="total"/>
                    {this.state.roleId==10?
                       <Column title="县道" dataIndex="countyRoadTransport"/>
                       :null}
                    <Column title="乡道" dataIndex="townRoadTransport"/>
                    <Column title="村道" dataIndex="villageRoadTransport"/>
                </ColumnGroup>
                <ColumnGroup title="采取专业养护镇(个数)">
                    {this.state.roleId==10?
                          <Column title="县(个数)" dataIndex="county"/>
                          :
                          <Column title="乡镇(个数)" dataIndex="town"/>
                    }
                    <Column title="养护企业" dataIndex="protectCompany"/>
                    <Column title="公路局代养" dataIndex="highway"/>
                    <Column title="组建道班" dataIndex="roadClass"/>
                    <Column title="含上述2种以上" dataIndex="more"/>
                </ColumnGroup>
                <ColumnGroup title="专业化养护里程">
                    <Column title="管养里程小计" dataIndex="protectMileage"/>
                    {this.state.roleId==10?
                          <Column title="县道" dataIndex="countyRoadProtect"/>
                          :
                         null
                    }
                    <Column title="乡道" dataIndex="townRoadProtect"/>
                    <Column title="村道" dataIndex="villageRoadProtect"/>
                </ColumnGroup>
            </Table>
          </div>               
      )
  }
}

export default ProtectChart;
