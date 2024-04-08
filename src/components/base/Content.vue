<template>
  <main style="height: 86vh; padding-top: 4vh">
a
    <div class="grid grid-cols-3 gap-3">

      <!-- Detail Profile -->
      <div class="col-span-2">

        <div class="rounded bg-white shadow overflow-hidden">
          <div class="relative pt-9">
            <div class="absolute top-0 left-0 h-28 w-full bg-primary"></div>
            <div class="flex justify-between relative z-10 items-end">
              <div class="w-28 h-28 mx-5 rounded-full bg-slate-300"></div>
              <div
                class="w-8 h-8 rounded-full text-slate-500 hover:text-black active:bg-slate-200 flex items-center justify-center cursor-pointer">
                <i class="fa fa-pencil"></i>
              </div>
            </div>
            <div class="px-5 py-3">
              <div class="text-3xl font-bold">Zulfahmi</div>
              <div class="">zulfahmineo@gmail.com</div>
            </div>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-2 gap-3">
          <div
            class="border border-primary rounded p-3 text-center text-primary font-bold hover:bg-primary/20 cursor-pointer"
            style="border-width: 3px;">
            Pengajuan Mahasiswa
          </div>
          <div
            class="border border-primary rounded p-3 text-center text-primary font-bold hover:bg-primary/20 cursor-pointer"
            style="border-width: 3px;">
            Pengajuan Dosen
          </div>
        </div>

        <div class="rounded bg-white shadow overflow-hidden mt-3 p-5">
          <div class="text-xl font-bold">NIM</div>
          <p>2020903430056</p>
          <hr class="my-3">
          <div class="text-xl font-bold">Telepon</div>
          <p>+62 (852) 6162 6314</p>
          <hr class="my-3">
          <div class="text-xl font-bold">Alamat</div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ducimus.</p>
          <hr class="my-3">
          <div class="text-xl font-bold">Deskripsi</div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, sed unde dolorem, qui deleniti
            similique ad tenetur enim possimus autem porro. Quia mollitia consectetur necessitatibus ipsam molestiae
            earum doloribus praesentium, alias aspernatur quisquam temporibus perspiciatis, dolores iste amet deserunt
            ut.</p>
        </div>
      </div>

      <!-- Projects -->
      <div class="col-span-1">

        <!-- Filter -->
        <div class="grid grid-cols-1">
          <div class="col-span-2 bg-white rounded shadow flex mb-3 overflow-hidden">
            <input type="text" placeholder="Cari proyek..." class="w-full outline-none py-3 px-4">
            <div class="h-full w-10 flex items-center text-primary">
              <i class="fa fa-fw fa-search"></i>
            </div>
          </div>
          <select class="col-span-1 bg-white shadow rounded p-3 outline-none cursor-pointer">
            <option value="">Aktif</option>
            <option value="">Kadaluarsa</option>
            <option value="">Selesai</option>
          </select>
        </div>

        <!-- Projects -->
        <div class="grid grid-cols-1 gap-3 mt-3">

          <div class="col-span-1 bg-white rounded shadow p-3 button-hover">
            <div class="flex justify-between items-start">
              <h2>Desain Website Vocaject</h2>
              <div class="badge-xs border-red-300 text-red-700 bg-red-200">Tutup</div>
            </div>
            <p class="text-xs mt-1 inline text-slate-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Tempora, quidem...</p>
            <div class="mt-3 flex justify-between">
              <div class="text-xs">
                <i class="fa fa-fw fa-money-bill"></i>
                <span>Rp. 100,0000</span>
              </div>
              <div class="text-xs">
                <i class="fa fa-fw fa-calendar-alt"></i>
                <span>02 Feb 2024</span>
              </div>
              <div class="text-xs">
                <i class="fa fa-fw fa-bars-progress"></i>
                <span>50%</span>
              </div>
            </div>
          </div>

          <div class="col-span-1 bg-white rounded shadow p-3 button-hover">
            <div class="flex justify-between items-start">
              <h2>Desain Website Vocaject</h2>
              <div class="badge-xs border-red-300 text-red-700 bg-red-200">Tutup</div>
            </div>
            <p class="text-xs mt-1 inline text-slate-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Tempora, quidem...</p>
            <div class="mt-3 flex justify-between">
              <div class="text-xs">
                <i class="fa fa-fw fa-money-bill"></i>
                <span>Rp. 100,0000</span>
              </div>
              <div class="text-xs">
                <i class="fa fa-fw fa-calendar-alt"></i>
                <span>02 Feb 2024</span>
              </div>
              <div class="text-xs">
                <i class="fa fa-fw fa-bars-progress"></i>
                <span>50%</span>
              </div>
            </div>
          </div>

          <div class="col-span-1 bg-white rounded shadow p-3 button-hover">
            <div class="flex justify-between items-start">
              <h2>Desain Website Vocaject</h2>
              <div class="badge-xs border-red-300 text-red-700 bg-red-200">Tutup</div>
            </div>
            <p class="text-xs mt-1 inline text-slate-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Tempora, quidem...</p>
            <div class="mt-3 flex justify-between items-center">
              <div class="text-xs">
                <i class="fa fa-fw fa-money-bill"></i>
                <span>Rp. 100,0000</span>
              </div>
              <div class="text-xs">
                <i class="fa fa-fw fa-calendar-alt"></i>
                <span>02 Feb 2024</span>
              </div>
              <div class="text-xs">
                <i class="fa fa-fw fa-bars-progress"></i>
                <span>50%</span>
              </div>
            </div>
          </div>

          <div class="text-primary hover:underline text-center my-3 cursor-pointer">Muat lebih banyak</div>
        </div>

      </div>
    </div>

  </main>
</template>