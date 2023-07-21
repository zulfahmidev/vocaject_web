<template>
  <div class="container mx-auto my-4">
    <!-- <Navbar /> -->
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <div class="relative">
        <Categories class="sticky top-16" @get_project="getProjects" />
      </div>
      <div class="col-span-2" :class="{'col-span-3': !getLogged}">
        <div class="my-16" v-if="loading">
          <Loading height="6" />
        </div>
        <div class="text-center text-sm text-gray-500 py-5" v-if="projects.length == 0">
          <img src="/ills/empty.svg" alt="page not found" v-if="!loading" class="w-96 m-auto mt-16">
        </div>
        <Projects v-if="!loading" :projects="projects" />
        <div class="my-16" v-if="loadingLoadMore">
          <Loading height="6" />
        </div>
        <div class="text-sm text-primary hover:underline w-fit m-auto my-5 cursor-pointer" @click="loadMore" v-if="!loadingLoadMore && !loading && projects.length == (offset+1)*take">Muat lebih banyak!</div>
      </div>
      <div class="relative hidden lg:block">
        <MyProject class="sticky top-16" v-if="getLogged" />
      </div>
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
      loadingLoadMore: false,
      offset: 0,
      take: 10,
      filter: {}
    }
  },
  methods: {
    getProjects(filter = {category: '', title: '', take: 10, offset: 0}) {
      this.filter = filter;
      this.offset = filter.offset;
      this.loading = true;
      this.axios.request({
        method: 'GET',
        url: '/project',
        params: filter,
      })
      .then(({data: result}) => {
        this.projects = result?.data;
        this.loading = false;
      })
      .catch(e => {
        this.loading = false;
      })
    },
    loadMore() {
      this.offset++;
      this.loadingLoadMore = true;
      this.axios.request({
        method: 'GET',
        url: '/project',
        params: {
          ...this.filter,
          take: this.take,
          offset: this.offset*this.take,
        }
      })
      .then(({data: result}) => {
        this.projects = [...this.projects, ...result?.data];
        this.loadingLoadMore = false;
      })
      .catch(e => {
        this.loadingLoadMore = false;
      })
    }
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    }
  },
  mounted() {
    this.getProjects(history.state.filter)
  },
}
</script>
