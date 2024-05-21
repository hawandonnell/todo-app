<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'
import { computed } from 'vue';
import { useTodosStore } from '../../../stores/todos';

const todosStore = useTodosStore()

const groupInputValue = ref('')

const groupInputPlaceholder = computed(() => {
    if (todosStore.isChangeGroupState) {
        return 'Change group...'
    } else {
        return 'Add group...'
    }
})

// This method is also method that changing name of the group
function submitGroupAction(event) {
    event.preventDefault()
    if (!todosStore.isChangeGroupState) {
        if (groupInputValue.value !== '') {
            todosStore.groupLastId++
            todosStore.groups.unshift({
                id: todosStore.groupLastId,
                name: groupInputValue.value,
            })
            todosStore.activeGroupIndex = todosStore.groupLastId
        }
    } else {
        let group = todosStore.groups.find(
            (el) => el.id === todosStore.activeGroupIndex
        )
        group.name = groupInputValue.value
    }
    groupInputValue.value = ''
}

</script>

<template>
    <div class="group-list__form">
        <Icon
            id="plus-circle-icon"
            icon="akar-icons:circle-plus-fill"
            color="#888"
            height="24"
            @click="
                    todosStore.setGroupInputActive(todosStore.isChangeGroupState === true ? true : !todosStore.isGroupInputActive),
                    (todosStore.isChangeGroupState = false)
            "
        />
        <form
            class="group-list__input-container"
            :class="{
                'group-list__input-active': todosStore.isGroupInputActive,
            }"
            @submit="submitGroupAction"
        >
            <input
                ref="groupInput"
                v-model="groupInputValue"
                :placeholder="groupInputPlaceholder"
                type="text"
                class="group-list__input"
            />
        </form>
    </div>
</template>