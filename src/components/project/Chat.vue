<template>
  <div class="p-4 bg-white rounded shadow">

    <div class="">
      <div class="text-primary font-bold">
        Daftar Pesan
      </div>
      <div class="border rounded my-2 p-2 flex gap-3">
        <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">

        </div>
        <div class="">
          <div class="text-primary font-bold">Zulfahmi</div>
          <div class="text-xs">Zulfahmi</div>
        </div>
      </div>
    </div>

    <!-- If Selected -->
    <div class="" v-if="selected != null">
      <div class="mb-2 py-2 px-3 hover:bg-slate-50 rounded cursor-pointer" @click="selected = null">
        <i class="fa fa-arrow-left mr-2"></i> Kembali
      </div>
      <div class="h-96 overflow-y-scroll bg-slate-100 rounded p-3" id="message-box">
        <div class="" v-for="(v, i) in messages" :key="i">
          <div class="flex my-2" v-if="!isSender(v.sender)">
            <div class="rounded-full mr-3 w-10 h-10 overflow-hidden border">
              <img :src="v.project.company.picture" :alt="v.project.company.name">
            </div>
            <div class="py-2 px-3 bg-slate-700 w-fit h-fit rounded-lg rounded-bl-none text-white text-sm max-w-xs lg:max-w-md">
              <div class="text-blue-300 text-xs">{{ (v.sender == 'company') ? v.project.company.name : v.lecture.name }}</div>
              <div class="">{{ v.message }}</div>
            </div>
          </div>
          <div class="flex justify-end my-2" v-if="isSender(v.sender)">
            <div class="py-2 px-3 bg-primary w-fit h-fit rounded-lg rounded-br-none text-white text-sm max-w-xs">
              <div class="">{{ v.message }}</div>
            </div>
            <div class="rounded-full ml-3 w-10 h-10 overflow-hidden border">
              <img :src="v.project.company.picture" :alt="v.project.company.name">
            </div>
          </div>
        </div>
      </div>
  
      <div class="flex items-center gap-2 pt-3 border-t">
        <input type="text" class="py-2 px-3 bg-white rounded border w-full focus:shadow-lg focus:border-primary outline-none" placeholder="Type here..." v-model="message" @keyup.enter="sendMessage">
        <button class="py-2 px-5 rounded bg-primary h-fit hover:bg-secondary outline-none text-white" @click="sendMessage">
          <i class="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
     
  </div>
</template>

<script>
export default {
  props: {
    project_id: Number,
    lecture_id: Number,
  },
  data() {
    return {
      messages: [],
      message: '',
      selected: null,
    }
  },
  methods: {
    getMessages() {
      this.axios.get(`/project/${this.project_id}/message/${this.lecture_id}`)
      .then(({data: result}) => {
        this.messages = result.data;
        setTimeout(() => {
          this.scrollToBottom()
        }, 1);
      })
    },
    isSender(role) {
      return this.$store.state?.user?.role == role;
    },
    sendMessage() {
      if (this.message.trim().length > 0) {

        this.axios.post(`/project/${this.project_id}/message/${this.lecture_id}`, {
          sender: 'company',
          message: this.message,
        })
        .then(({data: result}) => {
          this.messages.push(result.data);
          this.message = '';
        })
      }
    },
    scrollToBottom() {
      document.querySelector('#message-box').scrollTo(0, document.querySelector('#message-box').scrollHeight);
    }
  },
  mounted() {
    this.getMessages();
    Pusher.logToConsole = true;

    var pusher = new Pusher('4d394bf66f66eef330a9', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('project-message');
    channel.bind('new-message', ({data}) => {
      console.log(data.project.id, this.project_id, data.lecture.id, this.lecture_id);
      if (data.project.id == this.project_id && data.lecture.id == this.lecture_id) {
        if (data.sender == 'lecture') {
          this.messages.push(data);
        }
      }
    });

    // channel.bind('delete-message', function(data) {
    //   alert(JSON.stringify(data));
    // });
  }
}
</script>