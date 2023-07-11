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
        Silahkan pilih peran yang akan didaftarkan
      </div>
    </div>
    <div class="flex justify-around my-8">
      <NuxtLink to="/auth/register/identity" class="w-32 h-32 border border-gray-200 shadow bg-white flex items-center justify-center flex-col rounded hover-comp">
        <Icon name="fa6-solid:building" class="text-7xl text-primary py-2" />
        <div class="text-sm">Perusahaan</div>
      </NuxtLink>
      <NuxtLink to="/auth/register/identity" class="w-32 h-32 border border-gray-200 shadow bg-white flex items-center justify-center flex-col rounded hover-comp">
        <Icon name="fa6-solid:school-flag" class="text-7xl text-primary py-2" />
        <div class="text-sm">Kampus</div>
      </NuxtLink>
    </div>
    <div class="my-2">
      Sudah punya akun?
      <NuxtLink to="/auth/login" class="text-sm text-primary hover:underline">Login!</NuxtLink>
    </div>
  </div>
</template>