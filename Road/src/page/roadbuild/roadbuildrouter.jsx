import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import RoadBuild      from './index.jsx';
import TeamCheck      from './teamcheck.jsx';
import CountyCheck    from './countycheck.jsx';


class RoadBuildRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/roadbuild/list" component={RoadBuild}/>
                <Route path="/roadbuild/check/:pid/:tid?" component={TeamCheck}/>
                <Route path="/roadbuild/countycheck/:sid?" component={CountyCheck}/>
                <Redirect exact from="/roadbuild" to="/roadbuild/list"/> 
            </Switch>
        )
    }
}
export default RoadBuildRouter;