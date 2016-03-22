<script>
import store from '../store.js'

export default {
    store
}
</script>
<template>
    <div id="wrapper">
        <!-- main view -->
        <router-view
          class="view"
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
    </div>
</template>

<style lang="sass">
    .view {
        position: absolute;
        width: 100%;
        transition: opacity .2s ease;
        box-sizing: border-box;
        padding: 8px 20px;

        &.v-enter, &.v-leave {
            opacity: 0;
        }
    }
</style>
