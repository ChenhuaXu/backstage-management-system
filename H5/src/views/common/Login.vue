<template>
  <div class="login full">
    <main class="clearfix">
      <section class="pull-left">
        <span class="color-white size30">WELCOME</span>
      </section>
      <section class="pull-left">
        <p class="text-center color-white size30 m-y-b-4">SIGN IN</p>
        <Input v-model.trim="form.name" type="text" placeholder="Enter name" size="large" autofocus class="m-y-b-4" />
        <Input v-model.trim="form.password" type="password" placeholder="Enter password" size="large" class="m-y-b-4" />
        <Button type="info" size="large" class="full-width" :loading="loading" @click="login">LOGIN</Button>
      </section>
    </main>
  </div>
</template>

<script>
import { systemApi } from '@/apis'
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: 'admin',
        password: 'admin'
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
        this.$message.info('请完整填写登录信息')
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
.login {
  background-image: url('../../assets/image/login-background.jpg');
  display: flex;
  &:after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(2px);
  }
  > main {
    margin: auto;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 50%;
    min-width: 800px;
    height: 50%;
    min-height: 480px;
    background-image: url('../../assets/image/login-background.jpg');
    background-size: 100% 100%;
    border: 1px solid @white;
    border-radius: 2px;
    box-shadow: 0 0 8px @black;
    padding: 60px 30px;
    > section {
      width: 50%;
      height: 100%;
      &:first-child {
        border-right: 1px solid @white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:last-child {
        border-left: 1px solid @white;
        padding: 40px 80px;
      }
    }
  }
  .m-y-b-4 {
    margin-bottom: 20px;
  }
}
</style>