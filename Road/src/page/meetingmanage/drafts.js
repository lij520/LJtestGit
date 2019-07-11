import React from 'react';
import { Modal, Button, Input, Upload,Form, message, Icon,Col,Row, Table, Divider,Select } from 'antd';
import BasicMessingModal from './draftsMeetingModal/basicMessingModal'
import $ from 'jquery';
// import moment from 'moment';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
const FormItem = Form.Item;

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
class Drafts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      downloadData: [],
    }
    this.handleDownload = this.handleDownload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpload = () => {

  }
  handleDelete = (record) => {
    console.log(record);
    $.ajax({
      url: "/conference/deleteConference",
      type: "post",
      data: {
        conferenceId:record.conferenceId,
        userId:_mm.getStorage('userInfo').userId,
        token:_mm.getStorage('userInfo').token,
      },
      success: function (data) {
        console.log(data);
        
        alert("success");
      },
      error: function () {
        alert("error");
      }
    })
    this.props.queryConference();
  }
  handleSend = (record) => {
    console.log(record);
    $.ajax({
      url: "/conference/sendConference",
      type: "post",
      data: {
        conferenceId:record.conferenceId,
        userId:_mm.getStorage('userInfo').userId,
        token:_mm.getStorage('userInfo').token,
      },
      success: function (data) {
        console.log(data);
        
        alert("success");
      },
      error: function () {
        alert("error");
      }
    })
    this.props.queryConference();
 
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
  
  
  state = {
    visible: false,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  }

  showModal = (record) => {
    window.selectValue=record;
    this.basicMessingModal.resetKey();
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
   
    var formtemp=document.getElementById('uploadfile');
    var inputDirectory=document.getElementById('directory');
    var inputFile=document.getElementById('file');
    var inputUser = document.createElement("input"); 
    inputUser.type = "text"; 
    inputUser.name = "userId"; 
    inputUser.value = "1";
    formtemp.appendChild(inputUser);
    formtemp.submit();
    formtemp.removeChild(inputUser);
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
    aIndex: 'fileId',
      title: '会议编号',
      dataIndex: 'conferenceId',
      width: "10%",
    }, {
      title: '会议名称',
      dataIndex: 'conferenceName',
      width: "18%",
    }, {
      title: '会议主题',
      dataIndex: 'theme',
      width: "17%",
    }, {
      title: '会议地点',
      dataIndex: 'site',
      width: "17%",
    }, {
      title: '会议时间',
      dataIndex: 'time',
      width: "17%",
    },
    {
      title: '操作',
      key: 'action',
      width: "25%",
      render: (record) => (
        <div>
          {/* <Button type="primary" shape="circle" ghost="false" size="small" data-record={record} icon="download" onClick={this.handleDownload} />
          < Divider type="vertical" />
          <Button type="primary" shape="circle" ghost="false" size="small" icon="upload" onClick={this.showModal} />
          < Divider type="vertical" /> */}
          <Button size="small" type="primary" onClick={this.showModal.bind(this,record)}>
          查看
        </Button>
        &emsp;
           <Button size="small" type="primary" onClick={this.handleSend.bind(this, record)} >发送</Button> &emsp;
          <Button size="small" type="primary" onClick={this.handleDelete.bind(this, record)} >删除</Button>
         
          

          {/* <Button type="primary" shape="circle" ghost="false" size="small" icon="delete" onClick={this.handleDelete.bind(this, record)} /> */}
          {/* <Button type="primary" shape="circle" ghost="false" size="small" icon="Send" onClick={this.handleSend.bind(this, record)} /> */}
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

//     return (
//       <div>
       
//         {/* <BasicMessingModal visible={this.state.visible} handleCancel={this.handleCancel}/> */}
//         <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
//       </div>);
//   }
// }
// export default  Drafits;;
// const formData=[];
//     this.state.data.map((items,index)=>{
//       formData.push({
//         key: index,     
//         conferenceId:items.conferenceId,
//         conferenceName:items.conferenceName,
//         theme:items.theme,
//         site:items.site,
//         time:moment(items.time).format("YYYY-MM-DD hh:mm:ss a"),
//       })
//     })

return (
  <div>
   
    <BasicMessingModal ref={(basicMessingModal) => {this.basicMessingModal = basicMessingModal;}} visible={this.state.visible} handleCancel={this.handleCancel}/>
    <div  className="meetLists"> <Table  columns={columns} dataSource={this.props.data} rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" }/></div>
  </div>);
}
}
export default Drafts;



