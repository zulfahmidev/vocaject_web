<template>
  <main class="col-span-3">

    <!-- Filter -->
    <div class="grid grid-cols-4 gap-3">
      <select class="col-span-1 bg-white shadow rounded p-3 outline-none cursor-pointer" @change="getProjects(true)" v-model="status">
        <option value="">Semua</option>
        <option value="opened">Buka</option>
        <option value="closed">Tutup</option>
        <option value="completed">Selesai</option>
      </select>
      <div :class="`col-span-${isCompany() ? '2' : '3'} bg-white rounded shadow flex overflow-hidden`">
        <input type="text" placeholder="Cari proyek..." class="w-full outline-none py-3 px-4" @input="getProjects(true)" v-model="search">
        <div class="h-full w-10 flex items-center text-primary">
          <i class="fa fa-fw fa-search"></i>
        </div>
      </div>
      <router-link v-if="isCompany()" :to="{name: 'create-project'}" class="bg-primary shadow rounded text-center p-3 text-white col-span-1">Buat Proyek</router-link>
    </div>

    <!-- Projects -->
    <div class="grid grid-cols-3 gap-3 mt-3">

      <div class="py-5 text-center col-span-3" v-if="!loading && projects.length == 0">
        Proyek tidak ditemukan.
      </div>

      <div class="col-span-1" v-for="(item, index) in projects" :key="index">
        <CardProject  :data="item" />        
      </div>
      
      <div class="py-5 text-center col-span-3" v-if="loading">
        <Loading height="6" />
      </div>

    </div>

    <div class="text-primary hover:underline text-center my-3 cursor-pointer" v-if="!loading && projects.length >= limit" @click="loadMore()">Muat lebih banyak</div>

  </main>
</template>

<script setup>
import CardProject from '../cards/Project.vue';
import Loading from '../utils/Loading.vue';

</script>

<script>
export default {
  data() {
    return {
      projects: [],
      loading: false,
      limit: 9,
      search: '',
      status: ''
    }
  },
  methods: {
    isCompany() {
      return ['college', 'company'].includes(this.$store.state.user.role);
    },
    getProjects(reload=false) {
      this.loading = true
      let getBy = `${this.$store.state.user.role}_id`
      if (this.$store.state.user.role == 'college') {
        getBy = `company_id`
      }
      if (reload) {
        this.projects = [];
        this.limit = 9;
      }
      this.axios.get(`/project?${getBy}=${this.$store.state.user?.id}&title=${this.search}&status=${this.status}&take=${this.limit}&offset=${!reload ? this.limit-3 : ''}&status=${this.status}`)
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