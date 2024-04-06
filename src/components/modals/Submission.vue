<template>
  <div
    class="fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-20 backdrop-blur-sm flex items-center justify-center"
    v-if="isShow">
    <!-- small: w-1/3 | medium: 1/2 | large: 2/3 -->
    <div class="w-1/3 bg-white rounded overflow-hidden">

      <!-- Header -->
      <div class="border-b border-slate-300 px-5 py-3 flex justify-between items-center">
        <div class="text-lg">Daftar Pengajuan</div>

        <div
          class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
          @click="close">
          <i class="fa fa-times" style="margin-top: 2px;"></i>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5">
        <div class="border-b border-slate-3 flex">
          <div 
            :class="`py-2 px-3 text-primary capitalize ${tabSelected === i1 ? 'border-b' : ''} cursor-pointer border-primary w-fit`" 
            v-for="(status, i1) in userStatus"
            @click="tabSelected = i1"
            :key="i1">
            {{ userStatusId[i1] }}
          </div>
        </div>
        <div class="mt-3">

          <!-- Loading -->
          <div class="animate-pulse px-1 py-2" v-if="loading">
            <div class="grid grid-cols-3 gap-4 w-full">
              <div class="h-4 bg-slate-200 rounded"></div>
              <div class="h-4 bg-slate-200 rounded"></div>
              <div class="h-4 bg-slate-200 rounded"></div>
            </div>
            <div class="w-full h-4 bg-slate-200 rounded mt-2"></div>
            <div class="w-full h-4 bg-slate-200 rounded mt-2"></div>
            <div class="w-full h-4 bg-slate-200 rounded mt-2"></div>
          </div>

          <!-- Display Data -->
          <div
            v-if="!loading"
            v-for="(status, i1) in userStatus" 
            :key="i1">
            <table 
              class="table w-full" 
              v-if="i1 === tabSelected">
              <tr class="border-b border-slate-500 font-bold">
                <td class="py-2">Nim</td>
                <td class="py-2">Nama</td>
                <td class="py-2">Aksi</td>
              </tr>
              <tr v-if="getUsers(status).length == 0">
                <td colspan="3" class="text-center py-2 text-xs">Data kosong</td>
              </tr>
              <tr class="border-b border-slate-300" v-for="(user, i2) in getUsers(status)" :key="i2">
                <td class="py-2">{{ type == 'student' ? user.nim : user.nidn }}</td>
                <td class="py-2">{{ user.name }}</td>
                <td class="py-1 flex gap-2">
                  <button 
                    class="p-2 bg-green-300 text-xs rounded text-green-800"
                    v-if="tabSelected !== 1"
                    @click="setStatus(user.id, 1)">Terima</button>
                  <button 
                    class="p-2 bg-red-300 text-xs rounded text-red-800"
                    v-if="tabSelected !== 2"
                    @click="setStatus(user.id, 2)">Tolak</button>
                  <button 
                    class="p-2 bg-yellow-300 text-xs rounded text-yellow-800"
                    v-if="tabSelected !== 0"
                    @click="setStatus(user.id, 0)">Panding</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {watchEffect} from 'vue'
</script>

<script>
export default {
  props: {
    isShow: Boolean,
    type: String
  },
  data() {
    return {
      data: [],
      loading: false,
      userStatus: ['panding', 'accepted', 'rejected'],
      userStatusId: ['panding', 'diterima', 'ditolak'],
      tabSelected: 0,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getData() {
      this.loading = true
      let user = this.$store.state.user;
      this.axios.get(`/user/${this.type}/${user.id}`)
      .then(({data: res}) => {
        this.data = res.data;
        this.loading = false
      })
    },
    getUsers(status = 'panding') {
      return this.data.filter((v) => {
        return v.status == status
      })
    },
    setStatus(uid, si) {
      this.$swal.fire({
        title: "Tolong Konfirmasi",
        text: `Apakah anda yakin ingin mengubah status menjadi ${this.userStatusId[si]}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true
          let uin = null;
          this.data.forEach((v,i) => {
            if (v.id == uid) {
              uin = i;
              return true;
            }
          })
          this.axios.post(`/user/submission/set/${this.data[uin].id}/status/${this.userStatus[si]}`)
          .then(({data: res}) => {
            this.data[uin].status = this.userStatus[si]
            this.loading = false
          })
        }
      });
    }
  },
  mounted() {
    watchEffect(() => {
      if (this.isShow) {
        this.getData()
      }
    })
  }
}
</script>