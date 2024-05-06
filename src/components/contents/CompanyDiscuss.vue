<template>
  <main class="col-span-3">
    <div class="bg-white rounded shadow">

      <!-- Header -->
      <div class="p-3 text-primary font-bold border-b">Diskusi Proyek</div>

      <div class="grid grid-cols-3">
        <ChatProjects v-if="openProject == null" @onSelectProject="selectProject" :selectedProject="selectedProject" />
        <ChatUsers 
          v-if="openProject !== null" 
          @onSelectUser="selectUser" 
          :project_id="openProject" 
          :selectedUser="selectedUser"
          @onCloseProject="openProject = null" />

        <!-- Chat Room -->
        <ChatRoom v-if="selectedUser != null" :project_id="selectedProject" :contact_id="selectedUser"
          :channel="channel" />
        <div class="col-span-2 border-l border-slate-300 h-full relative flex justify-center items-center"
          v-if="!selectedUser" style="height: 75vh">
          <span>Kontak belum dipilih</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import ChatRoom from "../cards/chat/Room.vue";
import ChatProjects from "../cards/chat/Projects.vue";
import ChatUsers from "../cards/chat/Users.vue";

</script>

<script>
export default {
  props: {
    project_id: Number
  },
  data() {
    return {
      selectedProject: null,
      selectedUser: null,
      openProject: null,
      channel: null,
    }
  },
  methods: {
    selectProject(project_id) {
      if (this.$store.state.user.role == 'lecture') {
        this.selectedProject = project_id
        this.selectedUser = this.$store.state.user.id
      }else {
        this.openProject = project_id
      }
    },
    selectUser(user_id) {
      this.selectedProject = this.openProject
      this.selectedUser = user_id
    }
  },
  mounted() {
    let query = this.$route.query;
    if (query.project_id) {
      this.selectProject(query.project_id)
    }

    if (this.project_id) {
      this.openProject = this.project_id
    }

    Pusher.logToConsole = true;

    this.pusher = new Pusher('a61d757d1eba3baeb993', {
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