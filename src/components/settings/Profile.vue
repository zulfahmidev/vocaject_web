<template>
  <div>
    <div class="bg-white shadow reounded">
      <div class="py-3 px-5 text-lg border-b border-slate-300 font-bold">
        Profil
      </div>
      <div class="py-3 px-5">
        <div class="mb-3">
          <div class="w-36 h-36 bg-slate-100 rounded m-auto mt-5 overflow-hidden relative cursor-pointer border">
            <img :src="form.picture" :alt="form.name" ref="picture" class="w-full">
            <div
              class="absolute left-0 top-0 w-full h-full bg-black/25 items-center flex justify-center text-white text-2xl"
              @click="$refs.upload_picture.click()">
              <i class="fa fa-edit"></i>
            </div>
            <input type="file" ref="upload_picture" class="hidden" @change="selectPicture">
          </div>
        </div>
        <div class="mb-3">
          <div class="">Nama</div>
          <input type="text" v-model="form.name" placeholder="nama..."
            class="py-3 px-4 border rounded outline-none w-full">
        </div>
        <div class="mb-3">
          <div class="">No Telepon</div>
          <input type="text" v-model="form.phone" placeholder="no telepon..."
            class="py-3 px-4 border rounded outline-none w-full">
        </div>
        <div class="mb-3">
          <div class="">Alamat</div>
          <input type="text" v-model="form.address" placeholder="alamat..."
            class="py-3 px-4 border rounded outline-none w-full">
        </div>
        <div class="mb-3">
          <button class="bg-primary w-full rounded text-white py-3" @click="saveChange">
            <Loading height="6" v-if="loading" />
            <span v-if="!loading">Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </div>

    <div class="fixed left-0 top-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm flex items-center justify-center"
      v-if="crop">
      <div class="w-96 h-96">
        <cropper :src="cropingUrl" :stencil-props="{
                aspectRatio: 1 / 1,
              }" :default-size="{
                width: 400,
                height: 400
              }" @change="change" />
        <div class="flex gap-2 justify-center">
          <button class="py-2 px-3 bg-primary hover:bg-secondary text-white rounded mt-2 shadow" @click="cropImage">
            <i class="fa fa-crop mr-2"></i> Pangkas
          </button>
          <button class="py-2 px-3 bg-gray-500 hover:bg-gray-600 text-white flex items-center rounded mt-2 shadow"
            @click="crop = false">
            <i class="fa fa-times mr-2"></i> Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '../utils/Loading.vue';
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
        this.$swal.fire({
          title: 'Berhasil!',
          text: 'Perubahan berhasil disimpan.',
          icon: 'success',
          confirmButtonColor: '#20889C',
        }).then(() => {
          this.$store.commit('updateUser', result.data);
          this.initUser(result.data);
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
      this.initUser(this.$store.state.user);
    })
  },
}
</script>