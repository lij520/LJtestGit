import React,{ Component } from 'react';
import BaseMapCounty from './baseMapCounty';
//import BaseMapCity from './baseMapCity';

import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

class OneMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
          roleId  : _mm.getStorage('userInfo').roleId,
          //roleId:9,
          regionId: _mm.getStorage('userInfo').regionId,
          //regionId:350800000000 //龙岩
          //regionId:'350582000000' //晋江
          //regionId:350627000000
          userId: _mm.getStorage('userInfo').userId,
          token:_mm.getStorage('userInfo').token,
        }
    }

    componentWillMount(){
      document.title = "地图展示" ;
    }
  render() {
    
    let index_OneMap=null;

    switch(this.state.roleId){
      case 8: case 9: case 12: case 13:index_OneMap=(
        <BaseMapCounty roleId={this.state.roleId} regionId={this.state.regionId} userId={this.state.userId} token={this.state.token}/>
      ); 
      break;

      case 10: case 14:index_OneMap=null;
      // (
      //   <BaseMapCity roleId={this.state.roleId} regionId={this.state.regionId} userId={this.state.userId} token={this.state.token}/>
        
      
      // ); 
      break;
    }
    return (
       <div style={{height:'100%'}}>
         {index_OneMap}
       </div>
    );
  }
}

export default OneMap;
