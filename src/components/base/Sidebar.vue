<template>
  <aside class="col-span-1 overflow-auto" style="height: 86vh; margin-top: 4vh;">

    <div class="mb-4" v-for="(category, index) in categories" :key="index">
      <div v-if="category !== 'umum'" class="capitalize text-xs text-slate-500">{{ category }}</div>
      <router-link :to="{name: item.name}" v-for="(item, index2) in menu[category]" :key="index2" :class="`${$route.name == item.name ? 'button-active' : 'bg-white'} rounded shadow mb-2 cursor-pointer flex items-center button-hover`">
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
      roles: {
        college: 'Kampus',
        student: 'Mahasiswa',
        company: 'Industri',
        lecture: 'Dosen',
      },
      categories: [
        'umum', 'pengaturan', 'lainnya'
      ],
      menu: {
        umum: [
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
        ],
        pengaturan: [
          {
            'name': 'setting-profile',
            'text': 'Personalisasi',
            'icon': 'user-cog'
          },
          {
            'name': 'setting-profile',
            'text': 'Ganti Password',
            'icon': 'key'
          },
          {
            'name': 'setting-profile',
            'text': 'Preferensi',
            'icon': 'sun'
          },
        ],
        lainnya: [
          {
            'name': 'setting-profile',
            'text': 'Tentang Aplikasi',
            'icon': 'info'
          },
          {
            'name': 'setting-profile',
            'text': 'Keluar',
            'icon': 'sign-out'
          },
        ]
      }
    }
  },
  mounted() {
  },
}
</script>