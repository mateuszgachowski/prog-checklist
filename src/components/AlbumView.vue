<template>
    <div class="item-view">
        <img v-if="albumCover" :src="albumCover" :alt="album.title" width="200">

        <div class="item-view__description">
            <span v-if="isDone" class="checked" @click="toggleDone(album)">☑</span>{{ album.title }}

            <div class="item-view__description__rating">
                <span v-for="rating in [1, 2, 3, 4, 5]" @click="setRating(album, rating)">
                    <template v-if="rating <= albumRating">★</template>
                    <template v-else>☆</template>
                </span>
            </div>
            <small v-if="isDone">This was rated {{ albumRatingDate }}</small>
        </div>
    </div>
</template>

<script>
import { toggleDone } from '../actions';
import store from '../store';

export default {
    name: 'AlbumView',
    props: ['album'],

    methods: {
        toggleDone (album) {
            store.dispatch('toggleDone', album);
        },
        setRating (album, rating) {
            store.dispatch('setRating', { album, rating });
        }
    },

    computed: {
        doneAlbums: () => store.state.doneAlbums,
        isDone: function () {
            return this.doneAlbums[this.album.id] && this.doneAlbums[this.album.id].done;
        },
        albumRating () {
            if (!this.isDone) {
                return 0;
            }
            return this.doneAlbums[this.album.id].rating;
        },
        albumRatingDate () {
            if (!this.isDone) {
                return false;
            }
            return new Date(this.doneAlbums[this.album.id].date).toISOString().slice(0, 10);
        },
        albumCover () {
            const cover = this.album && this.album.thumb && this.album.thumb.url;

            return cover || 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg';
        },
    }
}
</script>

<style lang="sass">
    .item-view {
        width: 200px;
        border: 1px solid #ccc;
        margin: 10px;

        &__description {
            padding: 10px;

            &__rating {
                display: block;
            }
        }
    }

    .checked {
        color: green;
        cursor: pointer;
    }
</style>
