
import React, { PureComponent } from 'react';
import { Tree, Input, Form } from 'antd';
import PropTypes from 'prop-types';
import menuList from '../../components/config/menuconfig'

const { TreeNode } = Tree;
const Item = Form.Item;

export default class TreeSelect extends PureComponent {

    constructor(props) {
        super(props);
        
        //根据传入角色的menus生成初始状态
        const {menus} = this.props.roleSelect;
        console.log('this.props.roleSelect',this.props.roleSelect)
        this.state = {
            expandedKeys: ['root','/product','/charts'],
            autoExpandParent: true,
            checkedKeys: menus,
            selectedKeys: [],
        };
    }
    
    
    static propTypes = {
        roleSelect: PropTypes.object,
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

    //监听选中某个node的回调
    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys});
    };

    /*
    为父组件获取最新menus数据的方法
    */
    getMenus = ()=>this.state.checkedKeys

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    //目录的树状结构
    renderTreeNodes = menuList => {
        // //使用reduce方法
        // return menuList.reduce((pre, item) => {
        //     pre.push(
        //         <TreeNode title={item.title} key={item.key} dataRef={item}>
        //             {item.children?this.renderTreeNodes(item.children):null}
        //         </TreeNode>
        //     )
        //     return pre;
        // }, []);

        //使用map方法
        return menuList.map(item => {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {item.children ? this.renderTreeNodes(item.children) : null}
                </TreeNode>
            );
        });
    }


    componentWillMount() {
        this.treeNodes = this.renderTreeNodes(menuList);
    }

    //根据新传入的roleSelect来更新checkedKeys状态
    componentWillReceiveProps(nextProps){  //组件接收新的属性时更新
        console.log('componentWillReceiveProps',nextProps);
        const menus = nextProps.roleSelect.menus;
        this.setState({
            checkedKeys:menus,
        })
    }
    
    render() {
        const { roleSelect } = this.props;
        console.log('roleSelect', roleSelect);
        const {checkedKeys} = this.state;
        return (
            <div>
                <Form>
                    <Item style={{ marginLeft: 10 }}>
                        <span>角色名称：</span>
                        <Input value={roleSelect.name} style={{ width: 300 }} disabled />
                    </Item>
                </Form>
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    <TreeNode title="平台权限" key="root">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>

        );
    }
}