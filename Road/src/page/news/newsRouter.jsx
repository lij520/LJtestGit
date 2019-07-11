import React    from 'react';
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// 页面
import News from './news.jsx';
import AddNews from './addNews.jsx';
import EditNews from './editNews.jsx';
import ReviewNews from './reviewNews.jsx';

class NewsRouter extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/news/list" component={News}/>
                    <Route path="/news/addNews" component={AddNews}/>
                    <Route path="/news/editNews/:newsId?" component={EditNews}/>
                    <Route path="/news/reviewNews/:newsId?" component={ReviewNews}/>
                    <Redirect exact from="/news" to="/news/list"/> 
                </Switch>
                                
            </div>
            

        )
    }
}
export default NewsRouter;