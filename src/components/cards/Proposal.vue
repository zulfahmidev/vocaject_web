<template>
  <div>
    <div class="my-3">Proposals</div>
    <div class="grid grid-cols-3 gap-3" v-if="proposals.length > 0 && !loadingProposals">

      <!-- Senders -->
      <div class="col-span-1">
        <div class="bg-white shadow rounded flex gap-3 items-center p-2 button-hover mb-2" v-for="(item, index) in proposals" :key="index" @click="selected = index">
          <div class="">
            <div class="w-8 h-8 rounded-full overflow-hidden bg-slate-300">
              <img :src="item?.lecture?.picture" :alt="item?.lecture?.name" class="w-8 h-8">
            </div>
          </div>
          <div class="text-xs">
            <div class="font-bold capitalize">{{ item?.lecture?.name }}</div>
            <div class="text-slate-500 capitalize">{{ shortenText(item?.lecture?.college?.name, 18) }}</div>
          </div>
        </div>
      </div>

      <!-- Proposal Detail -->
      <div class="col-span-2 bg-white shadow rounded p-3" v-if="selected !== null && !loadingProposal">

        <!-- Profile Sender -->
        <div class="flex justify-between">
          <div class="flex items-center gap-3">
            <div class="">
              <div class="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                <img :src="getProposal()?.lecture?.picture" :alt="getProposal()?.lecture?.name" class="w-10 h-10">
              </div>
            </div>
            <div class="text-sm">
              <div class="font-bold capitalize">{{ getProposal()?.lecture.name }}</div>
              <div class="text-slate-500 capitalize">{{ getProposal()?.lecture.college.name }}</div>
            </div>
          </div>
          <div class="">
            <div class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black" @click="selected = null">
              <i class="fa fa-times" style="margin-top: 2px;"></i>
            </div>
          </div>
        </div>
        <hr class="my-2">

        <!-- Summary -->
        <div class="text-xs font-bold">Ringkasan:</div>
        <p class="text-xs">{{ getProposal()?.note }}</p>
        <hr class="my-2">

        <!-- Constributors -->
        <div class="text-xs font-bold">Anggota:</div>
        <div class="grid grid-cols-3 mt-2 gap-2">

          <div class="col-span-1 flex items-center button-hover border border-slate-300 rounded" v-for="(member, mIndex) in getProposal()?.members" :key="mIndex">
            <div class="">
              <div class="w-8 h-8 flex items-center justify-center text-primary">
                <i class="fa fa-user"></i>
              </div>
            </div>
            <div class="border-r border-slate-300 h-5"></div>
            <div class="text-xs ml-2">{{ member?.name }}</div>
          </div>

        </div>
        <hr class="my-2">

        <div class="flex justify-end gap-3">
          <a href="http://" target="_blank" rel="noopener noreferrer"></a>
          <a :href="att.filepath" target="_blank" rel="noopener noreferrer" v-for="(att, aIndex) in getProposal()?.attachments" :key="aIndex"
            class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer w-fit">
            <i class="fa fa-fw fa-paperclip"></i>
            <span>Lampiran</span>
          </a>
          <!-- <div
            class="p-2 text-xs border rounded border-red-400 text-red-500 hover:border-red-900 hover:text-red-900 cursor-pointer w-fit">
            <i class="fa fa-fw fa-times"></i>
            <span>Tolak</span>
          </div> -->
          <div
            class="p-2 text-xs border rounded border-primary text-primary hover:border-emerald-500 hover:text-emerald-500 cursor-pointer w-fit" @click="approve(getProposal())">
            <i class="fa fa-fw fa-check"></i>
            <span>Terima</span>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div class="col-span-2 py-5 text-center" v-if="loadingProposal">
        <Loading height="6" />
      </div>

      <!-- Empty -->
      <div class="col-span-2 py-5 text-xs text-center" v-if="selected === null">
        Proposal belum dipilih.
      </div>

    </div>
    <div class="py-6 text-center text-xs" v-if="proposals.length == 0 && !loadingProposals">
      Belum ada proposal yang masuk.
    </div>
    <div class="py-6 text-center" v-if="loadingProposals">
      <Loading height="6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../utils/Loading.vue';

</script>

<script lang="ts">
export default {
  props: {
    project_id: Number
  },
  data() {
    return {
      proposals: [],
      selected: null,
      loadingProposals: false,
      loadingProposal: false,
    }
  },
  methods: {
    getProposals() {
      this.loadingProposals = true
      this.axios.get(`/project/${this.project_id}/proposal`)
      .then((result) => {
        this.proposals = result.data.data;
        this.loadingProposals = false
      })
    },
    shortenText(text: String, max: number) {
      let expText = text.split('');

      return (expText.length > max) ? expText.slice(0, max).join('') + '...' : expText.join('');
    },
    getProposal() {
      return this.proposals[this.selected];
    },
    approve(proposal: any) {
      this.axios.post(`project/${this.project_id}/proposal/${proposal?.id}`)
      .then((result) => {
        this.$swal({
          icon: "success",
          title: "Proposal berhasil disetujui!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.$emit('approved')
        });
      })
      .catch(({response}) => {
        this.$swal({
          icon: "error",
          title: "Gagal menyetujui",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      })
    }
  },
  mounted() {
    this.getProposals();
  },
}
</script>