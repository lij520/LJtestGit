
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import ProductList      from './index.jsx';
import ProductSave      from './save.jsx';


class UserAdminRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/user/list" component={ProductList}/>
                <Route path="/user/adduser" component={ProductSave}/>
                <Route path="/user/modifyuser/:pid?" component={ProductSave}/> 
                <Redirect exact from="/user" to="/user/list"/> 
            </Switch>
        )
    }
}
export default UserAdminRouter;