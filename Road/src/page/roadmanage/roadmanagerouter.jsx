
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import RoadManageAdd from './roadManageAdd.jsx';

// 页面
import RoadManage      from './index.jsx';
import RoadManageCheck      from './check.jsx';
import RoadConditions from './roadConditions.jsx';

class RoadManageRouter extends React.Component{
    render(){
        return (
            <Switch>
                {/* <Route path="/roadmanage/list" component={RoadManage}/> */}
                <Route path="/roadmanage/list" component={RoadManage}/>
                {/* <Route exact path="/roadmanage/check" component={RoadManageCheck}/> */}
                <Route path="/roadmanage/check/:pid/:tid/:zid/:aid/:bid/:cid/:did/:eid/:fid/:gid?" component={RoadManageCheck}/> 
                <Route path="/roadmanage/add" component={RoadManageAdd}/> 
                <Route path="/roadmanage/roadConditions" component={RoadConditions}/> 
                <Redirect exact from="/roadmanage" to="/roadmanage/list"/> 
            </Switch>
        )
    }
}
export default RoadManageRouter;