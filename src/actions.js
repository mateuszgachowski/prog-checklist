import request from 'superagent';
import { TOGGLE_DONE, ADD_ALBUMS } from './mutation-types';

export default {
    toggleDone ({ commit }, album) {
        commit(TOGGLE_DONE, album)
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
