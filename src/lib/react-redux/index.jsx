import React, { Component } from "react";
import PropTypes from 'prop-types';
/*
react-redux语法分析
1）reac-redux向外暴露2个API:
    a、Provider
    b、connect函数
2)Provider组件
    接收store属性
    让所有容器组件都可以看到store，从而通过store读取/更新状态
3）connec函数
    接收2个参数：mapStateToProps 和mapDispatchToProps
    mapStateToProps：为一个函数，用来指定向UI组件传递哪些一般属性
    mapDispatchToProps：为一个函数或对象，用来指定向UI组件传递那些函数属性
    connect()执行的返回值为一个高阶组件：包装UI组件，返回一个新的容器组件
    容器组件会向UI传入前面指定的一般/函数类型属性
*/

//用来向所有的容器组件提供store组件类，通过context向所有的容器组件提供store
export class Provider extends Component{
    
    static propTypes = {
        store : PropTypes.object.isRequired, //声明接收的store
    }

    //声明提供的context的数据名称和类型
    static childContextTypes = {
        store :PropTypes.object
    }
    //向所有有声明的子组件提供包含要传递数据的context对象
    getChildContext(){
        return {
            store : this.props.store
        }
    }

    render(){
        //返回渲染proider所有的子节点
        return this.props.children
    }
}

//connect高阶函数：接收mapStateToProps/mapDispatchToProps两个参数，返回一个高阶组件函数
//高阶组件：接受一个UI组件，返回一个容器组件
export function connect(mapStateToProps,mapDispatchToProps){
    //返回高阶组件函数，接收UI组建函数
    return (UIComponent)=>{
        //返回容器组件
        return class ContainerComponent extends Component{

            //声明接受的context数据的名称和类型
            static contextTypes ={
                store : PropTypes.object
            }

            constructor(props,context){
                super(props);
                console.log('ContainerComponent()',context.store)

                const {store} = context;
                //得到包含所有一般属性的对象
                const stateProps = mapStateToProps(store.getState());//{count：1}

                //将所有的一般属性作为容器组件的状态数据
                this.state = {
                    ...stateProps
                }

                //判断是否是函数
                console.log('mapDispatchToProps',mapDispatchToProps)
                let dispatchProps;
                if(typeof mapDispatchToProps==='function'){
                    dispatchProps = mapDispatchToProps(store.dispatch)
                }else{
                    dispatchProps = Object.keys(mapDispatchToProps).reduce((pre,key)=>{
                        const actionCreator = mapDispatchToProps[key];
                        pre[key] = (...args)=>{
                            store.dispatch(actionCreator(...args)) //参数透传
                        }
                        return pre;
                    },{})
                }

                //得到所有包含函数属性的对象
                // this.dispatchProps =  mapDispatchToProps(store.dispatch)
                this.dispatchProps = dispatchProps;
                //绑定store的state变化的监听
                store.subscribe(()=>{//说明store内部的状态数据发生改变
                    //更新容器组件==》UI组件更新
                    this.setState({...mapStateToProps(store.getState())})
                })
            }


            render(){
                //返回UI组价的标签
                // const {stateProps} = this.state;
                return(
                    <UIComponent {...this.state} {...this.dispatchProps}/>
                )
            }
        }
    }
}