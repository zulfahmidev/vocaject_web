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
        <CompanyProfile :user="user" v-if="!loading && user?.role == 'company'" />
        <CollegeProfile :user="user" v-if="!loading && user?.role == 'college'" />
        <StudentProfile :user="user" v-if="!loading && user?.role == 'student'" />
        <LectureProfile :user="user" v-if="!loading && user?.role == 'lecture'" />
      </div>
      <div class="relative hidden lg:block">
        <MyProject class="sticky top-16" v-if="getLogged" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MyProject from '../components/MyProject.vue';
import CompanyProfile from '../components/profile/Company.vue';
import CollegeProfile from '../components/profile/College.vue';
import StudentProfile from '../components/profile/Student.vue';
import LectureProfile from '../components/profile/Lecture.vue';
import Loading from '../components/Loading.vue';
import Categories from '../components/Categories.vue';
</script>

<script>
import {watchEffect} from 'vue';
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      loading: false,
      notFound: false,
      user: {},
    }
  },
  computed: {
    getLogged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    loadProfile() {
      this.loading = true;
      let id = this.$route.params?.id;
      this.axios.get(`/user/${id}`)
      .then(({data: result}) => {
        this.loading = false;
        this.user = result.data;
      })
      .catch(() => {
        this.notFound = true;
      })
    },
  },
  mounted() {
    watchEffect(() => {
      this.loadProfile()
    })
  }
}
</script>