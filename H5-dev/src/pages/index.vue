<template>
  <v-app>
    <nav-menu ref="navMenu" :menuList="menuList" :username="username"></nav-menu>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="hideDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat @click="resetPsdModal = true">修改密码</v-btn>
          <v-btn flat @click="logoutModal = true">退出登录</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-dialog v-model="logoutModal" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">提示</v-card-title>
        <v-card-text>确认退出登录？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="logoutModal = false">取消</v-btn>
          <v-btn color="green darken-1" flat @click="logout">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="resetPsdModal" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">修改密码</v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="form.oriPsd"
              :rules="oriPsdErrors"
              label="原密码"
              type="password"
              required>
            </v-text-field>
            <v-text-field
              v-model="form.newPsd"
              :rules="newPsdErrors"
              label="新密码"
              type="password"
              required>
            </v-text-field>
            <v-text-field
              v-model="form.conPsd"
              :rules="conPsdErrors"
              label="再次确认"
              type="password"
              required>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="clear">取消</v-btn>
          <v-btn color="green darken-1" flat @click="submit">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      top
      :timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
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
      menuList: [],
      username: '',
      logoutModal: false,
      resetPsdModal: false,
      form: {
        oriPsd: '',
        newPsd: '',
        conPsd: ''
      },
      valid: false,
      oriPsdErrors: [
        v => !!v || '请输入原密码'
      ],
      newPsdErrors: [
        v => !!v || '请输入新密码',
        v => v !== this.form.oriPsd || '请输入不同于原密码的新密码'
      ],
      conPsdErrors: [
        v => !!v || '请输入新密码',
        v => v === this.form.newPsd || '两次输入密码不一致'
      ],
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    hideDrawer () {
      this.$refs.navMenu.drawer = !this.$refs.navMenu.drawer
    },

    logout () {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.replace('login')
      })
    },

    clear () {
      this.resetPsdModal = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

    submit () {
      if (this.$refs.form.validate()) {
        systemApi.updatePassord().then(({resultCode, result, msg}) => {
          this.snackbarText = msg
          this.snackbar = true
          this.resetPsdModal = false
          this.clear()
        })
      } else {
        return false
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
      this.username = response.name
      this.menuList = response.menu
    }).catch(() => {
      this.snackbarText = '验证用户信息失败，请重新登录'
      this.snackbar = true
      setTimeout(() => {
        this.$store.dispatch('userLogout').then(() => {
          this.$router.replace('login')
        })
      }, 3000)
    })
  }
}
</script>