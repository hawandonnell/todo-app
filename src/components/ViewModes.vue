<script setup>
import { useTodosStore } from '~/stores/todos'

const todosStore = useTodosStore()
</script>

<template>
    <div class="active-completed">
        <div class="container">
            <div class="active-completed__inner">
                <div
                    class="btn-container"
                    :class="{ active: todosStore.viewMode === 'active' }"
                    @click="todosStore.updateViewMode('active')"
                >
                    <h4 class="active__btn">Active</h4>
                    <div class="btn__underline"></div>
                </div>
                <div
                    class="btn-container"
                    :class="{ active: todosStore.viewMode === 'completed' }"
                    @click="todosStore.updateViewMode('completed')"
                >
                    <h4 class="completed__btn">Completed</h4>
                    <div class="btn__underline"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../scss/active-completed';
</style>
