<template>
  <div class="bg-white p-5 rounded shadow m-auto mt-10 w-96">
    <div class="text-xl text-center my-5">Inisisasi Data Dummy</div>
    <div class="text-sm text-center">Selesai {{progressNumber}} dari {{total}}.</div>
    <div class="text-xs text-center mb-2 text-slate-600">{{ pesan }}</div>
    <div class="p-1 rounded-full bg-light flex items-center relative border-primary/30 border mb-4">
      <div class="h-6 bg-primary rounded-full" :style="`width: ${getPercent}%;transition:.3s;`"></div>
      <div :class="`absolute ${(getPercent > 50) ? 'text-white' : 'text-secondary'} text-xs left-0 right-0 text-center`">{{getPercent}}%</div>
    </div>
    <button class="py-2 px-3 w-full rounded bg-primary outline-none hover:bg-secondary text-white" @click="process">Proses</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pesan: '',
      progressNumber: 0,
      total: 0,
    }
  },
  computed: {
    getPercent() {
      return Math.ceil((100/this.total)*this.progressNumber) || 0;
    }
  },
  methods: {
    async process() {
      
      let response = await fetch('/data_dummy.json');
      let data = await response.json();
      // this.total += data.categories.length;
      // this.total += data.colleges.length;
      // this.total += data.companies.length;
      // this.total += data.lectures.length;
      // this.total += data.students.length;
      this.total += data.projects.length;
      // await data.categories.forEach(async category => {
      //   await this.axios.post(`/project/category`, category)
      //   .then(({data: result}) => {
      //     let category = result.data;
      //     this.pesan = `Kategori ${category.name} selesai ditambahkan.`;
      //     this.progressNumber++;
      //   })
      // })
      // await data.colleges.forEach(async user => {
      //   await this.axios.post(`/auth/register/${user.role}`, user)
      //   .then(({data: result}) => {
      //     let user = result.data;
      //     this.pesan = `Kampus ${user.name} selesai ditambahkan.`;
      //     this.progressNumber++;
      //   })
      // })
      // await data.companies.forEach(async user => {
      //   await this.axios.post(`/auth/register/${user.role}`, user)
      //   .then(({data: result}) => {
      //     let user = result.data;
      //     this.pesan = `Perusahaan ${user.name} selesai ditambahkan.`;
      //     this.progressNumber++;
      //   })
      // })
      // await data.lectures.forEach(async user => {
      //   await this.axios.post(`/auth/register/${user.role}`, user)
      //   .then(({data: result}) => {
      //     let user = result.data;
      //     this.pesan = `Dosen ${user.name} selesai ditambahkan.`;
      //     this.progressNumber++;
      //   })
      // })
      // await data.students.forEach(async user => {
      //   await this.axios.post(`/auth/register/${user.role}`, user)
      //   .then(({data: result}) => {
      //     let user = result.data;
      //     this.pesan = `Mahasiswa ${user.name} selesai ditambahkan.`;
      //     this.progressNumber++;
      //   })
      // })
      await data.projects.forEach(async project => {
        await this.axios.post(`/project`, project)
        .then(({data: result}) => {
          let project = result.data;
          this.pesan = `Proyek ${project.title} selesai ditambahkan.`;
          this.progressNumber++;
        })
        await setTimeout(()=>{}, 500);
      })
      // this.pesan = `Proses selesai.`;
    }
  }
}
</script>