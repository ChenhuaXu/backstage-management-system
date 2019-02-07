# 项目说明

> 本项目是基于vue前端框架，配套使用vue-router（路由管理）+ vuex（状态管理）+ axios（基于promise的http库）+ vuetify（UI组件库），构建的一套前端通用管理系统框架。


## 项目常用指令

** 请先确认电脑中已成功安装node.js以确保项目能够执行命令，并在项目文件夹下打开终端/命令提示符 **

* 安装项目启动所需的依赖文件：  `npm install`  

  *** 若安装速度过慢，可先执行命令 `npm install -g cnpm --registry=https://registry.npm.taobao.org` 换依赖下载源，之后再执行 `cnpm install` ***

* 启动前端项目： `npm run serve`

  *** 启动完成后浏览器打开页面：http://localhost:8080 ***

* 启动模拟请求服务： `cd mock` 后 `node index.js`

  *** 模拟请求地址：http://localhost:8888，在mock/index.js文件中可配置模拟数据，每次更新index文件要重新执行 `node index.js` ***

* 打包项目： `npm run build`


## 项目目录结构
```

    - mock                    前端模拟请求数据
    - node_modules            依赖包
    - public                  存放所有不经webpack处理的静态资源
    - src                     存放所有业务代码的文件夹
        - apis                       存放所有后台接口
        - assets                     会被weback处理的静态资源
        - components                 存放所有公用组件
        - doc                        项目说明文档
        - pages                      存放所有路由页面
        - plugins                    存放所有自写的插件或工具库
        - router                     存放所有页面路有
        - store                      项目状态管理机
        - main.js                    项目启动的入口文件 
    - .gitignore              如用git管理项目，设置后可在更新文件时忽略部分文件
    - .babel.config.js        babel配置
    - package-lock.json       锁定安装依赖时的版本号
    - package.json            定义此项目所需要的各种模块，以及项目的配置信息
    - README.md               项目基本说明（旧）
    - vue.config.js           配置项目模块等自写文件

```
