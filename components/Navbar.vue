<template>
    <nav class="navbar">

        <button class="hamburger" @click="toggleSidebar" aria-label="Toggle menu"
            :aria-expanded="sidebarOpen.toString()">
            ☰
        </button>

        <div :class="['nav-left', { 'nav-left--open': sidebarOpen }]">
            <NuxtLink class="nav-link" to="/" @click="closeSidebar">Home</NuxtLink>
            <!-- Show Dashboard only if logged in -->

            <NuxtLink v-if="auth.loggedIn" class="nav-link" to="/dashboard" @click="closeSidebar">Dashboard</NuxtLink>
            <NuxtLink v-if="auth.loggedIn && auth.role === 'admin'" class="nav-link" to="/users" @click="closeSidebar">
                Users
            </NuxtLink>
        </div>

        <div class="nav-right">
            <button v-if="auth.loggedIn" @click="logout" class="logout-btn">Logout</button>
            <NuxtLink v-else class="nav-link" to="/login">Login</NuxtLink>
        </div>

        <Transition name="fade">
            <div v-if="sidebarOpen" class="overlay" @click="closeSidebar" aria-hidden="true"></div>
        </Transition>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth' // ✅ correct store import

const auth = useAuthStore()
const sidebarOpen = ref(false)

function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
    sidebarOpen.value = false
}

function logout() {
    auth.logout()
    closeSidebar()
}
</script>

<style scoped>
/* unchanged styles */
.navbar {
    position: fixed;
    /* Make it stay at the top */
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, #34d399 0%, #3b82f6 100%);

    display: flex;
    justify-content: space-between;
    align-items: center;


    padding: 10px 20px;

    color: white;
    z-index: 1000;

    margin: 0;
    /* Ensure no spacing from parent */
}


.nav-left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.hamburger {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    transition: transform 0.1s ease;
}

.hamburger:active {
    transform: scale(0.95);
}

.nav-link {
    text-decoration: none;
    color: white;
    font-weight: 500;
    user-select: none;
}

.nav-link:hover {
    color: #1abc9c;
}

.logout-btn {
    background-color: #1abc9c;
    border: none;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.1s ease;
    user-select: none;
}

.logout-btn:hover {
    background-color: #16a085;
}

.logout-btn:active {
    background-color: #14927d;
}

.nav-right {
    display: flex;
    align-items: center;
    user-select: none;
}

@media (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .nav-left {
        position: fixed;
        top: 0;
        left: 0;
        background: #2c3e50;
        height: 100vh;
        width: 250px;
        flex-direction: column;
        padding-top: 60px;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        gap: 30px;
        z-index: 1100;
    }

    .nav-left.nav-left--open {
        transform: translateX(0);
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 250px;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }
}
</style>
