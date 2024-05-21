<script setup>
import { useTodosStore } from '../../../stores/todos';

const todosStore = useTodosStore()
</script>

<template>
    <div
        id="group-container"
        ref="groupViewport"
        v-dragscroll.x="true"
    >
        <div ref="groupContent" class="group-list__items">
            <transition-group name="group">
                <span
                    v-for="group in todosStore.groups"
                    :key="group.id"
                    class="group-list__item"
                    :class="{
                        'group-list__item-active':
                            todosStore.activeGroupIndex === group.id,
                    }"
                    @click="todosStore.activeGroupIndex = group.id"
                    >{{ group.name }}</span
                >
            </transition-group>
        </div>
    </div>
</template>
