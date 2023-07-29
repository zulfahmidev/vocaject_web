<template>
  <div class="rounded bg-white shadow px-5 py-2">
    <div @click="$router.go(-1)" class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 w-fit cursor-pointer">
      <i class="fa fa-arrow-left"></i>
      <div class="ml-4">Kembali</div>
    </div>
    <div class="w-36 h-36 bg-slate-100 rounded m-auto mt-5 overflow-hidden relative cursor-pointer border">
      <img :src="form.picture" :alt="form.name" ref="picture" class="w-full">
      <div class="absolute left-0 top-0 w-full h-full bg-black/25 items-center flex justify-center text-white text-2xl" @click="$refs.upload_picture.click()">
        <i class="fa fa-edit"></i>
      </div>
      <input type="file" ref="upload_picture" class="hidden" @change="selectPicture">
    </div>
    <div class="text-xs text-red-600 text-center mt-1" v-for="(v, i) in errors.picture" :key="i">{{v}}</div>
    <div class="m-auto mt-3 text-center max-w-md">
      <input type="text" class="py-2 px-3 border rounded w-full outline-none focus:border-primary" placeholder="Nama" v-model="form.name">
      <div class="text-xs text-red-600 text-left mt-1" v-for="(v, i) in errors.name" :key="i">{{v}}</div>
    </div>
    <div class="m-auto mt-3 text-center max-w-md">
      <textarea class="py-2 h-fit outline-none px-3 border-2 w-full rounded focus:border-primary mt-1 resize-none" oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px'" placeholder="deskripsi" name="description" v-model="form.description"></textarea>
      <div class="text-xs text-red-600 text-left mt-1" v-for="(v, i) in errors.description" :key="i">{{v}}</div>
    </div>
    <div class="m-auto mt-3 text-center max-w-md">
      <input type="text" class="py-2 px-3 border rounded w-full outline-none focus:border-primary" placeholder="Alamat" v-model="form.address">
      <div class="text-xs text-red-600 text-left mt-1" v-for="(v, i) in errors.address" :key="i">{{v}}</div>
    </div>
    <div class="m-auto mt-3 text-center max-w-md">
      <input type="text" class="py-2 px-3 border rounded w-full outline-none focus:border-primary" placeholder="Telepon" v-model="form.phone">
      <div class="text-xs text-red-600 text-left mt-1" v-for="(v, i) in errors.phone" :key="i">{{v}}</div>
    </div>
    <div class="m-auto mt-3 mb-5 text-center max-w-md">
      <button class="w-full px-3 py-2 bg-primary hover:bg-secondary rounded text-white" @click="saveChange">
        <div v-if="!loading">Simpan</div>
        <Loading height="6" v-if="loading" />
      </button>
    </div>
  </div>
  <div class="fixed left-0 top-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm flex items-center justify-center" v-if="crop">
    <div class="w-96 h-96">
      <cropper
        :src="cropingUrl"
        :stencil-props="{
          aspectRatio: 1/1,
        }"
        :default-size="{
          width: 400,
          height: 400
        }"
        @change="change"
      />
      <div class="flex gap-2 justify-center">
        <button class="py-2 px-3 bg-primary hover:bg-secondary text-white rounded mt-2 shadow" @click="cropImage">
          <i class="fa fa-crop mr-2"></i> Pangkas
        </button>
        <button class="py-2 px-3 bg-gray-500 hover:bg-gray-600 text-white flex items-center rounded mt-2 shadow" @click="crop = false">
          <i class="fa fa-times mr-2"></i> Batalkan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '../../components/Loading.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
</script>

<script>
import { watchEffect } from 'vue';

export default {
  props: {
    user: Object
  },
  data() {
    return {
      canvas: null,
      cropingUrl: '',
      crop: false,
      loading: false,
      file: null,
      form: {
        picture: '',
        name: '',
        description: '',
        address: '',
        phone: '',
      },
      errors: {
        picture: [],
        name: [],
        description: [],
        address: [],
        phone: [],
      }
    }
  },
  methods: {
    saveChange() {
      this.loading = true;
      const formData = new FormData();
      if (this.file) {
        formData.append('picture', this.file, 'filename.png');
      }
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      formData.append('address', this.form.address);
      formData.append('phone', this.form.phone);

      // Post via axios or other transport method
      this.axios.post('/user/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      })
      .then(({data: result}) => {
        this.loading = false;
        Swal.fire({
          title: 'Berhasil!',
          text: 'Perubahan berhasil disimpan.',
          icon: 'success',
          confirmButtonColor: '#20889C',
        }).then(() => {
          this.initUser(result.data);
          this.$store.commit('updateUser', result.data);
        })
      })
      .catch(({response}) => {
        this.loading = false;
        this.error = response?.data?.message
        this.errors = {
          picture: [],
          name: [],
          description: [],
          address: [],
          phone: [],
        }
        if (response?.status == 400) {
          for (const key in response?.data?.data) {
            const v = response?.data?.data[key];
            this.errors[key] = v;
          }
        }
        // Swal.fire({
        //   title: 'Gagal!',
        //   text: 'Terdapat kesalah.',
        //   icon: 'error',
        //   confirmButtonColor: '#20889C',
        // })
        // console.dir(e)
      })
    },
    initUser(data = null) {
      let user = (data) ? data : this.user;
      this.form.picture = user?.picture;
      this.form.name = user?.name;
      this.form.address = user?.address;
      this.form.description = user?.description;
      this.form.phone = user?.phone;
    },
    selectPicture() {
      let file = this.$refs.upload_picture.files[0];
      this.cropingUrl = URL.createObjectURL(file);
      this.crop = true;
    },
    change({ canvas }) {
      this.canvas = canvas;
    },
    cropImage(){
      this.form.picture = this.canvas.toDataURL();
      this.canvas.toBlob((blob) => {
        this.file = blob;
      });
      this.crop = false;
		},
  },
  mounted() {
    watchEffect(() => {
      this.initUser();
    })
  },
}
</script>