<template>
  <main class="col-span-3">

    <div class="grid grid-cols-3 gap-3">

      <!-- Setting Menu -->
      <div class="col-span-1">
        <div class="bg-white shadow rounded p-5">
          <div class="text-lg font-bold">Pengaturan:</div>
          <div class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-user-cog"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Profil</span>
          </div>
          <div class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-key"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Ganti Password</span>
          </div>
          <div class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-sun"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Tema</span>
          </div>
          <div class="py-2 px-3 rounded bg-slate-100 mt-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200">
            <div class=""><i class="fa fa-fw fa-info"></i></div>
            <div class="h-6 border-r border-slate-500"></div>
            <span>Tentang Aplikasi</span>
          </div>
        </div>
      </div>

      <!-- Setting Content -->
      <div class="col-span-2">
        <router-view name="setting"></router-view>
      </div>
    </div>
  </main>
</template>