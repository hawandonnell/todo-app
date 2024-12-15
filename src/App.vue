<script setup>
import { useGroupsStore } from '../stores/groups'
import ProgressBar from './components/ProgressBar.vue'
import ViewModes from './components/ViewModes.vue'
import TodosList from './components/Todos/TodosList.vue'
import Input from './components/Groups/Input.vue'
import TaskInput from './components/Todos/Input.vue'
import GroupsList from './components/Groups/GroupsList.vue'
import DeleteGroup from './components/Groups/Actions/Delete.vue'
import EditGroup from './components/Groups/Actions/Edit.vue'
import AuthForm from './components/Auth/index.vue'
import Header from './components/Header.vue'
import { useDatabaseStore } from '../stores/database'

const groupsStore = useGroupsStore()
const databaseStore = useDatabaseStore()
</script>

<template>
    <AuthForm v-if="!databaseStore.user" />
    <template v-else>
        <Header />
        <ProgressBar />

        <ViewModes />

        <template v-if="!groupsStore.isGroupsLoading">
            <div class="group-list">
                <div class="container">
                    <div class="group-list__inner">
                        <!-- Input -->

                        <Input :db="databaseStore.db" />

                        <!-- Groups List -->

                        <GroupsList />

                        <!-- Groups Edit, Delete buttons -->

                        <div
                            v-if="groupsStore.groups.length"
                            class="edit-groups"
                        >
                            <EditGroup />
                            <DeleteGroup />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="groupsStore.groups.length" class="tasks">
                <div class="container">
                    <div class="tasks__inner">
                        <TaskInput :db="databaseStore.db" />
                        <TodosList />
                    </div>
                </div>
            </div>
            <div v-else class="msg">
                <div class="container">
                    <div class="msg__inner">
                        <h3>
                            There is no groups!. Create some groups in order to
                            create tasks
                        </h3>
                    </div>
                </div>
            </div>
        </template>
        <div v-else>Loading...</div>
    </template>
</template>

<style lang="scss">
// Base
@use 'scss/base';

// group-list

.group-list {
    margin-top: 50px;
}

.group-list__inner {
    display: flex;
    align-items: center;
    position: relative;
}

// tasks

.tasks {
    margin-top: 50px;
}

#completed-icon {
    height: 24px;
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

#completed-icon:hover,
.edit-groups svg:hover {
    cursor: pointer;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    opacity: 1;
}

.group-leave-to,
.group-enter-from {
    opacity: 0;
}

.group-leave-active {
    opacity: 1;
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
    .tasks__item_svg {
        width: 18px;
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
    .edit-groups {
        justify-content: end;
    }
}
</style>
