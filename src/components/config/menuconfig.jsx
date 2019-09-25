/*
利用数组来设置页面导航栏的各个选项，这样方面增加/删除导航栏的选项而不影响整体的布局
*/
const menuList=[
    {
        title : '首页',//菜单标题名称
        key : '/home',//对应的path
        icon : 'home',//对应的图标
    },{
        title : '商品',
        key : '/products',
        icon : 'appstore',
        children : [
            {
                title : '品类管理',
                key : '/category',
                icon : 'profile',
            },{
                title : '商品管理',
                key : '/product',
                icon : 'tool',
            }
        ]
    },{
        title : '用户管理',
        key : '/user',
        icon : 'user',
    },{
        title : '角色管理',
        key : '/role',
        icon : 'safety',
    },{
        title : '图形图表',
        key : '/charts',
        icon : 'area-chart',
        children : [
            {
                title : '柱状图',
                key : '/charts/bar',
                icon : 'bar-chart',
            },{
                title : '折线图',
                key : '/charts/line',
                icon : 'line-chart',
            },{
                title : '饼图',
                key : '/charts/pie',
                icon : 'pie-chart',
            }
        ]
    },{
        title : 'Redux测试',
        key : '/redux',
        icon : 'box-plot',
    }
]

export default menuList;