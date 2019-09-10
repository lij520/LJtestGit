import React, { Component } from 'react';
import BaseMapCounty from './baseMapCounty';
//import BaseMapCity from './baseMapCity';

import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const user = _mm.getStorage('user');
const token = _mm.getStorage('user').token;
console.log('token',token,user);
// console.log('user,token',user,token);
class OneMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: user.account,
      regionId: user.sadminarea,
      userId: _mm.getStorage('userInfo').userId,
      token: token,
    }
  }

  // componentWillMount() {
  //   document.title = "地图展示";
  // }

  render() {

    return (
      <div style={{ height: '100%' }}>
        <BaseMapCounty account={this.state.account} regionId={this.state.regionId} userId={this.state.userId} token={this.state.token} />
      </div>
    );
  }
}

export default OneMap;
