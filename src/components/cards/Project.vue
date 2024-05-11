<template>
  <router-link :to="{name: 'progress-project', params: {id: data?.id}}" :class="`block rounded shadow p-3 button-hover ${active ? 'button-active' : 'bg-white'}`">
    <div class="flex gap-2">
      <div class="h-20 w-20 rounded bg-green-100 flex items-center justify-center">
        <img src="/assets/icondesain.png" class="h-1/2" alt="category icon">
      </div>
      <div class="py-1">
        <h2 class="capitalize">{{ data?.title }}</h2>
        <p class="text-xs mt-1 inline text-slate-500">{{ data?.description }}</p>
      </div>
    </div>
    <div class="mt-3">
      
      <div class="mt-3 flex justify-between">
        <div class="text-xs" v-if="hidePercent">
          <i class="fa fa-fw fa-money-bill mr-1"></i>
          <span>Rp. {{ data?.budget }}</span>
        </div>
        <div class="text-xs">
          <i class="fa fa-fw fa-calendar-alt mr-1"></i>
          <span>{{ data?.deadline_at }}</span>
        </div>
        <div class="text-xs" v-if="!hidePercent">
          <i class="fa fa-fw fa-bars-progress mr-1"></i>
          <span>{{ data?.progress }}%</span>
        </div>
        <div class="flex justify-between items-start" v-if="!hidePercent">
          <div v-if="data?.status == 'opened'" class="badge-xs border-green-300 text-green-700 bg-green-200">Buka</div>
          <div v-if="data?.status == 'completed'" class="badge-xs border-blue-300 text-blue-700 bg-blue-200">Selesai</div>
          <div v-if="data?.status == 'closed'" class="badge-xs border-red-300 text-red-700 bg-red-200">Tutup</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    data: Object,
    hidePercent: Boolean
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    let id = this.$route.params;
    this.active = (id == this.data?.id) ? true : false;
  }
}
</script>