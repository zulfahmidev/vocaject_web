<template>
  <div class="bg-white shadow rounded p-3">
    <div @click="$router.go(-1)" class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 w-fit cursor-pointer">
      <i class="fa fa-arrow-left"></i>
      <div class="ml-4">Kembali</div>
    </div>
    <div class="p-3">
      <div class="block lg:flex justify-between">
        <div class="w-full">
          <div class="text-2xl font-black capitalize">{{ project?.title }}</div>
          <div class="text-lg text-primary capitalize">{{ project?.category?.name }}</div>
        </div>
        <div class="flex flex-col justify-center border-t mt-2 pt-2 lg:border-none lg:mt-0 lg:pt-2">
          <div class="font-black">Anggaran:</div>
          <div class="">{{ curFormat(project?.budget) }}</div>
        </div>
      </div>
      <div class="text-sm text-justify py-3 border-y my-2">{{ project?.description }}</div>
      <div class="flex">
        <router-link to="/" class="flex">
          <div class="w-24 mr-0 rounded overflow-hidden">
            <img :src="project?.company?.picture" :alt="project?.company?.name">
          </div>
          <div class="pl-4 flex flex-col justify-center">
            <div class="font-bold capitalize text-lg hover:underline cursor-pointer">{{ project?.company?.name }}</div>
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
      <div class="border-t my-2 pt-3" v-if="project?.company?.id == getUser()?.id">
        <div class="font-black text-center">Progress Kerja 50%</div>
        <div class="text-sm text-center text-slate-600">5 Task Selasai dari 10 Task</div>
        <div class="h-6 rounded-full w-full bg-slate-200 mt-2 p-1">
          <div class="h-4 rounded-full bg-primary" style="width: 50%;"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="project?.company?.id == getUser()?.id">
    <div class="flex py-3 gap-4">
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=0">
        <div class="text-3xl text-primary">
          <i class="fa fa-comment-dots"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Chat</div>
      </div>
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=1">
        <div class="text-3xl text-primary">
          <i class="fa fa-clipboard-list"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Todolist</div>
      </div>
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=2">
        <div class="text-3xl text-primary">
          <i class="fa fa-book"></i>
        </div>
        <div class="font-black text-xl hidden lg:block">Log Book</div>
      </div>
    </div>
    <ProjectChat v-if="tab==0" />
    <ProjectTodolist v-if="tab==1" />
    <ProjectLogbook v-if="tab==2" />
  </div>
</template>

<script setup>
import ProjectChat from '../../components/project/Chat.vue';
import ProjectTodolist from '../../components/project/Todolist.vue';
import ProjectLogbook from '../../components/project/Logbook.vue';
</script>

<script>
export default {
  props: {
    project: Object
  },
  data() {
    return {
      tab: 0,
      logbooks: [],
      student_selected_id: -1,
    }
  },
  methods: {
    curFormat(number) {
      let n = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      return n.format(number);
    },
    getUser() {
      return this.$store?.state?.user;
    }
  },
  mounted() {
    // let project_id = this.$route.params.id
    // this.axios.get(`/project/${project_id}`)
    // .then(({data: result}) => {
    //   this.project = result.data;
    // })
  },
}
</script>