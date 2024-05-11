<template>
  <div style="height: 80vh;overflow: auto;" class="pr-2">
    <!-- Filter -->
    <div class="grid grid-cols-1">
      <div class="col-span-2 bg-white rounded shadow flex mb-3 overflow-hidden">
        <input type="text" placeholder="Cari proyek..." class="w-full outline-none py-3 px-4" @input="getProjects(true)" v-model="search">
        <div class="h-full w-10 flex items-center text-primary">
          <i class="fa fa-fw fa-search"></i>
        </div>
      </div>
      <select class="col-span-1 bg-white shadow rounded p-3 outline-none cursor-pointer" @change="getProjects(true)" v-model="status">
        <option value="">Semua</option>
        <option value="opened">Buka</option>
        <option value="closed">Tutup</option>
        <option value="completed">Selesai</option>
      </select>
    </div>

    <!-- Projects -->
    <div class="flex flex-col gap-3 mt-3">

      <div class="py-5 text-center text-xs" v-if="!loading && projects.length == 0">
        Proyek tidak ditemukan.
      </div>

      <ProjectMin v-for="(item, index) in projects" :key="index" :data="item" />

      <div v-if="projects.length >= limit && !loading" class="text-primary hover:underline text-center my-3 cursor-pointer" @click="loadMore()">Muat lebih banyak</div>

      <div class="py-5" v-if="loading">
        <Loading height="6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectMin from '../cards/ProjectMin.vue';
import Loading from '../utils/Loading.vue';

</script>

<script>
export default {
  data() {
    return {
      projects: [],
      loading: false,
      limit: 3,
      search: '',
      status: ''
    }
  },
  methods: {
    getProjects(reload=false) {
      this.loading = true
      let getBy = `${this.$store.state.user.role}_id`
      if (this.$store.state.user.role == 'college') {
        getBy = `company_id`
      }
      if (reload) {
        this.projects = [];
        this.limit = 3;
      }
      this.axios.get(`/project?${getBy}=${this.$store.state.user?.id}&title=${this.search}&status=${this.status}&take=${this.limit}&offset=${this.limit-3}&status=${this.status}`)
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
    this.getProjects(true)
  },
}
</script>