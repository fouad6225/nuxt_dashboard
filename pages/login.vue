<template>
    <navbar />
    <div class="login-container">
        <form @submit.prevent="submit" class="login-form">
            <h2>Login</h2>
            <div class="form-group">
                <input v-model="email" placeholder="Email" required />
                <label for="email">Email</label>
            </div>
            <div class="form-group">
                <input v-model="password" type="password" placeholder="Password" required />
                <label for="password">Password</label>
            </div>
            <button type="submit" :disabled="loading">Login</button>
            <p v-if="error" class="error-msg">{{ error }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRoute, navigateTo } from '#imports'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const auth = useAuthStore()
const route = useRoute()

const submit = async () => {
    error.value = ''
    loading.value = true
    try {
        await auth.login(email.value, password.value)
        // Redirect to originally requested page or dashboard
        const redirectTo = (route.query.redirect as string) ?? '/dashboard'
        await navigateTo(redirectTo)
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Login failed'
        password.value = ''
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f6f8;
}

.login-form {
    background: white;
    padding: 40px 30px 30px;
    border-radius: 12px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.login-form h2 {
    margin-bottom: 20px;
    text-align: center;
    font-weight: 700;
    font-size: 2rem;
    color: #2c3e50;
}

.form-group {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    gap: 6px;
}

input {
    padding: 12px 14px;
    font-size: 1rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    outline-offset: 2px;
    transition: border-color 0.3s ease;
}

input:focus {
    border-color: #1abc9c;
    box-shadow: 0 0 6px #1abc9caa;
}

label {
    font-size: 0.9rem;
    color: #777;
    user-select: none;
}

button {
    padding: 14px;
    background-color: #1abc9c;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.25s ease;
}

button:hover {
    background-color: #16a085;
}

button:active {
    background-color: #139e7f;
}

button:disabled {
    background-color: #8acfcf;
    cursor: not-allowed;
}

.error-msg {
    color: red;
    margin-top: 8px;
    text-align: center;
}
</style>
