import React    from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

// 页面
import Plan from './plan.jsx';
import Manage from './manage.jsx';
import NewCompany from './newCompany.jsx';
import RoadOperationCheck from './check.jsx';

class RoadOperationRouter extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/roadoperation/plan/new/:pid?" component={NewCompany}/>
                    <Route path="/roadoperation/plan/edit/:pid/:aid?" component={NewCompany}/>
                    <Route path="/roadoperation/plan" component={Plan}/>
                    <Route path="/roadoperation/manage" component={Manage}/>
                    <Route path="/roadoperation/check/:pid?" component={RoadOperationCheck}/>
                    {/* <Route path="/roadoperation/transport" component={Transport}/>
                    <Redirect exact from="/roadoperation" to="/roadoperation/bus"/>  */}
                </Switch>
                                
            </div>
            

        )
    }
}
export default RoadOperationRouter;
