<template>
    <Menu
      class="nav-menu full-height"
      theme="dark"
      accordion
      :active-name="activeName">
        <Submenu
          v-for="menu1 in menuList"
          :key="menu1.id"
          :name="menu1.name">
          <template slot="title">
              <Icon :type="menu1.icon" />
              {{ menu1.label }}
          </template>
          <MenuItem
            v-if="menu1.children && menu1.children.length > 0"
            v-for="menu2 in menu1.children"
            :key="menu2.id"
            :name="menu2.name"
            @click.native="pageJump(menu2)">
            {{ menu2.label }}
          </MenuItem>
        </Submenu>
    </Menu>
</template>

<script>
export default {
  name: 'nav-menu',
  data () {
    return {
      activeName: ''
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
      this.$router.push({ path: route.url })
    }
  }
}
</script>
<style lang="less" scoped>
.nav-menu {
}
</style>