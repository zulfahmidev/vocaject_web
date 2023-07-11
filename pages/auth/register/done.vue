<template>
  <div class="w-full p-10 bg-white m-auto mt-16 rounded shadow text-center" style="max-width: 26rem;">
    <div class="w-28 h-28 rounded-full bg-slate-100 m-auto flex items-center justify-center">
      <img src="/logo.png" alt="logo" class="h-16 m-auto">
    </div>
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
      <NuxtLink to="/auth/register/role" class="text-sm text-primary hover:underline">Kembali ke halaman login!</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    autoGrow(event) {
      event.style.height = '5px'; event.style.height = (event.scrollHeight) + "px";
    }
  },
}
</script>