<script setup>
import { Icon } from '@iconify/vue'
import { useTodosStore } from '~/stores/todos'
import { useGroupsStore } from '~/stores/groups'

const todosStore = useTodosStore()
const groupsStore = useGroupsStore()
</script>

<template>
    <Icon
        icon="clarity:edit-solid"
        color="#ff6464"
        height="22"
        @click="
            groupStore.setGroupInputActive(
                todosStore.isChangeGroupState === false
                    ? true
                    : !groupsStore.isGroupInputActive
            ),
                (todosStore.isChangeGroupState = true)
        "
    />
</template>
