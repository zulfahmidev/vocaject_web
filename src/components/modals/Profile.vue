<template>
  <div
    class="fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-20 backdrop-blur-sm flex items-center justify-center"
    id="modal_profile">
    <!-- small: w-1/3 | medium: 1/2 | large: 2/3 -->
    <div class="w-1/3 bg-white rounded overflow-hidden">

      <!-- Header -->
      <div class="border-b border-slate-300 relative">
        <div class="left-0 top-0 right-0 h-16 bg-primary absolute"></div>

        <div class="text-center w-fit m-auto py-4 relative">
          <div class="w-24 h-24 rounded-full bg-slate-300"></div>
          <div class="mt-3 font-bold text-xl">Zulfahmi</div>
        </div>

        <div
          class="absolute top-3 right-3 w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
          onclick="switchShowModal(modalActive)">
          <i class="fa fa-times" style="margin-top: 2px;"></i>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5">
        <div class="">
          <div class="font-bold">Nim:</div>
          <p class="text-sm">2020903430056</p>
        </div>
        <hr class="my-2">
        <div class="">
          <div class="font-bold">Alamat:</div>
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, harum?</p>
        </div>
        <hr class="my-2">
        <div class="">
          <div class="font-bold">Alamat:</div>
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, harum?</p>
        </div>
      </div>

    </div>
  </div>
</template>