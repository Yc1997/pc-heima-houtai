import Vue from 'vue'
let dayjs = require('dayjs')

Vue.filter('formatTime', function (data) {
  return dayjs(data)
})