<template>
  <div class="nav-menu full-height pull-left p-y-t-2">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#e8eaec"
      :unique-opened="true"
      :collapse-transition="false"
      :default-active="$route.path"
      :collapse="isCollapse">
      <template v-for="menu1 in menuList">
        <el-submenu
          v-if="menu1.children && menu1.children.length > 0"
          :key="menu1.id"
          :index="menu1.id">
          <template slot="title">
            <i :class="menu1.icon"></i>
            <span slot="title">{{ menu1.label }}</span>
          </template>
          <div v-if="menu1.children && menu1.children.length > 0">
            <el-menu-item
              v-for="menu2 in menu1.children"
              :key="menu2.id"
              :index="menu2.url"
              @click.native="pageJump(menu2)">
              {{ menu2.label }}
            </el-menu-item>
          </div>
        </el-submenu>
        <el-menu-item
          v-else
          :key="menu1.id"
          :index="menu1.url"
          @click.native="pageJump(menu1)">
          <i :class="menu1.icon"></i>
          <span slot="title">{{ menu1.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <a href="javascript:void(0)" class="collapse-block text-center color-white" @click="isCollapse = !isCollapse">||</a>
  </div>
</template>

<script>
export default {
  name: 'nav-menu',
  data () {
    return {
      isCollapse: false
    }
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    pageJump (route) {
      route.url === '/' + this.$route.name ? this.$emit('route-reload') : this.$router.push({ path: route.url })
    }
  },
  watch: {
    isCollapse (val) {
      this.$emit('menuCollapse', val)
    }
  }
}
</script>
<style lang="less" scoped>
.nav-menu {
  position: relative;
  background-color: @divider;
  width: auto;
  box-shadow: 4px 0 4px 0 rgba(0,0,0,.1);
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .collapse-block {
    width: 12px;
    height: 100px;
    line-height: 100px;
    border-radius: 0 5px 5px 0;
    background-color: rgba(64, 168, 255, .6);
    position: absolute;
    right: -12px;
    top: calc(~'(100% - 100px) / 2');
    box-shadow: 4px 0 4px 0 rgba(0,0,0,.1);
    z-index: 10;
  }
}
</style>