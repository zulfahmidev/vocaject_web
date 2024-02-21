<template>
  <main class="col-span-3">

    <div class="grid grid-cols-3 gap-3">

      <!-- Detail Project -->
      <div class="col-span-2 bg-white shadow rounded h-fit">

        <!-- Header -->
        <div class="p-3 border-b border-slate-300 text-slate-500 flex justify-between">
          <div class="hover:text-black cursor-pointer flex gap-3 items-center w-fit">
            <div class="text-xl">
              <i class="fa fa-arrow-left"></i>
            </div>
            <div class="">Kembali</div>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer">
              <i class="far fa-fw fa-sticky-note"></i>
              <span>Ajukan Proposal</span>
            </div>
            <div
              class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer">
              <i class="far fa-fw fa-message"></i>
              <span>Diskusi</span>
            </div>
          </div>
        </div>

        <!-- Detail Project -->
        <div class="p-3">
          <div class="flex items-center gap-3">
            <div class="w-14 h-14 bg-slate-500"></div>
            <div class="">
              <div class="text-xl font-bold">Desain Website Vocaject</div>
              <div class="text-primary text-xs">Politeknik Negeri Lhokseumawe</div>
            </div>
          </div>
          <hr class="my-2">
          <p class="text-sm py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus veritatis porro
            repudiandae, praesentium nihil itaque. Consequatur, enim? Eaque placeat, incidunt ipsam sed consequatur
            quasi illo totam minima repellat dicta sint.</p>
          <hr class="my-2">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
              <div class="">Tanggal Tutup Pengajuan</div>
              <div class="font-bold">02 Februari 2024</div>
            </div>
            <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
              <div class="">Tanggal Deadline Proyek</div>
              <div class="font-bold">02 Februari 2024</div>
            </div>
            <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
              <div class="">Anggaran</div>
              <div class="font-bold">Rp. 2,000,000</div>
            </div>
          </div>
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
            <h2>Desain Website Vocaject</h2>
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
            </div>
          </div>

          <div class="col-span-1 bg-white rounded shadow p-3 button-hover">
            <h2>Desain Website Vocaject</h2>
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
            </div>
          </div>

          <div class="col-span-1 bg-white rounded shadow p-3 button-hover">
            <h2>Desain Website Vocaject</h2>
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
            </div>
          </div>

          <div class="text-primary hover:underline text-center my-3 cursor-pointer">Muat lebih banyak</div>
        </div>

      </div>
    </div>

  </main>
</template>