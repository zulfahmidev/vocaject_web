<template>
  <main class="col-span-3">

    <div class="flex h-96 justify-center items-center" v-if="loading">
      <Loading height="6" />
    </div>

    <div class="grid grid-cols-3 gap-3" v-if="!loading">

      <!-- Detail Project -->
      <div class="col-span-2">

        <div class="bg-white shadow rounded h-fit">

          <!-- Header -->
          <div class="p-3 border-b border-slate-300 text-slate-500 flex justify-between">
            <div @click="$router.back()" class="hover:text-black cursor-pointer flex gap-3 items-center w-fit px-2">
              <div class="text-xl">
                <i class="fa fa-arrow-left"></i>
              </div>
              <div class="">Kembali</div>
            </div>
            <div class="flex items-center gap-3">
              <router-link :to="{name: 'project-discuss'}" class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer">
                <i class="far fa-fw fa-message"></i>
                <span>Diskusi</span>
              </router-link>
            </div>
          </div>

          <!-- Detail Project -->
          <div class="p-3">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 bg-slate-100 rounded flex items-center justify-center" :style="{backgroundColor: getColor()}">
                <img :src="`/assets/${getImage()}`" class="h-10" alt="category icon">
              </div>
              <div class="">
                <div class="text-xl font-bold capitalize">{{ data?.title }}</div>
                <div class="text-primary text-xs capitalize">{{ data?.company?.name }}</div>
              </div>
            </div>
            <hr class="my-2">
            <p class="text-sm py-2">{{ data?.description }}</p>
            <hr class="my-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
                <div class="">Tanggal Tutup Pengajuan</div>
                <div class="font-bold">{{ formatDate(data?.expired_at) }}</div>
              </div>
              <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
                <div class="">Tanggal Deadline Proyek</div>
                <div class="font-bold">{{ formatDate(data?.deadline_at) }}</div>
              </div>
              <div class="col-span-1 p-4 text-xs border border-slate-300 text-center rounded">
                <div class="">Anggaran</div>
                <div class="font-bold">{{ formatRupiah(data?.budget) }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Features -->
        <div v-if="data?.status != 'opened'">
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div class="bg-white rounded shadow button-hover p-3 flex items-center gap-3">
              <i class="fa fa-fw fa-bullseye text-primary"></i>
              <div class="border-r h-6 border-slate-300"></div>
              <span>Target Proyek</span>
            </div>
            <div class="bg-white rounded shadow button-hover p-3 flex items-center gap-3">
              <i class="fa fa-fw fa-file text-primary"></i>
              <div class="border-r h-6 border-slate-300"></div>
              <span>Logbook Mahasiswa</span>
            </div>
          </div>
  
          <!-- Tab Target Project -->
          <div class="mt-3 bg-white rounded shadow hidden">
            <div class="py-3 px-5 border-b border-slate-300">
              Target Proyek
            </div>
            <div class="py-3 px-5">
              <div class="flex gap-3 mt-3">
                <div class="text-xl">
                  <i class="far fa-check-square"></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quibusdam voluptatum voluptate
                  officia cum aspernatur pariatur iste. Voluptatum, voluptatibus magnam.</p>
              </div>
              <div class="flex gap-3 mt-3">
                <div class="text-xl">
                  <i class="far fa-square"></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quibusdam voluptatum voluptate
                  officia cum aspernatur pariatur iste. Voluptatum, voluptatibus magnam.</p>
              </div>
              <div class="flex gap-3 mt-3">
                <div class="text-xl">
                  <i class="far fa-check-square"></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quibusdam voluptatum voluptate
                  officia cum aspernatur pariatur iste. Voluptatum, voluptatibus magnam.</p>
              </div>
            </div>
          </div>
  
          <!-- Tab Logbook -->
          <div class="mt-3 bg-white rounded shadow hidden">
            <div class="py-3 px-5 border-b border-slate-300">
              Logbook Mahasiswa
            </div>
          </div>
  
          <div class="grid grid-cols-3 gap-3 mt-3">
  
            <!-- Senders -->
            <div class="col-span-1">
              <div class="bg-white shadow rounded flex gap-3 items-center p-2 button-hover mb-2">
                <div class="">
                  <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                </div>
                <div class="text-xs">
                  <div class="font-bold">Zulfahmi</div>
                  <div class="text-slate-500">2020903430056</div>
                </div>
              </div>
              <div class="bg-white shadow rounded flex gap-3 items-center p-2 button-hover mb-2">
                <div class="">
                  <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                </div>
                <div class="text-xs">
                  <div class="font-bold">Zulfahmi</div>
                  <div class="text-slate-500">2020903430056</div>
                </div>
              </div>
            </div>
  
            <!-- Proposal Detail -->
            <div class="col-span-2">
  
              <!-- Profile Sender -->
              <div class="bg-white shadow rounded p-3">
                <div class="flex justify-between">
                  <div class="flex items-center gap-3">
                    <div class="">
                      <div class="w-10 h-10 rounded-full bg-slate-300"></div>
                    </div>
                    <div class="text-sm">
                      <div class="font-bold">Zulfahmi</div>
                      <div class="text-slate-500">Politeknik Negeri Lhokseumawe</div>
                    </div>
                  </div>
                  <div class="">
                    <div
                      class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
                      onclick="switchShowModal(modalActive)">
                      <i class="fa fa-times" style="margin-top: 2px;"></i>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="bg-white rounded shadow p-3 mt-3">
                <div class="font-bold">17 Desember 2023</div>
                <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur iste voluptas labore ipsum sequi porro, reiciendis atque neque impedit.</p>
              </div>
  
              <div class="bg-white rounded shadow p-3 mt-3">
                <div class="font-bold">17 Desember 2023</div>
                <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur iste voluptas labore ipsum sequi porro, reiciendis atque neque impedit.</p>
              </div>
  
              <div class="bg-white rounded shadow p-3 mt-3">
                <div class="font-bold">17 Desember 2023</div>
                <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur iste voluptas labore ipsum sequi porro, reiciendis atque neque impedit.</p>
              </div>
  
            </div>
  
  
          </div>
        </div>

        <!-- Proposals -->
        <div v-if="data?.status == 'opened'">
          <div class="my-3">Proposals</div>
          <div class="grid grid-cols-3 gap-3" v-if="proposal.proposals.length > 0 && !proposal.loadingProposals">
  
            <!-- Senders -->
            <div class="col-span-1">
              <div class="bg-white shadow rounded flex gap-3 items-center p-2 button-hover mb-2" v-for="(item, index) in proposal.proposals" :key="index">
                <div class="">
                  <div class="w-8 h-8 rounded-full bg-slate-300"></div>
                </div>
                <div class="text-xs">
                  <div class="font-bold">Zulfahmi</div>
                  <div class="text-slate-500">Politeknik Negeri...</div>
                </div>
              </div>
            </div>
  
            <!-- Proposal Detail -->
            <div class="col-span-2 bg-white shadow rounded p-3" v-if="proposal.selected && !proposal.loadingProposal">
  
              <!-- Profile Sender -->
              <div class="flex justify-between">
                <div class="flex items-center gap-3">
                  <div class="">
                    <div class="w-10 h-10 rounded-full bg-slate-300"></div>
                  </div>
                  <div class="text-sm">
                    <div class="font-bold">Zulfahmi</div>
                    <div class="text-slate-500">Politeknik Negeri Lhokseumawe</div>
                  </div>
                </div>
                <div class="">
                  <div
                    class="w-6 h-6 rounded-sm active:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:text-black"
                    onclick="switchShowModal(modalActive)">
                    <i class="fa fa-times" style="margin-top: 2px;"></i>
                  </div>
                </div>
              </div>
              <hr class="my-2">
  
              <!-- Summary -->
              <div class="text-xs font-bold">Ringkasan:</div>
              <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quia odit autem aliquam nemo, laborum
                quam delectus eveniet nisi est illum aspernatur suscipit maxime nostrum enim sit quae provident debitis.
              </p>
              <hr class="my-2">
  
              <!-- Constributors -->
              <div class="text-xs font-bold">Anggota:</div>
              <div class="grid grid-cols-3 mt-2 gap-2">
  
                <div class="col-span-1 flex items-center button-hover border border-slate-300 rounded">
                  <div class="">
                    <div class="w-8 h-8 flex items-center justify-center text-primary">
                      <i class="fa fa-user"></i>
                    </div>
                  </div>
                  <div class="border-r border-slate-300 h-5"></div>
                  <div class="text-xs ml-2">Zulfahmi</div>
                </div>
  
                <div class="col-span-1 flex items-center button-hover border border-slate-300 rounded">
                  <div class="">
                    <div class="w-8 h-8 flex items-center justify-center text-primary">
                      <i class="fa fa-user"></i>
                    </div>
                  </div>
                  <div class="border-r border-slate-300 h-5"></div>
                  <div class="text-xs ml-2">Zulfahmi</div>
                </div>
  
                <div class="col-span-1 flex items-center button-hover border border-slate-300 rounded">
                  <div class="">
                    <div class="w-8 h-8 flex items-center justify-center text-primary">
                      <i class="fa fa-user"></i>
                    </div>
                  </div>
                  <div class="border-r border-slate-300 h-5"></div>
                  <div class="text-xs ml-2">Zulfahmi</div>
                </div>
  
                <div class="col-span-1 flex items-center button-hover border border-slate-300 rounded">
                  <div class="">
                    <div class="w-8 h-8 flex items-center justify-center text-primary">
                      <i class="fa fa-user"></i>
                    </div>
                  </div>
                  <div class="border-r border-slate-300 h-5"></div>
                  <div class="text-xs ml-2">Zulfahmi</div>
                </div>
              </div>
              <hr class="my-2">
  
              <div class="flex justify-end gap-3">
                <div
                  class="p-2 text-xs border rounded border-slate-400 text-slate-500 hover:border-slate-900 hover:text-slate-900 cursor-pointer w-fit">
                  <i class="fa fa-fw fa-paperclip"></i>
                  <span>Lampiran</span>
                </div>
                <div
                  class="p-2 text-xs border rounded border-red-400 text-red-500 hover:border-red-900 hover:text-red-900 cursor-pointer w-fit">
                  <i class="fa fa-fw fa-times"></i>
                  <span>Tolak</span>
                </div>
                <div
                  class="p-2 text-xs border rounded border-primary text-primary hover:border-emerald-500 hover:text-emerald-500 cursor-pointer w-fit">
                  <i class="fa fa-fw fa-check"></i>
                  <span>Terima</span>
                </div>
              </div>
            </div>
            <div class="col-span-2 py-5 text-center" v-if="proposal.loadingProposal">
              <Loading height="6" />
            </div>
            <div class="col-span-2 py-5 text-xs text-center" v-if="!proposal.selected">
              Proposal belum dipilih.
            </div>
  
          </div>
          <div class="py-6 text-center text-xs" v-if="proposal.proposals.length == 0 && !proposal.loadingProposals">
            Belum ada proposal yang masuk.
          </div>
          <div class="py-6 text-center" v-if="proposal.loadingProposals">
            <Loading height="6" />
          </div>
        </div>

      </div>

      <div class="col-span-1">

        <!-- Progress -->
        <div class="bg-white rounded shadow" v-if="data?.status != 'opened'">
          <div class="px-5 py-3 border-b border-slate-300">
            Progres Kerja
          </div>
          <div class="p-5 flex items-center justify-center">
            <div class="w-36 h-36 rounded-full flex items-center justify-center" style="border: 2rem solid #79C7C6">
              100%</div>
          </div>
        </div>

        <!-- Projects -->
        <ProjectListMin :class="`${data?.status != 'opened' ? 'mt-3' : ''}`" />

      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import ProjectListMin from '../base/ProjectListMin.vue';
import Loading from '../utils/Loading.vue';

</script>

<script lang="ts">
export default {
  props: {
    id: Number
  },
  data() {
    return {
      data: {},
      loading: false,
      proposal: {
        proposals: [],
        selected: null,
        loadingProposals: false,
        loadingProposal: false,
      }
    }
  },
  computed: {
  },
  methods: {
    formatDate(date: any) {
      let d = new Date(date);
      let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    formatRupiah(number: any) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(number);
    },
    getProject() {
      this.loading = true
      this.axios.get(`/project/${this.id}`)
      .then((result) => {
        this.data = result.data.data;
        this.loading = false
        this.getProposals()
      })
    },
    getImage() {
      return 'icondesain.png';
    },
    getColor() {
      return '#f5f5ff'
    },
    getProposals() {
      this.proposal.loadingProposals = true
      this.axios.get(`/project/${this.id}/proposal`)
      .then((result) => {
        this.proposal.proposals = result.data.data;
        this.proposal.loadingProposals = false
      })
    }
  },
  mounted() {
      this.getProject()
  },
}
</script>