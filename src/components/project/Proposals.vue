<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    Daftar Proposal:
    <div class="col-span-3 text-center text-sm text-slate-400 py-5" v-if="proposals.length == 0">Belum ada proposal yang di ajukan.</div>
    <div :class="{'hidden lg:block':selected != null}">
      <div :class="{'border-primary/30 bg-light': selected==i, 'bg-white': selected!=i}" class="rounded shadow p-3 hover-comp cursor-pointer h-fit mb-2" @click="selectProposal(i)" v-for="(v, i) in proposals" :key="i">
        <div class="flex items-center gap-4">
          <!-- <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img :src="v.lecture.picture" :alt="v.lecture.name">
          </div> -->
          <div class="flex flex-col">
            <div class="font-bold text-sm capitalize">{{v.lecture.name }}</div>
            <div class="text-xs text-secondary capitalize">{{ v?.lecture?.college?.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-sm text-gray-400 text-center lg:col-span-2 py-7" v-if="selected == null && proposals.length > 0" >
      Pilih dosen untuk menampilkan proposal.
    </div>
    <div :class="{'hidden':selected == null}" v-if="selected != null" class="lg:block lg:col-span-2">
      <div class="bg-white my-2 rounded p-1 shadow lg:hidden">
        <div class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 cursor-pointer" @click="selected=null">
          <i class="fa fa-arrow-left mr-2"></i>
          Kembali
        </div>
      </div>
      <div class="bg-white rounded p-4 shadow">
        <router-link :to="{name: 'Profile', params: {id: proposal?.lecture.id}}" class="flex items-center gap-4 border-b pb-2 hover:underline">
          <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img :src="proposal?.lecture.picture" :alt="proposal?.lecture.name">
          </div>
          <div class="flex flex-col">
            <div class="font-bold capitalize">{{proposal?.lecture.name }}</div>
            <div class="text-xs text-secondary capitalize">{{ proposal?.lecture?.college?.name }}</div>
          </div>
        </router-link>
        <div class="py-2 text-sm border-b">{{ proposal?.note }}</div>
        <div class="border-b py-2">
          <div class="text-xs">Lampiran:</div>
          <div class="flex flex-wrap gap-2 my-2">
            <a :href="v.filepath" target="_blank" rel="noopener noreferrer" class="rounded border border-slate-200 py-2 px-3 w-fit flex items-center hover-comp cursor-pointer" v-for="(v, i) in proposal?.attachments" :key="i">
              <div class="pr-2 mr-2 text-primary border-r">
                <i :class="`fa ${getIcon(v.mimetype)} fa-fw`"></i>
              </div>
              <div class="text-xs">{{ v?.filename }}</div>
            </a>
          </div>
        </div>
        <div class="border-b py-2">
          <div class="text-xs">Anggota Tim:</div>
          <div class="flex flex-wrap gap-2 my-2">
            <router-link :to="{name: 'Profile', params: {id: v.id}}" class="rounded border border-slate-200 py-2 px-3 w-fit flex items-center hover-comp cursor-pointer" v-for="(v, i) in proposal?.members" :key="i">
              <div class="pr-2 mr-2 text-primary border-r">
                <i class="fa fa-user fa-fw"></i>
              </div>
              <div class="text-xs capitalize">{{ v.name }}</div>
            </router-link>
          </div>
        </div>
        <button class="bg-primary text-white hover:bg-secondary p-2 shadow rounded text-center mt-2 w-full" @click="confirmProposal(proposal?.id)">
          Terima Proposal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project_id: Number
  },
  data() {
    return {
      selected: null,
      proposals: [],
    }
  },
  computed: {
    proposal() {
      return this.proposals[this.selected];
    },
  },
  methods: {
    selectProposal(index) {
      this.selected = index;
    },
    getIcon(type) {
      if (['pdf'].includes(type)) return 'fa-file-pdf';
      if (['png', 'jpg', 'jpeg'].includes(type)) return 'fa-image';
      return 'fa-file'
    },
    confirmProposal(proposal_id) {
      Swal.fire({
        icon: 'warning',
        title: 'Anda yakin?',
        text: 'Anda tidak dapat mengembalikannya!',
        showCancelButton: true,
        confirmButtonText: 'Terima',
        confirmButtonColor: '#20889C',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post(`/project/${this.project_id}/proposal/${proposal_id}`)
          .then(({data: result}) => {
            Swal.fire({
              title: 'Berhasil!',
              text: 'Anda berhasil menerima proposal ini, maka proposal lainnya telah ditolak. Anda juga tidak dapat mengubah atau menghapus proyek ini.',
              icon: 'success',
              confirmButtonColor: '#20889C',
            }).then(() => {
              this.$emit('proposal_confirmed');
            })
          })
        }
      })
    }
  },
  mounted() {
    this.axios.get(`/project/${this.project_id}/proposal`)
    .then(({data: result}) => {
      this.proposals = result.data;
    })
  },
}
</script>