import React from 'react';
import { Tabs } from 'antd';
import { Modal, Button } from 'antd';
import BasicMessage from './basicMessage.js';
import MeetingAgenda from './meetingAgenda.js';
import MeetingMaterial from './meetingMaterial.js';
import Conferee from './conferee.js';
import Accommodation from './accommodation.js';
import MeetingGuide from './meetingGuide.js';
import MeetingList from './meetingList.js';
import Drafits from './drafts.js';
import $ from 'jquery';
import './meetStyle.less';

import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

const TabPane = Tabs.TabPane;

let conferenceId;

class MeetingManageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTabKey: '1',
            data: [],
            meetingData: [],
        };
    }

    /*  addTabChange(key){
         this.setState({
             addTabKey:key,
         })
     } */

    /* onButtonClick(){
        this.setState({
             addTabKey:` ${parseInt(this.state.addTabKey)+1}`, 
             addTabKey:'3', 
        })
        this.setState({})
    }
 */
    handelNextStep(val) {
        this.setState({
            addTabKey: val
        })
    }
    setConferenceId(val){
        conferenceId=val;
        this.setState({});
    }

    componentWillMount() {
        this.queryConference();
        this.queryConferenceMeeting();
      }
      //获取table数据
      queryConference(){
        $.ajax({
          url: "/conference/queryTempConference",
          type: "POST",
          async: false,
          data: {
            organizationId:1,
            userId:_mm.getStorage('userInfo').userId,
            token:_mm.getStorage('userInfo').token,
          },
          
          success:  res => {
            if(res.result == 1){
                this.setState({
                    data:res.tempConferenceList
                  });
              }  
              else if(res.result == -1){
             message.error(res.message);
             window.location.href = '/';
            }
        else{
            message.error('error!');
        }
            },     
          error: function () {
            alert("失败");
          }
        })
       
      }

      queryConferenceMeeting(){
        $.ajax({
          url: "/conference/queryConference",
          
          type: "POST",
          async: false,
          data: {
            userId:_mm.getStorage('userInfo').userId,
            token:_mm.getStorage('userInfo').token,
            organizationId:1
          },
          success:  res=> {
            // alert("成功");
            this.setState({
                meetingData:res.conferenceList
            });
           
          },
          error: function () {
            alert("失败");
          }
        })
       
      }

      changeKey(activekey) {
          console.log("activekey",activekey);
          if(activekey == 2){
                this.queryConference();
          }
          if(activekey == 1){
              this.queryConferenceMeeting();
         }
             
     
          
      }

    render() {
        /* console.log(this.state.addTabKey); */
        return (
            <div>
                <Tabs tabPosition={"top"} style={{ marginBottom: '50px' }} onChange={(activekey) => this.changeKey(activekey)}>
                    {/* <TabPane tab="会议列表" key="1" ><TableDemo/></TabPane> */}
                    <TabPane tab="会议列表" key="1"><MeetingList meetingData={this.state.meetingData} queryConferenceMeeting={()=> this.queryConferenceMeeting()}/></TabPane>
                    <TabPane tab="草稿箱" key="2"><Drafits queryConference={() => this.queryConference()} data={this.state.data}/></TabPane>
                    <TabPane tab="新增会议" key="3">
                        {/* <Button onClick={()=>this.onButtonClick()}>点击</Button> */}
                        <Tabs tabPosition={"right"} /* onChange={(e)=>this.addTabChange(e)} */ activeKey={this.state.addTabKey}>
                            <TabPane tab="基本信息" key="1"><BasicMessage setConferenceId={this.setConferenceId.bind(this)} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                            <TabPane tab="会议议程" key="2"><MeetingAgenda conferenceId={conferenceId} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                            {/* <TabPane tab="会议材料" key="3"><MeetingMaterial/></TabPane> */}
                            <TabPane tab="会议材料" key="3"><MeetingMaterial conferenceId={conferenceId} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                            <TabPane tab="参会人员" key="5"><Conferee conferenceId={conferenceId} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                            <TabPane tab="食宿安排" key="6"><Accommodation conferenceId={conferenceId} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                            <TabPane tab="会议指南" key="8"> <MeetingGuide conferenceId={conferenceId} handelNextStep={this.handelNextStep.bind(this)} /></TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default MeetingManageOne;


