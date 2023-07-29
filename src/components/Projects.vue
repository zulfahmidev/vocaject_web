<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="{'lg:grid-cols-3': !getLogged}">

    <router-link v-for="(v, i) in projects" :key="i" :to="{name: 'DetailProject', params: {id: v.id}}" class="bg-white shadow rounded flex hover-comp">
      <div class="w-24 m-3 mr-0 rounded overflow-hidden">
        <img :src="v.company.picture" :alt="v.name">
      </div>
      <div class="py-3 pl-4">
        <div class="font-bold capitalize text-lg">{{ v.title }}</div>
        <div class="text-sm text-secondary capitalize">{{ v.company.name }}</div>
        <!-- <div class="text-xs capitalize text-slate-400">
          {{ v.category.name }}
        </div> -->
        <!-- <div class="text-sm py-1">
          {{ curFormat(v.budget) }}
        </div> -->
        <div class="flex gap-1 mt-2 flex-col">

          <div class="flex items-center gap-2">
            <div class="text-xs text-slate-400">
              <i class="fa fa-tags"></i>
            </div>
            <div class="text-xs capitalize">
              {{ curFormat(v.budget) }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-xs text-slate-400">
              <i class="far fa-calendar"></i>
            </div>
            <div class="text-xs capitalize">
              {{ getDate(v.deadline_at) }}
            </div>
          </div>
        </div>
      </div>
    </router-link>

    <router-link v-for="(v, i) in more_projects" :key="i" :to="{name: 'DetailProject', params: {id: v.id}}" class="bg-white shadow rounded flex hover-comp">
      <div class="w-24 m-3 mr-0 rounded overflow-hidden">
        <img :src="v.company.picture" :alt="v.name">
      </div>
      <div class="py-3 pl-4">
        <div class="font-bold capitalize text-lg">{{ v.title }}</div>
        <div class="text-sm text-secondary capitalize">{{ v.company.name }}</div>
        <!-- <div class="text-xs capitalize text-slate-400">
          {{ v.category.name }}
        </div> -->
        <!-- <div class="text-sm py-1">
          {{ curFormat(v.budget) }}
        </div> -->
        <div class="flex gap-1 mt-2 flex-col">

          <div class="flex items-center gap-2">
            <div class="text-xs text-slate-400">
              <i class="fa fa-tags"></i>
            </div>
            <div class="text-xs capitalize">
              {{ curFormat(v.budget) }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-xs text-slate-400">
              <i class="far fa-calendar"></i>
            </div>
            <div class="text-xs capitalize">
              {{ getDate(v.deadline_at) }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    projects: Array,
    more_projects: Array,
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
    getDate(submited_at) {
      let date = new Date(submited_at);
      let months = ['jan', 'feb', 'mar', 'apr', 'mei', "jun", 'jul', 'sept', 'okt', 'nov', 'des'];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
  },
  mounted() {
  },
}
</script>