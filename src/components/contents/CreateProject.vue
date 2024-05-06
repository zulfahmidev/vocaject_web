<template>
  <main class="col-span-3">

    <div class="grid grid-cols-3 gap-3">

      <!-- Create Project Form -->
      <div class="col-span-2 bg-white shadow rounded h-fit">

        <!-- Header -->
        <div class="p-3 border-b border-slate-300 text-slate-500">
          <div @click="$router.back()" class="hover:text-black cursor-pointer flex gap-3 items-center w-fit px-2">
            <div class="text-xl">
              <i class="fa fa-arrow-left"></i>
            </div>
            <div class="">Kembali</div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="flex p-3 gap-10">
          <div class="flex gap-3">
            <div class="flex items-center justify-center w-6 h-6 text-sm bg-primary rounded-full text-white">1</div>
            <div class="text-primary">Isi data proyek</div>
          </div>
          <div class="flex gap-3">
            <div class="flex items-center justify-center w-6 h-6 text-sm bg-slate-400 rounded-full text-white">2</div>
            <div class="text-slate-500">Verifikasi</div>
          </div>
        </div>

        <!-- Form -->
        <div class="p-3">
          <div class="mb-3">
            <label class="mb-1 block" for="">Judul proyek:</label>
            <input type="text" placeholder="Judul..." v-model="form.title" class="w-full px-3 py-2 rounded border border-slate-300 outline-none">
            <div class="text-xs text-red-500" v-if="errors.title[0]">{{ errors.title[0] }}</div>
          </div>
          <div class="mb-3">
            <label class="mb-1 block" for="">Deskripsi:</label>
            <textarea placeholder="Deskripsi" cols="30" rows="2" v-model="form.description" class="w-full px-3 py-2 rounded border border-slate-300 outline-none"></textarea>
            <div class="text-xs text-red-500" v-if="errors.description[0]">{{ errors.description[0] }}</div>
          </div>
          <div class="mb-3">
            <label class="mb-1 block" for="">Anggaran:</label>
            <input type="number" placeholder="Anggaran..." v-model="form.budget" class="w-full px-3 py-2 rounded border border-slate-300 outline-none">
            <div class="text-xs text-red-500" v-if="errors.budget[0]">{{ errors.budget[0] }}</div>
          </div>
          <div class="mb-3">
            <label class="mb-1 block" for="">Kategori:</label>
            <select class="w-full px-3 py-3 rounded border border-slate-300 outline-none bg-white" v-model="form.category_id">
              <option value="">Pilih kategori</option>
              <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.name }}</option>
            </select>
            <div class="text-xs text-red-500" v-if="errors.category_id[0]">{{ errors.category_id[0] }}</div>
          </div>
          <div class="mb-3 grid grid-cols-2 gap-3">
            <div class="col-span-1">
              <label class="mb-1 block" for="">Tanggal tutup pengajuan:</label>
              <input type="date" class="w-full px-3 py-2 rounded border border-slate-300 outline-none" v-model="form.expired_at">
              <div class="text-xs text-red-500" v-if="errors.expired_at[0]">{{ errors.expired_at[0] }}</div>
            </div>
            <div class="col-span-1">
              <label class="mb-1 block" for="">Tanggal deadline proyek:</label>
              <input type="date" class="w-full px-3 py-2 rounded border border-slate-300 outline-none" v-model="form.deadline_at">
              <div class="text-xs text-red-500" v-if="errors.deadline_at[0]">{{ errors.deadline_at[0] }}</div>
            </div>
          </div>
          <div class="text-end">
            <button class="p-3 bg-primary outline-none text-white rounded w-40" @click="submit()">
              <span v-if="!loading">Buat Proyek</span>
              <Loading height="6" v-if="loading" />
            </button>
          </div>
        </div>

      </div>

      <!-- Projects -->
      <ProjectListMin />
    </div>

  </main>
</template>

<script setup>
import ProjectListMin from '../base/ProjectListMin.vue';
import Loading from '../utils/Loading.vue';
</script>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        budget: 0,
        category_id: null,
        expired_at: '',
        deadline_at: '',
      },
      categories: [],
      error: '',
      errors: {
        title: [],
        description: [],
        budget: [],
        category_id: [],
        expired_at: [],
        deadline_at: [],
      },
      loading: false,
    }
  },
  methods: {
    submit() {
      let deadline_at = this.form.deadline_at.split('-')
      let expired_at = this.form.expired_at.split('-')
      this.loading = true;
      this.errors = {
        title: [],
        description: [],
        budget: [],
        category_id: [],
        deadline_at: [],
        expired_at: [],
      }
      this.error = '';
      this.axios.post(`/project`, {
        company_id: this.$store.state.user.id,
        title: this.form.title,
        description: this.form.description,
        budget: this.form.budget,
        category_id: this.form.category_id,
        deadline_at: `${deadline_at[1]}-${deadline_at[2]}-${deadline_at[0]}`,
        expired_at: `${expired_at[1]}-${expired_at[2]}-${expired_at[0]}`,
      })
      .then(({data: result}) => {
        this.loading = false;
        this.form = {
          title: '',
          description: '',
          budget: 0,
          category_id: null,
          deadline_at: '',
          expired_at: '',
        }
        this.$swal.fire({
          title: 'Berhasil!',
          text: 'Anda berhasil menambahkan proyek.',
          icon: 'success',
          confirmButtonColor: '#20889C',
        }).then(() => {
          this.$router.replace({name: 'progress-project', params: {id: result?.data.id}})
        })
      })
      .catch((err) => {
        let response = err?.response
        this.loading = false;
        this.error = response?.data?.message
        if (response?.status == 400) {
          for (const key in response?.data?.data) {
            const v = response?.data?.data[key];
            this.errors[key] = v;
          }
        }
        this.$swal({
          icon: "error",
          title: "Gagal Membuat Proyek",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      })
    },
    getCategories() {
      this.axios.get(`project/category/all`)
      .then((result) => {
        this.categories = result.data.data
      })
    },
    postDateFormat(date) {
      let d = new Date(date);
      return `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`;
    }
  },
  mounted() {
      this.getCategories();
  },
}
</script>