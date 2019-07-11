//新增通知
import React from 'react'
import { Link } from 'react-router-dom';
import { Steps, Button, message, Icon, Spin} from 'antd';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx'
import StepsThird from './stepsThird.jsx';
import AddFirstForm from './firstForm.jsx';
import AddSecondForm from './secondForm.jsx';
import $ from 'jquery';

import './index.scss'

const _mm   = new MUtil();
const Step  = Steps.Step;
const steps = [{ title: '通知内容', content: 'First-content',},
               { title: '通知对象', content: 'Second-content',},
               { title: '发布完成', content: 'Last-content',}];

class AfficheAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      firstData: [],
      secondData: [],
      isSubmit: 0,
      loading: false,
    };
  }

  setFirstData(data) {
    this.setState({
      firstData: data,
    });
  }
  setSecondData(data) {
    this.setState({
      secondData: data,
    });
  }

  changeLoadingStatus(bol) {
    this.setState({
      loading: bol,
    })
  }

  onSubmit() {
    this.setState({
      loading: true,
    })

    const {firstData} = this.state;
    const {secondData} = this.state;

    console.log(Object.getOwnPropertyNames(this.state.secondData).length);
    console.log('123',_mm.getStorage('userInfo').regionId.substring(0,6));

    var   check_val = " ";
    const objLength = Object.getOwnPropertyNames(this.state.secondData).length; //对象个数

    if(objLength == 1){  //regionId默认为本地缓存中regionId的前六位(roleId = 9)
      check_val = _mm.getStorage('userInfo').regionId.substring(0,6);
    }
    if(objLength == 2){
      console.log(secondData.region.length);
      const length = secondData.region.length;
      if(length == 0){
        message.info("未选择通知区域！");
      }else{
        for(var i = 0; i < length; i++){        
          check_val += (secondData.region[i]) + "+";  //获取checkbox的值，多个值使用“+”进行连接
        }
        check_val += _mm.getStorage('userInfo').regionId.substring(0,6) + "+" ; //市级默认加上 regionId 前六位
        check_val = check_val.substring(0,check_val.length -1 );  //去掉最后一个“+”
        console.log('check_val',check_val);
      }
    }
    
    let formJson = {
      userId       : _mm.getStorage('userInfo').userId,
      token        : _mm.getStorage('userInfo').token,
      title        : firstData.title,
      body         : firstData.body,
      directoryId  : firstData.directoryId,
      outlink      : firstData.outlink,
      level        : secondData.level,
      regionId     : check_val,
    }

    $.ajax({
      type : 'post',
      url  : '/notice/submit',
      data : JSON.stringify(formJson),
      contentType:'application/json;charset=UTF-8',
      success : res => {
        if(res.result == 1){
          //message.success('发布成功！');
          this.setState({
              isSubmit: 1,
              loading: false,
          });
          this.next();
        }
        else if(res.result == -1){
          message.error(res.message);
          window.location.href = '/';
        }
        else{
          message.error(res.message);
        }
        
      },
      error : err => {
        message.error('发布失败！');
      }
    })
  }

  onContinue() {
    const current = this.state.current - 2;
    this.setState({ current });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    console.log('firstData:',this.state.firstData);
    console.log('secondData:',this.state.secondData);
    console.log("isSubmit",this.state.isSubmit);
    return (
      <div id="page-wrapper">
        <Spin
            spinning={this.state.loading}
            size='large'
            tip={<span style={{fontSize:'20px'}}>正在发布......</span>}
            >
          <PageTitle title='新增通知'>
              <Link to="/affiche/submit">
                  <Button type="primary" style={{float:'right',marginTop:'-60px'}}><Icon type="double-left" theme="outlined" />返回</Button>
              </Link>
          </PageTitle>
          <Steps
              current={current}
              style={{ marginTop:'20px' }}
              >
              {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">
            {
              current === 0 && <AddFirstForm setFirstData={(data) => this.setFirstData(data)} next={() => this.next()}/>
            }
            {
              current === 1 && <AddSecondForm setSecondData={(data) => this.setSecondData(data)} onSubmit={() => this.onSubmit()} next={() => this.next()}/>
            }
            {
              current === 2 && <StepsThird isSubmit={this.state.isSubmit}/>
            }
          </div>
          <div className="steps-action">
            {
              current === steps.length - 1
              &&  <Button type="primary" onClick={() => this.onContinue()}>
                    {
                        this.state.isSubmit == 1 ?  "继续发布"  :  "重新发布"
                    }
                  </Button>
            }
          </div>
        </Spin>
      </div>
    );
  }
}

export default AfficheAdd;