<script setup>
// import { onBeforeMount } from 'vue'
import { useTodosStore } from '../stores/todos'
import ProgressBar from './components/ProgressBar.vue'
import ViewModes from './components/ViewModes.vue'
import TodosList from './components/Todos/TodosList.vue'
import Input from './components/Groups/Input.vue'
import TaskInput from './components/Todos/Input.vue'
import GroupsList from './components/Groups/GroupsList.vue'
import DeleteGroup from './components/Groups/Actions/Delete.vue'
import EditGroup from './components/Groups/Actions/Edit.vue'
import AuthForm from './components/Auth/index.vue'
import { firebaseConfig } from '../firebase_config'
import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, indexedDBLocalPersistence, initializeAuth, onAuthStateChanged } from 'firebase/auth'

const todosStore = useTodosStore()

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
    persistence: [browserLocalPersistence, indexedDBLocalPersistence]
})
onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged', user)
    todosStore.user = user
})

</script>

<template>
    <AuthForm v-if="true" :auth="auth" />
    <template v-else>
        <ProgressBar />

        <ViewModes />

        <div class="group-list">
            <div class="container">
                <div class="group-list__inner">

                    <!-- Input -->

                    <Input />

                    <!-- Groups List -->

                    <GroupsList />

                    <!-- Groups Edit, Delete buttons -->
                    
                    <div v-if="todosStore.groups.length" class="edit-groups">
                        <EditGroup />
                        <DeleteGroup />
                    </div>
                
                </div>
            </div>
        </div>

        <div v-if="todosStore.groups.length" class="tasks">
            <div class="container">
                <div class="tasks__inner">
                    <TaskInput />
                    <TodosList />
                </div>
            </div>
        </div>
        <div v-else class="msg">
            <div class="container">
                <div class="msg__inner">
                    <h3>
                        There is no groups!. Create some groups in order to create
                        tasks
                    </h3>
                </div>
            </div>
        </div>
    </template>
</template>

<style lang="scss">
// Base
@use 'scss/base';

// level-block
// @use 'scss/level-block';

// active-completed

// @use 'scss/active-completed';

// group-list

.group-list__inner {
    display: flex;
    align-items: center;
    position: relative;
}

.group-list__input {
    padding: 10px 0;
    padding-left: 20px;
    padding-right: 10px;
    border: none;
    background-color: #f4f4f4;
    border-radius: 83px;
    padding-left: 50px;
}
.group-list__input:focus {
    outline: none;
}
.group-list__input::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: #bebebe;
}

.group-list__input[type='text'] {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: #bebebe;
}

.group-list {
    margin-top: 50px;
}

.group-list__form {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 35px;
}

.form-icon__container {
    background-color: #f4f4f4;
    padding: 10px 20px;
}

#plus-circle-icon {
    position: absolute;
    left: 10px;
    z-index: 1;
}
#plus-circle-icon:hover {
    cursor: pointer;
}
.group-list__items {
    white-space: nowrap;
    padding: 10px 0;
}
.group-list__item {
    color: rgba(97, 97, 97, 1);
    font-size: 18px;
    background: rgba(255, 255, 255, 1);
    padding: 10px 20px;
    border-radius: 83px;
    margin-left: 25px;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    transition: opacity 0.5s, transform 0.5s;
}

.group-list__item:first-child {
    margin-left: 0;
}

.group-list__item-active {
    background: linear-gradient(90deg, #ff6464 0%, #ff9e9e 100%);
    color: rgba(255, 255, 255, 1);
}

// tasks

.tasks {
    margin-top: 50px;
}








// .tasks__content {
//     margin-top: 50px;
//     position: relative;
// }



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

.trash-icon {
    margin-left: 40px;
}

#completed-icon,
.trash-icon {
    height: 24px;
}

.tasks__item_value {
    font-size: 24px;
    width: 70%;
}

#group-container {
    position: relative;
    width: 100%;
    height: 67px;
    margin-left: 25px;
    overflow-x: hidden;
    display: flex;
    align-items: center;
}

.group-list__input-container {
    max-width: 0;
    transition: max-width 0.5s, margin-left 0.3s;
    overflow: hidden;
}

.group-list__input-active {
    max-width: 330px;
}

.edit-groups {
    display: flex;
    align-items: center;
}

#delete-group {
    height: 22px;
    margin-left: 15px;
}

.edit-groups {
    margin-left: 25px;
}

#tasks-edit-icon {
    margin-left: 40px;
}

#tasks-edit-icon:hover,
.trash-icon:hover,
#completed-icon:hover,
.edit-groups svg:hover {
    cursor: pointer;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.list-leave-active {
    position: absolute;
    width: 100%;
}

.group-leave-to,
.group-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.group-leave-active {
    position: absolute;
}

.task-changing {
    transition: color 0.5s;
    color: #ff6464;
}

@media screen and (max-width: 735px) {
    .level-block__counter {
        font-size: 24px;
    }
    .active-completed__inner {
        font-size: 18px;
    }
    .btn-container:last-child {
        margin-left: 45px;
    }
    .group-list__item {
        font-size: 14px;
        padding: 8px 15px;
    }
    .active-completed__inner {
        padding: 0;
    }
    .group-list__input {
        padding-top: 8px;
        padding-bottom: 8px;
        min-width: 210px;
        width: 100%;
    }
    .group-list__input::placeholder {
        font-size: 16px;
    }
    .group-list__input[type='text'] {
        font-size: 16px;
    }
    .level-block__values {
        padding: 0;
    }
    .tasks__item_value {
        font-size: 18px;
    }
    .tasks__item {
        margin-top: 15px;
    }
    .tasks__item_svg {
        width: 18px;
    }
    .trash-icon,
    #tasks-edit-icon {
        margin-left: 30px;
    }
    .tasks-plus-icon {
        width: 24px;
        top: 5px;
        right: 35px;
    }
    .tasks-plus-icon svg {
        width: 24px;
    }
    .tasks__input {
        padding: 10px 40px;
        top: 5px;
    }
    .level-block__bar,
    .level-block__bar_in {
        height: 20px;
    }
    .group-list__inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    #group-container {
        grid-row-start: 1;
        grid-column-start: 1;
        grid-column-end: 3;
        margin-left: 0;
        margin-bottom: 25px;
    }
    .edit-groups {
        justify-content: end;
    }
}
</style>
