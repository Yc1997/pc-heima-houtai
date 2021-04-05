import Vue from 'vue'
import { Button, Message, MessageBox, Form, FormItem, Input, Container, Header, Aside, Main, Menu, MenuItem, MenuItemGroup, Submenu, Popover, Avatar, Dropdown, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem, Select, Option, Radio, RadioGroup, Col, Row, Checkbox, CheckboxGroup, DatePicker, TimePicker, Switch, Table, TableColumn, Pagination, Card, Tag, Loading, RadioButton, Image, Dialog, Upload } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Popover)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Radio)
Vue.use(Col)
Vue.use(Row)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Loading)
Vue.use(RadioButton)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(Upload)
// Vue.use(MessageBox)

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;