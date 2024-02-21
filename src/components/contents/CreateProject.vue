<template>
  <main class="col-span-3">

    <div class="grid grid-cols-3 gap-3">

      <!-- Create Project Form -->
      <div class="col-span-2 bg-white shadow rounded h-fit">

        <!-- Header -->
        <div class="p-3 border-b border-slate-300 text-slate-500">
          <div @click="$router.back()" class="hover:text-black cursor-pointer flex gap-3 items-center w-fit px-2">
            <div class="text-xl">
              <i class="fa fa-arrow-left"></i>
            </div>
            <div class="">Kembali</div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="flex p-3 gap-10">
          <div class="flex gap-3">
            <div class="flex items-center justify-center w-6 h-6 text-sm bg-primary rounded-full text-white">1</div>
            <div class="text-primary">Isi data proyek</div>
          </div>
          <div class="flex gap-3">
            <div class="flex items-center justify-center w-6 h-6 text-sm bg-slate-400 rounded-full text-white">2</div>
            <div class="text-slate-500">Verifikasi</div>
          </div>
        </div>

        <!-- Form -->
        <div class="p-3">
          <div class="mb-3">
            <label class="mb-1 block" for="">Judul proyek:</label>
            <input type="text" placeholder="Judul..."
              class="w-full px-3 py-2 rounded border border-slate-300 outline-none">
          </div>
          <div class="mb-3">
            <label class="mb-1 block" for="">Deskripsi:</label>
            <textarea placeholder="Deskripsi" cols="30" rows="2"
              class="w-full px-3 py-2 rounded border border-slate-300 outline-none"></textarea>
          </div>
          <div class="mb-3">
            <label class="mb-1 block" for="">Anggaran:</label>
            <input type="number" placeholder="Anggaran..."
              class="w-full px-3 py-2 rounded border border-slate-300 outline-none">
          </div>
          <div class="mb-3">
            <label class="mb-1 block" for="">Kategori:</label>
            <select class="w-full px-3 py-3 rounded border border-slate-300 outline-none bg-white">
              <option value="">Pilih kategori</option>
              <option value="">Kategori 1</option>
              <option value="">Kategori 2</option>
            </select>
          </div>
          <div class="mb-3 grid grid-cols-2 gap-3">
            <div class="col-span-1">
              <label class="mb-1 block" for="">Tanggal tutup pengajuan:</label>
              <input type="date" class="w-full px-3 py-2 rounded border border-slate-300 outline-none">
            </div>
            <div class="col-span-1">
              <label class="mb-1 block" for="">Tanggal deadline proyek:</label>
              <input type="date" class="w-full px-3 py-2 rounded border border-slate-300 outline-none">
            </div>
          </div>
          <div class="text-end">
            <button class="p-3 bg-primary outline-none text-white rounded">Buat Proyek</button>
          </div>
        </div>

      </div>

      <!-- Projects -->
      <ProjectListMin />
    </div>

  </main>
</template>

<script setup lang="ts">
import ProjectListMin from '../base/ProjectListMin.vue';
// import Loading from '../utils/Loading.vue';
</script>