import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDatabaseStore } from './database'

export const useGroupsStore = defineStore('groups', () => {
    const groups = ref([])
    const isGroupsLoading = ref(true)
    const activeGroupIndex = ref(-1)
    const isGroupInputActive = ref(false) // Reflects group input state

    // Group Input
    function setGroupInputActive(value) {
        isGroupInputActive.value = value
    }

    const database = useDatabaseStore()

    function fetchGroups() {
        try {
            groups.value = []
            const q = query(
                collection(database.db, 'groups'),
                where('authorId', '==', database.user.uid)
            )
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docChanges().forEach((change) => {
                    if (!change.doc.metadata.hasPendingWrites) {
                        isGroupsLoading.value = false
                    }
                    if (change.type === 'added') {
                        groups.value.push({
                            docId: change.doc.id,
                            ...change.doc.data(),
                        })
                    }
                    if (change.type === 'removed') {
                        const removedGroupIndex = groups.value.findIndex(
                            (group) => group.docId === change.doc.id
                        )
                        if (removedGroupIndex !== -1) {
                            groups.value.splice(removedGroupIndex, 1)
                        }
                    }
                    if (change.type === 'modified') {
                        const removedGroupIndex = groups.value.findIndex(
                            (group) => group.docId === change.doc.id
                        )
                        if (removedGroupIndex !== -1) {
                            groups.value.splice(removedGroupIndex, 1, {
                                docId: change.doc.id,
                                ...change.doc.data(),
                            })
                        }
                    }
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    return {
        groups,
        isGroupsLoading,
        fetchGroups,
        activeGroupIndex,
        isGroupInputActive,
        setGroupInputActive,
    }
})
