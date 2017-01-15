import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions';

// Install vuex
Vue.use(Vuex)

export const STORAGE_KEY = 'prog-checklist'

const state = {
    albums: [],

    doneAlbums: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
}

const mutations = {
    TOGGLE_DONE (state, album) {
        if (state.doneAlbums[album.id]) {
            state.doneAlbums[album.id].done = !state.doneAlbums[album.id].done;
        }
    },

    SET_RATING (state, data) {
        const album = data.album;
        const rating = data.rating;

        if (state.doneAlbums[album.id]) {
            state.doneAlbums[album.id].rating = rating;

            if (rating > 0) {
                state.doneAlbums[album.id].done = true;
            }
        } else {
            Vue.set(state.doneAlbums, album.id, {
                rating: rating,
                done: true,
                date: new Date(),
            });
        }
    },

    ADD_ALBUMS (state, albums) {
        const thumbSearch = (image) => image.height > 200;
        const filteredAlbums = albums.forEach(function (item, id) {

            const thumbImage = item.album.images.find(thumbSearch);

            state.albums.push({
                id: item.album.id,
                title: item.album.name,
                band: item.album.artists ? item.album.artists[0].name : '',
                thumb: thumbImage,
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
