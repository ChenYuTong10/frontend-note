// "common.js"的暴露语法
module.exports = {
    pages: {
      index: {
        // page 的入口
        entry: 'src/main.js',
      }
    },
    lintOnSave: false, // 关闭语法检查
    // 开启代理服务器的方式一
    // devServer: {
    //   proxy: "http://localhost:8080"  // 目标url
    // },
    // 开启代理服务器的方式二
    devServer: {
      proxy: {
        // 所有符合这些前缀的请求路径由代理服务器转发
        '/api': {
          target: 'http://localhost:8080',  // 目标url
          // 路径重写
          // 如果不进行配置,代理服务器将老老实实按照"http://xxx/api/demo"路径请求,
          // 而有时后端提供的接口是"http://xxx/demo",那么需要将"/api"去掉再发送请求.
          pathRewrite: {
            "^/api": ''  // "key"为正则表达式,"value"为目标字符串
          },
          // ws: true,  // 是否使用"websocket"
          // changeOrigin: true  // 是否更改请求源(Host),如果开启,那么在请求后端时,以代理服务器的身份请求
        }
      }
    }
  }