<template>
  <nav class="bg-white shadow" style="height: 10vh;">
    <div class="container mx-auto flex justify-between items-center h-full px-5">

      <!-- Logo -->
      <div class="h-12">
        <img src="/assets/logo2.png" class="h-full" alt="vocaject logo">
      </div>

      <!-- Profile -->
      <div class="flex gap-4 items-center">
        <div class="text-right">
          <div class="text-sm capitalize">
            {{ $store.state.user.name }}
          </div>
          <div class="text-xs text-slate-500">
            {{ roles[$store.state.user.role] }}
          </div>
        </div>
        <div class="h-12 w-12 bg-slate-100 rounded-full overflow-hidden">
          <img :src="$store.state.user.picture" :alt="$store.state.user.name">
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      roles: {
        student: 'Mahasiswa',
        lecture: 'Dosen',
        company: 'Industri',
        college: 'Kampus',
      }
    }
  },
  methods: {
    formatRupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(number);
    }
  }
}
</script>