import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()

    // Allow access to login page without redirect
    if (to.path === '/login') return

    // Redirect to login if not logged in
    if (!auth.loggedIn) {
        return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
})
