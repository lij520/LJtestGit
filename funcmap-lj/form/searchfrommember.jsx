/**
 * 使用表格
 * 引用绝对路径 @table 文件夹下 
 */

import React, { Component } from 'react';
import { message } from 'antd';
// import $ from 'jquery';
import NewTable from 'component/table/table.jsx';
import TopRowSearch from '@table/search-lj.jsx';
import { columns, roaderAndmanager, matanceAndCompany, roadLineCode } from '@table/common-lj.js';
import { reqRoaderAndmanager, reqMantanceAndCompany, reqRoadLineCode, reqcaUserTypeList, reqglUserTypeList } from '../../../../ajax-lj/index.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const userAera = _mm.getStorage('user');

class SearchFormTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1, //当前页码
      pageSize: 40, //每页条数
      total: 0,  //总条数

      data: [],  //表格数据
      spinning: false,   // 加载中

      selectedRows: [],//选中的列
      flag: 1,
      userRegion_id: userAera.sadminarea,  //登陆者所在区域ID
    }
  }

  queryData = async (pageNo, pageSize, usertype, account) => {
    this.setState({ spinning: true });
    console.log('account', account);
    var data = [], result, userlist;
    var list = ['glUserList', 'caUserList'];
    const { userRegion_id } = this.state;
    if (account === undefined) {
      if (usertype.length === 3) {  //村路长007/乡路长006/专管员010
        result = await reqRoaderAndmanager(pageNo, pageSize, usertype);
        userlist = list[0];
      } else if (usertype === "roadcode") {
        result = await reqRoadLineCode(userRegion_id, 1, '', '', pageNo, pageSize);
      } else { //养护队2/保险公司5/路政中队3/运管部门4
        result = await reqMantanceAndCompany(pageNo, pageSize, usertype);
        userlist = list[1];
      }
    }else{
      if (usertype.length === 3) {  //村路长007/乡路长006/专管员010
        result = await reqglUserTypeList(account);
        userlist = list[0];
      } else if (usertype === "roadcode") {
        result = await reqRoadLineCode(userRegion_id, 1, '', '', pageNo, pageSize);
      } else { //养护队2/保险公司5/路政中队3/运管部门4
        result = await reqcaUserTypeList(account);
        userlist = list[1];
      }
    }

    if (usertype === "roadcode" && result.msg === "请求成功") {
      console.log('roadcode', result)
      result.data.map((item, index) => {
        data.push({
          key: index,
          ...item
        })
      })
      this.setState({ data, spinning: false, total: result.data[0].itime });
    } else if (result.msg === "请求成功") {
      result.data[userlist].map((item, index) => {
        data.push({
          key: index + 1,
          ...item
        })
      })
      this.setState({ data, spinning: false, total: result.data.total });
    } else {
      console.log(result.msg)
    }
  }

  //操作按钮（单击选中行，再点击相应操作按钮，每行数据在row中获取）
  action(action) {
    // message.info(action, .5);
    console.log('this.state.selectedRows', this.state.selectedRows)
    if (action == 'select') {
      this.props.onClose(this.state.selectedRows);//将父组件的modal关掉，仅适用于form中的table
    }

    //新建、删除、编辑后需要重新请求接口数据
    //如果删除时，最后一页只有一条数据，页码需要减一
    //或者操作完都回到第一页
  }

  //当页码发生变化
  onPageChange(page, pageSize) {
    //重新请求
    this.queryData(page, pageSize, this.susertype);
    // console.log('当前页数',page);
    this.setState({ pageNo: page });
  }

  //当pageSize发生变化
  onPageSizeChange(current, size) {
    this.setState({ pageNo: 1, pageSize: size }, () => {
      //返回第一页，并重新请求
      this.queryData(1, size, this.susertype);
    })
  }


  //高级查询
  onSearchChange(params) {
    console.log("查询参数：", params);
  }

  //选中列
  rowSelection(selectedRowKeys, selectedRows) {
    this.setState({
      selectedRows: selectedRows
    })
  }

  //新的高级查询条件值
  searchHeaderChange = async (value) => {
    console.log('values here', value);  //////明天再写
    const { pageNo, pageSize } = this.state;
    const account = value.iValue;
    this.queryData(pageNo, pageSize, this.susertype, account)
  }

  //刷新
  Refresh = () => {
    const { pageNo, pageSize } = this.state;
    this.queryData(pageNo, pageSize, this.susertype);
  }

  //清楚选择
  ClearAll = () => {
    this.setState({
      selectedRows: []
    })
  }
  //退出
  Logout = () => {
    this.props.LogoutModal();
  }

  componentWillMount() {

    if ((RegExp(/路长/).test(this.props.label)) || (RegExp(/专管员/).test(this.props.label))) {
      this.columns = roaderAndmanager;
    } else if ((RegExp(/养护队/).test(this.props.label)) || (RegExp(/保险/).test(this.props.label)) || (RegExp(/中队/).test(this.props.label)) || (RegExp(/运管/).test(this.props.label))) {
      this.columns = matanceAndCompany;
    } else if ((RegExp(/路线代码/).test(this.props.label))) {
      this.columns = roadLineCode;
    } else {
      this.columns = columns;
    }
    this.susertype = this.props.susertype;
  }

  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.queryData(pageNo, pageSize, this.susertype);  //后端分页请求数据
  }

  render() {
    const { pageNo, pageSize, total, spinning } = this.state;
    const { btnShow, label } = this.props;
    const { columns } = this;
    const type = 'list';  //表格类型（list、map）
    return (
      <div>
        <TopRowSearch
          type={type}  //顶部高级查询样式
          onSearchChange={(params) => this.onSearchChange(params)}
          flag={this.state.flag}
          searchHeaderChange={this.searchHeaderChange}
        />
        <NewTable
          spinning={spinning}  //加载中
          columns={columns}  //表头
          data={this.state.data}  //数据
          pageNo={pageNo} //当前页码
          pageSize={pageSize}  //每页条数
          total={total}  //总数
          action={(action) => this.action(action)}  //操作按钮
          rowSelection={(selectedRowKeys, selectedRows) => this.rowSelection(selectedRowKeys, selectedRows)}
          onPageChange={(page, pageSize) => this.onPageChange(page, pageSize)}  //页码发生变化
          onPageSizeChange={(page, pageSize) => this.onPageSizeChange(page, pageSize)}  //每页条数发生变化
          btnShow={btnShow}
          label={label}
          Refresh={this.Refresh}
          ClearAll={this.ClearAll}
          Logout={this.Logout}
        />
      </div>
    );
  }
}

export default SearchFormTable;