<template>
  <div class="container mx-auto my-4">
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <div class="hidden lg:block">
        <Categories @get_project="getProjects" />
      </div>
      <div class="col-span-2">
        <Loading height="6" class="mt-16" v-if="loading" />
        <img src="/ills/page_not_found.svg" alt="page not found" v-if="notFound && !loading" class="w-96 m-auto mt-16">
        <ProjectDetail v-if="!notFound && !loading" :project="project" />
      </div>
      <MyProject v-if="getLogged" />
    </div>
  </div>
</template>

<script setup>
import MyProject from '../components/MyProject.vue';
import ProjectDetail from '../components/project/Detail.vue';
import Categories from '../components/Categories.vue';
import Loading from '../components/Loading.vue';
</script>

<script>
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      project: {},
      notFound: false,
      loading: true,
    }
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    getProjects(filter) {
      this.$router.replace({
        name: 'Home',
        state: {
          filter
        }
      })
    }
  },
  mounted() {
    this.axios.get(`/project/${this.$props.id}`)
    .then(({data: result}) => {
      this.loading = false;
      this.project = result.data;
    })
    .catch(e => {
      this.loading = false;
      this.notFound = true;
    })
  }
}
</script>