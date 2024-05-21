<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const props = defineProps({
    auth: Object
})

const login = ref('')
const password = ref('')
const passwordSub = ref('')

async function createUser(event) {
    event.preventDefault()
    if (password.value !== passwordSub.value) {
        return
    }
    try {
        await createUserWithEmailAndPassword(props.auth, login.value, password.value)
    } catch (e) {
        console.log(e)
    }
}

</script>

<template>
    <div class="auth-form_wrapper">
        <form @submit="createUser" id="auth-form">
            <label for="login">Login:</label>
            <input v-model="login" name="login" type="email" required placeholder="sample@gmail.com" class="group-list__input" />
            <label for="password">Password:</label>
            <input v-model="password" name="password" type="password" required minlength="6" class="group-list__input" />
            <label for="password-submit">Submit your password:</label>
            <input v-model="passwordSub" name="password-submit" type="password" required class="group-list__input" />
            <input type="submit" id="auth-form__submit" value="Send"/>
        </form>
    </div>
</template>

<style scoped lang="scss">
@use '../../scss/base';
#auth-form {
    width: 450px;
    display: flex;
    flex-flow: column;
    gap: 1rem;
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;

    &.__submit {
        background: $active_gradient;
    }
}
.auth-form_wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>