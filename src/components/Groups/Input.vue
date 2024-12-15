<script setup>
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useTodosStore } from '~/stores/todos'
import { useGroupsStore } from '~/stores/groups'
import { useDatabaseStore } from '~/stores/database'
import inputClasses from '@/css/input.module.css'

const todosStore = useTodosStore()
const groupsStore = useGroupsStore()
const databaseStore = useDatabaseStore()

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
            try {
                addDoc(collection(databaseStore.db, 'groups'), {
                    name: groupInputValue.value,
                    authorId: databaseStore.user.uid,
                })
            } catch (e) {
                console.log(e)
            }
        }
    } else {
        const groupRef = doc(
            databaseStore.db,
            'groups',
            groupsStore.activeGroupIndex
        )
        updateDoc(groupRef, {
            name: groupInputValue.value,
        })
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
                groupsStore.setGroupInputActive(
                    todosStore.isChangeGroupState === true
                        ? true
                        : !groupsStore.isGroupInputActive
                ),
                    (todosStore.isChangeGroupState = false)
            "
        />
        <form
            class="group-list__input-container"
            :class="{
                'group-list__input-active': groupsStore.isGroupInputActive,
            }"
            @submit="submitGroupAction"
        >
            <input
                ref="groupInput"
                v-model="groupInputValue"
                :placeholder="groupInputPlaceholder"
                type="text"
                :class="inputClasses['group-list__input']"
            />
        </form>
    </div>
</template>

<style lang="scss" scoped>
.group-list__input-container {
    max-width: 0;
    transition: max-width 0.5s, margin-left 0.3s;
    overflow: hidden;
}
.group-list__input-active {
    max-width: 330px;
}
.group-list__form {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 35px;
}
#plus-circle-icon {
    position: absolute;
    left: 10px;
    z-index: 1;
}
#plus-circle-icon:hover {
    cursor: pointer;
}
</style>
