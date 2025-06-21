<template>
    <div class="dashboard">
        <Navbar />
        <h1>Dashboard</h1>

        <div class="cards">
            <div class="card">
                <h3>Total Users</h3>
                <p>{{ totalUsers }}</p>
            </div>

            <div class="card">
                <h3>Average Age</h3>
                <p>{{ averageAge }}</p>
            </div>
        </div>

        <div class="charts">
            <div class="chart-card">
                <h3>Admin vs Viewer</h3>
                <PieChart :data="adminViewerData" :options="chartOptions" />
            </div>

            <div class="chart-card">
                <h3>Top 5 Countries</h3>
                <PieChart :data="topCountriesData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PieChart from '~/components/PieChart.vue'

definePageMeta({
    middleware: 'auth'
})

const { data: users = ref([]) } = await useAsyncData('users', () =>
    $fetch('/api/users')
)

const totalUsers = computed(() => users.value.length)

const adminCount = computed(() =>
    users.value.filter((u: any) => u.role === 'admin').length
)
const viewerCount = computed(() =>
    users.value.filter((u: any) => u.role === 'viewer').length
)

const adminViewerData = computed(() => ({
    labels: ['Admin', 'Viewer'],
    datasets: [
        {
            data: [adminCount.value, viewerCount.value],
            backgroundColor: ['#1abc9c', '#e74c3c'],
        },
    ],
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom' },
        datalabels: {
            color: '#fff',
            formatter: (value, context) => {
                const data = context.chart.data.datasets[0].data
                const total = data.reduce((a, b) => a + b, 0)
                const percent = ((value / total) * 100).toFixed(1)
                return `${percent}%`
            },
            font: { weight: 'bold', size: 14 },
        },
    },
}

const averageAge = computed(() => {
    if (!users.value.length) return 0
    const totalAge = users.value.reduce((sum, u) => sum + (u.age || 0), 0)
    return (totalAge / users.value.length).toFixed(1)
})

const topCountriesData = computed(() => {
    const countryCount: Record<string, number> = {}
    users.value.forEach((user: any) => {
        const country = user.country || 'Unknown'
        countryCount[country] = (countryCount[country] || 0) + 1
    })

    const sorted = Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    return {
        labels: sorted.map(([country]) => country),
        datasets: [
            {
                data: sorted.map(([, count]) => count),
                backgroundColor: [
                    '#3498db',
                    '#9b59b6',
                    '#f39c12',
                    '#2ecc71',
                    '#e74c3c',
                ],
            },
        ],
    }
})
</script>

<style scoped>
.dashboard {
    padding: 20px;
}

.cards {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: #ecf0f1;
    padding: 16px;
    border-radius: 8px;
    flex: 1;
}

.charts {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.chart-card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    height: 320px;
}
</style>
