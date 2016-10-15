import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions';

// Install vuex
Vue.use(Vuex)

export const STORAGE_KEY = 'prog-checklist'

const state = {
    albums: [],

    doneAlbums: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
}

const mutations = {
    TOGGLE_DONE (state, album) {
        if (state.doneAlbums.indexOf(album.id) !== -1) {
            state.doneAlbums.splice(state.doneAlbums.indexOf(album.id), 1);
        } else {
            state.doneAlbums.push(album.id);
        }
    },

    ADD_ALBUMS (state, albums) {
        const filteredAlbums = albums.forEach(function (item, id) {
            state.albums.push({
                id: id + 1,
                title: item.album.name,
                band: item.album.artists ? item.album.artists[0].name : '',
            })
        });
    }
}

const localStoragePlugin = (store) => {
    store.subscribe((mutation, state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.doneAlbums))
    })
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [localStoragePlugin]
})
