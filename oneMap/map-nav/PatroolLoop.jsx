import  React, { Component } from 'react';
import { Tree } from 'antd';
//import Icon from 'antd';

const requireContext = require.context("./landmarks-highlight",false, /^\.\/.*\.png$/);
const navIcons = requireContext.keys().map(requireContext);

const TreeNode = Tree.TreeNode;
const treeData = [{
    title: <div><img src={navIcons[19]} height="16" width='16'/> 巡路轨迹</div>,
    key: 'Loop',
    children: [
      { title: <div> {/* <img src={navIcons[6]} height="16" width='16'/>  */}应巡路轨迹</div>, key: 'trackLoop' ,},
      { title: <div> {/* <img src={navIcons[7]} height="16" width='16'/>  */}已巡路轨迹</div>, key: 'pathLoop' ,},
    ],
  }];

class PatroolLoop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expandedKeys: [''],
      autoExpandParent: true,
      checkedKeys:[],
      selectedKeys: [],
    }
    this.onExpand=this.onExpand.bind(this);
    this.onCheck=this.onCheck.bind(this);
    this.onSelect=this.onSelect.bind(this);
  }
  

  onExpand (expandedKeys)  {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck (checkedKeys)  {
    this.setState({ checkedKeys });
    this.props.onTransfor(checkedKeys)
  }

  onSelect  (selectedKeys, info)  {
    this.setState({ selectedKeys });
  }

  renderTreeNodes  (data)  {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

export default PatroolLoop