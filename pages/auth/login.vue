<template>
  <div class="w-full p-10 bg-white m-auto mt-16 rounded shadow text-center" style="max-width: 26rem;">
    <div class="w-28 h-28 rounded-full bg-slate-100 m-auto flex items-center justify-center">
      <img src="/logo.png" alt="logo" class="h-16 m-auto">
    </div>
    <div class="my-3">
      <div class="text-xl">
        Selamat datang kembali!
      </div>
      <div class="text-sm text-gray-400">
        Silahkan masuk ke akun anda
      </div>
    </div>
    <div class="text-left border-b">
      <input type="text" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary my-2" placeholder="email">
      <input type="text" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary my-2" placeholder="password">
      <NuxtLink to="/" class="text-sm hover:underline">
        Lupa password?
      </NuxtLink>
      <button class="py-2 px-3 my-2 bg-primary hover:bg-secondary w-full text-white rounded">
        Login
      </button>
    </div>
    <div class="my-2">
      Belum punya akun?
      <NuxtLink to="/auth/register/role" class="text-sm text-primary hover:underline">Register!</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>