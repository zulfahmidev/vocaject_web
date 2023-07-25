<template>
  <div class="container mx-auto my-4">
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-3 md:px-0">
      <div class="relative hidden lg:block">
        <Categories class="sticky top-16" />
      </div>
      <div class="col-span-2">
        <div class="my-16" v-if="loading">
          <Loading height="6" />
        </div>
        <img src="/ills/page_not_found.svg" alt="page not found" v-if="notFound && !loading" class="w-96 m-auto mt-16">
        <EditProfile :user="getUser" v-if="!loading" />
      </div>
      <div class="relative hidden lg:block">
        <MyProject class="sticky top-16" v-if="getLogged" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MyProject from '../components/MyProject.vue';
import EditProfile from '../components/profile/Edit.vue';
import Loading from '../components/Loading.vue';
import Categories from '../components/Categories.vue';
</script>

<script>
import {watchEffect} from 'vue';
export default {
  data() {
    return {
      loading: false,
      notFound: false,
    }
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    },
    getUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    
  },
  mounted() {
    watchEffect(() => {
      if (!this.$store.state.user) {
        this.$router.replace({name: 'Home'})
      }
    })
  }
}
</script>