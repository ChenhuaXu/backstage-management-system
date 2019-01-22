const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get('/common', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: ''
  }
})

router.get('/token', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: '1234567890'
  }
})

router.get('/userInfo', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: {
      name: 'admin',
      role: 'admin',
      menu: [
        {
          label: '系统管理',
          name: 'systemManage',
          id: '1',
          icon: 'el-icon-setting',
          children: [
            {
              label: '用户管理',
              name: 'userManage',
              id: '1-1',
              url: '/userManage'
            },
            {
              label: '角色管理',
              name: 'roleManage',
              id: '1-2',
              url: '/roleManage'
            }
          ]
        }
      ]
    }
  }
})

router.get('/userList', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: {
      totalNum: 3,
      dataList: [
        {
          id: '1',
          name: 'aaa',
          role: 'admin,test',
          status: '0'
        },
        {
          id: '2',
          name: 'bbb',
          role: 'developer',
          status: '1'
        },
        {
          id: '3',
          name: 'ccc',
          role: 'developer,test',
          status: '0'
        }
      ]
    }
  }
})

router.get('/roleList', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: [
      {
        value: 'admin',
        label: 'admin'
      },
      {
        value: 'developer',
        label: 'developer'
      },
      {
        value: 'test',
        label: 'test'
      }
    ]
  }
})

router.get('/userRoleList', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: {
      totalNum: 3,
      dataList: [
        {
          id: '1',
          name: 'aaa',
          status: '0'
        },
        {
          id: '2',
          name: 'bbb',
          status: '1'
        },
        {
          id: '3',
          name: 'ccc',
          status: '0'
        }
      ]
    }
  }
})

router.get('/menuList', async (ctx, next) => {
  ctx.response.body = {
    resultCode: '000000',
    msg: 'success',
    result: [
      {
        title: '系统管理',
        id: 1,
        icon: 'ios-list-box',
        children: [
          {
            title: '用户管理',
            id: '1-1',
            url: '/userManage'
          },
          {
            title: '角色管理',
            id: '1-2',
            url: '/roleManage'
          }
        ]
      }
    ]
  }
})

app.use(router.routes())

app.listen(8888, () => {
  console.log('server is running at http://localhost:8888')
})