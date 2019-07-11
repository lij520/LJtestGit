import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,Switch,Route,Link} from 'react-router-dom';
import HomeLayout from 'component/layout/index.jsx';
import Home from 'page/home/hometest.jsx';

import RoadManageChart from 'page/home/roadmanagechart.jsx';
import RoadProtectChart from 'page/home/roadprotectchart.jsx'
import RoadbuildShow from 'page/home/roadbuild/roadbuildShow.jsx';

// import Login from 'page/login/index.jsx';
import LoginShow from 'page/login/loginShow.jsx';

import UserAdminRouter from 'page/usermanagement/useradminrouter.jsx';
import Userothers from 'page/usermanagement/user.jsx';
import FileRouter from 'page/file/fileRouter.jsx';
import AppActivity from 'page/show/index.jsx';
import RoadManageRouter from 'page/roadmanage/roadmanagerouter.jsx';
import RoadProtectRouter from 'page/roadprotect/roadprotectrouter.jsx';

import AfficheRouter from 'page/affiche/afficherouter.jsx';
import RoadBuildRouter from 'page/roadbuild/roadbuildrouter.jsx';
import MeetingManage from 'page/meetingmanage/index.jsx';
import OneMap from './page/oneMap/map/index.js';
import OneMapOperation from 'page/home/roadOperation/map/index.js';

import Check from './page/check/index.jsx';
import RoadOperationRouter from 'page/roadoperation/roadOperationRouter.jsx';
import NewsRouter from 'page/news/newsRouter.jsx';
import PrivateRoute from "util/privateRoute.jsx";
import './index.less';

class APP extends React.Component{
  
  render(){

    // let LayoutRouter = (
    //   <HomeLayout className='homelayout'> 
    //     <Switch>
    //       <Route exact path='/' component={Home}/>
    //       <Route   path='/user' component={ UserAdminRouter}/>
    //       <Route   path='/file' component={ TableDemok}/>
    //       <Route path="/appactivity" component={AppActivity}/>
    //       <Route  path='/userothers' component={Userothers}/>
    //     </Switch>
    //   </HomeLayout> 
    // );
    return (
      <Router>
        {/* <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" render={ props => LayoutRouter}/>

        </Switch> */}
         <Switch>
            {/* <Route exact path='/' component={Login}/> */}
            <Route exact path='/' component={LoginShow}/>
            <HomeLayout className='homelayout'>
              <Switch>
                  <PrivateRoute    path='/home' component={Home}/>
                  <PrivateRoute    path='/roadmanagechart' component={RoadManageChart}/>
                  <PrivateRoute    path='/roadprotectchart' component={RoadProtectChart}/>
                  <PrivateRoute    path='/roadbuildchart' component={RoadbuildShow}/>
                  {/* <PrivateRoute    path='/home' component={HomeShow}/> */}
                  <PrivateRoute    path='/user' component={ UserAdminRouter}/>
                  <PrivateRoute   path='/file' component={FileRouter}/>
                  <PrivateRoute  path="/appactivity" component={AppActivity}/>
                  <PrivateRoute  path='/userothers' component={Userothers}/>
                  <PrivateRoute  path='/roadmanage' component={ RoadManageRouter}/>
                  <PrivateRoute  path='/roadprotect' component={ RoadProtectRouter}/>
                  
                  <PrivateRoute path='/map' component={OneMap}/>
                  <PrivateRoute  path='/roadbuild' component={RoadBuildRouter}/>
                  <PrivateRoute  path='/affiche' component={AfficheRouter}/>
                  <PrivateRoute  path='/meeting' component={MeetingManage}/>
                  <PrivateRoute  path='/check' component={Check}/>
                  <PrivateRoute  path='/roadoperation' component={RoadOperationRouter}/>
                  <PrivateRoute  path='/news' component={NewsRouter}/>
                  <PrivateRoute path='/mapOperation' component={OneMapOperation}/>

                 
              </Switch>
            </HomeLayout>
          </Switch>
      </Router>
    );
  }
}


ReactDOM.render(
    <APP/>
  ,
   document.getElementById('app')
);





