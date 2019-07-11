import React from 'react';
import { Tabs, Button ,Input,Icon, Col, Select, InputNumber} from 'antd';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
// import TableList from '../table/index.jsx';
import './index.less';
import './index.scss';

const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const Option = Select.Option;



class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  emitEmpty (){
    //  let inputName=e.target.name,
    //     inputValue=e.target.value;
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }

  onChangeName (e) {
    this.setState({ userName: e.target.value });
  }

  render(){
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={()=>this.emitEmpty()} /> : null;

    return(
    <Tabs defaultActiveKey="1" type='card'>
      <TabPane tab="用户信息" key="1"> 
          <div>
              <Input placeholder="用户ID" 
                suffix={suffix}  value={userName}  onChange={(e)=>this.onChangeName(e)}
                ref={node => this.userNameInput = node} style={{width:'150px' ,float:'left',marginRight:'10px'}}/>
              
                <InputGroup compact  className='inputgroup'>
                <Input style={{ width: '35%' }} defaultValue="角色名称" />
                  <Select  style={{ width: '65%' }}>
                      <Option value="系统管理员">系统管理员</Option>
                      <Option value="路长">路长</Option>
                      <Option value="副路长">副路长</Option>
                      <Option value="路长办">路长办</Option>
                      <Option value="道路专管员">道路专管员</Option>
                      <Option value="路长制成员单位">路长制成员单位</Option>
                  </Select>      
                </InputGroup>

              <Input placeholder="地区ID"  
                style={{width:'150px' ,float:'left',marginRight:'10px'}}/>
              <Input placeholder="组织ID"  
                style={{width:'150px' ,float:'left',marginRight:'10px'}}/>
              <Button  style={{ float:'left',marginLeft:'40px' }}>查询</Button> 

              <Router>
                <Switch>
                  <Route  path='/user-admin' render={props=>(
                    <div> 
                     <Button  style={{ float:'left',marginLeft:'20px' }}>新增</Button>
                      <br /> <br /> 
                      <hr />
                     {/* <TableList /> */}
                     </div>
                  )}/>
                  {/* <Route  path='/user' component={TableList}/>  */}
               
            
                </Switch>
              </Router>
             
          </div>

      </TabPane>
    </Tabs>
    )
  }
}

export default Tab;