import React from 'react';
import { Tree,Button, Row,Col,Input,Tooltip,message,Icon,Tag } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1084087_mroeh373ps.js',
});

class CompanyFileTree extends React.Component{
    constructor(props){
      super(props);
      this.state={
        treeDataTest:[
            {  title: '公司职员表',
              key: '1',  //第一个是目录的key,第二个是文件的key(0-1)
              children: [{
              title: '公司1月份新入员工表',
              key: '1',
              }, {
              title: '公司2月份新入员工表',
              key: '2',
              }, {
              title: '公司3月份新入员工表',
              key: '3',
            }],
          }, {
            title: '车辆信息表',
            key: '2',
            children: [
              { title: '客车3月份新入信息表', key: '1' },
              { title: '货车3月份新入信息表', key: '2' },
              { title: '货车4月份新入信息表', key: '3' },
            ],
          }
        ],
        selected:[],
        folderAdd:null
      }

    };

    onCompanyFileSelect(e){
      this.setState({
        selected:e
      })
    }
  

    add(){
      if(this.state.folderAdd){
        if(this.state.selected.length!=0&&this.state.selected[0].indexOf("-")== -1&&this.state.folderAdd){
          console.log("新增文件",this.state.selected)
        }else{
          console.log("新增文件夹")
        }
      }else{
        message.error("请先输入新建内容");
      }
      
    }
    download(){
      if(this.state.selected.length!=0){
        for(var i in this.state.selected){
          if(this.state.selected[i].indexOf("-")== -1){
            console.log("下载文件夹",this.state.selected[i])
          }else{
            console.log("下载文件",this.state.selected[i])
          }
        }
      }else{
        message.error("请先选择下载内容！")
      }
    } 

    delete(){
      if(this.state.selected.length!=0){
        for(var i in this.state.selected){
          if(this.state.selected[i].indexOf("-")== -1){
            console.log("删除文件夹",this.state.selected[i])
          }else{
            console.log("删除文件",this.state.selected[i])
          }
        }
      }else{
        message.error("请先选择删除内容！")
      }
    }
   
    render(){
        const renderTreeNodes= data => data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} >
                    {renderTreeNodes(item.children)}
                    </TreeNode>
                );
                }
                return <TreeNode {...item}  isLeaf />;
            });

          const treeData=[];
          for(var i=0;i<this.state.treeDataTest.length;i++){
              treeData.push({
                title:null,key:null,children:new Array()
              })
          }

        for(var i=0;i<this.state.treeDataTest.length;i++){
          treeData[i].key=this.state.treeDataTest[i].key;
          treeData[i].title=this.state.treeDataTest[i].title;
          this.state.treeDataTest[i].children.map(item=>{
            treeData[i].children.push({
              key:`${treeData[i].key}-${item.key}`,
              title:item.title,
            })
          })
        
        }
        console.log(treeData)
      return (
        <Row gutter={16}>
            <Col span={16}>
                <DirectoryTree
                    multiple
                    defaultExpandAll 
                    selectedKeys={this.state.selected}
                    onSelect={(e)=>this.onCompanyFileSelect(e)}>
                   {/* <TreeNode > */}
                        {renderTreeNodes(treeData)}
                    {/* </TreeNode> */}
                </DirectoryTree>
            </Col>
            <Col span={8} >
                <Row style={{marginTop:20}} className="companyFileTree_row">
                  <Tag color="blue"> <a onClick={()=>this.add()} style={{color:'#1890ff'}}  ><Icon type="upload" />新增</a></Tag>
                  <Tooltip title="要新增文件时请先选中文件夹">
                    <Input onChange={(e)=> this.setState({folderAdd: e.target.value})} style={{width:'auto',marginLeft:8}} allowClear size="small"/>
                  </Tooltip>
                </Row>
                <Row className="companyFileTree_row">
                  <Tag color="blue"> <a onClick={()=>this.download()} style={{color:'#1890ff'}} ><Icon type="download" />下载</a></Tag>
                </Row>
                <Row className="companyFileTree_row">
                  <Tag color="blue">  <a onClick={()=>this.delete()}  style={{color:'#1890ff'}}><Icon type="delete" />删除</a></Tag>
                </Row>
                <Row className="companyFileTree_row">
                  <Tag color="blue">  <a onClick={()=>this.setState({selected:[]})}  style={{color:'#1890ff'}}> <IconFont type="icon-qingkong" />清空</a></Tag>
                </Row>
                <Row className="companyFileTree_row">
                  <Tag color="blue">  <a onClick={()=>this.props.onCompanyFileClose()} style={{color:'#1890ff'}} ><IconFont type="icon-2guanbi" />关闭</a></Tag>
                </Row>
            </Col>
        </Row>
      );
    }
  }

  export default CompanyFileTree;