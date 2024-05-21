import { defineStore } from "pinia";
import { ref, computed } from "vue";

// TODO: Decompose store in groups

export const useTodosStore = defineStore('todos', () => {
    const viewModeDict = new Map()
    viewModeDict.set(true, 'completed')
    viewModeDict.set(false, 'active')
    // State
    const viewMode = ref('active') // active | completed
    const groups = ref(JSON.parse(localStorage.getItem('groups')) || [])
    const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])
    const groupLastId = ref(JSON.parse(localStorage.getItem('groupLastId')) || [])
    const taskLastId = ref(JSON.parse(localStorage.getItem('taskLastId')) || [])
    const activeGroupIndex = ref(0)

    const changingTaskId = ref(-1)

    // Auth
    const user = ref({})

    // Groups
    const isChangeGroupState = ref(false) // Indicates, if we are changing entity (true) or creating one (false). Entities: groups, tasks
    const isGroupInputActive = ref(false) // Reflects group input state

    // Getters
    const currentGroupTasks = computed(() => tasks.value.filter(task => task.userId === activeGroupIndex.value)) // tasks list according to group id
    const currentViewTasks = computed(() => tasks.value.filter(task => task.userId === activeGroupIndex.value && viewMode.value === viewModeDict.get(task.completed))) // tasks list according to group id and viewMode

    // Actions
    function updateViewMode(value) {
        viewMode.value = value
    }
    // Task CRUD
    function completeTask(taskId) {
        const handlingTask = tasks.value.find(task => task.id === taskId)
        handlingTask.completed = true
    }
    function deleteTask(taskId) {
        const handlingTaskIndex = tasks.value.findIndex(task => task.id === taskId)
        if (handlingTaskIndex !== -1) {
            tasks.value.splice(handlingTaskIndex, 1)
        }
    }
    // Group Input
    function setGroupInputActive(value) {
        isGroupInputActive.value = value
    }

    return { viewMode, user, groups, tasks, currentGroupTasks, activeGroupIndex, groupLastId, taskLastId, updateViewMode, changingTaskId, completeTask, deleteTask, currentViewTasks, isChangeGroupState, isGroupInputActive, setGroupInputActive }
})