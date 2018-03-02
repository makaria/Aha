# The Vue build version to load with the `import` command
# (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue::$prefix = 'aha-'
import Footer from './components/footer.vue'
import Navi from './components/navi.vue'
import Hexagon from './components/hexagon.vue'

[
  ['footer', Footer],
  ['navi', Navi],
  ['hexagon', Hexagon],
].forEach (d) ->  Vue.component(Vue.prototype.$prefix + d[0], d[1])

# eslint-disable no-new
new Vue
  el: '#app',
  router: router
  # store: store
  render: (h) -> h App
