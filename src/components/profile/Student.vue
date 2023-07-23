<template>
  <!-- Profile -->
  <div class="rounded bg-white shadow px-5 py-2">
    <div @click="$router.go(-1)" class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 w-fit cursor-pointer">
      <i class="fa fa-arrow-left"></i>
      <div class="ml-4">Kembali</div>
    </div>
    <div class="py-4">
      <div class="lg:flex gap-4">
        <div class="bg-white rounded w-fit m-auto mb-2 lg:m-0">
          <div class="w-36 h-36 bg-slate-100 rounded overflow-hidden">
            <img :src="user.picture" :alt="user.name" class="w-full">
          </div>
        </div>
        <div class="flex flex-col justify-center text-center m-auto lg:text-left lg:m-0">
          <div class="text-xl font-bold text-primary capitalize">{{user?.name}}</div>
          <div class="text-sm capitalize">{{ getRole(user?.role) }}</div>
          <div class="text-xs mb-2">
            from 
            <router-link class="text-primary capitalize font-bold hover:underline" :to="{name: 'Profile', params: {id: user.college.id}}">{{user.college.name}}.</router-link>
          </div>
          <div class="text-xs p-2 bg-primary rounded text-white hover:bg-secondary cursor-pointer w-fit m-auto lg:m-0" @click="showContact = true">Lihat kontak</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Contact Profile -->
  <div class="z-10 fixed left-0 top-0 bg-black/25 backdrop-blur-sm min-w-full min-h-full" v-if="showContact">
    <div class="bg-white rounded shadow m-auto mt-6" style="max-width: 26rem; width: 26rem;">
      <div class="px-5 py-3 border-b flex justify-between items-center">
        <div class="text-xl capitalize">{{ user.name }}</div>
        <div class="w-8 h-8 hover:bg-slate-100 flex items-center justify-center rounded-full cursor-pointer" @click="showContact = false">
          <i class="fa fa-times"></i>
        </div>
      </div>
      <div class="p-5">
        <div class="text-xl mb-2">Informasi Kontak:</div>
        <div class="flex mb-2">
          <div class="text-xl text-primary w-10 h-10 flex items-center justify-center bg-primary/10 rounded mr-3">
            <i class="far fa-envelope"></i>
          </div>
          <div class="text-sm">
            <div class="font-bold">Email:</div>
            <div class="">{{user.email}}</div>
          </div>
        </div>
        <div class="flex mb-2">
          <div class="text-xl text-primary w-10 h-10 flex items-center justify-center bg-primary/10 rounded mr-3">
            <i class="fa fa-phone"></i>
          </div>
          <div class="text-sm">
            <div class="font-bold">Telepon:</div>
            <div class="">{{user.phone}}</div>
          </div>
        </div>
        <div class="flex mb-2">
          <div class="text-xl text-primary w-10 px-5 h-10 flex items-center justify-center bg-primary/10 rounded mr-3">
            <i class="fa fa-map-marker-alt"></i>
          </div>
          <div class="text-sm">
            <div class="font-bold">Email:</div>
            <div class="capitalize">{{user.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '../../components/Loading.vue';
</script>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      projects: [],
      loading: false,
      showContact: false,
    }
  },
  methods: {
    getRole(role) {
      let roles = {
        company: 'Perusahaan',
        college: 'Kampus',
        lecture: 'Dosen',
        student: 'Mahasiswa',
      }
      return roles[role];
    },
    getProjects() {
      this.loading = true;
      let id = this.user.id;
      this.axios.get(`/project?company_id=${id}&status=opened`)
      .then(({data: result}) => {
        this.loading = false;
        this.projects = result.data;
      })
    },
    curFormat(number) {
      let n = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      return n.format(number);
    },
    getDate(submited_at) {
      let date = new Date(submited_at);
      let months = ['jan', 'feb', 'mar', 'apr', 'mei', "jun", 'jul', 'sept', 'okt', 'nov', 'des'];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },
  },
  mounted() {
    this.getProjects();
  }
}
</script>