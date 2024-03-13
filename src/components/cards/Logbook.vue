<template>
  <div>
    <div class="mt-3 bg-white rounded shadow hidden">
      <div class="py-3 px-5 border-b border-slate-300">
        Logbook Mahasiswa
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 mt-3">

      <!-- Senders -->
      <div class="col-span-1">
        <div class="bg-white shadow rounded flex gap-3 items-center p-2 button-hover mb-2">
          <div class="">
            <div class="w-8 h-8 rounded-full bg-slate-300"></div>
          </div>
          <div class="text-xs">
            <div class="font-bold">Zulfahmi</div>
            <div class="text-slate-500">2020903430056</div>
          </div>
        </div>
        <div class="bg-white shadow rounded flex gap-3 items-center p-2 button-hover mb-2">
          <div class="">
            <div class="w-8 h-8 rounded-full bg-slate-300"></div>
          </div>
          <div class="text-xs">
            <div class="font-bold">Zulfahmi</div>
            <div class="text-slate-500">2020903430056</div>
          </div>
        </div>
      </div>

      <!-- Proposal Detail -->
      <div class="col-span-2">

        <!-- Profile Sender -->
        <div class="bg-white shadow rounded p-3">
          <div class="flex justify-between">
            <div class="flex items-center gap-3">
              <div class="">
                <div class="w-10 h-10 rounded-full bg-slate-300"></div>
              </div>
              <div class="text-sm">
                <div class="font-bold">Zulfahmi</div>
                <div class="text-slate-500">Politeknik Negeri Lhokseumawe</div>
              </div>
            </div>
            <div class="">
              <div
                class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
                onclick="switchShowModal(modalActive)">
                <i class="fa fa-times" style="margin-top: 2px;"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded shadow p-3 mt-3">
          <div class="font-bold">17 Desember 2023</div>
          <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur iste voluptas labore ipsum sequi porro, reiciendis atque neque impedit.</p>
        </div>

        <div class="bg-white rounded shadow p-3 mt-3">
          <div class="font-bold">17 Desember 2023</div>
          <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur iste voluptas labore ipsum sequi porro, reiciendis atque neque impedit.</p>
        </div>

        <div class="bg-white rounded shadow p-3 mt-3">
          <div class="font-bold">17 Desember 2023</div>
          <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur iste voluptas labore ipsum sequi porro, reiciendis atque neque impedit.</p>
        </div>

      </div>


    </div>
  </div>
</template>