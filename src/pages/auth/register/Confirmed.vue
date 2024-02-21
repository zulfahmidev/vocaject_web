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
      Anda telah berhasil melakukan verifikasi email. <b>Silahkan login!</b>
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