import React from 'react';
// import { Tabs } from 'antd';
// import { Modal, Button } from 'antd';
import MeetingManageOne from './meetingmanagerone';

import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

// const TabPane = Tabs.TabPane;

// let conferenceId;

class MeetingManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          roleId  : _mm.getStorage('userInfo').roleId,
          regionId: _mm.getStorage('userInfo').regionId,
          userId: _mm.getStorage('userInfo').userId,
          token:_mm.getStorage('userInfo').token,
        };
    }

    componentWillMount(){
      document.title = "会议管理" ;
    }

    render() {
        /* console.log(this.state.addTabKey); */
        let meetingMang = null;

        switch(this.state.roleId){
          case 8: case 9: case 10: case 12: case 13: case 14: meetingMang=(
            <MeetingManageOne roleId={this.state.roleId} regionId={this.state.regionId} userId={this.state.userId} token={this.state.token} />
          );
          break;
        }
        return (
            <div>
                {meetingMang}
            </div>
        );
    }
}
export default MeetingManage;


