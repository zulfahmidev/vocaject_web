<template>
  <div class="container mx-auto my-4">
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <div class="hidden lg:block">
        <Categories class="sticky top-16" @get_project="getProjects" />
      </div>
      <div class="col-span-2">
        <Loading height="6" class="mt-16" v-if="loading" />
        <img src="/ills/page_not_found.svg" alt="page not found" v-if="notFound && !loading" class="w-96 m-auto mt-16">
        <ProjectDetail v-if="!notFound && !loading" :project="project" />
      </div>
      <div class="hidden md:block">
        <div class="sticky top-16">
          <ProjectChat :project_id="project.id" v-if="project?.company?.id == getUser?.id" />
          <MyProject @load_project="loadProject" v-if="getLogged" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyProject from '../components/MyProject.vue';
import ProjectDetail from '../components/project/Detail.vue';
import Categories from '../components/Categories.vue';
import Loading from '../components/Loading.vue';
import ProjectChat from '../components/project/Chat.vue';
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
    getUser() {
      console.log(this.$store.state.user);
      return this.$store.state.user;
    },
  },
  methods: {
    loadProject(id) {
      this.project = {};
      this.loading = true;
      this.axios.get(`/project/${id}`)
      .then(({data: result}) => {
        this.loading = false;
        this.project = result.data;
      })
      .catch(e => {
        this.loading = false;
        this.notFound = true;
      })
    }
  },
  mounted() {
    this.loadProject(this.$props.id)
  }
}
</script>