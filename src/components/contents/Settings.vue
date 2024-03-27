<template>
  <main class="col-span-3">

    <div class="grid grid-cols-3 gap-3">

      <!-- Setting Menu -->
      <div class="col-span-1">
        <div class="bg-white shadow rounded p-5">
          <div class="text-lg font-bold">Pengaturan:</div>
          <router-link :to="{name: 'setting-profile'}" class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-user-cog"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Profil</span>
          </router-link>
          <router-link :to="{name: 'setting-password'}" class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-key"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Ganti Password</span>
          </router-link>
          <router-link :to="{name: 'setting-preference'}" class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-sun"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Preferensi</span>
          </router-link>
          <hr class="my-3">
          <router-link :to="{name: 'about-us'}" class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-info"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Tentang Aplikasi</span>
          </router-link>
          <div class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 text-red-500" @click="logout">
            <div class=""><i class="fa fa-fw fa-sign-out"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Keluar</span>
          </div>
        </div>
      </div>

      <!-- Setting Content -->
      <div class="col-span-2">
        <router-view name="setting"></router-view>
      </div>
    </div>
  </main>
</template>

<script>
export default {
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
    }
  },
}
</script>