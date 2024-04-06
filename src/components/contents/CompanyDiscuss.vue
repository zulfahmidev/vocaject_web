<template>
  <main class="col-span-3">
    <div class="bg-white rounded shadow">

      <!-- Header -->
      <div class="p-3 text-primary font-bold border-b">Diskusi Proyek</div>

      <!-- Contacct -->
      <div class="grid grid-cols-3">
        <div class="col-span-1 h-full overflow-y-auto">

          <!-- Search Project -->
          <div class="p-3">
            <input type="text" placeholder="Cari proyek..." v-model="search"
              class="border border-slate-300 rounded w-full px-3 py-2 outline-none text-sm">
          </div>

          <!-- Projects -->
          <div class="text-xs px-3 text-slate-500 font-bold">Semua proyek</div>

          <div class="py-2 px-3" v-for="(item, index) in displayProjects" :key="index">
            <div class="border-b border-slate-300 py-1 flex justify-between items-center cursor-pointer"
              @click="selectProject(item.id)">
              <span class="text-sm capitalize">{{ item.title }}</span>
              <i :class="`fa fa-fw fa-angle-${selected.project_id == item.id ? 'up' : 'down'} text-xs`"></i>
            </div>

            <!-- Contacts -->
            <div
              :class="`p-2 border-slate-200 my-1 rounded flex items-center gap-3 hover:bg-slate-100 cursor-pointer ${selectedContact == contact.id ? 'bg-slate-100' : ''}`"
              v-if="selected.project_id == item.id" v-for="(contact, index2) in selected.contacts" :key="index2"
              @click="selectedContact = contact.id">
              <div class="">
                <div class="w-10 h-10 bg-slate-300 rounded-full overflow-hidden">
                  <img :src="contact.picture" :alt="contact.name">
                </div>
              </div>
              <div class="w-full">
                <div class="capitalize">{{ contact.name }}</div>
                <div class="text-xs text-slate-500 capitalize">{{ contact.college.name }}</div>
              </div>
              <div class="text-end">
                <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">5
                </div>
              </div>
            </div>

            <!-- Loading Contact -->
            <div v-if="selected.project_id == item.id && loadingContact" class="px-2 rounded mt-2"
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

            <div v-if="selected.project_id == item.id && selected.contacts.length == 0"
              class="text-center text-xs py-2">Belum ada kontak masuk</div>
          </div>

          <div class="text-xs text-slate-400 px-3 mt-1" v-if="!loadingProject && displayProjects.length == 0">Belum ada pesan...</div>

          <!-- Loading Project -->
          <div v-if="loadingProject" class="px-2 rounded mt-2" v-for="(item, index) in 3" :key="index">
            <div class="animate-pulse flex space-x-4 px-1 py-2">
              <div class="grid grid-cols-4 gap-4 w-full">
                <div class="h-2 bg-slate-200 rounded col-span-3"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
            </div>
          </div>

        </div>

        <!-- Chat Room -->
        <ChatRoom v-if="selectedContact" :project_id="selected.project_id" :contact_id="selectedContact"
          :channel="channel" />
        <div class="col-span-2 border-l border-slate-300 h-full relative flex justify-center items-center"
          v-if="!selectedContact" style="height: 75vh">
          <span>Kontak belum dipilih</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup type="ts">
import ChatRoom from "../cards/ChatRoom.vue";

</script>

<script type="ts">
export default {
  data() {
    return {
      projects: [],
      search: '',
      selected: {
        project_id: null,
        contacts: [],
      },
      selectedContact: null,
      channel: null,
      loadingProject: false,
      loadingContact: false
    }
  },
  computed: {
    displayProjects() {
      return this.projects.filter((v) => {
        return (this.search.trim() > 0) ? v.title.includes(this.search) : true;
      })
    }
  },
  methods: {
    getProjects() {
      let id = this.$store.state.user.id;
      this.loadingProject = true;
      this.axios.get(`/project?company_id=${id}`)
        .then(({ data: result }) => {
          this.loadingProject = false;
          this.projects = result.data
        })
    },
    selectProject(project_id) {
      if (project_id != this.selected.project_id) {
        this.selected.project_id = project_id;
        this.selected.contacts = [];

        this.loadingContact = true
        this.axios.get(`/project/${project_id}/message/get/contact`)
          .then(({ data: result }) => {
            this.loadingContact = false
            this.selected.contacts = result.data
          })
      } else {
        this.selected.project_id = null;
        this.selected.contacts = [];
      }
    }
  },
  mounted() {
    this.getProjects()


    Pusher.logToConsole = true;

    this.pusher = new Pusher('4d394bf66f66eef330a9', {
      cluster: 'ap1'
    });

    this.channel = this.pusher.subscribe('project-message');

    this.channel.bind('new-message', ({ data }) => {
      if (data.project.id == this.project_id) {
        if (data.sender == 'lecture') {
          let includes = false;
          this.contacts.forEach(lecture => {
            if (lecture.id == data.lecture.id) {
              includes = true;
            }
          });
          if (!includes) {
            this.contacts.push(data.lecture);
          }
        }
      }
    });
  },
}
</script>