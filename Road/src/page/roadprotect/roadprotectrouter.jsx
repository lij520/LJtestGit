
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';


// 页面
import RoadProtect      from './index.jsx';
import RoadProtectAdd from './roadProtectAdd.jsx';
import RoadProtectCheck from './check.jsx';
import ProtectPlan from './protectPlan.js';
import PatrolCondition from './patrolCondition.jsx';
import ProtectChart from './protectChart.jsx';

class RoadProtectRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/roadprotect/list" component={RoadProtect}/>
                <Route path="/roadprotect/check/:pid/:tid/:zid/:aid/:bid/:cid/:did/:eid/:fid/:gid?" component={RoadProtectCheck}/> 
                <Route path="/roadprotect/add" component={RoadProtectAdd}/> 
                <Route path="/roadprotect/protectplan" component={ProtectPlan}/> 
                <Route path="/roadprotect/patrolcondition" component={PatrolCondition}/> 
                {/* <Route path="/roadmanage/roadConditions" component={RoadConditions}/>  */}
                <Route path="/roadprotect/protectchart" component={ProtectChart}/> 
                <Redirect exact from="/roadprotect" to="/roadprotect/list"/> 
            </Switch>
          
        )
    }
}
export default RoadProtectRouter;