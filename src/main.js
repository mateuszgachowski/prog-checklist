import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import store from './store'
import App from './components/App.vue'
import AlbumsListView from './components/AlbumsListView.vue'

// install router
Vue.use(VueRouter);

// routing
var router = new VueRouter({
    routes: [
        {
            path: '/',
            component: AlbumsListView
        }
    ]
});

router.afterEach(function () {
    window.scrollTo(0, 0)
})

// router.redirect({
//   '*': '/albums/1'
// })

const app = new Vue({
    store,
    router
}).$mount('#app')
