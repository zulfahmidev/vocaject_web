<template>
  <div>
    <div class="my-3">
      <div class="text-xl">
        Selamat datang di <b>Vocaject!</b>
      </div>
      <div class="text-sm text-gray-400">
        Silahkan pilih peran yang akan didaftarkan
      </div>
    </div>
    <div class="flex flex-wrap justify-evenly gap-3 w-fit my-8">
      <router-link v-for="(role, index) in roles" :key="index" :to="{name: 'account', state: {role: role.name}}" class="w-32 h-28 border border-gray-200 bg-white flex items-center justify-center flex-col rounded button-hover">
        <div class="text-4xl text-primary py-2">
          <i :class="`fa fa-${role.icon} fa-fw`"></i>
        </div>
        <div class="text-xs">{{ role.text }}</div>
      </router-link>
    </div>
    <div class="mt-2">
      Sudah punya akun?
      <router-link :to="{name: 'login'}" class="text-sm text-primary hover:underline">Login!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [
        {
          name: 'company',
          text: 'Industri',
          icon: 'city'
        },
        {
          name: 'college',
          text: 'Kampus',
          icon: 'school-flag'
        },
        {
          name: 'lecture',
          text: 'Dosen',
          icon: 'user-tie'
        },
        {
          name: 'student',
          text: 'Mahasiswa',
          icon: 'user-graduate'
        },
      ]
    }
  },
  mounted() {
    if (this.$store.state.logged) {
      this.$router.replace({name: 'Home'});
    }
  },
}
</script>