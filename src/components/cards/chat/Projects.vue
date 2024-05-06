<template>

  <div class="col-span-1 h-full overflow-y-auto">

    <!-- Search Project -->
    <div class="p-3">
      <input type="text" placeholder="Cari proyek..." v-model="search"
        class="border border-slate-300 rounded w-full px-3 py-2 outline-none text-sm">
    </div>

    <!-- Projects -->
    <div class="text-xs px-3 mb-2 text-slate-500 font-bold">Semua proyek</div>

    <div :class="`p-2 cursor-pointer ${selectedProject == item.id ? 'bg-slate-100' : ''} hover:bg-slate-100 flex gap-3 items-center`"
      v-for="(item, index) in displayProjects" :key="index" @click="selectProject(item.id)">

      <div class="">
        <div class="w-10 h-10 bg-slate-300 rounded-full overflow-hidden">
          <img :src="item.company.picture" :alt="item.company.name">
        </div>
      </div>
      <div class="w-full">
        <div class="capitalize">{{ item.title }}</div>
        <div class="text-xs text-blue-500">Sedang dikerjakan</div>
      </div>
      <div class="text-end">
        <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5
        </div>
      </div>

    </div>

    <div class="text-xs text-slate-400 px-3 mt-1" v-if="!loading && displayProjects.length == 0">Belum ada
      pesan...</div>

    <!-- Loading Project -->
    <div v-if="loading" class="px-2 rounded mt-2" v-for="(item, index) in 3" :key="index">
      <div class="animate-pulse flex space-x-4 px-1 py-2">
        <div class="grid grid-cols-4 gap-4 w-full">
          <div class="h-2 bg-slate-200 rounded col-span-3"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// import ChatRoom from "Room.vue";

</script>

<script>
export default {
  props: {
    selectedProject: Number
  },
  data() {
    return {
      projects: [],
      search: '',
      selected: null,
      loading: false,
    }
  },
  computed: {
    displayProjects() {
      return this.projects.filter((v) => {
        return (this.search.trim() > 0) ? v.title.includes(this.search) : true;
      })
    }
  },
  methods: {
    getProjects() {
      let id = this.$store.state.user.id;
      this.loading = true;
      let url = this.$store.state.user.role == 'lecture' ? `/project/message/get/lecture/contact/${id}` : `/project?company_id=${id}`;
      this.axios.get(url)
        .then(({ data: result }) => {
          this.loading = false;
          this.projects = result.data
        })
    },
    selectProject(project_id) {
      this.$emit('onSelectProject', project_id)
    },
  },
  mounted() {
    this.getProjects()
  },
}
</script>