import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Link} from 'react-router-dom'

页面
import Home from 'page/Home/index.jsx';
let jsx=<div>jsx</div>;

class A extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
         
        Component A
        </div>
    );
  }
}
class B extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>Component B</div>
    );
  }
}
class Wrapper extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        {this.props.children}
      </div>
  
    );
  }
}
class Component extends React.Component{
  constructor(){
    super();
    this.state={
      name:'Rosen',
      age:18
    }

  }
  handleClick(){
    this.setState({
      age:this.state.age+1
    });
  }
  render()
  {
      return(
        <div>
          <h1>I am {this.state.name}</h1>
          <p>{this.state.age}years old</p>
          <button onClick={(e)=>{this.handleClick(e)}}>加一岁</button>
        </div>
        
      );
  }
}

//state用法
class Es6Component extends ReactDOM.Component{
    constructor(props){//Es6语法
          super(props); //props父组件传递给子组件，在子组件里只能可读
          this.state={
              name:'Rosen'  
          } //变量要传递通过react内置的this.state属性
    }
    render(){
        setTimeout(()=>{
            this.setState({
              name:'Rosen Test' 
            })
        },2000                 //加上定时函数，2s后将name的值改为Rosen Test，数据驱动dom
      )
        return <h1> I am {this.state.name} </h1>
    }
}
//props用法
class Propstest extends ReactDOM.Component{
  constructor(props){//Es6语法
        super(props); //props父组件传递给子组件，在子组件里只能可读
  }
  render(){
      return <h1> I am {this.props.name} </h1>
  }
}

//事件处理方式1
class Click1 extends ReactDOM.Component{
  constructor(props){
    super(props);
    this.state={
      name: 'Rosen',
      age:18
    }
  }
  handleClick(){
    this.setState({
      age:this.state.age+1
    })          //要让handleClick里的this生效
  }
  render(){
    return 
    <div>
      <h1>I am {this.state.name}</h1>
      <p>I am {this.state.age}years old</p>
            {/* 箭头函数修正作用域 */}
      <button onClick={(e)=>{this.handleClick(e)}}>加一岁</button> 
    </div>
  }
}

//组件的处理方式
// 基本组件
class App extends React.Component{
  render(){
    return (
      <div>
          <h1>App</h1>
          <Component/>
      </div>
    );
  }
}
//嵌套组件
class Title extends React.Component{
  constructor(props){
    super(props);
  }
  render(props){
    return <h1>{this.props.children}</h1>
  }

}
class App2 extends React.Component{
  render(){
    return (
      <div>
        {/* 让原来的h1成为一个组件，将App传进来，用children就能将闭合标签里的所有都实现 */}
          <Title>
              <span>I am</span>   
              <a href="">百度</a>
          </Title>  
          <Component/>
      </div>
    );
  }
}
//父子组件间传值
// 子组件为标题和按钮，父组件为整体，通过子组件的按钮来改变父组件的背景颜色，子组件只能继承props无法更改其值所以要通过回调函数修改，父组件用state,子组件用props
class Child extends React.Component{
  constructor(props){
    super(props);
  }
  handleClick(){
    this.props.changeColor('red'); 
    // props会将标签后面的所有属性都传上来
  }
  render(){
    return (
      <div>
        <h1>父组件的背景色为：{this.props.bgColor}</h1>
        <button onClick={(e)=>{this.handleClick(e)}}>改变父组件的背景色</button>
      </div>
    )
  }
}
class Father extends React.Component{
  constructor(props){
    super(props);
    this.state={
      bgColor:'#999'
    }
  }
  onBgcolorChange(color){
    this.setState({
      bgColor:color
    })
  }
  render(){
    return (
      // 第一个括号表示表达式，第二个括号表示json表达式
      <div style={{background:this.state.bgColor}}> 
        <Child bgColor={this.state.bgColor} changeColor={(color)=>{this.onBgcolorChange(color)}}/>
      </div>
    )
  }
}
// 兄弟组件间通信，子组件通过改变共同父组件来改变另一个子组件，改变父组件的一个特性进而传递给另一个子组件，称为状态提升
class Child1 extends React.Component{
  constructor(props){
    super(props);
  }
  handleClick(){
    this.props.changeColor('red'); 
    // props会将标签后面的所有属性都传上来
  }
  render(){
    return (
      <div>
        <button onClick={(e)=>{this.handleClick(e)}}>改变兄弟组件的背景色</button>
      </div>
    )
  }
}
class Child2 extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={{background:this.props.bgColor}}>
        <h1>组件的背景色为：{this.props.bgColor}</h1>
      </div>
    )
  }
}
class Father extends React.Component{
  constructor(props){
    super(props);
    this.state={
      child2BgColor:'#999'
    }
  }
  onChild2BgColorChange(color){
    this.setState({
      child2BgColor:color
    })
  }

  render(){
    return (
      <div> 
        <Child1 changeColor={(color)=>{this.onChild2BgColorChange(color)}}/>
        <Child2 bgColor={this.state.child2Bgcolor}/>
      </div>
    )
  }
}

//react生命周期
class Component extends React.Component{
  constructor(props){
    super(props);
    console.log('加载数据');
    this.state={
      data:'Old State'
    }
    console.log('constructor');
  }
  componentWillMount(){
    console.log('componentWillMount');
  }
  componentDidMount(){
    console.log('componentDidlMount');
  }
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps');
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true;
  }
  componentWillUpdate()
  {
    console.log('componentWillUpdate');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
  }

  handleClick(){
    console.log('更新数据');
    this.setState({
      data:this.props.fatherData
    })
  }
  render(){
    console.log('render');
    return (
      <div>
        <div>{this.props.fatherData}</div>
        <button onClick={()=>{this.handleClick()}}>更新组件</button>
      </div>
    );
  }
}

class APP extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:'Old Props',
      hasChild:true
    }
  }
  handleClick(){
    this.setState({
      data:'New Props'
    })
  }
  desstroyClick(){
    this.setState({
      hasChild:false
    })

  }
  render(){
    return(
      <div>
        {this.state.hasChild?<Component fatherData={this.state.data}/>:null}
        <button onClick={()=>{this.handleClick()}}>更新子组件</button>
        <button onClick={()=>{this.desstroyClick()}}>销毁子组件</button>
      </div>
    )
  }
}

//react-router
class A extends React.Component{
  constructor(props)
  {
    super(props);
  }
    render(){
      return (
        <div>
          <Switch>
          <Route exact path={`${this.props.match.path}`} 
                  render={()=>{
                  return <div> Component A</div> 
                       
            }}/>/>
            {/* 子路径sub一定要放在前面，优先唯一匹配，避免与id重复 */}
            <Route path={`${this.props.match.path}/sub`} 
                  render={(route)=>{
                  return  <div> sub </div>     
            }}/>
             <Route path={`${this.props.match.path}/:id`} 
                  render={(route)=>{
                  return  <div> Component A,参数是{route.match.params.id} </div>     
            }}/>
            
         
          </Switch>
          </div>
      );
    }
  }

  class B extends React.Component{
    render(){
      return (
        <div>Component B</div>
      );
    }
  }
  
  class Wrapper extends React.Component{
    constructor(props)
    {
      super(props);
    }
    render(){
      return (
        <div>
           <Link to='/a'>组件A</Link>
           <br/>
           <Link to='/a/123'>带参数的组件A</Link>
           <br/>
           <Link to='/a/sub'>/a/sub</Link>
           <br/>
           <Link to='/b'>组件B</Link>
          {this.props.children}
        </div>
      );
    }
  }
  ReactDOM.render(
    <div>
      <Router>
        <Wrapper>
          <Route path='/a' component={A} />
          <Route path='/b' component={B}/>
        </Wrapper>
        </Router>
    </div>,
     document.getElementById('app')
  );

ReactDOM.render(
  <div>
    <APP/>
  </div>,
   document.getElementById('app')
);


ReactDOM.render(
    <div>
     
      <Es6Component />
      <Component/>
      <Propstest name="Rosen"/>
      <Click1/>
      <App/>
      <App2/>
      <Father/>
    </div>,
   document.getElementById('app')
);

