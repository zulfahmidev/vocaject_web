<template>
  <div
    class="fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-20 backdrop-blur-sm flex items-center justify-center"
    v-if="isShow">
    <!-- small: w-1/3 | medium: 1/2 | large: 2/3 -->
    <div class="w-1/3 bg-white rounded overflow-hidden">

      <!-- Header -->
      <div class="border-b border-slate-300 px-5 py-3 flex justify-between items-center">
        <div class="text-lg">Daftar pengajuan</div>

        <div
          class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
          @click="close">
          <i class="fa fa-times" style="margin-top: 2px;"></i>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5">
        <div class="border-b border-slate-3 flex">
          <div class="py-2 px-3 text-primary border-b cursor-pointer border-primary w-fit">
            Panding
          </div>
          <div class="py-2 px-3 border-b cursor-pointer border-transparent w-fit text-slate-500">
            Diterima
          </div>
          <div class="py-2 px-3 border-b cursor-pointer border-transparent w-fit text-slate-500">
            Ditolak
          </div>
        </div>
        <div class="mt-3">
          <table class="table w-full">
            <tr class="border-b border-slate-500 font-bold">
              <td class="py-2">Nim</td>
              <td class="py-2">Nama</td>
              <td class="py-2">Status</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="py-2">2020903430056</td>
              <td class="py-2">Zulfahmi Zulfahmi</td>
              <td class="py-1">
                <select class="py-2 px-3 rounded bg-primary text-white outline-none cursor-pointer">
                  <option value="">Panding</option>
                  <option value="">Diterima</option>
                  <option value="">Ditolak</option>
                </select>
              </td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="py-2">2020903430056</td>
              <td class="py-2">Zulfahmi Zulfahmi</td>
              <td class="py-1">
                <select class="py-2 px-3 rounded bg-primary text-white outline-none cursor-pointer">
                  <option value="">Panding</option>
                  <option value="">Diterima</option>
                  <option value="">Ditolak</option>
                </select>
              </td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="py-2">2020903430056</td>
              <td class="py-2">Zulfahmi Zulfahmi</td>
              <td class="py-1">
                <select class="py-2 px-3 rounded bg-primary text-white outline-none cursor-pointer">
                  <option value="">Panding</option>
                  <option value="">Diterima</option>
                  <option value="">Ditolak</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
    type: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>