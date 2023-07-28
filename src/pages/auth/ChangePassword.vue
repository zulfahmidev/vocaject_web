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
        <input type="password" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="Password" v-model="form.password" @keyup.enter="changePassword" name="password">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.password" :key="i">{{ v }}</div>
      </div>
      <div class="my-2">
        <input type="password" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="Konfirmasi Password" v-model="form.confirm_password" @keyup.enter="changePassword" name="confirm_password">
        <div class="text-red-900 text-xs my-1" v-for="(v, i) in errors.confirm_password" :key="i">{{ v }}</div>
      </div>
      <button class="py-2 px-3 my-2 bg-primary hover:bg-secondary w-full text-white rounded" @click="changePassword">
        <div class="" v-if="!loading">Simpan Perubahan</div>
        <Loading v-if="loading" height="6"  />
      </button>
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
        password: '',
        change_password: '',
      },
      errors: {
        password: [],
        change_password: [],
      },
      error: '',
      loading: false,
    }
  },
  methods: {
    changePassword() {
      this.loading = true;
      let email = history.state?.email;
      let code_otp = history.state?.code_otp;
      console.log(history.state)
      this.axios.post('/auth/change-password', {
        code_otp: code_otp,
        email: email,
        ...this.form
      })
      .then(() => {
        this.loading = false;
        Swal.fire({
          title: 'Berhasil!',
          text: 'Password berhasil di atur ulang.',
          icon: 'success',
          confirmButtonColor: '#20889C',
        }).then(() => {
          this.$router.replace({name: 'Login'})
        })
      })
      .catch(({response}) => {
        this.loading = false;
        this.error = response?.data?.message
        this.errors = {
          password: [],
          change_password: [],
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