<script setup>
import { ref } from 'vue'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import tabClasses from '@/css/tab.module.css'
import inputClasses from '@/css/input.module.css'
import { useDatabaseStore } from '~/stores/database'

const databaseStore = useDatabaseStore()

const login = ref('')
const password = ref('')
const passwordSub = ref('')

const isSignIn = ref(true)

async function createUser() {
    if (password.value !== passwordSub.value) {
        return
    }
    try {
        await createUserWithEmailAndPassword(
            databaseStore.auth,
            login.value,
            password.value
        )
    } catch (e) {
        console.log(e)
    }
}

async function signIn() {
    try {
        await signInWithEmailAndPassword(
            databaseStore.auth,
            login.value,
            password.value
        )
    } catch (e) {
        console.log(e)
    }
}

async function authHandler(event) {
    event.preventDefault()
    if (isSignIn.value) {
        await signIn()
    } else {
        await createUser()
    }
}

function toggleAuthAction() {
    isSignIn.value = !isSignIn.value
}
</script>

<template>
    <div class="auth-form_wrapper">
        <h2>{{ isSignIn ? 'Sign-in' : 'Sign-up' }}</h2>
        <form @submit="authHandler" id="auth-form">
            <label for="login">Login:</label>
            <input
                v-model="login"
                name="login"
                type="email"
                required
                placeholder="Enter your email"
                :class="inputClasses['group-list__input']"
            />
            <label for="password">Password:</label>
            <input
                v-model="password"
                name="password"
                type="password"
                required
                minlength="6"
                :class="inputClasses['group-list__input']"
                placeholder="Enter your password"
            />
            <template v-if="!isSignIn">
                <label for="password-submit">Submit your password:</label>
                <input
                    v-model="passwordSub"
                    name="password-submit"
                    type="password"
                    required
                    :class="inputClasses['group-list__input']"
                    placeholder="Submit your password"
                />
            </template>
            <input
                type="submit"
                id="auth-form__submit"
                :class="tabClasses['primary-tab']"
                value="Submit"
            />
        </form>
        <span
            class="auth-action-toggler"
            :class="tabClasses['secondary-tab']"
            @click="toggleAuthAction"
            >{{ isSignIn ? 'Sign-up' : 'Sign-in' }}</span
        >
    </div>
</template>

<style lang="scss" scoped>
.auth-form_wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    gap: 1rem;

    #auth-form {
        width: 450px;
        display: flex;
        flex-flow: column;
        gap: 1rem;
        background-color: white;
        border-radius: 1rem;
        padding: 1rem;

        #auth-form__submit {
            cursor: pointer;
        }
    }
    .auth-action-toggler {
        cursor: pointer;
        user-select: none;
    }
}
</style>
