<template>
  <div class="bg-slate-50 text-slate-900">
    <Navbar />
    <section class="container mx-auto lg:grid lg:grid-cols-4 gap-4">
      <Sidebar />
      <div class="lg:col-span-3 px-5" style="height: 86vh;margin-top: 4vh;">
        <router-view name="content"></router-view>
      </div>
    </section>
  </div>
</template>

<script setup>
import Navbar from '../components/base/Navbar.vue';
import Sidebar from '../components/base/Sidebar.vue';

</script>

<script>
export default {
  methods: {
    checkLogged() {
      let access_token = this.getCookie('access_token');
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
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  },
  mounted() {
    this.checkLogged()
  },
}
</script>