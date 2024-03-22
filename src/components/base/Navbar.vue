<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto flex justify-between items-center h-16">

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
            {{ formatRupiah($store.state.user.balance) }}
          </div>
        </div>
        <div class="h-12 w-12 bg-slate-100 rounded-full overflow-hidden">
          <img :src="$store.state.user.picture" :alt="$store.state.user.name">
        </div>
      </div>

    </div>
  </nav>
</template>

<script type="ts">
export default {
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