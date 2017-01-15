import request from 'superagent';
import { SET_RATING, ADD_ALBUMS, TOGGLE_DONE } from './mutation-types';

export default {
    toggleDone ({ commit}, album) {
        commit(TOGGLE_DONE, album);
    },
    setRating ({ commit }, data) {
        commit(SET_RATING, data);
    },

    getAlbums ({ commit }) {
        request
            .get('/albums')
            .type('json')
            .end(function (err, response) {
                if (err || !response.ok) {
                    console.error('Oh no! error');
                } else {
                    if (response.body.error) {
                        location.href = response.body.authUrl;
                        return;
                    }

                    commit(ADD_ALBUMS, response.body.items);
                }
            })
    }
}
