import Vue from 'vue'
import 'vuetify/src/stylus/app.styl'
import Vuetify, {
  VApp,
  VFooter,
  VToolbar,
  VFadeTransition,
  VLayout,
  VContainer,
  VBtn,
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAction,
  VIcon,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VTextField
} from 'vuetify/lib'
import {
  Resize,
  Ripple
} from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition
  },
  directives: {
    Resize,
    Ripple
  }
})
