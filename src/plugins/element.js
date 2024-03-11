import Vue from 'vue'
import { Button, Form, FormItem, Input, Icon, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'

// 按钮
Vue.use(Button)
// 表单
Vue.use(Form)
Vue.use(FormItem)
// 输入框
Vue.use(Input)
// 图标库
Vue.use(Icon)
// 提示信息
Vue.prototype.$message = Message
// 布局
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
// 左侧菜单栏
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
