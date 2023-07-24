<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div :class="{'hidden': logbooks != null}" class="lg:block">
      <div class="rounded shadow p-3 hover-comp cursor-pointer h-fit mb-2" v-for="(v, i) in proposal?.members" :key="i" @click="selectStudent(v)" :class="{'border-primary/30 bg-light': selected?.id==v.id, 'bg-white': selected?.id!=v.id}">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img :src="v.picture" :alt="v.name">
          </div>
          <div class="flex flex-col">
            <div class="font-bold text-sm capitalize">{{ v.name }}</div>
            <div class="text-xs text-secondary">Mahasiswa</div>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:block lg:col-span-2 text-center text-sm text-slate-400 py-5" v-if="selected == null && !loading">
      Pilih mahasiswa untuk melihat logbook.
    </div>
    <div class="lg:col-span-2 py-5" v-if="loading">
      <Loading height="6" />
    </div>
    <div class="lg:block lg:col-span-2">

      <div class="bg-white my-2 rounded p-1 shadow" v-if="selected != null && !loading">
        <div class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 cursor-pointer" @click="logbooks, selected=null">
          <div class="mr-2">
            <i class="fa fa-arrow-left"></i>
          </div>
          Kembali
        </div>
        <router-link :to="{name: 'Profile', params: {id: selected.id}}" class="flex items-center gap-4 border-t p-3 hover:underline">
          <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img :src="selected.picture" :alt="selected.name">
          </div>
          <div class="flex flex-col">
            <div class="font-bold text-sm capitalize">{{ selected.name }}</div>
            <div class="text-xs text-secondary">Mahasiswa</div>
          </div>
        </router-link>
        
      </div>

      <div class="lg:block lg:col-span-2 text-center text-sm text-slate-400 py-5" v-if="logbooks?.length == 0 && !loading && selected != null">
        Belum ada logbook yang tersedia.
      </div>
      
      <div class="bg-white rounded mb-2 p-4 shadow" v-if="selected != null && !loading" v-for="(v, i) in logbooks" :key="i">
        <div class="text-sm text-primary font-black capitalize">{{ getDay(v.submited_at) }}</div>
        <div class="text-sm font-black capitalize">{{ getDate(v.submited_at) }}</div>
        <div class="py-2 text-sm">{{ v.description }}</div>
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
    proposal: Object
  },
  data() {
    return {
      selected: null,
      logbooks: null,
      loading: false
    }
  },
  methods: {
    selectStudent(student) {
      console.log(student)
      this.selected = student;
      this.logbooks = null;
      this.loading = true;
      this.axios.get(`/project/${this.proposal?.project.id}/logbook/${student.id}`)
      .then(({data: result}) => {
        this.logbooks = result.data;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      })
    },
    getDay(submited_at) {
      let date = new Date(submited_at);
      let days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', "jum'at", 'sabtu'];
      return days[date.getDay()];
    },
    getDate(submited_at) {
      let date = new Date(submited_at);
      let months = ['jan', 'feb', 'mar', 'apr', 'mei', "jun", 'jul', 'sept', 'okt', 'nov', 'des'];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
  },
  mounted() {
    
  },
}
</script>