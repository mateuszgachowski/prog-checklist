import Vue from 'vue'
import Vuex from 'vuex'

// Install vuex
Vue.use(Vuex)

export const STORAGE_KEY = 'prog-checklist'

const state = {
    albums: [
        {
            id: 1,
            title: 'In The Land of Gray and Pink',
            band: 'Caravan'
        },
        {
            id: 2,
            title: 'In The Court of the Crimson King',
            band: 'Caravan'
        },
    ],

    doneAlbums: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
}

const mutations = {
    TOGGLE_DONE (state, album) {
        if (state.doneAlbums.indexOf(album.id) !== -1) {
            state.doneAlbums.splice(state.doneAlbums.indexOf(album.id), 1);
        }
        else {
            state.doneAlbums.push(album.id);
        }
    }
}

const localStorageMiddleware = {
    onMutation (mutation, { doneAlbums }) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(doneAlbums))
    }
}

export default new Vuex.Store({
    state,
    mutations,
    middlewares: [localStorageMiddleware]
})
