<template>
  <div class="mt-3">
    <div class="py-6" v-if="!data">
      <Loading height="6"/>
    </div>
    <div class="flex justify-between items-center">
      <div class="mb-2">Daftar Target:</div>
      <div class="text-xs py-1 px-2 bg-light rounded text-primary border border-primary cursor-pointer hover:bg-light/70 active:bg-light" v-if="$store.state.user.role == 'lecture'" @click="showAddTargetModal=true">
        <i class="fa fa-fw fa-plus mr-2"></i>
        <span>Tambah Target</span>
      </div>
    </div>
    <div class="text-xs text-slate-500" v-if="targets.length == 0">Belum ada target</div>

    <div class="flex gap-3 mt-3 py-3 px-4 items-center justify-between bg-white rounded shadow" v-for="(item, index) in targets" :key="index">
      <div class="flex items-center gap-3">

        <div @click="checkTarget(item, index)" :class="`text-xl ${$store.state.user.role == 'lecture' ? 'hover:text-primary cursor-pointer' : ''}`">
          <i :class="`far ${item.checked ? 'fa-check-square' : 'fa-square'}`"></i>
        </div>

        <p class="capitalize" style="margin-top: 2px;">{{ item.title }}</p>
      </div>
      <div class="text-xs w-6 h-6 rounded-full flex items-center justify-center bg-slate-50 cursor-pointer active:bg-slate-100" @click="deleteTarget(item, index)" v-if="$store.state.user.role == 'lecture'">
        <i class="fa fa-fw fa-times"></i>
      </div>
    </div>

    <AddTarget @newTarget="onNewTarget" :isShow="showAddTargetModal" @close="showAddTargetModal=false" :project_id="project_data.id" />
  </div>
</template>

<script setup lang="ts">
import Loading from '../utils/Loading.vue';
import AddTarget from '../modals/AddTarget.vue';
import { watchEffect } from 'vue';

</script>

<script lang="ts">
export default {
  props: {
    data: Object,
    project_data: Object
  },
  data() {
    return {
      showAddTargetModal: false,
      targets: []
    }
  },
  methods: {
    onNewTarget(newTarget) {
      this.targets.push(newTarget)
      this.showAddTargetModal = false
    },
    deleteTarget(item, index) {
      this.axios.delete(`/project/${this.project_data.id}/task/${item.id}`)
      .then(({data: res}) => {
        this.targets.splice(index, 1)
      })
    },
    checkTarget(item, index) {
      this.axios.post(`/project/${this.project_data.id}/task/${item.id}/switch`)
      .then(({data: res}) => {
        this.targets[index] = res.data
      })
    }
  },
  mounted() {
      watchEffect(() => {
        this.targets = this.data
      })
  },
}
</script>