<template>
  <div class="py-2">
    Proyek Saya
  </div>
  <div class="flex flex-col gap-2">
    <router-link :to="{name: 'CreateProject'}" class="bg-primary text-white hover:bg-secondary p-3 shadow rounded text-center">
      Buat Proyek Baru
    </router-link>
    <div class="relative my-2">
      <input type="text" placeholder="Cari proyek saya..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full bg-white" v-model="filter.title" @keyup.enter="loadProjects">
      <div class="absolute right-4 top-2 text-gray-400">
        <i class="fa fa-magnifying-glass"></i>
      </div>
    </div>
    <div class="text-right">
      <select class="text-xs bg-white px-2 py-1 rounded outline-none" v-model="filter.status" @change="loadProjects">
        <option value="">Semua</option>
        <option value="completed">Selesai</option>
        <option value="opened">Buka</option>
        <option value="closed">Tutup</option>
      </select>
    </div>
    <router-link v-for="(v, i) in projects" :key="i" :to="{name: 'DetailProject', params: {id: v.id}}" class="shadow rounded hover-comp flex" @click="$emit('load_project', v.id)" :class="{'border-primary/30 bg-light': isSelected(v.id), 'bg-white': !isSelected(v.id)}">
      <!-- <div class="w-24 m-3 mr-0 rounded overflow-hidden">
        <img :src="v.company.picture" :alt="v.name">
      </div> -->
      <div class="py-3 w-full px-4">
        <div class="flex gap-2 items-center justify-between w-full">
          <div class="font-bold capitalize text-lg">{{ v.title }}</div>
          <div class="py-1 px-2 border border-red-300 bg-red-100 h-fit w-fit rounded-full" style="font-size: 8px;" v-if="v.status == 'closed'">Tutup</div>
          <div class="py-1 px-2 border border-green-300 bg-green-100 h-fit w-fit rounded-full" style="font-size: 8px;" v-if="v.status == 'opened'">Buka</div>
          <div class="py-1 px-2 border border-blue-300 bg-blue-100 h-fit w-fit rounded-full" style="font-size: 8px;" v-if="v.status == 'completed'">Selesai</div>
        </div>
        <div class="text-sm text-secondary capitalize">{{ v.company.name }}</div>
        <!-- <div class="text-sm py-1">
          {{ curFormat(v.budget) }}
        </div> -->
        <div class="text-xs mt-2 capitalize text-gray-400">
          {{ v.category.name }}
        </div>
      </div>
    </router-link>

    <div class="my-16" v-if="loadingLoadMore">
      <Loading height="6" />
    </div>
    <div class="text-sm text-slate-400 text-center py-5" v-if="!loadingLoadMore && projects.length == 0">Belum ada proyek yang tersedia.</div>
    <div class="text-sm text-primary hover:underline w-fit m-auto my-5 cursor-pointer" @click="loadMore" v-if="!loadingLoadMore && projects.length == (offset+1)*limit">Muat lebih banyak!</div>
  </div>
</template>


<script setup>
import Loading from '../components/Loading.vue';
</script>

<script>
import { watchEffect } from 'vue';
export default {
  data() {
    return {
      projects: [],
      limit: 3,
      offset: 0,
      loadingLoadMore: false,
      filter: {
        title: '',
        status: '',
      }
    }
  },
  methods: {
    isSelected(project_id) {
      if (['DetailProject', 'EditProject'].includes(this.$route.name)) {
        if (this.$route.params?.id == project_id) {
          return true;
        }
      }
      return false;
    },
    filterProject(v) {
      if (this.search.trim() != '') {
        if (v.title.includes(this.search)) {
          return true;
        }else {
          return false;
        }
      }
      return true;
    },
    loadProjects() {
      this.loadingLoadMore = true;
      this.offset = 0;
      let user = this.$store.state.user;
      this.axios.request({
        method: 'GET',
        url: '/project',
        params: {
          company_id: user.id,
          ...this.filter,
          take: this.limit,
          offset: this.offset*this.limit,
        }
      })
      .then((data) => {
        this.projects = [...data.data.data];
        this.loadingLoadMore = false;
      })
    },
    loadMore() {
      this.loadingLoadMore = true;
      this.offset++;
      let user = this.$store.state.user;
      this.axios.request({
        method: 'GET',
        url: '/project',
        params: {
          company_id: user.id,
          ...this.filter,
          take: this.limit,
          offset: this.offset*this.limit,
        }
      })
      .then(({data: result}) => {
        // console.log([...this.projects, ...result.data]);
        this.projects = [...this.projects, ...result.data];
        this.loadingLoadMore = false;
      })
    }
  },
  mounted() {
    this.loadProjects();
  },
}
</script>