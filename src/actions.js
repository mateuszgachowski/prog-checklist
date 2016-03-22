export function toggleDone (store, album) {
    store.dispatch('TOGGLE_DONE', album)
}
