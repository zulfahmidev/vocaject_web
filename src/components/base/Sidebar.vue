<template>
  <aside class="col-span-1 overflow-auto pr-2" style="height: 86vh; margin-top: 4vh;">

    <div class="mb-4" v-for="(category, index) in categories" :key="index">
      <div v-if="category !== 'umum'" class="capitalize text-xs text-slate-500">{{ category }}</div>
      <router-link 
        :to="{name: item.name}" 
        v-for="(item, index2) in menu[category]" 
        :key="index2" 
        :class="`${$route.name == item.name ? 'button-active' : 'bg-white'} rounded shadow mb-2 cursor-pointer flex items-center button-hover ${hasPermission(item.roles) ? '' : 'hidden'}`">
        <div class="w-12 h-12 flex items-center justify-center text-primary text-xl">
          <i :class="`fa fa-${item.icon}`"></i>
        </div>
        <div class="h-6 border-l border-slate-300"></div>
        <div class="px-2">{{ item.text }}</div>
      </router-link>
    </div>

    <div class="mb-4">
      <div class="capitalize text-xs text-slate-500">Lainnya</div>
      <router-link :to="{name: 'about-us'}" :class="`${$route.name == 'about-us' ? 'button-active' : 'bg-white'} rounded shadow mb-2 cursor-pointer flex items-center button-hover`">
        <div class="w-12 h-12 flex items-center justify-center text-primary text-xl">
          <i :class="`fa fa-info`"></i>
        </div>
        <div class="h-6 border-l border-slate-300"></div>
        <div class="px-2">Tentang Kami</div>
      </router-link>
      <button @click="logout" class="w-full bg-white rounded shadow mb-2 cursor-pointer flex items-center button-hover">
        <div class="w-12 h-12 flex items-center justify-center text-red-500 text-xl">
          <i :class="`fa fa-sign-out`"></i>
        </div>
        <div class="h-6 border-l border-slate-300"></div>
        <div class="px-2">Keluar</div>
      </button>
    </div>

  </aside>
</template>

<script>
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
        'umum', 'pengaturan'
      ],
      menu: {
        umum: [
          {
            'name': 'profile',
            'text': 'Profil Saya',
            'icon': 'user',
            'roles': '*',
          },
          {
            'name': 'projects',
            'text': 'Jelajahi Proyek',
            'icon': 'project-diagram',
            'roles': 'lecture',
          },
          {
            'name': 'my-projects',
            'text': 'Proyek Saya',
            'icon': 'list',
            'roles': '*',
          },
          {
            'name': 'project-discuss',
            'text': 'Diskusi Proyek',
            'icon': 'comments',
            'roles': 'company, college, lecture',
          },
        ],
        pengaturan: [
          {
            'name': 'setting-profile',
            'text': 'Personalisasi',
            'icon': 'user-cog',
            'roles': '*',
          },
          {
            'name': 'setting-password',
            'text': 'Ganti Password',
            'icon': 'key',
            'roles': '*',
          },
          {
            'name': 'setting-preference',
            'text': 'Preferensi',
            'icon': 'sun',
            'roles': '*',
          },
        ],
      }
    }
  },
  methods: {
    logout() {
      this.$swal.fire({
        title: "",
        text: "Apakah anda yakin ingin logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit('setLogout')
        }
      });
    },
    hasPermission(perms) {
      if (perms != '*') {
        return perms.split(', ').includes(this.$store.state.user.role);
      }
      return true;
    }
  },
}
</script>