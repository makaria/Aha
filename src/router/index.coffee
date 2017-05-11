import Vue from 'vue'
import Router from 'vue-router'

Vue.use Router

load = (component) -> -> System.import "@/components/#{component}.vue"

routes = [
  path: '/', component: load 'home'
,
  path: '/Brownian-motion', component: load 'brownian-motion'
,
  path: '/Chat-Noir', component: load 'chat-noir'
,
  path: '/Minimum-Spanning-Tree', component: load 'minimum-spanning-tree'
,
  path: '/Mine-Sweeper', component: load 'mine-sweeper'
,
  path: '/Pinball', component: load 'pin-ball'
]

routes.push path: '*', component: load 'Hello'

export default new Router {routes}
