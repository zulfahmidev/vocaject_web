<template>
  <div class="container mx-auto my-4">
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <div class="hidden lg:block">
        <Categories @get_project="getProjects" />
      </div>
      <div class="col-span-2">
        <CreateProject />
      </div>
      <MyProject v-if="getLogged" />
    </div>
  </div>
</template>

<script setup>
import MyProject from '../components/MyProject.vue';
import CreateProject from '../components/project/Create.vue';
import Categories from '../components/Categories.vue';
</script>

<script>
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      // project: {},
      // notFound: false,
    }
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    
  },
  mounted() {
    // this.axios.get(`/project/${this.$props.id}`)
    // .then(({data: result}) => {
    //   this.loading = false;
    //   this.project = result.data;
    // })
    // .catch(e => {
    //   this.loading = false;
    //   this.notFound = true;
    // })
  }
}
</script>