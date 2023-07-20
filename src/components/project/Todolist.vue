<template>
  <div class="p-4 bg-white rounded shadow mb-2 flex" v-for="(v, i) in tasks" :key="i">
    <div class="w-5 h-5 border-2 border-slate-300 rounded" v-if="!v.checked"></div>
    <div class="w-5 h-5 px-1 border-2 rounded border-primary flex items-center justify-center" v-if="v.checked">
      <div class="text-xs text-primary">
        <i class="fa fa-check fa-fw"></i>
      </div>
    </div>
    <div class="ml-2 text-sm">{{ v.title }}</div>
  </div>
  <div class="text-sm text-slate-400 text-center py-5" v-if="tasks.length == 0">Belum ada target yang tersedia.</div>
</template>

<script>
export default {
  props: {
    project_id: Number
  },
  data() {
    return {
      tasks: [],
    }
  },
  mounted() {
    this.axios.get(`project/${this.$props.project_id}/task`)
    .then(({data: result}) => {
      this.tasks = result.data;
      this.$emit('update_progress');
    })
  },
}
</script>