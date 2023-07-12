<template>
  <div class="hidden md:block">
    <div class="p-3 bg-white rounded shadow">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gray-200">
          <!-- Image -->
        </div>
        <div class="flex flex-col">
          <div class="font-bold">Zulfahmi</div>
          <div class="text-sm text-secondary">Mahasiswa</div>
        </div>
      </div>
    </div>
    <div class="relative my-2">
      <input type="text" placeholder="Cari proyek saya..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full bg-white">
      <Icon name="fa6-solid:magnifying-glass" class="absolute right-4 top-3 text-gray-400" />
    </div>
    <div class="py-2">
      Proyek Saya
    </div>
    <div class="flex flex-col gap-2">
      <!-- <Project v-for="(v, i) in projects" :key="i" :title="v.title" :company_name="v.company.name" :category="v.category.name" /> -->
      <Project title="Vocaject Project" company_name="Google Indonesia" category="Aplikasi Seluler" />
      <Project title="Vocaject Project" company_name="Google Indonesia" category="Aplikasi Seluler" />
      <Project title="Vocaject Project" company_name="Google Indonesia" category="Aplikasi Seluler" />
      <Project title="Vocaject Project" company_name="Google Indonesia" category="Aplikasi Seluler" />
      <Project title="Vocaject Project" company_name="Google Indonesia" category="Aplikasi Seluler" />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      projects: [],
    }
  },
  mounted() {
    // console.log(process)
    // $fetch('/project', {
    //   baseURL: 'http://34.101.227.89/api'
    // })
    // .then((res) => {
    //   this.projects = res.data;
    //   document.querySelector('#loading_projects').style.display = 'none';
    // })
  },
}
</script>