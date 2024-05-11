<template>
  <div>
    <div class="text-3xl">Jelajahi Proyek</div>
    <div class="text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, enim!</div>
    <div class="flex justify-between items-center mt-3">
      <div class="flex gap-2">
        <input type="text" class="bg-white py-2 px-3 rounded shadow border border-transparent focus:border-primary outline-none" placeholder="Cari proyek..." v-model="search" @keydown.enter="getProjects(true)">
        <button class="bg-primary/90 active:bg-primary text-white py-2 px-3 rounded shadow" @click="getProjects(true)">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div class="text-slate-500 hover:text-slate-900 cursor-pointer">
        <i class="fa fa-filter"></i>
      </div>
    </div>
    <div class="mt-3">
      <div class="grid grid-cols-3 gap-3">
        <div class="py-5 text-center col-span-3" v-if="!loading && projects.length == 0">
          Proyek tidak ditemukan.
        </div>

        <div class="col-span-1" v-for="(item, index) in projects" :key="index">
          <CardProject :data="item" :hidePercent="true" />
        </div>

        <div class="col-span-1 animate-pulse" v-for="index in 6" :key="index" v-if="loading">
          <div class="w-full rounded bg-slate-200 h-32"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardProject from '../cards/Project.vue'

</script>

<script>
export default {
  data() {
    return {
      projects: [],
      loading: false,
      limit: 3,
      search: '',
    }
  },
  methods: {
    getProjects(reload=false) {
      this.loading = true
      if (reload) {
        this.projects = [];
        this.limit = 9;
      }
      this.axios.get(`/project?title=${this.search}&status=${this.status}&take=${this.limit}&offset=${!reload ? this.limit-3 : ''}&status=opened`)
      .then((result) => {
        this.projects = [...this.projects, ...result.data.data];
        this.loading = false
      })
    },
    loadMore() {
      this.limit += 3;
      this.getProjects()
    }
  },
  mounted() {
    this.getProjects()
  },
}
</script>