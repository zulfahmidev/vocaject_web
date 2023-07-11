<template>
  <NuxtLink to="/" class="bg-white shadow rounded flex hover-comp">
    <div class="h-24 w-24 m-3 mr-0 rounded bg-gray-100" v-if="picture">
      <img :src="picture" :alt="company_name">
    </div>
    <div class="py-3 pl-4">
      <div class="font-bold capitalize text-lg">{{ title }}</div>
      <div class="text-sm text-secondary  capitalize">{{ company_name }}</div>
      <div class="text-sm py-1" v-if="budget">
        {{ curFormat(budget) }}
      </div>
      <div class="text-sm capitalize text-gray-400">
        {{ category }}
      </div>
    </div>
    <!-- <div class="p-3 mr-0 mx-auto">
      <div class="w-6 h-6 rounded-full flex items-center justify-center active:bg-slate-100 cursor-pointer">
        <Icon name="fa6-solid:ellipsis" />
      </div>
    </div> -->
  </NuxtLink>
</template>

<script>
export default {
  props: {
    picture: String,
    title: String,
    company_name: String,
    budget: Number,
    category: String,
  },
  methods: {
    curFormat(number) {
      let n = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      return n.format(number);
    }
  }
}
</script>