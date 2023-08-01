<template>
  <div class="bg-white shadow rounded p-3">
    <div class="flex justify-between items-center">
      <div @click="$router.go(-1)" class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 w-fit cursor-pointer">
        <i class="fa fa-arrow-left"></i>
        <div class="ml-4">Kembali</div>
      </div>
      <div class="flex gap-2" v-if="project?.company.id == getUser()?.id && !proposal">
        <router-link :to="{name: 'EditProject', params: {id: project?.id}}" class="w-8 h-8 flex text-slate-400 hover:text-slate-800 items-center justify-center rounded-full cursor-pointer hover:bg-slate-100">
          <i class="fa fa-edit"></i>
        </router-link>
        <div class="w-8 h-8 flex text-slate-400 hover:text-slate-800 items-center justify-center rounded-full cursor-pointer hover:bg-slate-100" @click="deleteProject">
          <i class="fa fa-trash"></i>
        </div>
      </div>
    </div>
    <div class="p-3">
      <div class="block lg:flex items-center justify-between">
        <div class="w-full">
          <div class="text-2xl font-black capitalize">{{ project?.title }}</div>
          <div class="text-lg text-primary capitalize">{{ project?.category?.name }}</div>
        </div>
        <div class="flex flex-col justify-center">
          <div class="flex gap-2 py-2 lg:py-1 border-t lg:border-none">
            <div class="text-xs text-slate-500">
              <i class="fa fa-tags"></i> 
              <!-- <div class="text-xs ">Anggaran:</div> -->
            </div>
            <div class="text-xs">{{ curFormat(project?.budget) }}</div>
          </div>

          <div class="flex gap-2 py-2 lg:py-1 border-t lg:border-none">
            <div class="text-xs text-slate-500">
              <i class="far fa-calendar"></i>
              <!-- <div class="">Deadline:</div> -->
            </div>
            <div class="text-xs capitalize">{{ getDate(project?.deadline_at) }}</div>
          </div>

          <div class="flex gap-2 py-2 lg:py-1 border-t lg:border-none">
            <div class="text-xs text-slate-500">
              <i class="far fa-clock"></i>
              <!-- <div class="">Deadline:</div> -->
            </div>
            <div class="text-xs capitalize">{{ getDate(project?.expired_at) }}</div>
          </div>
        </div>
      </div>
      <div class="text-sm text-justify py-3 border-y my-2">{{ project?.description }}</div>
      <div class="flex">
        <router-link :to="{name: 'Profile', params: {id: project?.company.id}}" class="flex hover:underline">
          <div class="w-24 mr-0 rounded overflow-hidden">
            <img :src="project?.company?.picture" :alt="project?.company?.name">
          </div>
          <div class="pl-4 flex flex-col justify-center">
            <div class="font-bold capitalize text-lg cursor-pointer">
              {{ project?.company?.name }}
            </div>
            <div class="text-primary capitalize">{{ project?.company?.address }}</div>
            <div class="text-xs text-slate-400 flex items-center">
              <div class="mr-1">
                <i class="fa fa-envelope"></i>
              </div>
              {{  project?.company?.email  }}
            </div>
          </div>
        </router-link>
      </div>
      <div class="border-t my-2 pt-3" v-if="showProgress()">
        <div class="font-black text-center">Progress Kerja {{getProgress}}%</div>
        <div class="text-sm text-center text-slate-600">{{ checked_task }} Task Selasai dari {{ total_task }} Task</div>
        <div class="h-6 rounded-full w-full bg-slate-200 mt-2 p-1">
          <div class="h-4 rounded-full bg-primary" :style="`width: ${getProgress}%;`"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="project?.company.id == getUser()?.id && !proposal" class="lg:hidden">
    <div class="flex py-3 gap-4">
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=0">
        <div class="text-3xl text-primary">
          <i class="fa fa-file"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Proposal</div>
      </div>
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=1">
        <div class="text-3xl text-primary">
          <i class="fa fa-comment-dots"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Konsultasi</div>
      </div>
    </div>
    <div class="py-3" v-if="proposal == null && tab==0">
      
      <ProjectProposals @proposal_confirmed="loadProposal" :project="project" />
    </div>
    <ProjectChat class="lg:hidden" :project_id="project.id" v-if="tab==1" />
  </div>
  
  <div class="py-3 hidden lg:block" v-if="project?.company.id == getUser()?.id && proposal == null && tab==0">
    <ProjectProposals @proposal_confirmed="loadProposal" :project="project" />
  </div>
  <div v-if="showProgress()">
    <div class="flex py-3 gap-4">
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=0">
        <div class="text-3xl text-primary">
          <i class="fa fa-clipboard-list"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Target Proyek</div>
      </div>
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=1">
        <div class="text-3xl text-primary">
          <i class="fa fa-book"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Logbook Mahasiswa</div>
      </div>
      <div class="bg-white lg:hidden p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=2">
        <div class="text-3xl text-primary">
          <i class="fa fa-comment-dots"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Konsultasi Proyek</div>
      </div>
    </div>
    <ProjectTodolist @update_progress="updateProgress" :project_id="project?.id" v-if="tab==0" />
    <ProjectLogbook v-if="tab==1" :proposal="proposal" />
    <ProjectChat class="lg:hidden" :project_id="project.id" v-if="project?.company?.id == getUser()?.id && tab==2" />
  </div>
</template>

<script setup>
import ProjectChat from '../../components/project/Chat.vue';
import ProjectTodolist from '../../components/project/Todolist.vue';
import ProjectLogbook from '../../components/project/Logbook.vue';
import ProjectProposals from '../../components/project/Proposals.vue';
import { watchEffect } from 'vue';
</script>

<script>
import { watchEffect } from 'vue';

export default {
  props: {
    project: Object
  },
  data() {
    return {
      tab: 0,
      logbooks: [],
      student_selected_id: -1,
      checked_task: 0,
      total_task: 0,
      proposal: null,
    }
  },
  computed: {
    getProgress() {
      if (this.total_task > 0) {
        return Math.ceil((100/this.total_task)*this.checked_task);
      }
      return 0;
    },
  },
  methods: {
    curFormat(number) {
      let n = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      return n.format(number);
    },
    getDate(submited_at) {
      let date = new Date(submited_at);
      let months = ['jan', 'feb', 'mar', 'apr', 'mei', "jun", 'jul', 'sept', 'okt', 'nov', 'des'];
      console.log(submited_at);
      return `${date.getDate()} ${months[date.getMonth() - 1]} ${date.getFullYear()}`;
    },
    getUser() {
      return this.$store?.state?.user;
    },
    deleteProject() {
      Swal.fire({
        icon: 'warning',
        title: 'Anda yakin?',
        text: 'Anda tidak dapat mengembalikannya!',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        confirmButtonColor: '#20889C',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(`/project/${this.project?.id}`)
          .then(({data: result}) => {
            Swal.fire({
              title: 'Berhasil!',
              text: 'Anda berhasil menghapus proyek ini.',
              icon: 'success',
              confirmButtonColor: '#20889C',
            }).then(() => {
              this.$router.replace({name: 'Home'});
            })
          })
          .catch(() => {
            Swal.fire(
              'Gagal!',
              'Suatu masalah sudah terjadi.',
              'error'
            )
          })
        }
      })
    },
    updateProgress() {
      this.axios.get(`project/${this.$props.project.id}/task`)
      .then(({data: result}) => {
        let checked = 0;
        result.data.forEach((v) => {
          if (v.checked) checked++;
        })
        this.total_task = result.data.length;
        this.checked_task = checked;
      })
    },
    showProgress() {
      return (this.proposal != null) && this.getUser()?.id == this.project?.company?.id;
    },
    loadProposal() {
      this.axios.get(`/project/${this.$props.project.id}/proposal_accepted`)
      .then(({data: result}) => {
        this.proposal = result.data;
        this.updateProgress();
      })
    }
  },
  mounted() {
    watchEffect(() => {
      this.loadProposal();
    })
  },
}
</script>