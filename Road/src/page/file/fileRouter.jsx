
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';


// 页面
import FileManage from './index.jsx';
import FileCheck from './check.jsx';


class FileRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/file/list" component={FileManage}/>
                <Route path="/file/checkname/:pid/:tid?" component={FileCheck}/>
                <Redirect exact from="/file" to="/file/list"/> 
            </Switch>
        )
    }
}
export default FileRouter;