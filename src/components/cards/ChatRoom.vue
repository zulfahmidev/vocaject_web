<template>
  <div 
    class="col-span-2 border-l border-slate-300 h-full relative overflow-auto" 
    ref="message-box"
    style="
      display: grid;
      grid-template-rows: 4rem auto 4rem;
      height: 75vh;
    ">

    <!-- Header -->
    <div class="bg-primary flex items-center gap-3 px-3">
      <div class="">
        <div class="w-10 h-10 bg-slate-50 rounded-full overflow-hidden">
          <img :src="contact?.picture" alt="profile picture">
        </div>
      </div>
      <div class="w-full">
        <div class="text-white font-bold capitalize">{{ contact?.name }}</div>
        <div class="text-xs text-white capitalize">{{ contact?.college.name }}</div>
      </div>
    </div>

    <!-- Messages -->
    <div class="px-5 py-5 overflow-auto">
      
      <div class="" v-for="(item, index) in messages" :key="index">

        <!-- Date Devider -->
        <div 
          class="w-fit py-1 px-2 bg-slate-100 text-xs my-3 rounded mx-auto"
          v-if="dateFormat(item.created_at) != dateFormat(messages[index-1]?.created_at)"
          >{{ dateFormat(item.created_at) }}</div>

        <!-- Recieved -->
        <div class="flex gap-3" v-if="item.sender != getRole()">

          <!-- Recieved Without File -->
          <div class="w-2/3" v-if="item.message.type == 'text'">
            <div class="bg-slate-300 text-sm p-2 rounded w-fit">{{ item.message.text }}</div>
            <div class="text-xs py-1">{{ timeFormat(item.created_at) }}</div>
          </div>

          <!-- Recieved With File -->
          <div class="w-2/3" v-if="item.message.type == 'file'">
            <div class="bg-slate-300 text-sm rounded w-fit flex items-center gap-2 p-2 cursor-pointer">
              <div class="">
                <div class="w-8 h-8 rounded flex items-center justify-center text-xl">
                  <!-- <i class="fa fa-download"></i> -->
                  <i class="fa fa-paperclip"></i>
                </div>
              </div>
              <div class="">
                <div class="font-bold">File Lampiran.pdf</div>
                <div class="">14 mb.</div>
              </div>
            </div>
            <div class="text-xs py-1">{{ timeFormat(item.created_at) }}</div>
          </div>

        </div>

        <!-- Sender -->
        <div class="flex gap-3 justify-end text-white" v-if="item.sender == getRole()">

          <!-- Recieved Without File -->
          <div class="w-2/3" v-if="item.message.type == 'text'">
            <div class="bg-primary text-sm p-2 rounded m-auto mr-0 w-fit">{{ item.message.text }}</div>
            <div class="text-xs py-1 text-end text-black">{{ timeFormat(item.created_at) }}</div>
          </div>

          <!-- Recieved With File -->
          <div class="w-2/3" v-if="item.message.type == 'file'">
            <div class="bg-primary text-sm rounded w-fit flex items-center gap-2 p-2 m-auto mr-0 cursor-pointer">
              <div class="">
                <div class="w-8 h-8 rounded flex items-center justify-center text-xl">
                  <!-- <i class="fa fa-download"></i> -->
                  <i class="fa fa-paperclip"></i>
                </div>
              </div>
              <div class="">
                <div class="font-bold">File Lampiran.pdf</div>
                <div class="">14 mb.</div>
              </div>
            </div>
            <div class="text-xs py-1 text-end text-black">{{ timeFormat(item.created_at) }}</div>
          </div>
        </div>

      </div>

    </div>

    <!-- Input -->
    <div class="bg-light border-t border-primary left-0 w-full flex items-center">
      <div class="px-3 text-xl text-primary active:text-emerald-400 cursor-pointer">
        <i class="fa fa-fw fa-paperclip"></i>
      </div>
      <input type="text" placeholder="Ketik disini..."
        class="px-3 py-2 h-fit bg-white w-full rounded border-primary border outline-none text-sm" 
        v-model="message"
        ref="input-message"
        @keydown.enter="sendMessage"
        >
      <div class="px-3 text-xl text-primary active:text-emerald-400 cursor-pointer" @click="sendMessage">
        <i class="fa fa-fw fa-paper-plane" v-if="!sendLoading"></i>
        <Loading height="6" v-if="sendLoading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../utils/Loading.vue';
import { watchEffect } from 'vue';
</script>

<script lang="ts">
export default {
  props: {
    project_id: Number,
    contact_id: Number,
    channel: Object,
  },
  data() {
    return {
      messages: [],
      contact: null,
      sendLoading: false,
      message: '',
    }
  },
  methods: {
    async getMessages() {
      this.messages = [];
      this.message = '';

      await this.axios.get(`/project/${this.project_id}/message/${this.contact_id}`)
        .then(({ data: result }) => {
          this.messages = result.data;
          this.scrollToBottom();
        })

      await this.channel.bind('new-message', ({ data }) => {
        if (data.project.id == this.project_id && data.lecture.id == this.contact_id) {
          if (data.sender == 'lecture') {
            data.message = JSON.parse(data.message);
            this.messages.push(data);
            setTimeout(() => {
              this.scrollToBottom(true);
            }, 20);
          }
        }
      });
    },
    getRole() {
      return this.$store.state.user.role
    },
    timeFormat(date) {
      let d = new Date(date);
      return `${this.addZero(d.getHours())}:${this.addZero(d.getMinutes())}`;
    },
    dateFormat(date: any) {
      let d = new Date(date);
      let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${this.addZero(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    addZero(number) {
      if (number < 10) {
        return "0" + number;
      }
      return number
    },
    getContact() {
      this.axios.get(`/user/${this.contact_id}`)
        .then(({ data: result }) => {
          this.contact = result.data;
        })
    },
    getData() {
      return this.$store.state.user;
    },
    sendMessage() {
      if (this.message.trim().length > 0) {
        this.sendLoading = true;
        this.$refs['input-message'].disable = true;
        this.axios.post(`/project/${this.project_id}/message/${this.contact_id}`, {
          sender: this.getRole(),
          message: this.message,
        })
          .then(({ data: result }) => {
            this.sendLoading = false;
            this.$refs['input-message'].disable = false;
            this.messages.push(result.data);
            this.message = '';
            setTimeout(() => {
              this.scrollToBottom(true);
            }, 20);
          })
          .catch(() => {
            this.sendLoading = false;
          })
      }
    },
    scrollToBottom(smooth = false) {
      if (smooth) this.$refs['message-box'].style.scrollBehavior = 'smooth';
      this.$refs['message-box'].scrollTo(0, this.$refs['message-box'].scrollHeight)
      this.$refs['message-box'].style.scrollBehavior = 'auto';
    },
  },
  mounted() {
    watchEffect(() => {
      this.getMessages()
      this.getContact()
    })
  },
}
</script>