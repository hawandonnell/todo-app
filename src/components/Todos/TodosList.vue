<script setup>
import { useTodosStore } from '~/stores/todos.js'
import TodoItem from './TodoItem.vue'

const todosStore = useTodosStore()
</script>

<template>
    <TransitionGroup name="list">
        <TodoItem
            v-for="task in todosStore.currentViewTasks"
            :key="task.docId"
            :task="task"
        />
    </TransitionGroup>
</template>
