<template>
  <div class="mt-3">
    <div class="py-6" v-if="loading">
      <Loading height="6"/>
    </div>
    <div class="flex gap-3 mt-3 py-3 px-4 bg-white rounded shadow" v-for="(item, index) in data" :key="index">
      <div :class="`text-xl ${$store.state.user.role == 'dosen' ? 'hover:text-primary cursor-pointer' : ''}`">
        <i :class="`far ${item.checked ? 'fa-check-square' : 'fa-square'}`"></i>
      </div>
      <p class="capitalize" style="margin-top: 2px;">{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../utils/Loading.vue';

</script>

<script lang="ts">
export default {
  props: {
    id: Number
  },
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  methods: {
    getTargets() {
      this.loading = true
      this.axios.get(`/project/${this.id}/task`)
      .then((result) => {
        this.data = result.data.data;
        this.loading = false
        console.log(this.data)
      })
    }
  },
  mounted() {
    this.getTargets();
  },
}
</script>