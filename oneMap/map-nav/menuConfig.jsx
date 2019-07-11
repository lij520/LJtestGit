import React from 'react';

const requireContext = require.context("./landmarks-highlight",false, /^\.\/.*\.png$/);
const navIcons = requireContext.keys().map(requireContext);

const menuList=[
    {title:<div ><img src={navIcons[10]} alt='road-icon' height="16" width='16'/> 各级道路</div>,
        key:'0',
        children: [
            { title: <div ><img src={navIcons[10]} alt='Groad-icon' height="16" width='16'/> 国道</div>, key: 'nationalRoad' },
            { title: <div ><img src={navIcons[14]} alt='Sroad-icon' height="16" width='16'/> 省道</div>, key: 'provincialRoad' },
            { title: <div ><img src={navIcons[11]} alt='Xroad-icon' height="16" width='16'/> 县道</div>, key: 'countyRoad' },
            { title: <div ><img src={navIcons[12]} alt='Yroad-icon' height="16" width='16'/> 乡道</div>, key: 'countryRoad' },
            { title: <div ><img src={navIcons[13]} alt='Croad-icon' height="16" width='16'/> 村道</div>, key: 'villageRoad' },
        ],
        }, {
        title: <div ><img src={navIcons[0]} alt='monitor-icon' height="16" width='16'/> 实时监测</div>,
        key: '1',
        children: [
            { title: <div ><img src={navIcons[1]} alt='bridge-icon' height="16" width='16'/> 桥梁</div>, key: 'bridge' },
            { title: <div ><img src={navIcons[2]} alt='manager-icon' height="16" width='16'/> 路管员</div>, key: 'manager' },
            { title: <div ><img src={navIcons[3]} alt='culvert-icon' height="16" width='16'/> 涵洞</div>, key: 'culvert' },
            { title: <div ><img src={navIcons[4]} alt='tech-icon' height="16" width='16'/> 县道技术状况</div>, key: 'tech' },
            { title: <div ><img src={navIcons[5]} alt='tunnel-icon' height="16" width='16'/> 隧道</div>, key: 'tunnel' },

        ],
        }, {
        title: <div ><img src={navIcons[6]} alt='submit-icon' height="16" width='16'/> 事件上报</div>,
        key: '2',
        children: [
            { title: <div ><img src={navIcons[9]} alt='right-icon' height="16" width='16'/> 路政类</div>, 
            key: '2-1' ,
            children:[
                {title:'违规占道',key:'1001'},
                {title:'违章搭建',key:'1002'},
                {title:'侵占公路设施',key:'1003'},
                {title:'非法营运',key:'1004'},
                {title:'超载超高',key:'1005'},
                {title:'其他',key:'1088'},
            ]
            },
            { title: <div ><img src={navIcons[7]} alt='right-icon' height="16" width='16'/> 路基</div>, 
            key: '2-2' ,
            children:[
                {title:'路基坍塌',key:'2001'},
                {title:'边坡损毁',key:'2002'},
                {title:'栏墙坍塌',key:'2003'},
                {title:'路肩杂草',key:'2004'},
                {title:'路肩堆放杂物',key:'2005'},
                {title:'边坡杂草',key:'2006'},
                {title:'边坡落石',key:'2007'},
            ]
            },
            { title: <div ><img src={navIcons[8]} alt='quality-icon' height="16" width='16'/> 路面</div>,
            key: '2-3' ,
            children:[
                {title:'路面脏污',key:'2101'},
                {title:'路面破损',key:'2102'},
                {title:'路面堆放杂物',key:'2103'},
                {title:'接缝填料缺失',key:'2104'}
            ]
            },
            { title: <div ><img src={navIcons[9]} alt='roadBridge-icon' height="16" width='16'/> 桥梁</div>, 
            key: '2-4' ,
            children:[
                {title:'附属设施损坏',key:'2201'},
                {title:'桥梁基础损坏',key:'2202'},
                {title:'桥梁下部结构损坏',key:'2203'},
                {title:'桥梁冲毁',key:'2204'},
            ]
            },
            { title: <div ><img src={navIcons[7]} alt='right-icon' height="16" width='16'/> 隧道</div>, 
            key: '2-5' ,
            children:[
                {title:'衬砌裂缝',key:'2301'},
                {title:'衬砌漏水',key:'2302'},
                {title:'隧道附属设施损坏',key:'2303'},
                {title:'其他',key:'2388'},
            ]
            },
            { title: <div ><img src={navIcons[8]} alt='quality-icon' height="16" width='16'/> 水沟涵洞</div>,
            key: '2-6' ,
            children:[
                {title:'排水堵塞',key:'2401'},
                {title:'倒塌破损',key:'2402'}
            ]
            },
            { title: <div ><img src={navIcons[9]} alt='roadBridge-icon' height="16" width='16'/> 设施、标志牌</div>, 
            key: '2-7' ,
            children:[
                {title:'标志牌损坏',key:'2501'},
                {title:'护栏损坏',key:'2502'},
                {title:'警示柱损坏',key:'2503'},
                {title:'广角镜损坏',key:'2504'},
                {title:'标线脱落',key:'2505'},
                {title:'其他',key:'2588'},
            ]
            },
        ],
    }
]

export default menuList;