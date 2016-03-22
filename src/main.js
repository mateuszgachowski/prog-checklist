import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import store from './store'
import App from './components/App.vue'
import AlbumsListView from './components/AlbumsListView.vue'


// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
    '/albums/': {
        component: AlbumsListView
    }
})

router.beforeEach(function () {
    window.scrollTo(0, 0)
})

// router.redirect({
//   '*': '/albums/1'
// })

router.start(App, '#app')
