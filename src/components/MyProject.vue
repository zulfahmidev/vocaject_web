<template>
  <div class="py-2">
    Proyek Saya
  </div>
  <div class="flex flex-col gap-2">
    <router-link :to="{name: 'CreateProject'}" class="bg-primary text-white hover:bg-secondary p-3 shadow rounded text-center">
      Buat Proyek Baru
    </router-link>
    <div class="relative my-2">
      <input type="text" placeholder="Cari proyek saya..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full bg-white">
      <Icon name="fa6-solid:magnifying-glass" class="absolute right-4 top-3 text-gray-400" />
    </div>
    <router-link v-for="(v, i) in projects" :key="i" :to="{name: 'DetailProject', params: {id: v.id}}" class="bg-white shadow rounded flex hover-comp" @click="$emit('load_project', v.id)">
      <!-- <div class="w-24 m-3 mr-0 rounded overflow-hidden">
        <img :src="v.company.picture" :alt="v.name">
      </div> -->
      <div class="py-3 pl-4">
        <div class="font-bold capitalize text-lg">{{ v.title }}</div>
        <div class="text-sm text-secondary capitalize">{{ v.company.name }}</div>
        <!-- <div class="text-sm py-1">
          {{ curFormat(v.budget) }}
        </div> -->
        <div class="text-sm capitalize text-gray-400">
          {{ v.category.name }}
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  data() {
    return {
      projects: [],
    }
  },
  mounted() {
    if (this.$store.state.logged) {
      let user = this.$store.state.user;
      this.axios.get('/project?company_id='+user.id)
      .then(({data: result}) => {
        this.projects = result.data;
      })
    }
  },
}
</script>