<template>
    <aside class="sidebar">
        <ul>
            <li>
                <NuxtLink to="/dashboard">Dashboard</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/users">User Management</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/settings">Settings</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/reports">Reports</NuxtLink>
            </li>
        </ul>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 200px;
    background-color: #f0f2f5;
    padding: 1rem;
    height: 100%;
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    margin-bottom: 1rem;
}

.sidebar a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
}

.sidebar a:hover {
    color: #007bff;
}
</style>

<script setup>
definePageMeta({ middleware: 'auth' })
</script>