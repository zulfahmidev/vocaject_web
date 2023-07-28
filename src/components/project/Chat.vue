<template>
  <div class="p-3 bg-white rounded shadow">

    <div class="" v-if="lecture_id == null">
      <div class="text-primary font-bold border-b pb-2">
        Daftar Pesan
      </div>
      <div class="text-sm text-slate-400 text-center py-4" v-if="contacts.length == 0">
        Belum ada pesan.
      </div>
      <div class="border rounded my-2 p-2 flex gap-3 items-center hover-comp cursor-pointer border-slate-200" v-for="(v, i) in contacts" :key="i" @click="openMessage(v.id)">
        <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
          <img :src="v.picture" :alt="v.name">
        </div>
        <div class="">
          <div class="text-primary font-bold capitalize text-sm">{{ v.name }}</div>
          <div class="text-xs capitalize">{{ v.college.name }}</div>
        </div>
      </div>
    </div>

    <!-- If Selected -->
    <div class="" v-if="lecture_id != null">
      <div class="mb-2 py-2 px-3 hover:bg-slate-50 border-b rounded cursor-pointer" @click="loadContacts()">
        <i class="fa fa-arrow-left mr-2"></i> Kembali
      </div>
      <div class="h-96 overflow-y-scroll bg-slate-100 rounded p-3" id="message-box">
        <div class="py-6" v-if="loading">
          <Loading height="6" />
        </div>
        <div class="" v-for="(v, i) in messages" :key="i">
          
          <div class="text-xs my-4 py-1 px-2 bg-slate-200 w-fit rounded m-auto text-slate-600" v-if="getDate(messages[i-1]?.created_at) != getDate(v.created_at)">{{ getDate(v.created_at) }}</div>

          <div class="flex my-2 items-end gap-2" v-if="!isSender(v.sender)">
            <router-link :to="{name: 'Profile', params: {id: v.lecture.id}}">
              <img :src="v.lecture.picture" :alt="v.lecture.name" class="rounded-full w-10 h-10 overflow-hidden border">
            </router-link>
            <div class="">
              <div class="py-2 px-3 bg-white w-fit h-fit rounded-lg rounded-bl-none text-black shadow mb-1 text-sm max-w-xs lg:max-w-md">
                <div class="text-primary text-xs capitalize">{{ v.lecture.name }}</div>
                <div class="">{{ v.message }}</div>
              </div>
              <div class="text-xs">{{ getTime(v.created_at) }}</div>
            </div>
          </div>

          <div class="flex justify-end items-end my-2 gap-2" v-if="isSender(v.sender)">
            <div>
              <div class="py-2 px-3 bg-primary w-fit h-fit shadow mb-1 rounded-lg rounded-br-none text-white max-w-xs">
                <div class="">{{ v.message }}</div>
              </div>
              <div class="text-xs text-right">{{ getTime(v.created_at) }}</div>
            </div>
            <router-link :to="{name: 'Profile', params: {id: v.project.company.id}}">
              <img :src="v.project.company.picture" :alt="v.project.company.name" class="w-10 h-10 rounded-full border">
            </router-link>
          </div>
        </div>
      </div>
  
      <div class="flex items-center gap-2 pt-3 border-t">
        <input type="text" class="py-2 px-3 bg-white rounded border w-full focus:shadow-lg focus:border-primary outline-none" placeholder="Type here..." v-model="message" @keyup.enter="sendMessage">
        <button class="py-2 px-5 rounded bg-primary h-fit hover:bg-secondary outline-none text-white" @click="sendMessage">
          <Loading height="6" v-if="sendLoading" />
          <div class=""  v-if="!sendLoading">
            <i class="fa fa-paper-plane"></i>
          </div>
        </button>
      </div>
    </div>
     
  </div>
</template>

<script setup>
import Loading from '../../components/Loading.vue';
</script>

<script>
export default {
  props: {
    project_id: Number,
    // lecture_id: Number,
  },
  data() {
    return {
      messages: [],
      contacts: [],
      message: '',
      selected: null,
      lecture_id: null,
      pusher: null,
      channel: null,
      loading: true,
      sendLoading: false,
    }
  },
  methods: {
    getMessages() {
      this.loading = true;
      this.axios.get(`/project/${this.project_id}/message/${this.lecture_id}`)
      .then(({data: result}) => {
        this.loading = false;
        this.messages = result.data;
        setTimeout(() => {
          this.scrollToBottom()
          document.querySelector('#message-box').style.scrollBehavior = "smooth";
        }, 1);
      })
    },
    addZero(number) {
      if (number < 10 && number > -10) {
        return `0${number}`;
      }
      return number;
    },
    getTime(created_at) {
      let date = new Date(created_at);
      return `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
    },
    getDate(created_at) {
      if (created_at) {
        let date = new Date(created_at);
        return `${this.addZero(date.getDate())}/${this.addZero(date.getMonth()+1)}/${date.getFullYear()}`;
      }
      return created_at;
    },
    openMessage(lecture_id) {
      this.messages = [];
      this.message = '';
      this.lecture_id = lecture_id;
      this.getMessages();
      this.channel.bind('new-message', ({data}) => {
        if (data.project.id == this.project_id && data.lecture.id == this.lecture_id) {
          if (data.sender == 'lecture') {
            this.messages.push(data);
            setTimeout(() => {
              this.scrollToBottom();
            }, 500);
          }
        }
      });
    },
    isSender(role) {
      return this.$store.state?.user?.role == role;
    },
    sendMessage() {
      if (this.message.trim().length > 0) {
        this.sendLoading = true;
        this.axios.post(`/project/${this.project_id}/message/${this.lecture_id}`, {
          sender: 'company',
          message: this.message,
        })
        .then(({data: result}) => {
          this.sendLoading = false;
          this.messages.push(result.data);
          this.message = '';
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        })
        .catch(() => {
          this.sendLoading = false;
        })
      }
    },
    scrollToBottom() {
      document.querySelector('#message-box').scrollTo(0, document.querySelector('#message-box').scrollHeight);
    },
    loadContacts() {
      this.lecture_id = null;
      this.axios.get(`/project/${this.project_id}/message/get/contact`)
        .then(({data: result}) => {
          this.contacts = result.data;
        })
    },
    getChannel() {
      
    }
  },
  mounted() {
    this.loadContacts();
    // this.getMessages();
    Pusher.logToConsole = true;

    this.pusher = new Pusher('4d394bf66f66eef330a9', {
      cluster: 'ap1'
    });

    this.channel = this.pusher.subscribe('project-message');


    this.channel.bind('new-message', ({data}) => {
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

    // channel.bind('delete-message', function(data) {
    //   alert(JSON.stringify(data));
    // });
  }
}
</script>