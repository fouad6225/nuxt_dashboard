<template>
    <table class="user-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
defineProps(['users'])
</script>

<style scoped>
.user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.user-table th,
.user-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}
</style>
