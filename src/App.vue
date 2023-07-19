<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>

import Navbar from './components/Navbar.vue';

</script>

<script>
export default {
  methods: {
    checkLogged() {
      let access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        this.axios.get('/auth/me')
        .then(({data: result}) => {
          this.$store.commit('setLogged', result.data);
        })
        .catch(() => {
          this.$store.commit('setLogout');
        })

      }else {
        this.$store.commit('setLogout');
      }
    }
  },
  mounted() {
    this.checkLogged()
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: Poppins;
}
</style>