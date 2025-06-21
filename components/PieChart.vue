<!-- /components/PieChart.vue -->
<template>
    <Pie :data="data" :options="options" />
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels)

defineProps(['data', 'options'])
</script>
