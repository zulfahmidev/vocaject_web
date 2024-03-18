<template>
  <div class="w-60">
    <p class="text-xs text-center" v-if="targets.length == 0">Belum ada target.</p>
    <Pie :data="chartData" :options="options" v-if="targets.length != 0" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
// import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  props: {
    targets: Object,
    loadingTarget: Boolean
  },
  components: {
    Pie
  },
  data() {
    return {
      checkeds: 0,
      count: 20,
      options: {}
    }
  },
  computed: {
    chartData() {
      let checked = this.targets.filter((v) => {
        return v.checked == true;
      }).length;

      let count = this.targets.length;

      return {
        labels: ['Belum Selesai', 'Sudah Selesai'],
        datasets: [
          {
            backgroundColor: ['#EEEEEE', '#79C7C6'],
            data: [count - checked, checked]
          }
        ]
      }
    }
  }
}
</script>