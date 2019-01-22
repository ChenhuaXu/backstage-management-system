<template>
  <div class="nav-menu full-height pull-left">
    <section class="nav-menu-container">
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
    </section>
    <a href="javascript:void(0)" :class="['collapse-btn', 'text-center', { 'collapse-btn--collapse': isCollapse }]" @click="isCollapse = !isCollapse">
      <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
    </a>
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
  background-color: @divider;
  width: auto;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  &-container {
    height: calc(~'100% - 40px');
    overflow-y: auto;
  }
  .collapse-btn {
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    &--collapse {
      width: 64px;
    }
  }
}
</style>