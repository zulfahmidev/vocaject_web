<template>
  <div class="container mx-auto my-4">
    <!-- <Navbar /> -->
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <Categories @get_project="getProjects" />
      <div class="col-span-2" :class="{'col-span-3': !getLogged}">
        <div class="my-16" v-if="loading">
          <Loading height="6" />
        </div>
        <div class="text-center text-sm text-gray-500 py-5" v-if="projects.length == 0">
          <img src="/ills/empty.svg" alt="page not found" v-if="!loading" class="w-96 m-auto mt-16">
        </div>
        <Projects v-if="!loading" :projects="projects" />
      </div>
      <MyProject v-if="getLogged" />
    </div>
  </div>
</template>

<script setup>
import Loading from '../components/Loading.vue';
import Categories from '../components/Categories.vue';
import Projects from '../components/Projects.vue';
import MyProject from '../components/MyProject.vue';
</script>

<script>
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      projects: [],
      loading: true,
    }
  },
  methods: {
    getProjects(filter = {}) {
      this.loading = true;
      this.axios.request({
        method: 'GET',
        url: '/project',
        params: filter
      })
      .then(({data: result}) => {
        this.projects = result?.data;
        this.loading = false;
      })
      .catch(e => {
        this.loading = false;
      })

    },
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    }
  },
  mounted() {
    console.log(this.$router.params)
    this.getProjects(history.state.filter)
  },
}
</script>
