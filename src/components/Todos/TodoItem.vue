<script setup>
import { Icon } from '@iconify/vue'
import { useTodosStore } from '~/stores/todos'
import Trash from '../Generics/Trash.vue'

const todosStore = useTodosStore()

const props = defineProps({
    task: Object,
})
</script>

<template>
    <div class="tasks__item">
        <span
            class="tasks__item_value"
            :class="{
                'task-changing': todosStore.changingTaskId === task.docId,
            }"
            >{{ task.title }}</span
        >
        <div class="tasks__item_icons">
            <div
                id="completed-icon"
                @click="todosStore.completeTask(task.docId)"
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
                    ;(todosStore.changingTaskId = task.docId),
                        (todosStore.isChangeTaskState = true)
                "
            />
            <Trash @delete="todosStore.deleteTask(task.docId)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
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
.tasks__item_icons {
    display: flex;
    align-items: center;
}
.tasks__item_value {
    font-size: 24px;
    width: 70%;
}
#tasks-edit-icon {
    margin-left: 40px;
    &:hover {
        cursor: pointer;
    }
}
.task-changing {
    transition: color 0.5s;
    color: #ff6464;
}
@media screen and (max-width: 735px) {
    .tasks__item_value {
        font-size: 18px;
    }
    .tasks__item {
        margin-top: 15px;
    }
    #tasks-edit-icon {
        margin-left: 30px;
    }
}
</style>
