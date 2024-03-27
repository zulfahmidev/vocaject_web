<template>
  <main class="col-span-3">
  
    <div class="text-center py-5" v-if="loading">
      <Loading height="6" />
    </div>
    
    <div class="grid grid-cols-3 gap-3" v-if="!loading">

      <!-- Detail Profile -->
      <div class="col-span-2">

        <div class="rounded bg-white shadow overflow-hidden">
          <div class="relative pt-10">
            <div class="absolute top-0 left-0 h-28 w-full bg-primary"></div>
            <div class="flex justify-between relative z-10 items-end">
              <div class="w-28 h-28 mx-5 rounded-full bg-slate-300 overflow-hidden">
                <img :src="user?.picture" :alt="user?.name">
              </div>
              <router-link :to="{name: 'setting-profile'}" class="w-8 h-8 rounded-full text-slate-500 hover:text-black active:bg-slate-200 flex items-center justify-center cursor-pointer m-1">
                <i class="fa fa-pencil"></i>
              </router-link>
            </div>
            <div class="px-5 py-3">
              <div class="text-3xl font-bold capitalize">{{ user?.name }}</div>
              <div class="">{{ user?.email }}</div>
            </div>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-2 gap-3" v-if="user?.role == 'college'">
          <div
            class="border border-primary rounded p-3 text-center text-primary hover:bg-light cursor-pointer"
            @click="showSubmissionModal('student')">
            Pengajuan Mahasiswa
          </div>
          <div
            class="border border-primary rounded p-3 text-center text-primary hover:bg-light cursor-pointer"
            @click="showSubmissionModal('lecture')">
            Pengajuan Dosen
          </div>
        </div>

        <div class="rounded bg-white shadow overflow-hidden mt-3 p-5">
          <div v-if="user?.role == 'student'">
            <div class="font-bold">NIM</div>
            <p>2020903430056</p>
            <hr class="my-3">
          </div>
          <div class=" font-bold">Telepon</div>
          <p>{{ user?.phone }}</p>
          <hr class="my-3">
          <div class=" font-bold">Alamat</div>
          <p class="capitalize">{{ user?.address }}</p>
          <hr class="my-3">
          <div class=" font-bold">Deskripsi</div>
          <p>{{ user?.description }}</p>
        </div>
      </div>

      <!-- Projects -->
      <ProjectListMin />
    </div>

    <!-- Modals -->
    <Submission :isShow="isShowSubmissionModal" :type="submissionType" @close="hideSubmissionModal" />
  </main>
</template>

<script setup lang="ts">
import ProjectListMin from '../base/ProjectListMin.vue';
import Loading from '../utils/Loading.vue';
import Submission from '../modals/Submission.vue';

</script>

<script lang="ts">
export default {
  data() {
    return {
      user: {},
      loading: false,
      isShowSubmissionModal: false,
      submissionType: '',
    }
  },
  methods: {
    showSubmissionModal(type) {
      this.isShowSubmissionModal = true;
      this.submissionType = type;
    },
    hideSubmissionModal() {
      this.isShowSubmissionModal = false;
      this.submissionType = '';
    }
  },
  mounted() {
    if (this.$store.state.user) {
      this.loading = false
      this.user = this.$store.state.user
    }else {
      this.loading = true
    }
  },
}
</script>