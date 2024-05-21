<script setup>
import { Icon } from '@iconify/vue'
import {useTodosStore} from '../../../stores/todos'

const todosStore = useTodosStore()

const props = defineProps({
    task: Object
})

</script>

<template>
    <div class="tasks__item">
        <span
        class="tasks__item_value"
        :class="{
            'task-changing': todosStore.changingTaskId === task.id,
        }"
        >{{ task.title }}</span
    >
    <div class="tasks__item_icons">
        <div
            id="completed-icon"
            @click="todosStore.completeTask(task.id)"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="tasks__item_svg"
            >
                <path
                    d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.1489 5.6206L19.6421 8.11376L11.855 15.9024L9.37646 18.3794L6.8833 15.8862L4.3579 13.3594L6.83496 10.8823L9.36036 13.4092L17.1489 5.6206Z"
                    fill="#FF6464"
                />
            </svg>
        </div>
        <Icon
            id="tasks-edit-icon"
            icon="clarity:edit-solid"
            color="#ff6464"
            height="22"
            @click="
                ;(todosStore.changingTaskId = task.id),
                    (todosStore.isChangeTaskState = true)
            "
        />
        <div
            class="trash-icon"
            @click="todosStore.deleteTask(task.id)"
        >
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="tasks__item_svg"
            >
                <path
                    d="M3 5H19L17.42 19.22C17.3658 19.7094 17.1331 20.1616 16.7663 20.49C16.3994 20.8184 15.9244 21 15.432 21H6.568C6.07564 21 5.60056 20.8184 5.23375 20.49C4.86693 20.1616 4.63416 19.7094 4.58 19.22L3 5Z"
                    stroke="#FF6464"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M6.345 2.147C6.50675 1.80397 6.76271 1.514 7.083 1.31091C7.4033 1.10782 7.77474 0.999996 8.154 1H13.846C14.2254 0.999806 14.5971 1.10755 14.9176 1.31064C15.2381 1.51374 15.4942 1.80381 15.656 2.147L17 5H5L6.345 2.147Z"
                    stroke="#FF6464"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M1 5H21"
                    stroke="#FF6464"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M9 10V15"
                    stroke="#FF6464"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M13 10V15"
                    stroke="#FF6464"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
    </div>
</template>


<style scoped lang="scss">
.tasks__item_icons {
    display: flex;
    align-items: center;
}
</style>