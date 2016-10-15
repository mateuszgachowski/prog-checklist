<script>
import AlbumView from './AlbumView.vue'

export default {
    name: 'AlbumsListView',

    vuex: {
        getters: {
            albums: (store) => store.albums
        }
    },
    components: {
        AlbumView
    }
}
</script>

<template>
    <div>
        <album-view v-for="album in albums" :album="album"></album-view>
    </div>
</template>
