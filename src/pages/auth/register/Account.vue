<template>
  <div>
    <div class="my-3">
      <div class="text-xl">
        Selamat datang di <b>Vocaject!</b>
      </div>
      <div class="text-sm text-gray-400">
        Silahkan masukan data diri anda
      </div>
    </div>
    <div class="p-3 my-2 text-left text-xs bg-red-200 border rounded border-red-300 text-red-500" v-if="error">
      {{ error }}
    </div>
    <div class="text-left border-b">
      <div class="my-2">
        <input type="text" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="nama" v-model="form.name" name="name">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.name" :key="i">{{v}}</div>
      </div>
      <div class="my-2">
        <textarea v-model="form.description" class="py-2 h-fit outline-none px-3 border-2 w-full rounded focus:border-primary mt-1 resize-none" oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px'" placeholder="deskripsi" name="description"></textarea>
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.description" :key="i">{{v}}</div>
      </div>
      <div class="my-2">
        <input type="text" v-model="form.address" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="alamat" name="address">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.address" :key="i">{{v}}</div>
      </div>
      <div class="my-2">
        <input type="text" v-model="form.phone" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="Nomor HP" name="phone">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.phone" :key="i">{{v}}</div>
      </div>
      <div class="border-b my-2"></div>
      <div class="my-2">
        <input type="email" v-model="form.email" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="email" name="email">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.email" :key="i">{{v}}</div>
      </div>
      <div class="my-2">
        <input type="password" v-model="form.password" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="password" name="password" ref="password">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.password" :key="i">{{v}}</div>
      </div>
      <div class="my-2">
        <input type="password" v-model="form.confirm_password" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="konfirmasi password" name="confirm_password" ref="confirm_password">
        <div class="mt-1 text-xs text-red-400" v-if="!confirmPassword">Password tidak sesuai.</div>
      </div>
      <div class="mb-2 text-sm flex items-center gap-2">
        <input type="checkbox" v-model="hidePassword" @change="switchHidePassword"> Tampilkan Password
      </div>
      <button class="py-2 outline-none px-3 block text-center bg-primary hover:bg-secondary w-full text-white rounded" @click="register" :class="{'bg-slate-300 cursor-default hover:bg-slate-300': !confirmPassword || form.confirm_password == ''}">
        <div v-if="!loading">Daftar</div>
        <Loading height="6" v-if="loading" />
      </button>
    </div>
    <div class="my-2">
      Sudah punya akun?
      <router-link :to="{name: 'login'}" class="text-sm text-primary hover:underline">Login!</router-link>
    </div>
  </div>
</template>

<script setup>
import Loading from '../../../components/utils/Loading.vue';
</script>

<script>
export default {
  data() {
    return {
      loading: false,
      hidePassword: false,
      form: {
        name: '',
        description: '',
        uang: 1000,
        address: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      errors: {
        name: [],
        description: [],
        address: [],
        phone: [],
        email: [],
        password: [],
        confirm_password: [],
      },
      error: '',
    }
  },
  computed: {
    confirmPassword() {
      return this.form.password == this.form.confirm_password;
    },
  },
  methods: {
    autoGrow(event) {
      event.style.height = '5px'; event.style.height = (event.scrollHeight) + "px";
    },
    switchHidePassword() {
      if (this.hidePassword) {
        this.$refs.password.type = 'text';
        this.$refs.confirm_password.type = 'text';
      }else {
        this.$refs.password.type = 'password';
        this.$refs.confirm_password.type = 'password';
      }
    },
    register() {
      if (!this.confirmPassword || this.form.confirm_password == '') {
        return false;
      }
      this.loading = true;
      this.errors = {
        name: [],
        description: [],
        address: [],
        phone: [],
        email: [],
        password: [],
        confirm_password: [],
      }
      this.error = '';
      this.axios.post(`/auth/register/${history.state.role}`, {
        name: this.form.name,
        description: this.form.description,
        address: this.form.address,
        phone: this.form.phone,
        email: this.form.email,
        password: this.form.password,
        role: history.state.role
      })
      .then(({data: result}) => {
        this.loading = false;
        this.$router.replace({name: 'Done', state: {success: true}});
      })
      .catch((err) => {
        console.log(err)
        let response = err?.response
        this.loading = false;
        this.error = response?.data?.message
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
    if (!['company', 'college'].includes(history.state.role)) {
        this.$router.replace({name: 'Role'});
    }
  }
}
</script>