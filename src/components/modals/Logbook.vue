<template>
  <div
    class="fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-20 backdrop-blur-sm flex items-center justify-center"
    id="modal_profile">
    <!-- small: w-1/3 | medium: 1/2 | large: 2/3 -->
    <div class="w-1/3 bg-white rounded overflow-hidden">

      <!-- Header -->
      <div class="border-b border-slate-300 relative px-5 py-3 flex justify-between">
        <div class="">
          <div class="font-bold">Buat Logbook</div>
          <div class="text-xs">{{ getDate() }}</div>
        </div>
        <div
          class="w-fit rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
          @click="closeModal">
          <i class="fa fa-times" style="margin-top: 2px;"></i>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5 overflow-auto">
        <textarea class="py-2 px-3 rounded w-full border outline-none focus:border-primary" cols="30" rows="10" placeholder="Deskripsi" v-model="form.description"></textarea>
        <button 
          class="bg-primary disabled:bg-primary/50 py-2 px-3 rounded w-full text-white" 
          @click="createLogbook"
          :disabled="form.description.length == 0">
          <Loading height="6" v-if="loading" />
          <span v-if="!loading">Kirimkan</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../utils/Loading.vue'
</script>

<script lang="ts">
export default {
  props: {
    project_id: Number,
    member_id: Number
  },
  data() {
    return {
      form: {
        description: ''
      },
      errors: {
        description: []
      },
      loading: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('onClose')
    },
    getDate() {
      let d = new Date();
      let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${this.addZero(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    addZero(n) {
      if (n < 10) {
        return `0${n}`
      }
      return `${n}`;
    },
    createLogbook() {
      this.$swal.fire({
        title: "Anda sudah yakin?",
        text: "Pastikan anda telah mengisi dengan benar, anda tidak dapat mengubah atau menghapus setelah terkirim.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal"
      }).then((result) => {

        let date = new Date();
        this.loading = true
        let submited_at = `${this.addZero(date.getMonth()+1)}-${this.addZero(date.getDate())}-${date.getFullYear()}`

        this.axios.post(`/project/${this.project_id}/logbook/${this.member_id}`, {
          description: this.form.description,
          submited_at: submited_at,
        })
        .then((result) => {
          this.$emit('onCreated', result.data.data);
          this.loading = false
        })

      });
    }
  },
  mounted() {
    this.form.description = '';
  },
}
</script>