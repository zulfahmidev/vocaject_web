<template>
  <!-- Contacts -->
  <div class="">
    <div 
      class="py-2 px-3 border-b mx-3 cursor-pointer text-slate-500 hover:text-slate-800"
      @click="closeProject">
      <i class="fa fa-arrow-left fa-fw mr-2"></i> Kembali
    </div>
    <div
      :class="`p-2 border-slate-200 my-1 rounded flex items-center gap-3 hover:bg-slate-100 cursor-pointer ${selectedUser == user.id ? 'bg-slate-100' : ''}`"
      v-for="(user, index) in users" 
      :key="index"
      @click="selectUser(user.id)">
      <div class="">
        <div class="w-10 h-10 bg-slate-300 rounded-full overflow-hidden">
          <img :src="user.picture" :alt="user.name">
        </div>
      </div>
      <div class="w-full">
        <div class="capitalize">{{ user.name }}</div>
        <div class="text-xs text-slate-500 capitalize">{{ user.college.name }}</div>
      </div>
      <!-- <div class="text-end">
        <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5
        </div>
      </div> -->
    </div>
  
    <!-- Loading Contact -->
    <div v-if="loading" class="px-2 rounded mt-2"
      v-for="(item, index) in 3" :key="index">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  
    <div v-if="users.length == 0 && !loading"
      class="text-center text-xs py-2">
        Belum ada kontak masuk
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue';

</script>

<script>

export default {
  props: {
    project_id: Number,
    selectedUser: Number,
  },
  data() {
    return {
      users: [],
      loading: false
    }
  },
  methods: {
    selectUser(user_id) {
      this.$emit('onSelectUser', user_id)
    },
    getUsers() {
      this.users = [];

      this.loading = true
      this.axios.get(`/project/message/get/company/contact/${this.project_id}`)
        .then(({ data: result }) => {
          this.loading = false
          this.users = result.data
        })
    },
    closeProject() {
      this.$emit('onCloseProject')
    }
  },
  mounted() {
    watchEffect(() => {
      this.getUsers()
    })
  },
}
</script>