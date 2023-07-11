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
        Silahkan masukan email dan password anda
      </div>
    </div>
    <div class="text-left border-b">
      <input type="email" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary my-2" placeholder="email">
      <input type="password" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary my-2" placeholder="password">
      <input type="password" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary my-2" placeholder="konfirmasi password">
      <button class="py-2 px-3 my-2 bg-primary hover:bg-secondary w-full text-white rounded">
        Register
      </button>
    </div>
    <div class="my-2">
      Sudah punya akun?
      <NuxtLink to="/auth/login" class="text-sm text-primary hover:underline">Login!</NuxtLink>
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