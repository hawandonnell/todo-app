<script setup>
import { signOut } from 'firebase/auth'
import tabClasses from '@/css/tab.module.css'
import { useDatabaseStore } from '~/stores/database'

const databaseStore = useDatabaseStore()

async function signOutHandler() {
    await signOut(databaseStore.auth)
}
</script>

<template>
    <header class="app-header">
        <div class="container">
            <div class="app-header__inner">
                <h1>Todo-App</h1>
                <div class="profile">
                    <span class="profile__login">{{
                        databaseStore.user.email
                    }}</span>
                    <button
                        :class="tabClasses['primary-tab']"
                        class="sign-out__btn"
                        @click="signOutHandler"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .profile > * + * {
        margin-left: 1rem;
    }
}
.sign-out__btn {
    font-size: 14px;
}
</style>
