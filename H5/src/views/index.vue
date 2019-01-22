<template>
  <div class="index full">
    <header class="full-width clearfix">
      <strong class="size20">Backstage Management System</strong>
      <section class="pull-right size16">
        <el-dropdown @command="handleCommand" class="pull-rught">
          <span class="el-dropdown-link">
            <span class="size18 m-x-r-1 name pointer">{{ name }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              <el-icon type="md-unlock" class="m-x-r-1" />修改密码
            </el-dropdown-item>
            <el-dropdown-item command="1" divided>
              <el-icon type="md-log-out" class="m-x-r-1" />退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </header>
    <main class="full-width">
      <nav-menu ref="navMenu" :menuList="menuList" @route-reload="routeReload" @menuCollapse="menuCollapse"></nav-menu>
      <article :class="['router-container', 'p-2', 'full', { 'article-collapse': isCollapse }]">
        <router-view v-if="routeIsReload"></router-view>
      </article>
    </main>

    <el-dialog
      title="提示"
      :visible.sync="logoutModal"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
        <p>确认退出登录？</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="logoutModal = false">取 消</el-button>
          <el-button type="primary" @click="logout">确 认</el-button>
        </div>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="resetPsdModal"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="原密码" prop="oriPsd">
          <el-input type="password" v-model="form.oriPsd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPsd">
          <el-input type="password" v-model="form.newPsd"></el-input>
        </el-form-item>
        <el-form-item label="请确认" prop="conPsd">
          <el-input type="password" v-model="form.conPsd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('form')">确 认</el-button>
      </div>
    </el-dialog>
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
      routeIsReload: false,
      isCollapse: false,
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
    handleCommand (command) {
      switch (command) {
        case '0':
          this.resetPsdModal = true
          break
        case '1':
          this.logoutModal = true
          break
        default:
          return false
      }
    },

    logout () {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.replace('login')
      })
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
      this.resetPsdModal = false
      this.form = {
        oriPsd: '',
        newPsd: '',
        conPsd: ''
      }
    },

    routeReload () {
      this.routeIsReload = false
      this.$nextTick(() => { this.routeIsReload = true })
    },

    menuCollapse (val) {
      this.isCollapse = val
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
  position: relative;
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
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    .router-container {
      position: absolute;
      left: 200px;
      right: 0;
      width: auto;
    }
  }
  .article-collapse {
    left: 64px !important;
  }
}
</style>