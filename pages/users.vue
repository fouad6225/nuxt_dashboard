<template>
    <div class="users-page">
        <navbar />
        <h1>Users</h1>

        <div class="filters">
            <input v-model="searchQuery" placeholder="Search name or email" />
            <select v-model="selectedCountry">
                <option value="">All Countries</option>
                <option v-for="country in sortedCountries" :key="country" :value="country">
                    {{ country }}
                </option>
            </select>
        </div>

        <table v-if="filteredUsers.length">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in paginatedUsers" :key="user.email">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.age }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.country }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>No users match your search.</p>

        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
    middleware: ['auth', 'admin'],
})

const { data: users = ref([]) } = await useAsyncData('users', () =>
    $fetch('/api/users')
)

const searchQuery = ref('')
const selectedCountry = ref('')
const currentPage = ref(1)
const pageSize = 10

const filteredUsers = computed(() => {
    return users.value.filter((user) => {
        const matchSearch =
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchCountry = selectedCountry.value
            ? user.country === selectedCountry.value
            : true
        return matchSearch && matchCountry
    })
})

const totalPages = computed(() =>
    Math.ceil(filteredUsers.value.length / pageSize)
)

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredUsers.value.slice(start, start + pageSize)
})

function prevPage() {
    if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
}

const sortedCountries = computed(() => {
    const countryCounts: Record<string, number> = {}
    users.value.forEach((user) => {
        countryCounts[user.country] = (countryCounts[user.country] || 0) + 1
    })

    return Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([country]) => country)
})
</script>

<style scoped>
.users-page {
    padding: 20px;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

input,
select {
    padding: 8px;
    font-size: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.pagination {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
