<script>
import AlbumView from './AlbumView.vue'
import store from '../store';

export default {
    name: 'AlbumsListView',

    computed: {
        albums: () => store.state.albums
    },
    methods: {
        getAlbums: store.dispatch.bind(store, 'getAlbums')
    },
    components: {
        AlbumView
    },

    mounted () {
        this.getAlbums();
    }
}
</script>

<template>
    <div>
        <album-view v-for="album in albums" :album="album"></album-view>
    </div>
</template>
