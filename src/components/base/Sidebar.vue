<template>
  <aside class="col-span-1">
    <div class="sticky top-5">

      <!-- Profile -->
      <div class="bg-white shadow rounded overflow-hidden mb-2">
        <div class="p-3 mx-auto text-center relative">
          <div class="absolute right-0 h-12 bg-primary top-0 left-0"></div>
          <div class="z-10 relative">
            <div class="w-16 h-16 mx-auto bg-slate-200 rounded-full"></div>
            <div class="font-bold mt-2">
              Politeknik Negeri Lhokseumawe
            </div>
            <div class="text-sm text-slate-500">
              Kampus
            </div>
          </div>
        </div>
        <div class="border-t border-slate-200 p-3 text-sm">
          <div class="flex items-center justify-between my-1">
            <div class="font-semibold">Saldo</div>
            <div class="">Rp. 100,000</div>
          </div>
          <hr>
          <div class="flex items-center justify-between my-1">
            <div class="font-semibold">Proyek aktif</div>
            <div class="">135</div>
          </div>
          <hr>
          <div class="flex items-center justify-between my-1">
            <div class="font-semibold">Dosen</div>
            <div class="">245</div>
          </div>
          <hr>
          <div class="flex items-center justify-between my-1">
            <div class="font-semibold">Mahasiswa</div>
            <div class="">1021</div>
          </div>
        </div>
      </div>

      <!-- Menu -->

      <router-link :to="{name: item.name}" v-for="(item, index) in menu" :key="index" :class="`${$route.name == item.name ? 'button-active' : 'bg-white'} rounded shadow my-2 cursor-pointer flex items-center button-hover`">
        <div class="w-12 h-12 flex items-center justify-center text-primary text-xl">
          <i :class="`fa fa-${item.icon}`"></i>
        </div>
        <div class="h-6 border-l border-slate-300"></div>
        <div class="px-2">{{ item.text }}</div>
      </router-link>

    </div>

  </aside>
</template>

<script lang="ts">
export default {
  data() {
    return {
      menu: [
        {
          'name': 'profile',
          'text': 'Profil Saya',
          'icon': 'user'
        },
        {
          'name': 'projects',
          'text': 'Proyek Saya',
          'icon': 'project-diagram'
        },
        {
          'name': 'project-discuss',
          'text': 'Diskusi Proyek',
          'icon': 'comments'
        },
        {
          'name': 'settings',
          'text': 'Pengaturan',
          'icon': 'cog'
        },
      ]
    }
  },
  mounted() {
  },
}
</script>