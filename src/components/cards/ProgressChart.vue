<template>
  <div class="w-60">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
// import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Pie
  },
  data() {
    return {
      data: {
        labels: ['Belum Selesai', 'Sudah Selesai'],
        datasets: [
          {
            backgroundColor: ['#EEEEEE', '#79C7C6'],
            data: [40, 60]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>