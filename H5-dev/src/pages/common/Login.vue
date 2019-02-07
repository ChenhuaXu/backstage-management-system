<template>
  <v-app class="login full">
    <main class="box-shadow">
        <p class="text-center color-primary size26">SIGN IN</p>
        <v-text-field label="Name" autofocus v-model.trim="form.name"></v-text-field>
        <v-text-field label="Password" v-model.trim="form.password" type="password"></v-text-field>
        <v-btn block :loading="loading" :disabled="loading" color="primary" @click="login" class="login-btn">LOGIN</v-btn>
    </main>

    <vue-particles
      color="#2d8cf0"
      :particleOpacity="0.2"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#2db7f5"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.2"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push">
    </vue-particles>
  </v-app>
</template>

<script>
import { systemApi } from '@/apis'
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    /**
     * @description 登录
     */
    login () {
      if (!this.form.name || !this.form.password) {
        this.$toast('请完整填写登录信息')
        return false
      } else {
        this.loading = true
        return new Promise((resolve, reject) => {
          systemApi.userLogin({
            name: this.form.name,
            password: this.form.password
          }).then(({resultCode, result, msg}) => {
            this.$store.dispatch('saveToken', result)
            resolve()
          }).catch((error) => {
            reject(error)
          })
        }).then(() => {
          this.$router.replace({ path: '/index' })
        }).catch(() => {
          this.loading = false
        })
      }
    }
  },
  mounted () {
    document.onkeydown = e => { e && e.keyCode === 13 && this.login() }
  },
  beforeDestroy () {
    this.loading = false
  },
  destroyed () {
    document.onkeydown = e => {}
  }
}
</script>
<style lang='less' scoped>
main {
  z-index: 10;
  width: 400px;
  height: 320px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px solid @white;
  padding: 30px 50px;
  .login-btn {
    margin-top: 20px;
  }
}
#particles-js {
  background: linear-gradient(150deg, #ffe0cb, #feeed4, #e0efd0, #7bc7a3);
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>