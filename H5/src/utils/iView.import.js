import Vue from 'vue'

import {
  Button,
  Checkbox,
  Icon,
  Input,
  Message,
  Menu,
  Submenu,
  MenuGroup,
  MenuItem,
  Modal,
  Table,
  Page,
  Form,
  FormItem,
  Select,
  Option,
  Tag,
  Radio,
  RadioGroup,
  Tree,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'iview'

Vue.component('Button', Button)
Vue.component('Checkbox', Checkbox)
Vue.component('Icon', Icon)
Vue.component('Input', Input)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuGroup', MenuGroup)
Vue.component('MenuItem', MenuItem)
Vue.component('Modal', Modal)
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Tag', Tag)
Vue.component('Radio', Radio)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Tree', Tree)
Vue.component('Avatar', Avatar)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)

Vue.prototype.$message = Message

Vue.prototype.$IVIEW = {
  transfer: true,
  size: 'default'
}