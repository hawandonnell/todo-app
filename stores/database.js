import { ref } from 'vue'
import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app'
import {
    browserLocalPersistence,
    indexedDBLocalPersistence,
    initializeAuth,
    onAuthStateChanged,
} from 'firebase/auth'
import { firebaseConfig } from '../firebase_config'
import { getFirestore } from 'firebase/firestore'
import { useGroupsStore } from './groups'
import { useTodosStore } from './todos'

export const useDatabaseStore = defineStore('database', () => {
    const todosStore = useTodosStore()
    const groupsStore = useGroupsStore()

    const db = ref({})
    const user = ref({})
    const auth = ref({})

    const app = initializeApp(firebaseConfig)

    // Auth
    auth.value = initializeAuth(app, {
        persistence: [browserLocalPersistence, indexedDBLocalPersistence],
    })

    // Firestore
    db.value = getFirestore(app)

    onAuthStateChanged(auth.value, (newUser) => {
        user.value = newUser
        if (newUser) {
            groupsStore.fetchGroups()
            todosStore.fetchTasks()
        }
    })

    return { db, user, auth }
})
