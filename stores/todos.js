import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    query,
    where,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'
import { useGroupsStore } from './groups'
import { useDatabaseStore } from './database'

export const useTodosStore = defineStore('todos', () => {
    const viewModeDict = new Map()
    viewModeDict.set(true, 'completed')
    viewModeDict.set(false, 'active')

    // External Stores
    const groups = useGroupsStore()
    const database = useDatabaseStore()

    // State
    const viewMode = ref('active') // active | completed
    const tasks = ref([])
    const isTasksLoading = ref(false)

    const changingTaskId = ref(-1)

    // Groups
    const isChangeGroupState = ref(false) // Indicates, if we are changing entity (true) or creating one (false). Entities: groups, tasks

    // Getters
    const currentGroupTasks = computed(() =>
        tasks.value.filter((task) => task.groupId === groups.activeGroupIndex)
    ) // tasks list according to group id
    const currentViewTasks = computed(() =>
        currentGroupTasks.value.filter(
            (task) => viewMode.value === viewModeDict.get(task.completed)
        )
    ) // tasks list according to group id and viewMode

    // Actions
    function updateViewMode(value) {
        viewMode.value = value
    }
    // Task CRUD
    async function completeTask(taskId) {
        const docRef = doc(database.db, 'todos', taskId)
        await updateDoc(docRef, {
            completed: true,
        })
    }
    async function deleteTask(taskId) {
        const docRef = doc(database.db, 'todos', taskId)
        await deleteDoc(docRef)
    }
    function fetchTasks() {
        try {
            tasks.value = []
            const q = query(
                collection(database.db, 'todos'),
                where('authorId', '==', database.user.uid)
            )
            // Changes listener
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docChanges().forEach((change) => {
                    if (!change.doc.metadata.hasPendingWrites) {
                        isTasksLoading.value = false
                    }
                    if (change.type === 'added') {
                        tasks.value.push({
                            docId: change.doc.id,
                            ...change.doc.data(),
                        })
                    }
                    if (change.type === 'removed') {
                        const removedTaskIndex = tasks.value.findIndex(
                            (task) => task.docId === change.doc.id
                        )
                        if (removedTaskIndex !== -1) {
                            tasks.value.splice(removedTaskIndex, 1)
                        }
                    }
                    if (change.type === 'modified') {
                        const removedTaskIndex = tasks.value.findIndex(
                            (task) => task.docId === change.doc.id
                        )
                        if (removedTaskIndex !== -1) {
                            tasks.value.splice(removedTaskIndex, 1, {
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
        viewMode,
        tasks,
        currentGroupTasks,
        updateViewMode,
        changingTaskId,
        completeTask,
        deleteTask,
        currentViewTasks,
        isChangeGroupState,
        fetchTasks,
    }
})
