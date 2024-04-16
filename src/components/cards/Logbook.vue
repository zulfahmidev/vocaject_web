<template>
  <div>
    <div class="mt-3 bg-white rounded shadow hidden">
      <div class="py-3 px-5 border-b border-slate-300">
        Logbook Mahasiswa
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 mt-3">

      <!-- Senders -->
      <div class="col-span-1">
        <div class="mb-2">Daftar Anggota:</div>
        <div 
          :class="`${selectedMember==index ? 'button-active' : 'bg-white'} shadow rounded flex gap-3 items-center p-2 button-hover mb-2`" 
          v-for="(item, index) in project_data.members" :key="index" @click="selectMember(index)">
          <div class="">
            <div class="w-8 h-8 rounded-full bg-slate-300 overflow-hidden">
              <img :src="item.picture" alt="">
            </div>
          </div>
          <div class="text-xs">
            <div class="font-bold capitalize">{{ item.name }}</div>
            <div class="text-slate-500">{{ item.nim }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-2" v-if="selectedMember == null">
        <div class="text-sm text-center pt-10 text-slate-400">Pilih anggota untuk melihat logbook</div>
      </div>

      <div class="col-span-2" v-if="loading">
        <div class="text-center pt-10">
          <Loading height="6" />
        </div>
      </div>

      <!-- Logbook Detail -->
      <div class="col-span-2" v-if="selectedMember != null && !loading">

        <!-- Profile Sender -->
        <div class="bg-white shadow rounded p-3">
          <div class="flex justify-between">
            <div class="flex items-center gap-3">
              <div class="">
                <div class="w-10 h-10 rounded-full bg-slate-300"></div>
              </div>
              <div class="text-sm">
                <div class="font-bold capitalize">{{ getMemberSelected().name }}</div>
                <div class="text-slate-500 capitalize">{{ getMemberSelected().college.name }}</div>
              </div>
            </div>
            <div class="">
              <div
                class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
                @click="selectedMember=null">
                <i class="fa fa-times" style="margin-top: 2px;"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-3 p-3 bg-primary/90 text-white rounded shadow text-center cursor-pointer active:bg-primary" v-if="getMemberSelected().id == $store.state.user.id" @click="isShowModalLogbook = true">Tambah Logbook</div>

        <div class="bg-white rounded shadow p-3 mt-3" v-for="(item, index) in logbooks" :key="index">
          <div class="font-bold">{{ dateFormat(item.submited_at) }}</div>
          <p class="text-sm">{{ item.description }}</p>
        </div>

      </div>


    </div>

    <LogbookModal v-if="selectedMember != null && isShowModalLogbook" :project_id="project_data.id" :member_id="getMemberSelected().id" @onClose="isShowModalLogbook = false" @onCreated="addLogbook" />
  </div>
</template>

<script setup lang="ts">
import Loading from '../utils/Loading.vue';
import LogbookModal from '../modals/Logbook.vue';

</script>

<script lang="ts">
export default {
  props: {
    project_data: Object
  },
  data() {
    return {
      loading: false,
      selectedMember: null,
      logbooks: [],
      isShowModalLogbook: false,
    }
  },
  methods: {
    getLogbooks(member_id) {
      this.loading = true
      this.axios.get(`/project/${this.project_data.id}/logbook/${member_id}`)
      .then((result) => {
        this.logbooks = result.data.data;
        this.loading = false
      })
    },
    selectMember(index) {
      this.selectedMember = index;
      this.getLogbooks(this.project_data.members[index].id)
    },
    getMemberSelected() {
      return this.project_data.members[this.selectedMember];
    },
    dateFormat(date: any) {
      let d = new Date(date);
      let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${this.addZero(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    addZero(n) {
      if (n < 10) {
        return `0${n}`
      }
      return `${n}`;
    },
    addLogbook(logbook) {
      this.isShowModalLogbook = false;
      this.logbooks.push(logbook)
    }
  },
  mounted() {

  }
}
</script>