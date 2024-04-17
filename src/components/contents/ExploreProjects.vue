<template>
  <div>
    <div class="text-3xl">Jelajahi Proyek</div>
    <div class="text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, enim!</div>
    <div class="flex justify-between items-center mt-3">
      <div class="flex gap-2">
        <input type="text" class="bg-white py-2 px-3 rounded shadow border border-transparent focus:border-primary outline-none" placeholder="Cari proyek...">
        <button class="bg-primary/90 active:bg-primary text-white py-2 px-3 rounded shadow">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div class="text-slate-500 hover:text-slate-900 cursor-pointer">
        <i class="fa fa-filter"></i>
      </div>
    </div>
    <div class="mt-3">
      <div class="grid grid-cols-3">
        <div class="col-span-1" v-for="(item, index) in projects" :key="index">
          <CardProject :data="item" :hidePercent="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardProject from '../cards/Project.vue'

</script>

<script lang="ts">
export default {
  data() {
    return {
      projects: []
    }
  },
  methods: {
    getProjects() {
      this.axios.get('/project?status=opened')
      .then(({data: res}) => {
        this.projects = res.data
      })
    }
  },
  mounted() {
    this.getProjects()
  },
}
</script>