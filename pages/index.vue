<template>
  <div class="container mx-auto my-4">
    <div class="grid grid-cols-4 gap-4">
      <div>
        <div class="relative">
          <input type="text" placeholder="Cari proyek..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full">
          <Icon name="fa6-solid:magnifying-glass" class="absolute right-4 top-3 text-gray-400" />
        </div>
        <div class="py-2">
          Kategori Proyek
        </div>
        <div class="">
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp hover-comp">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:code" />
            </div>
            <div class="">Website</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:mobile" />
            </div>
            <div class="">Aplikasi Seluler</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:gamepad" />
            </div>
            <div class="">Pengembang Permainan</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:paintbrush" />
            </div>
            <div class="">Desain Grafis</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:file-video" />
            </div>
            <div class="">Pengeditan Video</div>
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-2 gap-4">
          <Project v-for="(v, i) in projects" :key="i" :picture="v.company.picture" :title="v.title" :company_name="v.company.name" :budget="v.budget" :category="v.category.name"  />
        </div>
      </div>
      <div class="">
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
          <input type="text" placeholder="Cari proyek saya..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full">
          <Icon name="fa6-solid:magnifying-glass" class="absolute right-4 top-3 text-gray-400" />
        </div>
        <div class="py-2">
          Proyek Saya
        </div>
        <div class="flex flex-col gap-2">
          <Project v-for="(v, i) in projects" :key="i" :title="v.title" :company_name="v.company.name" :category="v.category.name" />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6"></div>
    <div class="col-3"></div>
  </div>
</template>

<script>
// import * as BE from '~/helper/backend.js';
export default {
  data() {
    return {
      projects: [],
    }
  },
  mounted() {
    $fetch('http://34.101.227.89/api/project')
    .then((res) => {
      this.projects = res.data;
    })
  },
}
</script>