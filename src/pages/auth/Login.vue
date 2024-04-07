<template>
  <div>
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
      <div class="my-2 relative">
        <input type="password" v-model="form.password" @keyup.enter="login" class="py-2 outline-none pl-3 pr-11 border-2 w-full rounded focus:border-primary" placeholder="password" name="password" ref="password">
        <div class="absolute top-3 right-4 cursor-pointer text-slate-400 hover:text-slate-600" @click="switchHidePassword">
          <div v-if="hidePassword"><i class="fa fa-eye"></i></div>
          <div v-if="!hidePassword"><i class="fa fa-eye-slash"></i></div>
        </div>
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.password" :key="i">{{ v }}</div>
      </div>
      <router-link :to="{name: 'forgot-password'}" class="text-sm hover:underline">
        Lupa password?
      </router-link>
      <button class="py-2 px-3 my-2 bg-primary hover:bg-secondary w-full text-white rounded" @click="login">
        <div class="" v-if="!loading">Login</div>
        <Loading v-if="loading" height="6"  />
      </button>
    </div>
    <div class="my-2">
      Belum punya akun?
      <router-link :to="{name:'role'}" class="text-sm text-primary hover:underline">Register!</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../../components/utils/Loading.vue';

</script>

<script lang="ts">

export default {
  data() {
    return {
      hidePassword: true,
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
    switchHidePassword() {
      if (this.hidePassword) {
        this.$refs.password.type = 'text';
        this.hidePassword = false;
      }else {
        this.$refs.password.type = 'password';
        this.hidePassword = true;
      }
    },
    login() {
      this.loading = true;
      this.axios.post('/auth/login', {
        email: this.form.email,
        password: this.form.password,
      })
      .then(({data: result}) => {
        const d = new Date();
        d.setTime(d.getTime() + (356*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = 'access_token' + "=" + result.data.access_token + ";" + expires + ";path=/";

        this.$store.commit('setLogged', result.data.user)
        this.loading = false;
        this.$router.replace({name: 'profile'})

        window.location.reload()
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
}
</script>