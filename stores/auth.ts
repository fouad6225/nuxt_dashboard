import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
    email: string
    role: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const loggedIn = computed(() => !!user.value)
    const role = computed(() => user.value?.role || null)

    async function login(email: string, password: string) {
        const users = await $fetch<any[]>('/api/users')
        const matched = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password
        )

        if (!matched) throw new Error('Invalid credentials')

        user.value = { email: matched.email, role: matched.role }

        if (process.client) {
            await navigateTo('/dashboard') // ✅ await this
        }
    }

    function logout() {
        user.value = null
        if (process.client) {
            navigateTo('/login')
        }
    }

    return {
        user,
        loggedIn,
        role,
        login,
        logout,
    }
}, {
    persist: true // ✅ optional if using persisted state
})
