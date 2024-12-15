<script setup>
import { doc, deleteDoc } from 'firebase/firestore'
import { useDatabaseStore } from '~/stores/database'
import { useGroupsStore } from '~/stores/groups'
import Trash from '@/components/Generics/Trash.vue'

const databaseStore = useDatabaseStore()
const groupsStore = useGroupsStore()

function deleteGroup() {
    const groupRef = doc(
        databaseStore.db,
        'groups',
        groupsStore.activeGroupIndex
    )
    deleteDoc(groupRef)
}
</script>

<template>
    <Trash @delete="deleteGroup" />
</template>
