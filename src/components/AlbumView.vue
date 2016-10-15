<template>
    <div class="item-view">
        <s v-if="isDone">{{ album.id }} {{ album.title }}</s>
        <template v-else>{{ album.id }} {{ album.title }}</template>
        <button @click="toggleDone(album)"></button>
    </div>
</template>

<script>
import { toggleDone } from '../actions';
import store from '../store';

export default {
    name: 'AlbumView',
    props: ['album'],

    methods: {
        toggleDone: store.dispatch.bind(store, 'toggleDone')
    },

    computed: {
        doneAlbums: () => store.state.doneAlbums,
        isDone: function () {
            return (this.doneAlbums.indexOf(this.album.id) !== -1)
        }
    }
}
</script>
