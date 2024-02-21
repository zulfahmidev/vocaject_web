<template>
  <div class="min-h-screen flex items-center justify-center py-10 bg-slate-50 text-slate-900">
    <div class="w-full p-10 bg-white m-auto rounded shadow text-center" style="max-width: 26rem;">
      <div class="w-28 h-28 rounded-full bg-slate-100 m-auto flex items-center justify-center">
        <img src="/assets/logo.png" alt="logo" class="h-16 m-auto">
      </div>
      <router-view name="auth"></router-view>
    </div>
  </div>
</template>