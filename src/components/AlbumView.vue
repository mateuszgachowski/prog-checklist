<template>
    <div class="item-view">
        <s v-if="isDone">{{ album.id }} {{ album.title }}</s>
        <template v-else>{{ album.id }} {{ album.title }}</template>
        <button @click="toggleDone(album)"
    </div>
</template>

<script>
import { toggleDone } from '../actions'

export default {
    name: 'AlbumView',
    props: ['album'],
    vuex: {
        getters: {
            doneAlbums: (state) => state.doneAlbums
        },
        actions: {
            toggleDone
        }
    },

    computed: {
        isDone: function () {
            return (this.doneAlbums.indexOf(this.album.id) !== -1)
        }
    }
}
</script>
