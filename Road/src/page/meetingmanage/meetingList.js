import React from 'react';
import { Modal,Form, Button, Input, Upload, message, Icon, Table, Divider, Select } from 'antd';
import EditMettingModal from './editMettingModal/editMettingModal'
import $ from 'jquery';
// import moment from 'moment';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();


const FormItem = Form.Item;
const {TextArea} = Input;
var Option = Select.Option;
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  },
};



let userIdUpload = [];
let downloadDatas = [];
let data = [];
let directoryNameUpload = "";
let selectValue; 
window.visible=false;
class MeetingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      downloadData: [],
      visible:false
    }
    this.handleDownload = this.handleDownload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpload = () => {

  }
  //删除
  handleDelete = (record) => {
    console.log(record);
    $.ajax({
      url: "/conference/removeConference",
      type: "post",
      data: {
        conferenceId:record.conferenceId,
        userId:_mm.getStorage('userInfo').userId,
        token:_mm.getStorage('userInfo').token,
        // token:t1
      },
      success: function (data) {
        console.log(data);
        
        alert("success");
      },
      error: function () {
        alert("error");
      }
    })
    this.props.queryConferenceMeeting();
 
  }
  


  handleDownload = () => {
    console.log(downloadDatas.fileId);
    var fileId = downloadDatas.fileId;
      $('<form action="" method="'+('GET'||'post')+'">' +  // action请求路径及推送方法
                  '<input type="text" name="fileId" value="'+fileId+'"/>' + // 文件名称
              '</form>')
      .appendTo('body').submit().remove();
  };
  //uerId和directoryName向后端发起的请求参数，response为请求结束后端传来的数据
  //获取table数据


  
  showModal = (record) => {
    console.log(record);
    window.selectValue=record;
    this.editMettingModal.resetKey();
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys, record) => {
    console.log(record);
    console.log(selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
 
  render() {
    const columns = [{
    //   title: 'ID',
    //   dataIndex: 'fileId',
    //   width: "6%",
    // }, {
      title: '会议编号',
      dataIndex: 'conferenceId',
      width: "10%",
    }, {
      title: '会议名称',
      dataIndex: 'conferenceName',
      width: "17%",
    }, {
      title: '会议主题',
      dataIndex: 'theme',
      width: "15%",
    }, {
      title: '会议地点',
      dataIndex: 'site',
      width: "20%",
    }, {
      title: '会议时间',
      dataIndex: 'time',
      width: "20%",
    },
    {
      title: '操作',
      key: 'action',
      width: "18%",
      render: (record) => (
        <div>
         
        <Button size="small" type="primary" onClick={this.showModal.bind(this,record)}>
          查看
        </Button>
        &emsp;
         <Button size="small" type="primary" onClick={this.handleDelete.bind(this, record)} >删除</Button>
        </div>
      ),
    }];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect(record) {
        downloadDatas = record;
        console.log(downloadDatas);
      },
    };

    function handleChange(value) {
      directoryNameUpload = value;
      console.log(` ${value}`);
    }
    // const formData=[];
    // this.state.data.map((items,index)=>{
    //   formData.push({
    //     key: index,     
    //     conferenceId:items.conferenceId,
    //     conferenceName:items.conferenceName,
    //     theme:items.theme,
    //     site:items.site,
    //     time:moment(items.time).format("YYYY-MM-DD hh:mm:ss a"),
    //   })
    // })

    return (
      <div>
       
        <EditMettingModal ref={(editMettingModal) => {this.editMettingModal = editMettingModal;}} visible={this.state.visible} handleCancel={this.handleCancel}/>
        <div  className="meetLists"> <Table  columns={columns} dataSource={this.props.meetingData} rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/></div>
      </div>);
  }
}
export default MeetingList;






