

#day01
    ##1、项目开发准备
        1)项目描述
        2）技术选型
        3)API接口/技术文档/测试接口

    ##2、启动项目开发
        1)使用react脚手架创建项目
        2）开发环境运行：npm start
        3)生产环节打包运行:npm run build  serve build
    
    ##3、git项目管理
        1)创建远程仓库
        2）创建本地仓库
            a、配置.gitignore
            b、git init
            c、git add
            d、git commit-m “init”
        3）将本地仓库推送到远程仓库
            git remote add origin url
            git push origin master
        4）在本地创建dev分支，并推送到远程
            git checkout -b dev
            git push origin dev
        5）如果本地有修改
            git add .
            git commit -m 'xxx'
        6）新的同事：克隆仓库
            git clone url
            git checkout -b dev origi/dev
            git pull origin dev
        7）如果远程修改
            git pull origin dev
    
    ##4、创建项目的基本结构
        api：ajax请求的模块
        component: 非路由组件
        pages：路由组件
        App.js：应用的跟组件
        index.js：入口js
    
    ##5、引入antd
        下载antd的包：按照antd的教程即可
    
    ##6、引入路由
        下载包：react-router-dom
        拆分应用路由：
        login：登陆
        admin：后台管理界面
        注册路由：
        <BrowserRouter/>
        <Switch/>
        <Route path=‘’ component={}/>
    
    ##7、login的静态组件
        1）自定义了一部分样式布局
        2）使用antd的组件实现登陆表单界面
            Form/Form.Item
            Input
            Icon
            Button
    
    ##8、手机表单数据和表单的前台验证
    1)form对象
        如何让包含Form的组件得到form对象？WrapLoginForm = Form.create()(LoginForm)
        WrapLoginForm是LoginForm的父组件，他给LoginForm传入form属性
        用到了高阶函数和高阶组件的技术
    2）操作表单数据
        form.getFieldDecorator('标识名称',{initialValue:初始值，rules：[]})(<Input/>)包装表单项组件标签
        form.getFieldValue()：得到包含所有输入数据的对象
        form.getFieldValue(id)：根据标识得到对应字段输入的数据
    3）前台表单验证
        a、声明式实时表单验证
            form.getFieldDecorator('标识名称',{rules：[{min：4，message：‘错误提示信息’}]})(<Input/>)
        b、自定义表单验证
            form.getFieldDecorator('标识名称',{rules：[{validator:this.validatePwd}]})(<Input/>)
            validatePwd = （rule,value,callback）=>{
                if(有问题){
                    callback('错误信息提示')
                }else{
                    callback()
                }
            }
        c、点击提示时统一验证
            form.validateFields((error,values)=>{
                if(!error){
                    通过了验证，发送ajax请求
                }
            })
    
    ##9、高阶函数与高阶组件
    
    1、高阶函数
        1）一类特别的函数
        a、接受函数类型的参数
        b、返回值是函数
    2）常见
        a、定时器：setTimeout()/setInterval()
        b、Promise：Promise(()=>{})then(value=>{},reason()=>{})
        c、数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
        d、函数对象的bind()
        e、Form.create()()/getFieldDecorator()()
    3)高阶函数动态更新、更加具有扩展性
    
    2、高阶组件
        1）本质就是一个函数
        2）接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
        3）作用：扩展组件功能
    
    3、高阶组件与高阶函数的关系
        高阶组件是特别的高阶函数
        接收一个组件函数，返回一个新的组件函数

day02
    ##1、后台应用
        启动后台应用：mongodb服务必须启动
        使用postman测试接口（根据接口文档）
            访问测试：post请求的参数在body中设置
            保存测试接口
            导出/导入所有测试接口

    ##2、编写ajax代码
        1）Ajax请求函数模块：api/ajax.js
            封装axios+Promise
            函数的返回值是promise对象===>后面用上aysnc/await
            自己创建的promise
                1、内部统一处理请求异常：外部的调用都不使用try。。catch来处理请求异常
                2、异步返回是响应数据（而不是响应对象）：外部的调用异步得到的就直接是数据了（response--》response.data)
        2)接口请求函数模块：api/index.js
            根据接口文档编写（一定要具备这个能力）
            接口请求函数：使用ajax()，返回值promise对象
        3)解决ajax跨域请求问题（开发时)
            办法：配置代理==》只能解决开发环境
            编码：在package.json文件中增加【"proxy":"url"】
        4）对代理的理解
            1)是什么？
                具有特定功能的程序
            2）运行在哪?
                前台应用，只能在开发时使用
            3）作用？
                解决开发是的ajax请求跨域问题
            4）配置代理
                告诉代理服务器一些信息：比如转发的目标地址
                开发环境：前端工程师
                生产环境：后端工程师
        5）async和await
            a、作用？
                简化promise对象的使用：不用再使用then()来指定成功/失败的回调函数
                以同步编码（没有回调函数）方式实现异步执行流程
            b、哪里写await？
                在返回promise的表达式的左侧写await：不想要promise，要promise异步执行成功的数据
            c、哪里写aysnc/
                await所在函数（最近的)定义的左侧写async
    ##3、实现登陆（包含自动登陆）
        login.jsx
            1)调用登陆的接口请求
            2）如果失败，显示错误提示信息
            3）如果成功：
                保存user到local/内存中
                跳转到admin
            4）如果内存中的user有值，自动跳转到admin
        src/index.js
            读取local中的user到内存中保存
        admin.jsx
            判断如果内存中有没有user（_id没有值）自动跳转到Login
        storageUtils.js
            包含使用localStorage来保存user相关操作的工具模块
            使用第三库store
                简化编码
                兼容不同的浏览器
        memoryUtils.js
            用来在内存中保存数据（user）的工具类
    ##4、搭建admin的整体界面结构
        1)整体布局使用antd的layout组件
        2）拆分组件
            LeftNav：左侧导航栏
            Header：右侧头部
        3）子路由
            定义路由组件
            注册路由
    ##5、LeftNav组件
        1）使用antd的组件
            Menu/Item/SubMenu
        2）使用react-router
            withRouter（）：包装非路由组件，给其传入history/location/match属性
            history：push/replace/goBack
            location：pathname属性
            match：params属性
        3）componentWillMount与componentDidMount的比较
            componentWillMount：在第一次render钱调用一次，为第一次render准备数据（同步）
            componentDidMount：在第一次render之后调用一次，启动异步任务，后面异步更新状态
        4）根据动态生成Item和SubMenu的数组
            map+递归:多级菜单列表
            reduce+递归：多级菜单列表
        5）2个问题？
        a、刷新时如何选中对应的菜单项？
            selectedKey时当前请求的path，当前请求的path用location来获取
        b、刷新子菜单路径时，自动打开子菜单列表？
            openKey（展开列表），是一级列表项的某个子菜单项是当前对应的菜单项
            先判断是否是有二级菜单


#day03
    ##1、Header组件
        1）界面静态布局
            三角形效果
        2）获取登录用户名称显示
            memoryUtils
        3）当前时间
            循环定时器，每隔1s更新当前时间状态
            格式化指定时间dateUtils
        4）天气预报
            使用jsonp库发送jsonp请求百度天气预报接口
            对jsonp请求的理解
        5）当前导航项的标题
            得到当前请求的路由path：WithRouter包装非路由组建
            根据path在menulist中遍历查找对应的item的title
        6）退出登录
            Modal组件显示提示
            清除保存的user
            跳转到Login
    ##2、jsonp解决ajax跨域的原理
        一、jsonp请求的原理：
            1、用来解决ajax请求跨域问题的，只能解决GET类型的请求
            2、本质不是ajax请求，而是一般的GET请求
        二、怎么做的？
            浏览器端：动态生成<script>标签来请求后台接口（src就是接口的url）
                定义好用于接收响应数据的函数（fn），并将函数名通过请求参数提交给后台(如callback=fn)
            服务器端：接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
            浏览器端：收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，得到了需要的结果数据


##day04：category组件
    ##1、使用antd组件构建分类列表界面
        Card
        Table
        Button
        Icon
    ##2、接口请求函数
        获取一级/二级分类列表
        添加分类
        更新分类
    ##3、异步显示一级分类列表
        设计一级分类列表的状态：categorys
        异步获取一级分类列表
        更新状态，显示
    ##4、显示二级分类列表
        设计状态：subCategorys/parentId/parentName
        显示二级分类列表：根据parentId状态值，异步获取分类列表
        setState()的问题：
            setState()的更新状态是异步更新的，直接读取状态值还是旧的状态值
            setState({},[callback]),回调函数是在状态更新且界面更新之后执行，可以获取最新的状态
    ##5、更新分类
        1）界面
            antd组件：Modal，Form，Input
            显示/隐藏：showStatus状态为2（显示）/0（隐藏）

        2）功能
            父组件(Category)得到子组件(AddForm)的数据(form)
            调用更新分类的接口
            重新获取分类列表

###day05:

    ##1.添加分类
        1)界面
            antd组件：Modal，Form，Select，Input
            显示隐藏功能：showStatus状态为0/1
        2）功能
            父组件(Category)得到子组件(AddForm)的数据（form）
            调用添加分类的接口
            重新获取分类列表
    ##2.Product整体路由
        1).配置子路由
        ProductHome/ProductDetail/ProductAddUpdate
        <Route>/<Switch>/<Redirect>
    
        2)匹配路由的逻辑
        默认：逐层匹配 <Route exact path='/product' component={ProductHome} />//为了防止/product/xxx路径在匹配到product后，直接进入到producthome组件，然后再该组件中找xxx路由
        exact属性：完全匹配


    ##3.分页实现技术（2种）
        1)前台分页
            请求获取数据：一次获取所有的数据
            请求接口：
                不需要指定请求参数：页码（pageNum）和每页数量（pageSize）
                响应数据：所有数据的数组
        2)基于后台的分页
            请求获取数据：每次只获取当前页的数据，翻页时要发请求
            请求接口：
                需要指定请求参数：页码（pageNum）和每页数量（pageSize）
                响应数据：当前页数据的数组+总记录数（total）[(pages：总页数)]
        3)如何选择？
            根据数据的多少来选择---》数据多--后台分页，数据较少--前台分页
    
    ##4.ProductHome组件
        1）分页显示
            界面：<Card>/<Table>/Select/Icon/Input/Button
            状态：products/total
            接口请求函数需要的数据：pagNum，pageSize
            异步获取第一页数据显示
                调用分页的接口请求函数，获取到当前页的products和总记录数total
                更新状态：products/total
            翻页：
                绑定翻页的监听，监听回调需要得到的pageNum
                异步获取指定页码的数据显示
        2）搜索分页
            接口请求函数需要的数据：
                pageSize：每页的条目数
                pageNum：当前请求的第几页（从1开始）
                productDesc/productName：searchName 根据商品描述/名称搜索
            状态：searchType/searchName/在用户操作时实时收集数据
            异步搜索显示分页列表
                如果searchName有值，调用搜索的接口请求函数获取数据并更新状态
        3）更新商品的状态
            初始显示：根据product的status属性来显示 status=1/2
            点击切换：
                绑定点击监听
                异步请求更新状态
        4）进入详情页面
            history.push('/product/detail',{products})
        5）进入添加界面
            history.push('/product/addupdate')
    
    ##5.ProductDetail组件
        1）读取商品数据，this.props.location.state.product
        2）显示商品信息：<Card>/List
        3）异步显示商品所属分类的名称
            pcategotyId==0：异步获取categoryId的分类名称
            pcategoryId！=0：异步获取pcategoryId/categoryId的分类名称
        4）Promise.all([promise1,promise2])
            返回值是promise
            异步得到的是所有promise的结果的数组
            特点：一次发送多个请求，只有当所有请求都成功，才成功，并得到成功的数据，一旦有一个失败，则都失败


###day06
    ##1、ProductAddUpdate
        1）基本界面
            Card/Form/Input/TextAera/Button
            FormItem的labe标题和layout
        2）分类的级联列表
            Cascader的基本使用
            异步获取一级分类列表，生成一级分类options
            如果当前是更新二级分类的商品，异步获取对应的二级分类列表，生成二级分类options，并添加为对应option的children
            aysnc函数返回值是一个新promise对象，promise的结果和值由async函数的结果决定
            当选择某一个一个分类项时，异步获取对应的二级分类列表，生成二级分类options，并添加为当前option的children
        3)表单数据收集和表单验证
    ##2、PicturesWall
        1)antd组件
            Upload/Modal/Icon
            根据示例的Demo改造编写
        2）上传图片
            在<Upload>上配置接口的path和请求参数名
            监视文件状态的改变：上传中/上传完成/删除
            在上传成功时，保存好相关信息：name/url
            为父组建提供已上传图片文件名数组的方法
        3)删除图片
            当文件状态变为删除时，调用删除图片的接口删除上传到后台的图片
        4）父组件调用子组件对象的方法：使用ref技术
            1》创建ref容器：this.pw=React.createRef()
            2》将ref容器交给需要获取的标签元素：<PicturesWall ref={this.pw}/>
            3》通过ref容器读取标签元素：this.pw.current
            
            4》另外，可以使用props达到子组件给父组件传值的效果
            假设子组件为Children，父组件为Father
            export default class Children extends Component{
                //假设要把一个子组件变化的状态值table传给父组件
                state={
                    table ：[]
                };
                onChange=()=>{
                    this.setState({
                        table: newValue
                    },()=>this.props.TableValue(this.state.table))//第一种写法：因为setState(arg1,arg2) 括号内的arg1可传入两种参数，
                    //一种是对象，一种是函数. arg2为更改state之后的回调方法,arg2可为空.
    
                    //第二种写法只能传newValue的值，因为setState的值是异步的，setState 之后，this.state 不会立即映射为新的值
                    //this.props.TableValue(newValue)
                }
                render(){
                    return(
                        <div>
                        </div>
                    )
                }
            }//子组件的jsx文件代码
            export default class Father extends Component{
                state={
                    chidrenValue:[],
                }
                //获取子组件的值的函数
                TableValue=(chidrenValue)=>{
                    console.log('chidrenValue',chidrenValue);
                    this.setState({
                        chidrenValue
                    })  //即可获取到子组件的值
                }
                render(){
                    return(
                        <Children TableValue={this.TableValue}/>
                    )
                }
            }//父组件的jsx文件代码

###day07

    ##1.RichTextEditor
        1)使用基于react的富文本编辑器插件库：react-draft-wysiwyg
        2)参考库的Demo文档编写
        3)如果还有不确定的，百度搜索，指定相对准确的关键字
    
    ##2.完成商品添加与修改功能
        1)收集输入数据
            通过form收集：name/desc/price/pcategotyId/categoryId
            通过ref收集：imgs/detail
            如果是更新收集：_id
            将收集数据封装成product对象
        2)更新商品
            定义添加和更新的接口请求函数
            调用接口请求函数，如果成功并返回商品列表界面
    ##3.角色管理
        1)角色前台分页显示
        2)添加角色
        3)给指定角色授权
            界面：Tree
            状态：checkeddKeys，根据传入的role的menus进行初始化
            点击OK：通过ref读取到子组件的checkedKeys作为要更新product新的menus
                    发送请求更新product
            解决默认勾选不正常的bug：利用组件的componentWillReceiveProps()

###day08
    ##1、setState()的使用
        1）setState(updater,[callback]),
            updater为返回stateChange对象的函数：(state,props)=>stateChange
            接收的state和props被保证为最新的
        2）setState(stateChange,[callback])
            stateChange为对象，
            callback是可选的回调函数，在状态更新且界面更新后才执行
        3）总结：
            对象方式是函数方式的简写方式
                如果新状态不依赖于原状态 ===》使用对象方式
                如果新状态依赖于原状态 ===》使用函数方式
            如果需要在setState()后获取最新的状态数据，在第二个callback函数中读取
    ##2、setState()的异步与同步
        1）setState()更新状态是异步还是同步？
        a、执行setState()的位置？
            在react控制的回调函数中：生命周期钩子/react事件监听回调
            在非react控制的异步回调函数中：定时器回调/原生事件监听回调/promise回调/。。
        b、异步或同步？
            react相关回调中：异步
            其他异步回调中：同步
        2）关于异步的setState()
            a、多次调用，如何处理？
                setState({}):合并更新一次状态，只调用一次render()更新界面--状态更新和界面更新都合并了
                setState(fn):更新多次状态，只调用一次render()更新界面--状态更新没有合并，但界面更新合并了
            b、如何得到异步更新后的状态数据？
                在setState()的callback回调函数中
    ##3、Component和PureComponent
        1）Component存在的问题？
            a、父组件重新render，当前组件也会重新执行render，即使数据没有发生任何变化
            b、当前组件setState，也会重新执行render，即使state没有任何变化
        2）解决Component存在的问题？
            a、原因：组建的shouldComponentUpdate()默认返回true，即使数据没有任何变化render也会重新执行
            b、办法1:重写shouldComponentUpdate()，判断如果数据有变化返回true，否则返回false
            c、办法2：使用PureCompnent代替Component
            d、说明：一般都是用PureCompnen来优化组件性能
        3）PureCompnent的基本原理
            a、重写实现shouldComponentUpdate()
            b、对组件的新旧state和props中的数据进行浅比较，如果都没有变化，返回false，否则返回true
            c、一旦shouldComponentUpdate()返回false不再执行用于更新的render
        4）面试题
            组件的哪个生命周期钩子能实现组件优化？
            PureCompnent的基本原理？
            区别PureCompnent和Compnent？
    ##4、用户管理
        1）显示用户列表
        2）添加用户
        3）修改用户
        4）删除用户
    ##5、导航菜单权限管理
        1）基本思路（依赖于后台）:
            角色：包含所拥有全县的所有菜单项key的数组：menus
            用户：包含所属角色的ID：role_id
            当前登陆用户：user中已经包含了所属对象role对象
            遍历显示菜单项：判断只有当有对应权限的才显示
        2）判断是否有权限的条件？
            a、如果当前用户是admin：可以看到所有的菜单项
            b、如果当前item是公开的：配置标识符看菜单项是否是公开的
            c、当前用户是否有此item的权限：key有没有在menus中
            d、如果当前用户有此item的某个子item的权限：要显示当前item权限