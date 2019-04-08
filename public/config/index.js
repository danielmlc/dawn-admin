

 //系统连接配置
function getClientObj() {
    return {
        sysConf:{ 
            url:'http://127.0.0.1:8088',
            timeout:'90000', //本机请求响应时间
            clientId:"C1BC4CCED8B544FC15268B8F29CB0386",
            clientSecret:"8F3D3BF3E3EA2895CD7E8E6173385AC57A39C27870714B66",
            titleName:"易龙物资现场综合管理系统V8.0",
        },
        loginType:0,  //登录方式 0为自主登录方式 1为单点登录方式
        singleLogin:{
            url:'', //单点登录IP端口
            loginform:{
                fieldName:"OriBigId" //登录userid主键类型
            }
        }
    }
}




