import React from 'react';
import {List, Avatar, Button, Skeleton, Row,Col,Icon,Tabs,Affix,Input,Pagination,LocaleProvider,message,Modal } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import RegulatoryForm from './regulatoryForm.jsx';
import './index.scss';
import './index.less';
import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();


const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1084087_mroeh373ps.js',
});
const TabPane = Tabs.TabPane;




class Plan extends React.Component{
    constructor(props){
      super(props);
      this.passenger=(
        <IconFont type="icon-traffic" style={{"fontSize":"30px"}}/>
      )
      this.freight=(
        <IconFont type="icon-jiaotongyunshu" style={{"fontSize":"27px"}}/>
      )
      this.city=(
        <IconFont type="icon-jiaotongjianguan" style={{"fontSize":"27px"}} />
      )
      this.maintain=(
        <IconFont type="icon-buoumaotubiao46" style={{"fontSize":"25px"}}/>
      )

      this.state = {
        initLoading     : true,
        list            : [],
        expandRegulatory:false,
        tab             :'passenger',
        tabName         :this.passenger,
        pageSize        : 5,
        page            : 1,
        userId          :_mm.getStorage('userInfo').userId,
        token           :_mm.getStorage('userInfo').token,
        };

        this.data=[{results:[{
          busCorpName:'福建武夷交通运输股份有限公司',
          address:'福建省南平市江滨南路8号',
          phone:'0599－8624806',
          officialPerson:'江银强'
        },{
          busCorpName:'龙岩客运分公司',
          address:'龙岩市新罗区西城西安南路119号19幢1-3层1-3号',
          phone:'0597-3100298',
          officialPerson:'王跃荣'
        },{
          busCorpName:'出租客运分公司',
          address:'龙岩市新罗区罗龙路269号5幢',
          phone:'0597—3396855',
          officialPerson:'王跃荣'
        },{
          busCorpName:'龙岩山海旅游发展有限公司',
          address:'福建省龙岩市罗龙路269号新车站4楼',
          phone:'0597--3100600',
          officialPerson:'王跃荣'
        },
      ]
      },
      {results:[{
        busCorpName:'兆华供应链管理集团有限公司',
        address:'北京市朝阳区酒仙桥北路甲10号IT产业园201号楼D座6层',
        phone:'010-59247999',
        officialPerson:'',
        },{
        busCorpName:'安徽中桩物流有限公司',
        address:'芜湖长江大桥综合经济开发区高安街道经六路',
        phone:'0553-2586666',
        officialPerson:'蓝能旺'
        },{
        busCorpName:'龙岩市龙洲物流配送有限公司',
        address:'新罗区南环西路112号',
        phone:'18039881001',
        officialPerson:'王跃荣'
        },{
        busCorpName:'武平县龙洲物流有限公司',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },
        ]
        },
        {results:[{
        busCorpName:'龙岩汽车客运中心站',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },{
        busCorpName:'武平汽车客运中心站',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },{
        busCorpName:'漳平汽车客运中心站',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },{
        busCorpName:'永定汽车站',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },
        ]
        },
        {results:[{
        busCorpName:'龙岩畅丰专用汽车',
        address:'福建省龙岩高新区莲花大道136号',
        phone:'400-999-0399',
        officialPerson:''
        },{
        busCorpName:'龙岩市鸿升机动车综合性能检测有限公司',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },{
        busCorpName:'龙岩市龙门机动车安全检测有限公司…',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },{
        busCorpName:'龙岩市新宇汽车销售服务有限公司',
        address:'新罗区南环西路112号',
        phone:'0597--3100600',
        officialPerson:'王跃荣'
        },
        ]
        },]
    }



    componentDidMount() {
        // this.getData((res) => {
        //   this.setState({
        //     initLoading: false,
        //     data: res.results,
        //     list: res.results,
        //   });
        // });
        this.setState({
          initLoading: false,
          list: this.data[0].results,
        });
      }
    
      getData(callback){
        // var opreationBusCorp={};
        // console.log("page",this.state.page,"pageSize",this.state.pageSize)
        // $.ajax({
        //   type        :  'post',
        //   url         : '/roadoperation/opreation-bus-corp/listByCondition?userId='+this.state.userId+"&token="+this.state.token+"&page="+this.state.page+"&pageSize="+this.state.pageSize,
        //   data        :JSON.stringify(opreationBusCorp),
        //   dataType    : "json",
        //   contentType: 'application/json',
        //   success     : res => {
        //     console.log(res);
        //     if(res.rtnCode ==200){
        //       callback(res);
        //     }else{
        //       message.error(res.msg);
        //     }
        //   },
        //   error: err => {
        //     message.error("失败！");
        //   }
        // });
        // $.ajax({
        //   type        :  'get',
        //   url         : fakeDataUrl,
        //   dataType    : "json",
        //   contentType: 'application/json',
        //   success     : res => {
        //     callback(res);
        //   },
        // });
      }
    
      // onLoadMore(){
      //   this.setState({
      //     loading: true,
      //     list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
      //   });
      //   this.getData((res) => {
      //     const data = this.state.data.concat(res.results);
      //     this.setState({
      //       data,
      //       list: data,
      //       loading: false,
      //     }, () => {
      //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      //       // In real scene, you can using public method of react-virtualized:
      //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      //       window.dispatchEvent(new Event('resize'));//自动调整浏览器窗口的大小时,发生 resize 事件
      //     });
      //   });
      // }
    
      onTabChange(e){
        console.log(e);
        this.setState({
          tab:e,
        })
        switch(e){
          case 'passenger': this.setState({tabName:this.passenger,list:this.data[0].results});break;
          case 'freight': this.setState({tabName:this.freight,list:this.data[1].results});break;
          case 'city': this.setState({tabName:this.city,list:this.data[2].results});break;
          case 'maintain': this.setState({tabName:this.maintain,list:this.data[3].results});break;
        }
      }

      showConfirm(){

        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: '确认删除此公司？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
              return resolve(true)
            },
            onCancel() {
              return reject(false)
            },
          })
        })  
       
      }

      deleteCompany(e,item){
        console.log(item.id);

        this.showConfirm().then(res => {

            $.ajax({
              type        :'post',
              url         :'/roadoperation/opreation-bus-corp/logicDeleteById?id='+item.id+"&userId="+this.state.userId+"&token="+this.state.token,
              data        :null,
              dataType    : "json",
              contentType: 'application/json',
              success     : res => {
                console.log(res)
                if(res.rtnCode ==200){
                  message.success("已成功删除此公司！");
                  this.getData((res) => {
                    this.setState({
                      initLoading: false,
                      list: res.data,
                      total:res.total
                    });
                  });
                }else{
                  message.error(res.msg);
                }
              },
              error: err => {
                message.error("失败！");
              }
            });
                
        })
        .catch(reject => console.log('cancel'))
      }

      onSizeChange(e,pageSize){
        this.setState({
          pageSize:pageSize,
          page:e,
        }, function() {
          // stateFunction是需要立即用到
          this.getData((res) => {
            this.setState({
              initLoading: false,
              list: res.data,
            });
          });
        })
    }

    onPageNumberChange(e){
        this.setState({
          page:e,
        }, function() {
          // stateFunction是需要立即用到
          this.getData((res) => {
            this.setState({
              initLoading: false,
              list: res.data,
            });
          });
        })
       
    }
    render(){

        const { initLoading, loading, list } = this.state;
        // const loadMore = !initLoading && !loading ? (
        // <div style={{
        //     textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
        // }}
        // >
        //     <Button onClick={()=>this.onLoadMore()}>loading more</Button>
        // </div>
        // ) : null;
 
      
      return (
        <Row style={{'marginRight':'20px'}}>
          
           <Col span={3} gutter={16} className='switchButton'>
           <Affix offsetTop={60}>
             <Tabs tabPosition="left" onChange={(e)=>this.onTabChange(e)} className="test">
              <TabPane 
                tab={<div>
                          <Button shape="circle" size='large' style={{"backgroundColor":'#ca87b8',color:'white'}}>{this.passenger}</Button>
                          <span style={{"color":'#ca87b8'}}>客运</span>
                      </div>}  
                key="passenger">
              </TabPane>
              <TabPane 
                tab={<div>
                        <Button shape="circle" size='large' style={{"backgroundColor":'#e5d16a',color:'white'}}>{this.freight}</Button>
                        <span style={{"color":'#e5d16a'}}>物流</span>
                    </div>}    
                key="freight">
              </TabPane>
              <TabPane 
                tab={ <div>
                        <Button shape="circle" size='large' style={{"backgroundColor":'#58a5cc',color:'white'}}>{this.city}</Button>
                        <span style={{"color":'#58a5cc'}}>汽车</span>
                    </div>}       
                key="city">
              </TabPane>
              <TabPane 
                tab={<div>
                        <Button shape="circle" size='large' style={{"backgroundColor":'#e2986f',color:'white'}}>{this.maintain}</Button>
                        <span style={{"color":'#e2986f'}}>维修</span>
                    </div>}   
                key="maintain">
              </TabPane>
            </Tabs>
            </Affix>
           </Col>
         
          <Col span={21} style={{"paddingLeft":'15px',marginBottom:'40px'}}>
            <Row style={{marginBottom:'10px',background:'#f2f4f5'}}>
              <Row style={{margin:'10px auto',borderBottom:"1px dashed #1890ff",paddingBottom:10}}>
                <Col span={7} >
                      <label style={{ marginLeft:'5px' }}>公司类型</label>
                      <Input placeholder="请输入公司类型" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode"  />
                </Col>
                <Col span={7} >
                      <label style={{ marginLeft:'5px' }}>公司名称</label>
                      <Input placeholder="请输入公司名称" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode"  />
                </Col>
                <Col span={7} >
                      <label style={{ marginLeft:'5px' }}>负责人</label>
                      <Input placeholder="请输入负责人" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode"  />
                </Col>
                <Col span={3} >
                  <a style={{ fontSize: 14,verticalAlign:'-webkit-baseline-middle',color:'#1890ff' }} onClick={this.toggle}>
                    展开 <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
                </Col>
              </Row>
              <Row style={{margin:'10px auto'}}>
                <div style={{marginLeft: 5,marginRight: 10,color:'#1890ff',display:'inline-block',fontSize: 16}}>
                  <Icon type="info-circle" style={{fontSize: 17,marginRight:3}}/>
                  定制监管内容
                </div>
                <span>
                  <a style={{ fontSize: 14,color:'#1890ff' }} onClick={()=>{this.setState({expandRegulatory: !this.state.expandRegulatory})}}>
                    展开 <Icon type={this.state.expandRegulatory ? 'up' : 'down'} />
                  </a>
                </span>
              </Row> 
              {this.state.expandRegulatory?
                <Row style={{padding:"6px 16px 0px 16px"}}>
                  <div  style={{height:"auto",background:'white', padding:"4px 16px 0 16px"}}>
                    <RegulatoryForm/>
                </div>
                </Row>
                :null
              }
            </Row>

              {/* <Row style={{marginTop:'5px'}}>
                    <Col span={8}>
                   
                    </Col>
                    <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>事件编码</label>
                        <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                    <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>巡查人员</label>
                        <Input placeholder="请输入巡查人员" style={{ width:'160px', marginLeft:'5px' }} value={this.state.userName}  name="userName" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
              </Row>
              <Row>
                    <Col span={16} style={{ marginTop:'15px' }}>
                    <label style={{ marginLeft:'15px' }}>起止时间</label>
                    <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} 
                    placeholder={['开始日期', '结束日期']}
                    value={this.state.time}
                    format={dateFormat}/>
                    </Col>
              </Row>
              <div style={{float:'right',marginBottom:'20px'}}>
                    <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                    <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
              </div> */}

            <Button type="dashed" onClick={()=>window.location.href=`#/roadoperation/plan/new/${this.state.tab}`} style={{ width: "100%",marginBottom: "8px" }}>
              <Icon type="plus" /> 添加
            </Button>
            <List
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item actions={[<a href={`#/roadoperation/plan/edit/${this.state.tab}/${item.id}`}>查看</a>, <a onClick={(e)=>this.deleteCompany(e,item)}>删除</a>]}>
                  <List.Item.Meta
                    avatar={<div style={{color:'#1890ff'}}>{this.state.tabName}</div>}
                    title={<a >公司名称：{item.busCorpName}</a>}
                    description={`公司所在地址:${item.address}`}/>
                    <div className='planText'>
                        <span>负责人</span>
                        <p>{item.officialPerson}</p>
                    </div >
                    <div className='planText'>
                        <span>电话</span>
                        <p>{item.phone}</p>
                    </div>
              </List.Item>
          )}
        />
         <LocaleProvider locale={zhCN}>
                    <Pagination
                        style={{float:'right',marginTop:"10px"}} 
                        pageSize={this.state.pageSize}
                        current={this.state.page}
                        total={this.state.total}
                        onChange={(e) => this.onPageNumberChange(e)}
                        showSizeChanger
                        pageSizeOptions={['5','10', '20', '30', '40','50']}
                        onShowSizeChange={(e, pageSize) => this.onSizeChange(e, pageSize)}
                        />
          </LocaleProvider>   
        </Col>
      </Row>
      );
    }
  }

  export default Plan;