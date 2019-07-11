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
    let roleId = this.state.roleId;
    
    if((RegExp("^(350823)").test(this.state.regionId))){
        if(roleId===12){//大队
            roleId=8;
        }else if(roleId===13){//县级
            roleId=9;
        }
    }

    switch(roleId){
      case 8: case 9: index_OneMap=(
        <BaseMapCounty roleId={roleId} regionId={this.state.regionId} userId={this.state.userId} token={this.state.token}/>
      ); 
      break;

      case 10: index_OneMap=null;
      // (
      //   <BaseMapCity roleId={roleId} regionId={this.state.regionId} userId={this.state.userId} token={this.state.token}/>
        
      
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
