<template>
  <main class="col-span-3">
    <div class="bg-white rounded shadow">

      <!-- Header -->
      <div class="p-3 text-primary font-bold border-b">Diskusi Proyek</div>

      <!-- Contacct -->
      <div class="grid grid-cols-3" style="height: 500px;">
        <div class="col-span-1 h-full overflow-y-auto">

          <!-- Search Project -->
          <div class="p-3">
            <input type="text" placeholder="Cari proyek..."
              class="border border-slate-300 rounded w-full px-3 py-2 outline-none text-sm">
          </div>

          <!-- Projects -->
          <div class="text-xs px-3 text-slate-500">Semua proyek</div>
          <div class="p-3">

            <div class="p-2 border-slate-200 my-1 rounded flex items-center gap-3 hover:bg-slate-100 cursor-pointer">
              <div class="">
                <div class="w-10 h-10 bg-slate-300 rounded-full"></div>
              </div>
              <div class="w-full">
                <div class="">Desain Website Vocaject</div>
                <div class="text-xs text-slate-500">Lorem ipsum dolor sit...</div>
              </div>
              <div class="text-end">
                <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5
                </div>
              </div>
            </div>

            <div class="p-2 border-slate-200 my-1 rounded flex items-center gap-3 hover:bg-slate-100 cursor-pointer">
              <div class="">
                <div class="w-10 h-10 bg-slate-300 rounded-full"></div>
              </div>
              <div class="w-full">
                <div class="">Desain Website Vocaject</div>
                <div class="text-xs text-slate-500">Lorem ipsum dolor sit...</div>
              </div>
              <div class="text-end">
                <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5
                </div>
              </div>
            </div>

            <div class="p-2 border-slate-200 my-1 rounded flex items-center gap-3 hover:bg-slate-100 cursor-pointer">
              <div class="">
                <div class="w-10 h-10 bg-slate-300 rounded-full"></div>
              </div>
              <div class="w-full">
                <div class="">Desain Website Vocaject</div>
                <div class="text-xs text-slate-500">Lorem ipsum dolor sit...</div>
              </div>
              <div class="text-end">
                <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5
                </div>
              </div>
            </div>

          </div>


        </div>

        <!-- Chat Room -->
        <div class="col-span-2 border-l border-slate-300 h-full relative">

          <!-- Header -->
          <div class="h-16 bg-primary flex items-center gap-3 px-3">
            <div class="">
              <div class="w-10 h-10 bg-slate-50 rounded-full"></div>
            </div>
            <div class="w-full">
              <div class="text-white font-bold">Zulfahmi</div>
              <div class="text-xs text-white">Politeknik Negeri Lhokseumawe</div>
            </div>
          </div>

          <!-- Messages -->
          <div class="pb-14 pt-3 px-3">

            <!-- Recieved -->
            <div class="flex gap-3">
              <div class="">
                <div class="w-10 h-10 rounded-full bg-slate-300"></div>
              </div>
              <div class="w-2/3">
                <div class="bg-slate-300 text-xs p-2 rounded w-fit">Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Itaque vitae reprehenderit ut voluptates a autem temporibus voluptate laborum
                  voluptatem accusantium.</div>
                <div class="text-xs py-1">18.00</div>
              </div>
            </div>

            <!-- Sender -->
            <div class="flex gap-3 justify-end text-white">
              <div class="w-2/3">
                <div class="bg-primary text-xs p-2 rounded m-auto mr-0 w-fit">Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Itaque vitae reprehenderit ut voluptates a autem temporibus voluptate laborum
                  voluptatem accusantium.</div>
                <div class="text-xs py-1 text-end">18.00</div>
              </div>
            </div>

            <!-- Recieved With File -->
            <div class="flex gap-3">
              <div class="">
                <div class="w-10 h-10 rounded-full bg-slate-300"></div>
              </div>
              <div class="w-2/3">
                <div class="bg-slate-300 text-xs rounded w-fit flex items-center gap-2 p-2 cursor-pointer">
                  <div class="">
                    <div class="w-8 h-8 rounded flex items-center justify-center text-xl">
                      <!-- <i class="fa fa-download"></i> -->
                      <i class="fa fa-paperclip"></i>
                    </div>
                  </div>
                  <div class="">
                    <div class="font-bold">File Lampiran.pdf</div>
                    <div class="">14 mb.</div>
                  </div>
                </div>
                <div class="text-xs py-1">18.00</div>
              </div>
            </div>


            <!-- Sender With File -->
            <div class="flex gap-3 justify-end text-white">
              <div class="w-2/3">
                <div class="bg-primary text-xs rounded w-fit flex items-center gap-2 p-2 m-auto mr-0 cursor-pointer">
                  <div class="">
                    <div class="w-8 h-8 rounded flex items-center justify-center text-xl">
                      <!-- <i class="fa fa-download"></i> -->
                      <i class="fa fa-paperclip"></i>
                    </div>
                  </div>
                  <div class="">
                    <div class="font-bold">File Lampiran.pdf</div>
                    <div class="">14 mb.</div>
                  </div>
                </div>
                <div class="text-xs py-1 text-end">18.00</div>
              </div>
            </div>
          </div>


          <!-- Input -->
          <div class="absolute bg-light border-t border-primary h-14 bottom-0 left-0 w-full flex items-center">
            <div class="px-3 text-xl text-primary active:text-emerald-400 cursor-pointer">
              <i class="fa fa-fw fa-paperclip"></i>
            </div>
            <input type="text" placeholder="Ketik disini..."
              class="px-3 py-2 h-fit bg-white w-full rounded border-primary border outline-none text-sm">
            <div class="px-3 text-xl text-primary active:text-emerald-400 cursor-pointer">
              <i class="fa fa-fw fa-paper-plane"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>