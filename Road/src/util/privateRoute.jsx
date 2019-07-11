import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import { Alert } from 'antd';
import MUtil        from 'util/mm.jsx'
const _mm   = new MUtil();

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: window.sessionStorage.getItem("userInfo") ? true: false,
            roleId  : _mm.getStorage('userInfo').roleId,
        }
    }

    componentWillMount() {
        if(!this.state.isAuthenticated){
            const {history} = this.props;
            setTimeout(() => {
                // if(this.state.roleId==13||this.state.roleId==14){
                //     history.replace("/");
                // }
                // history.replace("/police");
                window.history.back(-1);
            }, 1000)
        }
    }


    render() {
        let { component: Component} = this.props;
        return  this.state.isAuthenticated ? 
        (<Route  render={(props) => ( <Component {...props} /> )}/> ) 
        : ( <Alert
            message="请登录！"
            description="您还未登录，请返回登录页登录"
            type="error"
            showIcon
          />)

    }
}

export default withRouter(PrivateRoute);