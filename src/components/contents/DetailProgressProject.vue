<template>
  <main class="col-span-3" id="asas">

    <div class="flex h-96 justify-center items-center" v-if="loading">
      <Loading height="6" />
    </div>

    <div class="grid lg:grid-cols-3 gap-3" v-if="!loading">
      

      <!-- Detail Project -->
      <div class="col-span-2">

        <div class="bg-white shadow rounded h-fit">

          <!-- Header -->
          <div class="p-3 border-b border-slate-300 text-slate-500 flex justify-between">
            <div @click="$router.back()" class="hover:text-black cursor-pointer flex gap-3 items-center w-fit px-2">
              <div class="text-xl">
                <i class="fa fa-arrow-left"></i>
              </div>
              <div class="">Kembali</div>
            </div>
            <div class="flex items-center gap-3">
              <router-link
                :to="{name: 'submit-proposal'}"
                v-if="isShowButtonSubmitProposal()"
                class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer">
                <i class="far fa-fw fa-sticky-note"></i>
                <span>Ajukan Proposal</span>
              </router-link>

              <router-link :to="{name: 'project-discuss', query: {
                project_id: id
              }}" class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer"
              v-if="$store.state.user.role != 'student'">
                <i class="far fa-fw fa-message"></i>
                <span>Diskusi</span>
              </router-link>

            </div>
          </div>

          <!-- Detail Project -->
          <div class="p-3">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 border rounded overflow-hidden bg-slate-100 rounded flex items-center justify-center" :style="{backgroundColor: getColor()}">
                <img :src="data?.company?.picture" alt="category icon">
              </div>
              <div class="">
                <div class="text-xl font-bold capitalize">{{ data?.title }}</div>
                <div class="text-primary text-xs capitalize">{{ data?.company?.name }}</div>
              </div>
            </div>
            <hr class="my-2">
            <p class="text-sm py-2">{{ data?.description }}</p>
            <hr class="my-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
                <div class="">Tanggal Tutup Pengajuan</div>
                <div class="font-bold">{{ formatDate(data?.expired_at) }}</div>
              </div>
              <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
                <div class="">Tanggal Deadline Proyek</div>
                <div class="font-bold">{{ formatDate(data?.deadline_at) }}</div>
              </div>
              <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
                <div class="">Anggaran</div>
                <div class="font-bold">{{ formatRupiah(data?.budget) }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Features -->
        <div v-if="data?.status != 'opened'">

          <div class="grid grid-cols-2 gap-3 mt-3">

            <!-- Feature Target Project -->
            <div 
              :class="`${selectedTab==0 ? 'button-active' : 'bg-white'} rounded shadow button-hover p-3 flex items-center gap-3`" 
              @click="selectedTab = 0">
              <i class="fa fa-fw fa-bullseye text-primary"></i>
              <div class="border-r h-6 border-slate-300"></div>
              <span>Target Proyek</span>
            </div>

            <!-- Feature Logbook -->
            <div 
              :class="`${selectedTab==1 ? 'button-active' : 'bg-white'} rounded shadow button-hover p-3 flex items-center gap-3`" 
              @click="selectedTab = 1">
              <i class="fa fa-fw fa-file text-primary"></i>
              <div class="border-r h-6 border-slate-300"></div>
              <span>Logbook Mahasiswa</span>
            </div>

          </div>
  
          <!-- Tab Target Project -->
          <Target v-if="selectedTab === 0" :project_data="data" :data="targets" :loading="loadingTarget" />
  
          <!-- Tab Logbook -->
          <Logbook v-if="selectedTab === 1" :project_data="data" />
        </div>

        <!-- Proposals -->
        <Proposal v-if="data?.status == 'opened' && !loading && data?.company.id == $store.state.user.id" :project_id="id" @approved="getProject" />

      </div>

      <div class="col-span-1">

        <!-- Progress -->
        <div class="bg-white rounded shadow" v-if="data?.status != 'opened'">
          <div class="px-5 py-3 border-b border-slate-300">
            Progres Kerja
          </div>
          <div class="p-5 flex items-center justify-center">
            <ProgressChart :targets="targets" :loading="loadingTarget" />
          </div>
        </div>

        <!-- Projects -->
        <ProjectListMin :class="`${data?.status != 'opened' ? 'mt-3' : ''} hidden lg:block`" />

      </div>
    </div>
  </main>
</template>

<script setup>
import ProjectListMin from '../base/ProjectListMin.vue';
import Proposal from '../cards/Proposal.vue';
import Target from '../cards/Target.vue';
import Logbook from '../cards/Logbook.vue';
import ProgressChart from '../cards/ProgressChart.vue';
import Loading from '../utils/Loading.vue';
import { watchEffect } from 'vue';

</script>

<script>

export default {
  props: {
    id: Number
  },
  data() {
    return {
      // chartCtx: null,
      data: {},
      loading: false,
      loadingTarget: true,
      selectedTab: 0,
      targets: []
    }
  },
  methods: {
    formatDate(date) {
      let d = new Date(date);
      let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    formatRupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(number);
    },
    getProject() {
      this.loading = true
      this.axios.get(`/project/${this.id}`)
      .then((result) => {
        this.data = result.data.data;
        this.loading = false
      })
    },
    getImage() {
      return 'icondesain.png';
    },
    getColor() {
      return '#f5f5ff'
    },
    getTargets() {
      this.loadingTarget = true
      this.axios.get(`/project/${this.id}/task`)
      .then((result) => {
        this.targets = result.data.data;
        console.log(this.targets)
        this.loadingTarget = false
      })
    },
    isShowButtonSubmitProposal() {
      if (this.$store.state.user.role == 'lecture' && this.data.status == 'opened') {
        return true;
      }
      return false;
    },
  },
  mounted() {
    watchEffect(() => {
      this.getProject()
      this.getTargets()
    })
  },
}
</script>