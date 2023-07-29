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
          <div class="mb-2 text-sm capitalize">{{ getRole(user?.role) }}</div>
          <div class="flex gap-2 w-fit m-auto lg:m-0">
            <div class="text-xs p-2 bg-primary rounded text-white hover:bg-secondary cursor-pointer w-fit m-auto lg:m-0" @click="showContact = true">Lihat kontak</div>
            <div class="text-xs p-2 bg-primary rounded text-white hover:bg-secondary cursor-pointer w-fit m-auto lg:m-0" @click="showLectures = true">Lihat Dosen</div>
            <div class="text-xs p-2 bg-primary rounded text-white hover:bg-secondary cursor-pointer w-fit m-auto lg:m-0" @click="showStudents = true">Lihat Mahasiswa</div>
          </div>
        </div>
      </div>
      <div class="text-sm mt-3 font-bold">Deskripsi:</div>
      <div class="text-xs mt-2 text-justify">{{ user.description }}</div>
    </div>
  </div>

  <!-- Projects -->
  <div class="py-5">
    <div class="flex items-center justify-between mb-2">
      <div class="text-sm font-bold">Proyek Terbuka:</div>
      <select class="text-xs bg-white px-2 py-1 rounded outline-none" v-model="status" @change="getProjects" v-if="$store.state.user?.id == user.id">
        <option value="">Semua</option>
        <option value="opened">Buka</option>
        <option value="closed">Tutup</option>
      </select>
    </div>
    <div class="text-slate-400 text-xs mt-2" v-if="!loading && projects.length == 0">Belum ada proyek yang tersedia.</div>
    <div class="grid lg:grid-cols-2 lg:gap-2">
      <router-link v-for="(v, i) in projects" :key="i" :to="{name: 'DetailProject', params: {id: v.id}}" class="bg-white shadow rounded flex hover-comp">
        <div class="w-24 m-3 mr-0 rounded overflow-hidden">
          <img :src="v.company.picture" :alt="v.name">
        </div>
        <div class="py-3 pl-4">
          <div class="font-bold capitalize text-lg">{{ v.title }}</div>
          <div class="text-sm text-secondary capitalize">{{ v.company.name }}</div>
          <div class="flex gap-1 mt-2 flex-col">
  
            <div class="flex items-center gap-2">
              <div class="text-xs text-slate-400">
                <i class="fa fa-tags"></i>
              </div>
              <div class="text-xs capitalize">
                {{ curFormat(v.budget) }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-xs text-slate-400">
                <i class="far fa-calendar"></i>
              </div>
              <div class="text-xs capitalize">
                {{ getDate(v.deadline_at) }}
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="my-16" v-if="projectLoading">
      <Loading height="6" />
    </div>
    <div class="text-sm text-primary hover:underline w-fit m-auto my-5 cursor-pointer" @click="loadMoreProject" v-if="!projectLoading && projects.length == (project.offset+1)*project.take">Muat lebih banyak!</div>
  </div>

  <!-- Contact Profile -->
  <div class="z-10 fixed px-2 left-0 top-0 bg-black/25 backdrop-blur-sm w-full h-full" v-if="showContact">
    <div class="bg-white rounded shadow m-auto mt-6" style="max-width: 26rem; width: 100%;">
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
            <div class="font-bold">Alamat:</div>
            <div class="capitalize">{{user.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mahasiswa -->
  <div class="z-10 fixed px-2 left-0 top-0 bg-black/25 backdrop-blur-sm w-full h-full" v-if="showStudents">
    <div class="bg-white rounded shadow m-auto mt-6" style="max-width: 26rem; width: 100%;">
      <div class="px-5 py-3 border-b flex justify-between items-center">
        <div class="text-xl capitalize">Daftar Mahasiswa</div>
        <div class="w-8 h-8 hover:bg-slate-100 flex items-center justify-center rounded-full cursor-pointer" @click="showStudents = false">
          <i class="fa fa-times"></i>
        </div>
      </div>
      <div class="px-5 py-3">
        <div class="grid grid-cols-2 border-b text-center mb-1" v-if="getUser?.id == user.id">
          <div :class="`border-b-2 py-2 cursor-pointer ${(modalStudentsTab == 0) ? 'border-primary text-secondary' : 'border-white text-slate-600'}`" @click="modalStudentsTab = 0">
            Mahasiswa Aktif
          </div>
          <div :class="`border-b-2 py-2 cursor-pointer ${(modalStudentsTab == 1) ? 'border-primary text-secondary' : 'border-white text-slate-600'}`" @click="modalStudentsTab = 1">
            Belum Terkonfirmasi
          </div>
        </div>
        <div class="overflow-y-scroll" style="height: 400px;">
          <div v-for="(v, i) in students" :key="i" v-if="modalStudentsTab==0">
            <div class="py-3 px-3 flex gap-5 items-center rounded"  v-if="v.status == 'accepted'">
              <img :src="v.picture" :alt="v.name" class="w-14 h-14 rounded-full border">
              <div class="">
                <div class="text-xl capitalize font-bold">{{ v.name }}</div>
                <div class="text-sm capitalize">{{ v.nim }}</div>
              </div>
              <div class="m-auto mr-0">
                <router-link :to="{name: 'Profile', params: {id: v.id}}" class="bg-primary hover:bg-secondary py-1 px-2 rounded text-white text-xs">
                  <i class="fa fa-eye"></i>
                </router-link>
              </div>
            </div>
          </div>

          <div v-for="(v, i) in students" :key="i" v-if="modalStudentsTab==1">
            <div class="py-3 px-3 flex gap-5 items-center rounded"  v-if="v.status == 'panding'">
              <img :src="v.picture" :alt="v.name" class="w-14 h-14 rounded-full border">
              <div>
                <div class="text-xl capitalize font-bold">{{ v.name }}</div>
                <div class="text-sm capitalize">{{ v.nim }}</div>
              </div>
              <div class="m-auto mr-0 flex items-center gap-1">
                <button class="bg-primary hover:bg-secondary rounded text-white py-1 px-2 text-xs" @click="confirmStudent(v.id, i)">
                  <i class="fa fa-check"></i>
                </button>
                <router-link :to="{name: 'Profile', params: {id: v.id}}" class="bg-primary hover:bg-secondary py-1 px-2 rounded text-white text-xs">
                  <i class="fa fa-eye"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dosen -->
  <div class="z-10 fixed px-2 left-0 top-0 bg-black/25 backdrop-blur-sm w-full h-full" v-if="showLectures">
    <div class="bg-white rounded shadow m-auto mt-6" style="max-width: 26rem; width: 100%;">
      <div class="px-5 py-3 border-b flex justify-between items-center">
        <div class="text-xl capitalize">Daftar Dosen</div>
        <div class="w-8 h-8 hover:bg-slate-100 flex items-center justify-center rounded-full cursor-pointer" @click="showLectures = false">
          <i class="fa fa-times"></i>
        </div>
      </div>
      <div class="px-5 py-3">
        <div class="grid grid-cols-2 border-b text-center mb-1" v-if="getUser?.id == user.id">
          <div :class="`border-b-2 py-2 cursor-pointer ${(modalLecturesTab == 0) ? 'border-primary text-secondary' : 'border-white text-slate-600'}`" @click="modalLecturesTab = 0">
            Dosen Aktif
          </div>
          <div :class="`border-b-2 py-2 cursor-pointer ${(modalLecturesTab == 1) ? 'border-primary text-secondary' : 'border-white text-slate-600'}`" @click="modalLecturesTab = 1">
            Belum Terkonfirmasi
          </div>
        </div>
        <div class="overflow-y-scroll" style="height: 400px;">
          <div v-for="(v, i) in lectures" :key="i" v-if="modalLecturesTab==0">
            <div class="py-3 px-3 flex gap-5 items-center rounded"  v-if="v.status == 'accepted'">
              <img :src="v.picture" :alt="v.name" class="w-14 h-14 rounded-full border">
              <div class="">
                <div class="text-xl capitalize font-bold">{{ v.name }}</div>
                <div class="text-sm capitalize">{{ v.nidn }}</div>
              </div>
              <div class="m-auto mr-0">
                <router-link :to="{name: 'Profile', params: {id: v.id}}" class="bg-primary hover:bg-secondary py-1 px-2 rounded text-white text-xs">
                  <i class="fa fa-eye"></i>
                </router-link>
              </div>
            </div>
          </div>

          <div v-for="(v, i) in lectures" :key="i" v-if="modalLecturesTab==1">
            <div class="py-3 px-3 flex gap-5 items-center rounded"  v-if="v.status == 'panding'">
              <img :src="v.picture" :alt="v.name" class="w-14 h-14 rounded-full border">
              <div>
                <div class="text-xl capitalize font-bold">{{ v.name }}</div>
                <div class="text-sm capitalize">{{ v.nidn }}</div>
              </div>
              <div class="m-auto mr-0 flex items-center gap-1">
                <button class="bg-primary hover:bg-secondary rounded text-white py-1 px-2 text-xs" @click="confirmLecture(v.id, i)">
                  <i class="fa fa-check"></i>
                </button>
                <router-link :to="{name: 'Profile', params: {id: v.id}}" class="bg-primary hover:bg-secondary py-1 px-2 rounded text-white text-xs">
                  <i class="fa fa-eye"></i>
                </router-link>
              </div>
            </div>
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
import { watchEffect } from 'vue';
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      projects: [],
      project: {
        offset: 0,
        take: 4,
      },
      projectLoading: false,
      loading: false,
      showContact: false,
      showStudents: false,
      showLectures: false,
      students: [],
      lectures: [],
      modalStudentsTab: 0,
      modalLecturesTab: 0,
      status: '',
    }
  },
  computed: {
    getUser() {
      return this.$store.state.user;
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
      this.projectLoading = true;
      let id = this.user.id;
      this.axios.get(`/project?company_id=${id}&status=${this.status}&offset=${this.project.offset}&take=${this.project.take}`)
      .then(({data: result}) => {
        this.projectLoading = false;
        this.projects = result.data;
      })
    },
    loadMoreProject() {
      this.projectLoading = true;
      this.project.offset++;
      let id = this.user.id;
      this.axios.request({
        method: 'GET',
        url: '/project',
        params: {
          company_id: id,
          status: this.status,
          take: this.project.limit,
          offset: this.project.offset*this.project.limit,
        }
      })
      .then(({data: result}) => {
        this.projects = [...this.projects, ...result.data];
        this.projectLoading = false;
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
    getStudents() {
      this.axios.get(`user/student/${this.user.id}`)
      .then(({data: result}) => {
        this.students = result.data;
      })
    },
    getLectures() {
      this.axios.get(`user/lecture/${this.user.id}`)
      .then(({data: result}) => {
        this.lectures = result.data;
      })
    },
    confirmStudent(id, index) {
      this.axios.post(`user/submission/set/${id}/status/accepted`)
      .then(({data: result}) => {
        this.students[index] = result.data;
        Swal.fire({
          title: 'Berhasil!',
          text: `Anda berhasil menerima ${result.data.name} sebagai mahasiswa.`,
          icon: 'success',
          confirmButtonColor: '#20889C',
        })
      })
    },
    confirmLecture(id, index) {
      this.axios.post(`user/submission/set/${id}/status/accepted`)
      .then(({data: result}) => {
        this.lectures[index] = result.data;
        Swal.fire({
          title: 'Berhasil!',
          text: `Anda berhasil menerima ${result.data.name} sebagai dosen.`,
          icon: 'success',
          confirmButtonColor: '#20889C',
        })
      })
    }
  },
  mounted() {
    watchEffect(() => {
      if (this.$store.state.user?.id != this.user?.id) {
        this.status = 'opened';
      }else {
        this.status = '';
      }
    })
    this.getProjects();
    this.getStudents()
    this.getLectures()
  }
}
</script>