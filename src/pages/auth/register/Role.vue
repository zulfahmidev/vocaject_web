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
    <div class="flex justify-around my-8">
      <router-link :to="{name: 'account', state: {role: 'company'}}" class="w-32 h-32 border border-gray-200 shadow bg-white flex items-center justify-center flex-col rounded hover-comp">
        <div class="text-5xl text-primary py-2">
          <i class="fa fa-city fa-fw"></i>
        </div>
        <div class="text-sm">Perusahaan</div>
      </router-link>
      <router-link :to="{name: 'account', state: {role: 'college'}}" class="w-32 h-32 border border-gray-200 shadow bg-white flex items-center justify-center flex-col rounded hover-comp">
        <div class="text-5xl text-primary py-2">
          <i class="fa fa-school-flag fa-fw"></i>
        </div>
        <div class="text-sm">Kampus</div>
      </router-link>
    </div>
    <div class="my-2">
      Sudah punya akun?
      <router-link :to="{name: 'login'}" class="text-sm text-primary hover:underline">Login!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.logged) {
      this.$router.replace({name: 'Home'});
    }
  },
}
</script>