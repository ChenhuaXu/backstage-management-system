<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" dark fixed app>
    <v-list class="pa-1">
      <v-list-tile v-if="mini" @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img src="https://i.loli.net/2017/08/21/599a521472424.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ username }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider light></v-divider>

      <template v-for="p in menuList">
        <v-list-group
          v-if="p.children && p.children.length > 0"
          :key="p.id"
          :prepend-icon="p.icon"
          :value="p.children.some(i => i.name === $route.name)">
          <v-list-tile slot="activator">
            <v-list-tile-title ripple>{{ p.label }}</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for='c in p.children' :key="c.id" :to="c.url" ripple>
            <v-list-tile-action>
              <div :title="c.label" v-if="mini" small>{{ c.label[0] }}</div>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :title="c.label" ripple>{{ c.label }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :key="p.id" :to="p.url" :title="p.label" ripple>
          <v-list-tile-action>
              <v-icon>{{ p.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ p.label }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'nav-menu',
  data () {
    return {
      drawer: null,
      mini: false
    }
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    username: {
      type: String,
      default: ''
    }
  }
}
</script>
