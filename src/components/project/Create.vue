<template>
  <div class="bg-white shadow rounded p-3">
    <div @click="$router.go(-1)" class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 w-fit cursor-pointer">
      <i class="fa fa-arrow-left"></i>
      <div class="ml-4">Kembali</div>
    </div>
    <div class="p-3">
      <div class="my-2">
        <div class="text-xs text-primary mb-1" >Judul Proyek:</div>
        <input type="text" v-model="form.title" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="title" name="title">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.title" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <div class="text-xs text-primary mb-1" >Deskripsi:</div>
        <textarea v-model="form.description" class="py-2 h-fit outline-none px-3 border-2 w-full rounded focus:border-primary mt-1 resize-none" oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px'" placeholder="deskripsi" name="description"></textarea>
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.description" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <div class="text-xs text-primary mb-1" >Anggaran:</div>
        <input type="number" v-model="form.budget" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="Anggaran" name="budget">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.budget" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <div class="text-xs text-primary mb-1" >Kategori:</div>
        <select class="p-2 outline-none bg-white px-3 border-2 w-full rounded focus:border-primary" v-model="form.category_id">
          <option value="-1">Pilih Kategori</option>
          <option v-for="(v, i) in categories" :key="i" :value="v.id" class="capitalize" >{{ v.name }}</option>
        </select>
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.category_id" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <div class="text-xs text-primary mb-1" >Tanggal Tutup Pengajuan:</div>
        <input type="date" v-model="form.expired_at" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" name="expired_at">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.expired_at" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <div class="text-xs text-primary mb-1" >Tanggal Deadline:</div>
        <input type="date" v-model="form.deadline_at" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" name="deadline_at">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.deadline_at" :key="i">{{ v }}</div>
      </div>
      <button class="py-2 outline-none px-3 block text-center bg-primary hover:bg-secondary w-full text-white rounded" @click="create">
        <div v-if="!loading">Buat Proyek</div>
        <Loading height="6" v-if="loading" />
      </button>
    </div>
  </div>
</template>

<script setup>
import Loading from '../../components/Loading.vue';
</script>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        budget: 0,
        category_id: -1,
        deadline_at: '',
        expired_at: '',
      },
      errors: {
        title: [],
        description: [],
        budget: [],
        category_id: [],
        deadline_at: [],
        expired_at: [],
      },
      loading: false,
      categories: []
    }
  },
  methods: {
    create() {
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
      this.axios.post(`/project/`, {
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
          category_id: -1,
          deadline_at: '',
          expired_at: '',
        }
        Swal.fire({
          title: 'Berhasil!',
          text: 'Anda berhasil menambahkan proyek.',
          icon: 'success',
          confirmButtonColor: '#20889C',
        }).then(() => {
          this.$router.replace({name: 'DetailProject', params: {id: result?.data.id}})
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
      })
    }
  },
  mounted() {
    if (!this.$store.state.logged) {
      this.$router.replace({name: 'Home'});
    }
    this.axios.get('/project/category/all')
    .then(({data: result}) => {
      this.categories = result.data;
    })
  },
}
</script>