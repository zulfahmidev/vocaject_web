<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div :class="{'hidden': logbooks != null}" class="lg:block">
      <div class="bg-white rounded shadow p-3 hover-comp cursor-pointer h-fit mb-2" v-for="(v, i) in proposal?.members" :key="i" @click="selectStudent(v.id)" :class="{'border-primary/30 bg-light': selected==v.id}">
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
    <div class="lg:block lg:col-span-2 text-center text-sm text-slate-400 py-5" v-if="logbooks == null && !loading">
      Pilih mahasiswa untuk melihat logbook.
    </div>
    <div class="lg:block lg:col-span-2 text-center text-sm text-slate-400 py-5" v-if="logbooks?.length == 0 && !loading">
      Belum ada logbook yang tersedia.
    </div>
    <div class="lg:col-span-2 py-5" v-if="loading">
      <Loading height="6" />
    </div>
    <div v-if="logbooks != null" class="lg:block lg:col-span-2">

      <div class="bg-white my-2 rounded p-1 shadow lg:hidden">
        <div class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 cursor-pointer" @click="logbooks, selected=null">
          <div class="mr-2">
            <i class="fa fa-arrow-left"></i>
          </div>
          Kembali
        </div>
      </div>
      <div class="bg-white rounded p-4 shadow" v-for="(v, i) in logbooks" :key="i">
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
      selected: false,
      logbooks: null,
      loading: false
    }
  },
  methods: {
    selectStudent(student_id) {
      this.selected = student_id;
      this.logbooks = null;
      this.loading = true;
      this.axios.get(`/project/${this.proposal?.project.id}/logbook/${student_id}`)
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