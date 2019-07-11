import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import MySubmitList    from './mySubmitList.jsx';
import AfficheAdd     from './afficheAdd.jsx';
import IsNoRemindList       from './isNoRemindList.jsx';


class AfficheRouter extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/affiche/list" component={IsNoRemindList}/>
                    <Route path="/affiche/submit" component={MySubmitList}/>
                    <Route path="/affiche/adduser" component={AfficheAdd}/>
                    <Route path="/affiche/modifyuser/:pid?" component={AfficheAdd}/> 
                    <Redirect exact from="/affiche" to="/affiche/list"/> 
                </Switch>
                                
            </div>
            

        )
    }
}
export default AfficheRouter;