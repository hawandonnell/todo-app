<script setup>
import { Icon } from '@iconify/vue'
import { useTodosStore } from '../../../../stores/todos';

const todosStore = useTodosStore()

</script>


<template>
    <Icon
        icon="clarity:edit-solid"
        color="#ff6464"
        height="22"
        @click="
            todosStore.setGroupInputActive(todosStore.isChangeGroupState === false ? true : !todosStore.isGroupInputActive),
            (todosStore.isChangeGroupState = true)
        "
    />
</template>