import React from 'react';

import { PageHeader,Typography,Row,Col,Icon,Card,List,Avatar,message} from 'antd';
import CompanyForm from './companyForm.jsx';
import CompanyFileTree from './companyFileTree.jsx';
import "./index.scss";
import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const { Paragraph } = Typography;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1084087_mroeh373ps.js',
});
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class NewCompany extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        initLoading: false,
        Regulatory:false,
        CompanyFile:false,
        RegulatoryRecord:false,
        regulatoryRecordList:[{number:'1',startTime:'2019-1-13',need:'是',people:'王东'},
                              {number:'2',startTime:'2019-3-5',need:'否',people:'林晓'},
                              {number:'3',startTime:'2019-4-1',need:'是',people:'张小强'}],
        companyFormData:{},
        tab                : this.props.match.params.pid,
        companyId        : this.props.match.params.aid,
        userId          :_mm.getStorage('userInfo').userId,
        token           :_mm.getStorage('userInfo').token,
      };
    }

    componentDidMount() {
      if(this.state.companyId){
        // this.getData((res) => {
        //   this.setState({
        //     initLoading: false,
        //     regulatoryRecordList: [],
        //     companyFormData:res.data,
        //   });
        // });
      }
    }
  
    getData(callback){
      // var opreationBusCorp={"busCorpName":this.state.companyName};
      $.ajax({
        type        :'post',
        url         :'/roadoperation/opreation-bus-corp/selectById?id='+this.state.companyId+"&userId="+this.state.userId+"&token="+this.state.token,
        data        :null,
        dataType    : "json",
        contentType: 'application/json',
        success     : res => {
          console.log(res)
          if(res.rtnCode ==200){
            callback(res);
          }else{
            message.error(res.msg);
          }
        },
        error: err => {
          message.error("失败！");
        }
      });
    }

    onRegulatoryCard(e){
      this.setState({
        Regulatory:!this.state.Regulatory
      })
    }

    onCompanyFile(e){
      this.setState({
        CompanyFile:!this.state.CompanyFile
      })
    }

    onRegulatoryRecord(e){
      this.setState({
        RegulatoryRecord:!this.state.RegulatoryRecord
      })
    }

    onRegulatoryCardClose(){
      this.setState({
        Regulatory:false
      })
    }

    onCompanyFileClose(){
      this.setState({
        CompanyFile:false
      })
    }
  
    updataCompany(){
      this.getData((res) => {
        this.setState({
          companyFormData:res.data,
        });
      })
    }
   

    render(){
         
          const pathnameArray = this.props.history.location.pathname.split("/");
          let extraContent =null;
          let avatarIcon =null;
          let companyType=null;
          switch(this.state.tab){
            case 'passenger': extraContent=(<IconFont type="icon-traffic" className="newCompany_icon"/>);avatarIcon=(<div style={{color:'#1890ff'}}><IconFont type="icon-traffic" style={{"fontSize":"30px"}}/></div>);companyType="客运";break;
            case 'freight': extraContent=(<IconFont type="icon-jiaotongyunshu" className="newCompany_icon"/>);avatarIcon=(<div style={{color:'#1890ff'}}><IconFont type="icon-jiaotongyunshu" style={{"fontSize":"30px"}}/></div>);companyType="物流";break;
            case 'city': extraContent=(<IconFont type="icon-jiaotongjianguan" className="newCompany_icon"/>);avatarIcon=(<div style={{color:'#1890ff'}}><IconFont type="icon-jiaotongjianguan" style={{"fontSize":"30px"}}/></div>);companyType="汽车";break;
            case 'maintain': extraContent=(<IconFont type="icon-buoumaotubiao46" className="newCompany_icon"/>);avatarIcon=(<div style={{color:'#1890ff'}}><IconFont type="icon-buoumaotubiao46" style={{"fontSize":"30px"}}/></div>);companyType="维修";break;
            // case 'driving': extraContent=(<IconFont type="icon-jiashizhengzhuanru" className="newCompany_icon"/>);avatarIcon=(<div style={{color:'#1890ff'}}><IconFont type="icon-jiashizhengzhuanru" style={{"fontSize":"30px"}}/></div>);companyType="驾培";break;
          }
          const content = (
            <div>
              {pathnameArray[3]=='edit'?
                <Paragraph>
                  修改该公司的监管内容，相关文件以及查看该公司的监管记录
                </Paragraph>
                :
                <Paragraph>
                  新增一个{companyType}公司，定制它的的监管内容，还可以上传该公司的相关文件
                </Paragraph>
              }
              <p className="contentLink">
                {/* <Button>Primary</Button> */}
                <a onClick={(e)=>this.onRegulatoryCard(e)} style={{color:'#1890ff'}}>
                  <Icon type="info-circle" />
                  监管内容
                </a>
                <a onClick={(e)=>this.onCompanyFile(e)} style={{color:'#1890ff'}}>
                  <Icon type="file-text" />
                  公司资料
                </a>
                {pathnameArray[3]=='edit'?
                  <a onClick={(e)=>this.onRegulatoryRecord(e)} style={{color:'#1890ff'}}>
                  <Icon type="form" />
                  监管记录
                  </a>
                  :null
                }
              </p>
            </div>
          );

        

         
          
      return (
        <div style={{background:'#f2f4f5',marginBottom:'50px'}}>
          <PageHeader title={pathnameArray[3]=='edit'?'修改运营公司':'新增运营公司'} style={{background:'#f2f4f5'}}>
          <Row style={{marginTop:'10px',background:'white'}}>
            <Col span={4} >
              <div >{extraContent}</div>
            </Col>
            <Col span={20} style={{paddingLeft:'40px',marginTop:'20px'}}>
              <div >{content}</div>
            </Col>
          </Row>
        </PageHeader>
        {this.state.Regulatory?
          <Row style={{padding:"16px 32px 0px 32px"}}>
            <div  style={{height:"auto",background:'white',padding:"16px 32px 2px 32px"}}>
              <CompanyForm onRegulatoryCardClose={()=>this.onRegulatoryCardClose()} companyFormData={this.state.companyFormData}  updataCompany={()=>this.updataCompany()} companyId={this.state.companyId}/>
           </div>
          </Row>
          :null
        }
        {this.state.CompanyFile?
          <Row style={{padding:"16px 32px 0px 32px"}}>
            <div  style={{height:"auto",background:'white',padding:"16px 32px 2px 32px"}}>
              <CompanyFileTree onCompanyFileClose={()=>this.onCompanyFileClose()}/>
           </div>
          </Row>
          :null
        }
         {this.state.RegulatoryRecord?
          <Row style={{padding:"16px 32px 0px 32px"}}>
            <div  style={{height:"auto",background:'white',padding:"16px 32px 2px 32px"}}>
            <List
            loading={this.state.initLoading}
            itemLayout="horizontal"
            dataSource={this.state.regulatoryRecordList}
            renderItem={item => (
              <List.Item actions={[<a>删除</a>]}>
                  <List.Item.Meta
                    avatar={avatarIcon}
                    title={<a >记录编号：{item.number}</a>}
                    description="任务状态"/>
                    <div className='planText'>
                        <span>新建时间</span>
                        <p>{item.startTime}</p>
                    </div >
                    <div className='planText'>
                        <span>是否需要整改</span>
                        <p>{item.need}</p>
                    </div>
                    <div className='planText'>
                        <span>运管员</span>
                        <p>{item.people}</p>
                    </div>
              </List.Item>
          )}
        />
           </div>
          </Row>
          :null
        }
        <br/>
        <br/>
      </div>
      );
    }
  }

  export default NewCompany;