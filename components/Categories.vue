<template>
  <div>
    <div class="relative mb-2">
      <input type="text" placeholder="Cari proyek..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full bg-white">
      <Icon name="fa6-solid:magnifying-glass" class="absolute right-4 top-3 text-gray-400" />
    </div>
    <div class="py-2 hidden md:block">
      Kategori Proyek
    </div>
    <div class="flex gap-2 justify-center md:block">
      <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp hover-comp justify-center lg:justify-start">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <Icon name="fa6-solid:code" />
        </div>
        <div class="hidden lg:block">Website</div>
      </NuxtLink>
      <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <Icon name="fa6-solid:mobile" />
        </div>
        <div class="hidden lg:block">Aplikasi Seluler</div>
      </NuxtLink>
      <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <Icon name="fa6-solid:gamepad" />
        </div>
        <div class="hidden lg:block">Pengembang Permainan</div>
      </NuxtLink>
      <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <Icon name="fa6-solid:paintbrush" />
        </div>
        <div class="hidden lg:block">Desain Grafis</div>
      </NuxtLink>
      <NuxtLink to="/" class="bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <Icon name="fa6-solid:file-video" />
        </div>
        <div class="hidden lg:block">Pengeditan Video</div>
      </NuxtLink>
    </div>
  </div>
</template>