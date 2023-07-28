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
        Silahkan masukan email untuk reset password
      </div>
    </div>
    <div class="p-3 my-2 text-left text-xs bg-red-200 border rounded border-red-300 text-red-500" v-if="error">
      {{ error }}
    </div>
    <div class="text-left border-b">
      <div class="my-2">
        <input type="text" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="Kode OTP" v-model="form.code_otp" @keyup.enter="checkOTP" name="code_otp">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.code_otp" :key="i">{{ v }}</div>
      </div>
      <button class="py-2 px-3 my-2 bg-primary hover:bg-secondary w-full text-white rounded" @click="checkOTP">
        <div class="" v-if="!loading">Verfikasi</div>
        <Loading v-if="loading" height="6"  />
      </button>
      <router-link :to="{name: 'ForgotPassword'}" class="py-2 px-3 my-2 bg-slate-200 hover:bg-slate-300 w-full text-black rounded block text-center">
        Kembali
      </router-link>
    </div>
    <div class="my-2">
      Sudah punya akun?
      <router-link :to="{name: 'Login'}" class="text-sm text-primary hover:underline">Login!</router-link>
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
        code_otp: '',
      },
      errors: {
        code_otp: [],
      },
      error: '',
      loading: false,
    }
  },
  methods: {
    checkOTP() {
      this.loading = true;
      let email = history.state?.email;
      this.axios.post('/auth/check-otp', {
        code_otp: this.form.code_otp,
        email: email,
      })
      .then(() => {
        this.loading = false;
        this.$router.replace({name: 'ChangePassword', state: {
          email: email,
          code_otp: this.form.code_otp,
        }});
      })
      .catch(({response}) => {
        this.loading = false;
        this.error = response?.data?.message
        this.errors = {
          code_otp: [],
        }
        if (response?.status == 400) {
          for (const key in response?.data?.data) {
            const v = response?.data?.data[key];
            this.errors[key] = v;
          }
        }
      })
    }
  }
}
</script>