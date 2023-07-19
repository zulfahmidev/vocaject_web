<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="{'lg:grid-cols-3': !getLogged}">

    <router-link v-for="(v, i) in projects" :key="i" :to="{name: 'DetailProject', params: {id: v.id}}" class="bg-white shadow rounded flex hover-comp">
      <div class="w-24 m-3 mr-0 rounded overflow-hidden">
        <img :src="v.company.picture" :alt="v.name">
      </div>
      <div class="py-3 pl-4">
        <div class="font-bold capitalize text-lg">{{ v.title }}</div>
        <div class="text-sm text-secondary capitalize">{{ v.company.name }}</div>
        <div class="text-sm py-1">
          {{ curFormat(v.budget) }}
        </div>
        <div class="text-sm capitalize text-gray-400">
          {{ v.category.name }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    projects: Array
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    }
  },
  methods: {
    curFormat(number) {
      let n = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      return n.format(number);
    },
  },
  mounted() {
  },
}
</script>