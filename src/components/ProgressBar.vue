<script setup>
import { computed } from 'vue'
import { useTodosStore } from '../../stores/todos.js'

const todosStore = useTodosStore()

const fillLevel = computed(() => {
    const completedTasksCount = todosStore.currentGroupTasks.filter(task => task.completed === true).length
    if (completedTasksCount === 0) {
        return '0%'
    }
    return `${100 / (todosStore.currentGroupTasks.length / completedTasksCount)}%`
})
</script>

<template>
    <div class="level-block">
        <div class="container">
            <div class="level-block__inner">
                <div class="level-block__bar">
                    <div
                        id="progress-bar"
                        class="level-block__bar_in"
                        :style="{ 'max-width': fillLevel }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../scss/level-block';
</style>