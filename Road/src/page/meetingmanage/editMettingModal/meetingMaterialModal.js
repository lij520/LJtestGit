import React from 'react';
import { Modal, Button, Input, Upload, message, Icon, Table, Col, Divider, Select, Form, Row } from 'antd';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

var FormItem = Form.Item;
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
      message.success(`${info.file.name} 上传成功 。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  },
};






let userIdUpload = [];
let downloadDatas = [];
let data = [];
let directoryNameUpload = "";
class MeetingMaterial extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      downloadData: [],
      data: []
    }
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpload = () => {

  }
  handleDelete = (record) => {
    console.log(record);
    this.deleteConferenceFile(record.conferenceFileId);
  }

  handleDownload = (record) => {
    console.log(record);
    this.downloadConferenceFile(record.conferenceFileId);
  };
  //uerId和directoryName向后端发起的请求参数，response为请求结束后端传来的数据
  componentWillMount() {
    this.queryConferenceFile();
    /* $.ajax({
      url: "http://192.168.3.171:8085/conferenceFile/uploadConferenceFile",
      type: "Post",
      async: false,
      data: {
        organizationId: 1,
        directoryName: "会议材料"
      },
      success: function (res) {
        //alert("成功");
        data = res;
        console.log(data);
      },
      error: function () {
        alert("失败");
      }
    })
    this.setState();
 */
  }
  //查询已上传会议列表数据
  queryConferenceFile = () => {
    var myThis = this;
    $.ajax({
      url: "/conferenceFile/queryConferenceFile",
      type: "Post",
      async: false,
      data: {
        organizationId: 1,
        userId:_mm.getStorage('userInfo').userId,
        token:_mm.getStorage('userInfo').token,
        conferenceId: window.selectValue.conferenceId,
        /* fileName:-1 */
      },
      success: function (res) {
        // alert("成功");
        data = res.conferenceFileList;
        console.log(data);
        myThis.setState({
          data
        })
      },
      error: function () {
        alert("失败");
      }
    })
  }
  //下载会议材料
  downloadConferenceFile = (conferenceFileId) => {
    $('<form action="/conferenceFile/downloadConferenceFile" method="' + ('GET' || 'post') + '">' +  // action请求路径及推送方法
      '<input type="text" name="conferenceFileId" value="' + conferenceFileId + '"/>' + // 文件名称
      '<input type="text" name="userId" value="' + _mm.getStorage('userInfo').userId + '"/>' + 
      '<input type="text" name="token" value="' +_mm.getStorage('userInfo').token + '"/>' + 
      '</form>')
      .appendTo('body').submit().remove();
  }
  //删除会议材料
  deleteConferenceFile = (conferenceFileId) => {
    var MyThis = this;
    $.ajax({
      url: "/conferenceFile/deleteConferenceFile",
      type: "POST",
      data: {
        conferenceFileId: conferenceFileId,
        userId:_mm.getStorage('userInfo').userId,
        token:_mm.getStorage('userInfo').token,
      },
      success: function (data) {
        console.log(data);
        alert("success");
        MyThis.queryConferenceFile();
      },
      error: function () {
        alert("error");
      }
    })
  }
  //上传文件
  uploadConferenceFile=(formData)=>{
    var MyThis = this;
    $.ajax({
      url: "/conferenceFile/uploadConferenceFile",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log(data);
        alert("success");
        MyThis.queryConferenceFile();
      },
      error: function (message) {
        alert("error");
        console.log(message);
      }
    })
  }
  state = {
    visible: false,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    fileList: [],
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  nextStep = () => {
    console.log('nextStep');
    this.props.handelNextStep("4");
  }
  LastStep = () => {
    console.log('nextStep');
    this.props.handelNextStep("2");
  }
  handleOk = (e) => {
    var values = this.props.form.getFieldsValue();
    console.log(values);
    // var formData = new FormData();
    // formData.append("file",values.file.file);
    // formData.append("organizationId",values.organizationId);
    // formData.append("conferenceId",values.conferenceId)
    var formData = new FormData();
    formData.append("file",values.file.file);
    // formData.append("organizationId",values.organizationId);
    formData.append("conferenceId",values.conferenceId)
    formData.append("userId",_mm.getStorage('userInfo').userId);
    formData.append("token",_mm.getStorage('userInfo').token); 
    this.uploadConferenceFile(formData);

    /*var formtemp = document.getElementById('file');
     var inputUser = document.createElement("input");
    inputUser.conferenceFileId =values.conferenceFileId;
    inputUser.organizationId = values.organizationId;
    formtemp.appendChild(inputUser);
    formtemp.submit();
    formtemp.removeChild(inputUser); */
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
      title: '会议材料编号',
      dataIndex: 'conferenceFileId',
      width: "25%",
    }, {
      title: '文件名称',
      dataIndex: 'fileName',
      width: "25%",
    }, {
      title: '上传时间',
      dataIndex: 'submitTime',
      width: "25%",
    }, {

      title: '操作',
      key: 'action',
      render: (record) => (
        <div>
          <Button type="primary" shape="circle" ghost="false" size="small" data-record={record} icon="download" onClick={this.handleDownload.bind(this, record)} />
          < Divider type="vertical" />

          <Button type="primary" shape="circle" ghost="false" size="small" icon="delete" onClick={this.handleDelete.bind(this, record)} />
        </div>
      ),
    }];
    const { selectedRowKeys, data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect(record) {
        downloadDatas = record;
        console.log(downloadDatas);
      },
    };
    const { getFieldDecorator } = this.props.form;
    function handleChange(value) {
      directoryNameUpload = value;
      console.log(` ${value}`);
    }
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      name: "logo",
      listType: "picture",
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
    console.log(window.selectValue);
    return (
      <div>
        <Button type="primary"
          style={{ marginBottom: 16 }}
          onClick={this.showModal}
        >
          上传
        </Button>
        <Modal
          title="文件更新"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* <div>档案编号：<Input placeholder="" ref={(Input) => { this.input = Input }} /></div> */}
          <Form action="/conferenceFile/uploadConferenceFile" method="POST" enctype="multipart/form-data" id="uploadfile">
            {/* <FormItem
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 12 }}
              label="组织ID：">
              {
                getFieldDecorator('organizationId', {
                  rules: [{ required: true, message: '请填写组织ID' }],
                  initialValue: 1,
                })(
                  <Input placeholder="请准确填写会议名称" type={Number} />
                )}
            </FormItem> */}
            <FormItem
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              label="会议编号：">
              {
                getFieldDecorator('conferenceId', {
                  initialValue: window.selectValue.conferenceId,
                  rules: [{ required: true, message: '请填写会议编号' }],
                })(
                  <Input placeholder="请准确填写会议编号" type={Number} />
                )}
                   {/* {
                getFieldDecorator('conferenceId', {
                  rules: [{ required: true, message: '请填写会议编号' }],
                  initialValue: this.props.conferenceId,
                })(
                  <Input placeholder="请准确填写会议编号" type={Number} />
                )} */}
            </FormItem>
            <FormItem
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              label="选择文件：">
              {getFieldDecorator('file', /* {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              } */)(
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" />上传文件
                  </Button>
                </Upload>
                )}
            </FormItem>
          </Form>
        </Modal>

       
        <Table  columns={columns} dataSource={data} />
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.LastStep}>上一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.nextStep}>下一步</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Col>
        </Row>
      </div>);
  }
}

// class MeetingMaterial extends Component {
//   constructor(props) {
//       super(props);
//   }
//   render() {
//       return (
//           <div>
//               <SeoCreateForm handelNextStep={this.props.handelNextStep.bind(this)} />
//           </div>

//       )
//   }
// }
const MeetingMaterials = Form.create()(MeetingMaterial)
export default MeetingMaterials;







