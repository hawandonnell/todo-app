<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue';
import { useTodosStore } from '../../../stores/todos';

const todosStore = useTodosStore()

const taskInputValue = ref('')

const taskInputPlaceholder = computed(() => {
    if (todosStore.isChangeTaskState) {
        return 'Change task...'
    } else {
        return 'Add task...'
    }
})

function submitTaskAction(event) {
    event.preventDefault()
    if (todosStore.isChangeTaskState) {
        changeTask()
    } else {
        if (taskInputValue.value !== '') {
            todosStore.taskLastId++
            todosStore.tasks.push({
                userId: todosStore.activeGroupIndex,
                id: todosStore.taskLastId,
                title: taskInputValue.value,
                completed: false,
            })
        }
    }
    taskInputValue.value = ''
}
function changeTask() {
    if (taskInputValue.value !== '') {
        let task = todosStore.tasks.find((el) => el.id == todosStore.changingTaskId)
        todosStore.tasks[todosStore.tasks.indexOf(task)].title =
            taskInputValue.value
    }
    todosStore.isChangeTaskState = false
    taskInputValue.value = ''
    todosStore.changingTaskId = null
}
</script>

<template>
    <form class="tasks__form" @submit="submitTaskAction">
        <input
            ref="addTaskInput"
            v-model="taskInputValue"
            :placeholder="taskInputPlaceholder"
            class="group-list__input tasks__input"
            type="text"
        />
        <div
            v-if="!todosStore.isChangeTaskState"
            class="tasks-plus-icon"
            @click="submitTaskAction"
        >
            <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 0.5C7.8875 0.5 0.5 7.8875 0.5 17C0.5 26.1125 7.8875 33.5 17 33.5C26.1125 33.5 33.5 26.1125 33.5 17C33.5 7.8875 26.1125 0.5 17 0.5ZM18.5 23C18.5 23.3978 18.342 23.7794 18.0607 24.0607C17.7794 24.342 17.3978 24.5 17 24.5C16.6022 24.5 16.2206 24.342 15.9393 24.0607C15.658 23.7794 15.5 23.3978 15.5 23V18.5H11C10.6022 18.5 10.2206 18.342 9.93934 18.0607C9.65804 17.7794 9.5 17.3978 9.5 17C9.5 16.6022 9.65804 16.2206 9.93934 15.9393C10.2206 15.658 10.6022 15.5 11 15.5H15.5V11C15.5 10.6022 15.658 10.2206 15.9393 9.93934C16.2206 9.65804 16.6022 9.5 17 9.5C17.3978 9.5 17.7794 9.65804 18.0607 9.93934C18.342 10.2206 18.5 10.6022 18.5 11V15.5H23C23.3978 15.5 23.7794 15.658 24.0607 15.9393C24.342 16.2206 24.5 16.6022 24.5 17C24.5 17.3978 24.342 17.7794 24.0607 18.0607C23.7794 18.342 23.3978 18.5 23 18.5H18.5V23Z"
                    fill="#FF6464"
                />
            </svg>
        </div>
        <Icon
            v-else
            class="tasks-plus-icon"
            icon="el:ok-sign"
            color="#ff6464"
            height="34"
            @click="changeTask"
        />
    </form>
</template>


<style scoped lang="scss">
.tasks__form {
    position: relative;
}
.tasks__input {
    padding: 20px 40px;
    width: 100%;
}
.tasks__input[type='text'] {
    font-size: 24px;
}
.tasks__input::placeholder {
    font-size: 24px;
}
.tasks-plus-icon {
    position: absolute;
    right: 30px;
    top: 21px;
}
.tasks-plus-icon:hover {
    cursor: pointer;
}
</style>