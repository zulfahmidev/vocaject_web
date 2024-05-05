<template>
  <div
    class="fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-20 backdrop-blur-sm flex items-center justify-center"
    v-if="isShow">
    <!-- small: w-1/3 | medium: 1/2 | large: 2/3 -->
    <div class="w-1/4 bg-white rounded overflow-hidden">

      <!-- Header -->
      <div class="border-b border-slate-300 px-5 py-3 flex justify-between items-center">
        <div class="text-lg">Tambah Target</div>

        <div
          class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
          @click="close">
          <i class="fa fa-times" style="margin-top: 2px;"></i>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5">

        <div class="mb-3">
          <label for="">Judul:</label>
          <input type="text" class="py-2 px-3 rounded border block w-full outline-none focus:border-primary" placeholder="Judul..." v-model="title">
        </div>

        <div class="mb-3">
          <label for="">Deskripsi:</label>
          <textarea placeholder="Deskripsi..." class="py-2 px-3 rounded border block w-full outline-none focus:border-primary" v-model="description"></textarea>
        </div>

        <button @click="addTarget" class="py-2 px-3 bg-primary text-white rounded outline-none w-full">
          <Loading height="6" v-if="loading" />
          <span v-if="!loading">Tambah</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import {watchEffect} from 'vue'
import Loading from '../utils/Loading.vue'
</script>

<script>
export default {
  props: {
    isShow: Boolean,
    project_id: Number
  },
  data() {
    return {
      title: '',
      description: '',
      errors: {
        title: [],
        description: [],
      },
      loading: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addTarget() {
      this.loading = true
      this.axios.post(`/project/${this.project_id}/task`, {
        title: this.title,
        description: this.description,
      }).then(({data: res}) => {
        this.loading = false
        this.title = ''
        this.description = ''
        this.$emit('newTarget', res.data)
      })
    }
  },
  mounted() {
    // watchEffect(() => {
    //   if (this.isShow) {
    //     this.getData()
    //   }
    // })
  }
}
</script>