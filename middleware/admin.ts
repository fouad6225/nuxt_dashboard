// middleware/admin.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()

    // Check if not logged in OR not admin
    if (!auth.loggedIn || auth.role !== 'admin') {
        return navigateTo('/dashboard')
    }
})
