import React, { Component } from 'react';
import { Input, Form, Button, Tree, Row } from 'antd';
import PropTypes from 'prop-types';
import { treeData } from './constcolums.jsx';

const { TreeNode } = Tree;
const Item = Form.Item;

const defaultAllKeys = [],defalutkeys=[];

class ExportForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            checkedKeys: defalutkeys,
            selectedKeys: [],
            showVisible : 1
        }
    }

    static propTypes = {
        setForm: PropTypes.func.isRequired  //用来传递form对象的数据
    }

    componentWillMount() {
        this.props.setForm(this.props.form);
        for(let i =0 ;i<treeData.length;i++){
            defaultAllKeys.push(treeData[i].key);
            if(i<23){
                defalutkeys.push(treeData[i].key);
            }
        }
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
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

    //全选按钮
    checkAllkeys=()=>{
        this.setState({
            checkedKeys:defaultAllKeys
        })
    }
    //清除按钮
    clearCheckedkey=()=>{
        this.setState({
            checkedKeys:[]
        })
    }
    //点击取消和退出关闭modal
    closeModal=()=>{
        this.setState({
            showVisible : 0
        },()=>this.props.changeShowVisible(this.state.showVisible))
    }

    //点击导出按钮
    onExportForm=()=>{
        this.props.exportFormTable();
    }
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    render() {
        const { getFieldDecorator } = this.props.form;
        const {checkedKeys,expandedKeys,selectedKeys} = this.state;
        return (
            <div>
                <Form layout="horizontal" style={{ paddingLeft: 10 }} className="exportform">
                    <Row>
                        <Item style={{ marginLeft: 40 }}>
                            <span>
                                <Button type="primary" style={{ marginRight: 5 }} onClick={this.checkAllkeys}>全选</Button>
                                <Button type="primary" style={{ marginRight: 5 }} onClick={this.clearCheckedkey}>清除</Button>
                                <Button type="primary" onClick={this.closeModal}>退出</Button>
                            </span>
                        </Item>
                    </Row>
                    <Row style={{height:350,overflow:'auto',margin: '0 -11px 0 -21px'}}>
                        <Item>
                            {
                                getFieldDecorator('exportValues', {
                                    initialValue: checkedKeys,
                                })(
                                    <Tree
                                        checkable
                                        expandedKeys={expandedKeys}
                                        onCheck={this.onCheck}
                                        checkedKeys={checkedKeys}
                                        onSelect={this.onSelect}
                                        selectedKeys={selectedKeys}
                                    >
                                        {this.renderTreeNodes(treeData)}
                                    </Tree>
                                )
                            }

                        </Item>
                    </Row>
                    <Row style={{marginLeft:80,marginTop:15}}>
                        <Item>
                            <span>
                                <Button type="primary" style={{ marginRight: 10 }} onClick={this.onExportForm}>导出</Button>
                                <Button type="primary" onClick={this.closeModal}>取消</Button>
                            </span>
                        </Item>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(ExportForm);