<template>
  <div>
    <div class="my-3">
      <div class="text-xl">
        Selamat datang di <b>Vocaject!</b>
      </div>
      <div class="text-sm text-gray-400">
        Anda telah menyelesaikan registrasi
      </div>
    </div>
    <div class="px-3 my-6 py-2 bg-green-100 rounded text-left text-sm border border-green-300 text-green-700">
      <b>Pendaftaran selesai</b>! Silahkan periksa email verfikasi di mailbox anda.
    </div>
    <div class="my-2">
      <router-link :to="{name: 'login'}" class="text-sm text-primary hover:underline">Kembali ke halaman login!</router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    autoGrow(event) {
      event.style.height = '5px'; event.style.height = (event.scrollHeight) + "px";
    }
  },
  mounted() {
    if (this.$store.state.logged) {
      this.$router.replace({name: 'Home'});
    }
    if (!history.state.success) {
        this.$router.replace({name: 'Account'});
    }
  }
}
</script>