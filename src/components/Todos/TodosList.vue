<script setup>
import { useTodosStore } from '../../../stores/todos.js'
import TodoItem from './TodoItem.vue';

const todosStore = useTodosStore()

</script>

<template>
    <TransitionGroup name="list">
        <TodoItem v-for="task in todosStore.currentViewTasks" :key="task.id" :task="task" />
    </TransitionGroup>
</template>

<style lang="scss">
.tasks__item {
    padding: 20px 40px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 100px;
    margin-top: 25px;
    transition: opacity 0.5s, transform 0.5s;
}

.tasks__item:first-child {
    margin-top: 0;
}
</style>