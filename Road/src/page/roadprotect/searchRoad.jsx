//巡路任务查询
import React from 'react';
import {Button, Input, message, Select, Row, Col} from 'antd';
import MUtil from 'util/mm.jsx';

import './index.less';

const _mm   = new MUtil();
const Option = Select.Option;

class SearchRoad extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        roadName: '',
        roadCode: '',
        userId: '',
      }
    }

    //查找
    searchList(roadName, userId) {
      this.props.loadTableAndSelectList(roadName, userId);
    }

    //重置
    onReset() {
      this.setState({
          roadName: '',
          roadCode: '',
          userId: '',
      },() => {
        const {roadName, userId} = this.state;
        this.props.loadTableAndSelectList(roadName, userId);
      })
    }

    onSearch() {
      const {roadName, userId} = this.state;
      this.searchList(roadName, userId);
    }

    onSelectRoad(value, option) {
      this.setState({
        roadName: value,
        roadCode: option.key,
      });
    }

    onSelectCode(value, option) {
      this.setState({
        roadCode: value,
        roadName: option.key,
      })
    }

    onSelectChange(value, option, name) {
        console.log(value, option, name);
        this.setState({
          [name]: value,
        })
    }

    render(){
      return(
      	<div>
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
                <span>路段名称：</span>
                {/* <Input name="roadName" value={this.state.roadName} placeholder="请选择路段名称" onChange={(e) => this.onValueChange(e)} style={{width:'40%'}}/> */}
                <Select
                    style={{width:'40%'}}
                    // dropdownStyle={{maxWidth:'140px'}}
                    placeholder="请选择路段名称"
                    showArrow
                    value={this.state.roadName}
                    onSelect={(value, option) => this.onSelectRoad(value, option)}
                    onChange={(value, option) => this.onSelectChange(value, option)}
                    showSearch
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                    {
                      this.props.list.map(item => <Option key={item.roadId} value={item.roadName}>{item.roadName}</Option>)
                    }
                </Select>

                <span style={{marginLeft:20}}>路线编码：</span> 
                <Select
                    style={{width:'40%'}}
                    placeholder="请选择路线编码"
                    showArrow
                    showSearch
                    value={this.state.roadCode}
                    onSelect={(value, option) => this.onSelectCode(value, option)}
                    onChange={(value, option) => this.onSelectChange(value, option)}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                    {
                      this.props.list.map(item => <Option key={item.roadName} value={item.roadId}>{item.roadId}</Option>)
                    }
                </Select>
            </div>
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
                <span>巡路人员：</span>
                <Select
                    style={{width:'40%'}}
                    showArrow
                    value={this.state.userId}
                    onChange={(value, option) => this.onSelectChange(value, option, 'userId')}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                    {
                      this.props.realName.map(item => <Option key={item.user_id}>{item.real_name}</Option>)
                    }
                </Select>

                {/* <span style={{marginLeft:20}}>派发状态：</span>
                <Select
                    style={{width:'40%'}}
                    placeholder="请选择派发状态"
                    showArrow
                    onChange={(value, option) => this.onSelectChange(value, option)}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                    <Option value="1">已派发</Option>
                    <Option value="0">未派发</Option>
                </Select> */}
            </div>
          
            <div style={{float:'right',marginBottom:'10px'}}>
                <Button type="primary" style={{marginLeft:'15px'}} onClick={() => this.onSearch()}>查询</Button>
                <Button type="primary" style={{marginLeft:'10px'}} onClick={() => this.onReset()}>重置</Button> 
            </div>
          
        </div>   
      );
    }
}

export default SearchRoad;
