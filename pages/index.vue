<template>
  <div class="container mx-auto my-4">
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <div>
        <div class="relative mb-2">
          <input type="text" placeholder="Cari proyek..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full">
          <Icon name="fa6-solid:magnifying-glass" class="absolute right-4 top-3 text-gray-400" />
        </div>
        <div class="py-2 hidden md:block">
          Kategori Proyek
        </div>
        <div class="flex gap-2 justify-center md:block">
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp hover-comp justify-center lg:justify-start">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:code" />
            </div>
            <div class="hidden lg:block">Website</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:mobile" />
            </div>
            <div class="hidden lg:block">Aplikasi Seluler</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:gamepad" />
            </div>
            <div class="hidden lg:block">Pengembang Permainan</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:paintbrush" />
            </div>
            <div class="hidden lg:block">Desain Grafis</div>
          </NuxtLink>
          <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
            <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
              <Icon name="fa6-solid:file-video" />
            </div>
            <div class="hidden lg:block">Pengeditan Video</div>
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="col-span-2 py-6" id="loading_projects">
            <svg aria-hidden="true" class="w-8 h-8 m-auto text-gray-300 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <div role="status">
                <span class="sr-only">Loading...</span>
            </div>
          </div>
          
          <Project v-for="(v, i) in projects" :key="i" :picture="v.company.picture" :title="v.title" :company_name="v.company.name" :budget="v.budget" :category="v.category.name"  />
        </div>
      </div>
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
    // $fetch('http://34.101.227.89/api/project')
    // .then((res) => {
    //   this.projects = res.data;
    //   document.querySelector('#loading_projects').style.display = 'none';
    // })
    const { pending, data: project } = useFetch('http://34.101.227.89/api/project', {
      lazy: true,
      server: false
    })
    console.log(pending)
    console.log(project)
  },
}
</script>