<template>
  <div 
    class="col-span-2 border-l border-slate-300 h-full relative"
    style="
      display: grid;
      grid-template-rows: 4rem auto 4rem;
      height: 75vh;
    ">

    <!-- Header -->
    <div class="bg-primary px-3 flex items-center">
      <div class="flex gap-3" v-if="!loadingContact">
        <div>
          <div class="w-10 h-10 bg-slate-50 rounded-full overflow-hidden">
            <img :src="contact?.picture" alt="profile picture">
          </div>
        </div>
        <div class="w-full">
          <div class="text-white font-bold capitalize">{{ contact?.name }}</div>
          <div class="text-xs text-white capitalize">{{ contact?.college.name }}</div>
        </div>
      </div>
      <div class="animate-pulse flex gap-3 w-1/2 items-center" v-if="loadingContact">
        <div>
          <div class="w-10 h-10 bg-slate-50/50 rounded-full overflow-hidden"></div>
        </div>
        <div class="w-full">
          <div class="bg-slate-50/50 h-3 rounded w-1/2"></div>
          <div class="bg-slate-50/50 h-3 rounded w-full mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div 
      class="px-5 py-5 overflow-auto"
      ref="message-box"
    >
      
      <div class="" v-for="(item, index) in messages" :key="index" v-if="!loadingMessage">

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
          <div class="w-2/3" v-if="item.message.type == 'document'">
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
          <div class="w-2/3" v-if="item.message.type == 'document'">
            <div class="bg-primary text-sm rounded w-fit flex items-center gap-2 p-2 m-auto mr-0 cursor-pointer">
              <a href="" class="">
                <div class="w-8 h-8 rounded flex items-center justify-center text-xl">
                  <!-- <i class="fa fa-download"></i> -->
                  <i class="fa fa-paperclip"></i>
                </div>
              </a>
              <div class="">
                <div class="font-bold">{{ item.message.document.origin_filename }}</div>
                <div class="text-xs">14 mb.</div>
              </div>
            </div>
            <div class="text-xs py-1 text-end text-black">{{ timeFormat(item.created_at) }}</div>
          </div>
        </div>

      </div>

      <div class="animate-pulse w-full" v-if="loadingMessage">
        <div class="w-1/4 m-auto h-4 bg-slate-300 rounded"></div>
        <div class="mt-4 w-1/3">
          <div class="bg-slate-300 w-full h-8 rounded"></div>
          <div class="bg-slate-300 w-1/4 h-4 mt-1 rounded"></div>
        </div>
        <div class="mt-4 flex items-end flex-col m-auto mr-0 w-1/3">
          <div class="bg-slate-300 w-full h-8 rounded"></div>
          <div class="bg-slate-300 w-1/4 h-4 mt-1 rounded"></div>
        </div>
        <div class="mt-4 w-1/3">
          <div class="bg-slate-300 w-full h-8 rounded"></div>
          <div class="bg-slate-300 w-1/4 h-4 mt-1 rounded"></div>
        </div>
        <div class="mt-4 flex items-end flex-col m-auto mr-0 w-1/3">
          <div class="bg-slate-300 w-full h-8 rounded"></div>
          <div class="bg-slate-300 w-1/4 h-4 mt-1 rounded"></div>
        </div>
        <div class="w-1/4 m-auto h-4 bg-slate-300 rounded"></div>
        <div class="mt-4 w-1/3">
          <div class="bg-slate-300 w-full h-8 rounded"></div>
          <div class="bg-slate-300 w-1/4 h-4 mt-1 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="bg-light border-t border-primary left-0 w-full flex items-center">
      <div class="px-3 text-xl text-primary active:text-emerald-400 cursor-pointer" @click="selectFile">
        <i class="fa fa-fw fa-paperclip"></i>
        <input type="file" ref="file-upload" class="hidden" @change="onSelectFile"
        :disabled="loadingMessage">
      </div>
      <input type="text" placeholder="Ketik disini..."
        class="px-3 py-2 h-fit bg-white w-full rounded border-primary border outline-none text-sm" 
        v-model="message"
        ref="input-message"
        @keydown.enter="sendMessage"
        :disabled="loadingMessage"
        >
      <button :disabled="loadingMessage" class="px-3 text-xl text-primary active:text-emerald-400 cursor-pointer" @click="sendMessage">
        <i class="fa fa-fw fa-paper-plane" v-if="!sendLoading"></i>
        <Loading height="6" v-if="sendLoading" />
      </button>
    </div>

    <div class="absolute top-0 left-0 w-full h-full bg-slate-50 flex items-center justify-center" v-if="selectedFile.isSelected">
      <div class="text-center">
        <div class="text-9xl text-slate-400">
          <i class="fa fa-image"></i>
        </div>
        <div class="w-2/3 m-auto text-sm text-center break-words" ref="file-upload-name"></div>
        <div class="flex gap-4 justify-center">
          <button class="py-2 px-5 rounded bg-slate-400/80 text-sm text-white mt-3 hover:bg-slate-400" @click="cancelSelectFile">Batal</button>
          <button class="py-2 px-5 rounded bg-primary/80 text-sm text-white mt-3 hover:bg-primary" @click="sendDocument">Kirim</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../../utils/Loading.vue';
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
      loadingContact: false,
      loadingMessage: false,
      message: '',
      selectedFile: {
        isSelected: false,
        fileSelected: null
      }
    }
  },
  methods: {
    selectFile() {
      this.$refs['file-upload'].click()
    },
    onSelectFile({target}) {
      this.selectedFile.isSelected = true
      if (target.files && target.files[0]) {
        var data = target.files[0]
        this.selectedFile.fileSelected = data;
        var reader = new FileReader();
        
        reader.onload = (e) => {
          this.$refs['file-upload-name'].innerHTML = data.name;
          // $('#blah').attr('src', e.target.result).width(150).height(200);
        };

        reader.readAsDataURL(target.files[0]);
      }
    },
    cancelSelectFile() {
      this.selectedFile.isSelected = false
      this.$refs['file-upload'].value = ''
    },
    async getMessages() {
      this.messages = [];
      this.message = '';
      this.loadingMessage = true;

      await this.axios.get(`/project/${this.project_id}/message/${this.contact_id}`)
        .then(({ data: result }) => {
          this.messages = result.data;
          this.loadingMessage = false;
          setTimeout(() => {
            this.scrollToBottom();
          }, 20);
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
      let role = this.$store.state.user.role;
      return role == 'college' ? 'company' : role;
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
      this.loadingContact = true;
      this.cancelSelectFile()
      this.axios.get(`/user/${this.contact_id}`)
        .then(({ data: result }) => {
          this.contact = result.data;
          this.loadingContact = false;
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
    sendDocument() {
      if (this.selectedFile.fileSelected) {
        this.sendLoading = true;
        this.$refs['input-message'].disable = true;

        let fd = new FormData()
        fd.append('sender', this.getRole())
        fd.append('file', this.selectedFile.fileSelected)

        this.cancelSelectFile()

        this.axios.post(`/project/${this.project_id}/message/${this.contact_id}/document`, fd)
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