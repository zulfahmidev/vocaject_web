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
      <div class="my-2" v-if="role == 'student'">
        <input type="text" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="nim" v-model="form.nim" name="nim">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.nim" :key="i">{{v}}</div>
      </div>
      <div class="my-2" v-if="role == 'lecture'">
        <input type="text" class="py-2 outline-none px-3 border-2 w-full rounded focus:border-primary" placeholder="nidn" v-model="form.nidn" name="nidn">
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.nidn" :key="i">{{v}}</div>
      </div>
      <div class="my-2" v-if="['college', 'company'].includes(role)">
        <textarea v-model="form.description" class="py-2 h-fit outline-none px-3 border-2 w-full rounded focus:border-primary mt-1 resize-none" oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px'" placeholder="deskripsi" name="description"></textarea>
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.description" :key="i">{{v}}</div>
      </div>
      <div class="my-2 relative" v-if="['student', 'lecture'].includes(role)">
        <select name="college_id" class="py-2 outline-none px-3 border-2 w-full bg-white rounded focus:border-primary" v-model="form.college_id">
          <option value="">Pilih kampus</option>
          <option v-for="(college, index) in colleges" :key="index" :value="college.id">{{ college.name }}</option>
        </select>
        <div class="mt-1 text-xs text-red-400" v-for="(v, i) in errors.college_id" :key="i">{{v}}</div>
        <!-- <div class="flex justify-between py-2 px-3 rounded border-2 cursor-pointer items-center" @click="selectCampuss.open = !selectCampuss.open">
          <div class="">Pilih Kampus</div>
          <i :class="`fa fa-angle-${selectCampuss.open ? 'up' : 'down'}`"></i>
        </div>
        <div class="absolute top-12 w-full rounded bg-white shadow border">
          <div class="p-2">
            <input type="text" class="py-2 px-3 w-full outline-none focus:border-primary border-2 rounded" placeholder="Nama kampus..." v-model="selectCampuss.key" @input="searchCampuss">
          </div>
          <div class="py-2 mb-2 px-3 bg-slate-50 hover:bg-slate-100 cursor-pointer" v-for="(campuss, index) in selectCampuss.campuss" :key="index">{{ campuss.name }}</div>
          <div class="py-2 mb-2 px-3 text-xs bg-slate-50" v-if="selectCampuss.campuss.length == 0">Kampus tidak ditemukan</div>
        </div> -->
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
      role: null,
      loading: false,
      hidePassword: false,
      colleges: [],
      // selectCampuss: {
      //   open: false,
      //   key: '',
      //   campuss: []
      // },
      form: {
        name: '',
        description: '',
        uang: 1000,
        address: '',
        phone: '',
        email: '',
        nim: '',
        nidn: '',
        college_id: '',
        password: '',
        confirm_password: '',
      },
      errors: {
        name: [],
        description: [],
        address: [],
        phone: [],
        email: [],
        nim: [],
        nidn: [],
        college_id: [],
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
    getColleges() {
      this.axios.get('user/r/college')
      .then(({data: res}) => {
        this.colleges = res.data;
      })
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
        nim: [],
        nidn: [],
        college_id: [],
        password: [],
        confirm_password: [],
      }
      this.error = '';
      this.axios.post(`/auth/register/${this.role}`, {
        name: this.form.name,
        description: this.form.description,
        address: this.form.address,
        phone: this.form.phone,
        email: this.form.email,
        nim: this.form.nim,
        nidn: this.form.nidn,
        college_id: this.form.college_id,
        password: this.form.password,
        role: history.state.role
      })
      .then(({data: result}) => {
        this.loading = false;
        this.$router.replace({name: 'done', state: {success: true}});
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
    if (!history.state) {
      this.$router.replace({name: 'role'});
    }
    this.role = history.state.role
    this.getColleges()
  }
}
</script>