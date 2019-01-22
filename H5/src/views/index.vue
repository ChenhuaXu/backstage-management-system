<template>
  <div class="index full">
    <header class="full-width clearfix">
      <strong class="size20">Backstage Management System</strong>
      <section class="pull-right size16">
        <!-- <span class="pointer m-x-l-1" @click="logoutModal = true">退出登录</span> -->
        <Dropdown trigger="hover" style="margin-left: 20px">
          <a href="javascript:void(0)">
              <span class="size18 m-x-r-1 name">{{ name }}</span>
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <span @click="updatePsd">
                <Icon type="md-unlock" class="m-x-r-1" />修改密码
              </span>
            </DropdownItem>
            <DropdownItem divided>
              <span @click="logoutModal = true">
                <Icon type="md-log-out" class="m-x-r-1" />退出登录
                </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>
    </header>
    <main>
      <nav-menu ref="navMenu" :menuList="menuList"></nav-menu>
      <div class="router-container p-2">
        <router-view></router-view>
      </div>
    </main>

    <Modal
      title="退出登录"
      v-model="logoutModal"
      :mask-closable="false"
      :closable="false"
      @on-ok="logout">
        <p>确认退出登录？</p>
    </Modal>

    <!-- 修改密码弹窗 -->
    <Modal
      v-model="resetPsdModal"
      title="修改密码"
      :mask-closable="false"
      :closable="false"
      @on-ok="confirm('form')"
      @on-cancel="cancel">
      <Form ref="form" :model="form" :rules="rules" :label-width="80">
        <FormItem label="原密码" prop="oriPsd">
          <Input type="password" v-model="form.oriPsd"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPsd">
          <Input type="password" v-model="form.newPsd"></Input>
        </FormItem>
        <FormItem label="请确认" prop="conPsd">
          <Input type="password" v-model="form.conPsd"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
import { systemApi } from '@/apis'
export default {
  name: 'index',
  components: {
    'nav-menu': NavMenu
  },
  data () {
    var isNewPsd = (rule, value, callback) => {
      if (value === this.form.oriPsd) {
        callback(new Error('请输入不同于旧密码的新密码'))
      } else {
        callback()
      }
    }
    var conNewPsd = (rule, value, callback) => {
      if (value !== this.form.newPsd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      name: '',
      menuList: [],
      logoutModal: false,
      resetPsdModal: false,
      form: {
        oriPsd: '',
        newPsd: '',
        conPsd: ''
      },
      rules: {
        oriPsd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPsd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: isNewPsd, trigger: 'blur' }
        ],
        conPsd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: conNewPsd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * @description 退出登录
     */
    logout () {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.replace('login')
      })
    },

    /**
     * @description 更新密码
     */
    updatePsd () {
      this.resetPsdModal = true
    },

    confirm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          systemApi.updatePassord({
          }).then(({resultCode, result, msg}) => {
            this.$message.info(msg)
            this.resetPsdModal = false
            this.cancel()
          })
        } else {
          return false
        }
      })
    },

    cancel () {
      this.form = {
        oriPsd: '',
        newPsd: '',
        conPsd: ''
      }
    }
  },
  mounted () {
    return new Promise((resolve, reject) => {
      systemApi.userInfo().then(({resultCode, result, msg}) => {
        this.$store.dispatch('saveUserInfo', result)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    }).then(response => {
      this.name = response.name
      this.menuList = response.menu
      this.$nextTick(() => {
        this.$refs.navMenu.activeName = this.$route.name
      })
    }).catch(() => {
      this.$message.error('验证用户信息失败，请重新登录。')
      this.$dispatch('userLogout').then(() => {
        this.$router.replace('login')
      })
    })
  }
}
</script>
<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: column;
  > header {
    height: 50px;
    line-height: 50px;
    background: @light_primary;
    color: @white;
    padding: 0 20px;
    .name {
      color: @white;
    }
  }
  > main {
    flex: 1;
    display: flex;
    .router-container {
      flex: 1;
    }
  }
}
</style>