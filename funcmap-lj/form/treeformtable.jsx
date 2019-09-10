import React, { Component } from 'react';
import { Tree, Button, message, Spin, Tooltip } from 'antd';
import { reqAllRegions } from '../../../../ajax-lj/index.jsx';

const { TreeNode } = Tree;


class TreeFormTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: ["350430"],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            formData: [],//获取的区域数据
            treeData: [],  //表格数据
            spinning: false,   // 加载中

            selectedRows: [],//选中的列
        }
    }

    componentDidMount() {
        this.queryData();
    }

    //创建对象树
    createFormTree = (title, key) => {
        var o = new Object();
        o.title = title;
        o.key = key;
        return o;
    }

    //获取区域数据
    queryData = async () => {
        var formData = [], treeDataMap = [], children = [], treeDataMapleaf = {}, j = 0;
        this.setState({ spinning: true });
        const result = await reqAllRegions();
        console.log('result', result);
        if (result.msg === "请求成功") {
            formData = result.data.caCompanies;
            console.log('formdata', formData[1].dwdm.length)
            for (let i = 0; i < formData.length; i++) {
                // if (formData[i].dwdm === "350430") {
                //     // console.log('1!!!!!')
                //     treeDataMapleaf.title = formData[i].dwmc;
                //     treeDataMapleaf.key = formData[i].dwdm;
                // } else 
                if (formData[i].dwdm.length === 8) {
                    // console.log('2!!!!!')
                    var childrebnleafs = [];
                    childrebnleafs[j] = this.createFormTree('(' + formData[i].dwdm + ')' + formData[i].dwmc, formData[i].dwdm);
                    // console.log('childrebnleafs,childrenleaf',childrebnleafs);
                    children.push(childrebnleafs[j]);
                    j++;
                }

            }

            // treeDataMapleaf.children = children;
            // treeDataMap.push(treeDataMapleaf);
            // console.log('treedatamap', treeDataMap,treeDataMapleaf)
            // console.log('treedatamap', children)
            this.setState({
                // treeData: treeDataMap,
                treeData: children,
                spinning: false
            })
        } else {
            console.log(result.msg)
        }

    }

    //操作按钮（单击选中行，再点击相应操作按钮，每行数据在row中获取）
    action(action) {
        // message.info(action, .5);
        if (action == 'select') {
            this.props.onClose(this.state.checkedKeys);//将父组件的modal关掉，仅适用于form中的table
        }

        //新建、删除、编辑后需要重新请求接口数据
        //如果删除时，最后一页只有一条数据，页码需要减一
        //或者操作完都回到第一页
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    //取消
    handleRest = () => {
        this.setState({
            selectedKeys: [],
            checkedKeys: [],
        })
    }

    //退出
    Logout = () => {
        this.props.onCloseModal();
    }
    renderTreeNodes = data =>{
        return data.map(item => {
            // if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {/* {this.renderTreeNodes(item.children)} */}
                        {item.children ? this.renderTreeNodes(item.children) : null}
                    </TreeNode>
                );
            // }
            // return <TreeNode key={item.key} {...item} />;
        });
    }
        


    render() {
        const { spinning, treeData } = this.state;
        const { btnShow } = this.props;

        return (
            <div style={{ overflowY: 'hidden', zIndex: 1, marginTop: '-30px' }}>

                {/* 操作按钮 */}

                <div className="action-row">
                    <Tooltip title="只会选入一个">
                        <Button className="mr5" onClick={() => this.action('select')}>
                            选入</Button>
                    </Tooltip>
                    {
                        btnShow ? <span style={{ verticalAlign: 'bottom' }}>
                            <Button style={{ marginRight: 5 }} onClick={this.handleRest}>清除</Button>
                            <Button onClick={this.Logout}>退出</Button></span> : null
                    }
                </div>

                {/* 列表页表格 */}
                <Spin tip="数据加载中..." spinning={spinning}>
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                        defaultExpandParent={true}
                    >
                        {/* {this.renderTreeNodes(treeData)} */}
                        <TreeNode title="建宁县" key="350430">
                            {this.renderTreeNodes(treeData)}
                        </TreeNode>
                    </Tree>
                </Spin>
            </div>
        );
    }
}

export default TreeFormTable;