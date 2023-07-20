<template>
  <div class="w-full p-10 bg-white m-auto mt-16 rounded shadow text-center" style="max-width: 26rem;">
    <div class="w-28 h-28 rounded-full bg-slate-100 m-auto flex items-center justify-center">
      <img src="/logo.png" alt="logo" class="h-16 m-auto">
    </div>
    <div class="my-3">
      <div class="text-xl">
        Selamat datang kembali!
      </div>
      <div class="text-sm text-gray-400">
        Silahkan masuk ke akun anda
      </div>
    </div>
    <div class="p-3 my-2 text-left text-xs bg-red-200 border rounded border-red-300 text-red-500" v-if="error">
      {{ error }}
    </div>
    <div class="text-left border-b">
      <div class="my-2">
        <input type="email" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="email" v-model="form.email" @keyup.enter="login" name="email">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.email" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <input type="password" v-model="form.password" @keyup.enter="login" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="password" name="password">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.password" :key="i">{{ v }}</div>
      </div>
      <router-link to="/" class="text-sm hover:underline">
        Lupa password?
      </router-link>
      <button class="py-2 px-3 my-2 bg-primary hover:bg-secondary w-full text-white rounded" @click="login">
        <div class="" v-if="!loading">Login</div>
        <Loading v-if="loading" height="6"  />
      </button>
    </div>
    <div class="my-2">
      Belum punya akun?
      <router-link :to="{name:'Role'}" class="text-sm text-primary hover:underline">Register!</router-link>
    </div>
  </div>
</template>

<script setup>
import Loading from '../../components/Loading.vue';
</script>

<script>

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {
        email: [],
        password: [],
      },
      error: '',
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.axios.post('/auth/login', {
        email: this.form.email,
        password: this.form.password,
      })
      .then(({data: result}) => {
        sessionStorage.setItem('access_token', result.data.access_token)
        this.$store.commit('setLogged', result.data.user)
        this.loading = false;
        this.$router.replace({name: 'Home'});
      })
      .catch(({response}) => {
        this.loading = false;
        this.error = response?.data?.message
        this.errors = {
          email: [],
          password: [],
        }
        if (response?.status == 400) {
          for (const key in response?.data?.data) {
            const v = response?.data?.data[key];
            this.errors[key] = v;
          }
        }
      })
    }
  },
  mounted() {
    if (this.$store.state.logged) {
      this.$router.replace({name: 'Home'});
    }
  }
}
</script>