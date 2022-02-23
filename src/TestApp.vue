<script>
    import { defineAsyncComponent } from 'vue'

    export default {
        data() {
            return {
                renderHello: false
            }
        },
        components: {
            Hello: defineAsyncComponent({
                loader: () => import('./components/Hello.vue')
            })
        }
    }
</script>

<template>
    I'm first!
    <button @click="renderHello = true">Render the rest of the page</button>
    <Hello v-if="renderHello" />
</template>

<style>
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
    }
</style>