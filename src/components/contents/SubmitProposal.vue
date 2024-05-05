<template>
  <main class="col-span-3">

    <div class="grid grid-cols-3 gap-3">

      <!-- Detail Project -->
      <div class="col-span-2 bg-white shadow rounded h-fit">

        <!-- Header -->
        <div class="p-3 border-b border-slate-300 text-slate-500 flex justify-between">
          <div class="hover:text-black cursor-pointer flex gap-3 items-center w-fit" @click="$router.back()">
            <div class="text-xl">
              <i class="fa fa-arrow-left"></i>
            </div>
            <div class="">Kembali</div>
          </div>
        </div>

        <!-- Detail Project -->
        <div class="p-3">

          <div class="mt-3">
            <label class="text-sm" for="">Anggota:</label>

            <!-- Student Added -->
            <div class="flex gap-2 mb-2 flex-wrap mt-1">
              <div class="py-1 px-2 w-fit text-sm rounded bg-light flex items-center" v-for="(item, index) in studentSelecteds" :key="index">
                <span class="mr-1 text-primary">{{ item.name }}</span> <i @click="deleteStudent(index)" class="fa text-primary cursor-pointer fa-fw fa-times"></i>
              </div>
            </div>

            <!-- Search Student -->
            <input type="text" ref="searchStudent" v-model="searchStudent" class="py-2 px-3 outline-none focus:border-primary rounded border w-full" placeholder="Nama atau nim">

            <!-- Result Search -->
            <div class="border py-2 rounded mt-1" v-if="searchStudent.trim() != ''">
              <div class="text-xs text-slate-600 py-2 px-3" v-if="loadingSearch">Sedang mencari...</div>
              <div class="text-xs text-slate-600 py-2 px-3" v-if="!loadingSearch && searchResult.length == 0">Mahasiswa tidak dapat ditemukan.</div>
              <div class="py-2 px-3 bg-slate-100 mb-1 flex justify-between items-center" v-for="(item, index) in searchResult" :key="index">
                <div class="">{{ item.name }} | {{ item.nim }}</div>
                <div class="">
                  <div class="p-2 bg-primary/90 cursor-pointer active:bg-primary rounded text-white text-xs" @click="addStudent(item)">
                    <i class="fa fa-plus fa-fw"></i> Tambah
                  </div>
                </div>
              </div>
            </div>

            <div class="text-xs text-red-500" v-if="errors.student_ids">{{ errors.student_ids[0] }}</div>
          </div>
          <div class="mt-3">
            <label class="text-sm" for="">Lampiran:</label>

            <input type="file" class="hidden" ref="attachment" @change="onSelectAttachment" multiple>

            <div class="flex flex-wrap gap-1 mb-2">
              <div class="py-1 px-2 bg-light rounded flex justify-between items-center" v-for="(item, index) in attachments" :key="index">
                <div class="text-xs text-primary max-w-20 whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ item.name }}
                </div>
                <div class="ml-1 text-primary cursor-pointer text-xs" @click="attachments.splice(index, 1)">
                  <i class="fa fa-fw fa-times"></i>
                </div>
              </div>
            </div>

            <div class="flex p-2 rounded w-fit bg-light border border-primary text-primary items-center cursor-pointer" 
            @click="() => {
              $refs['attachment'].value = ''
              attachmentSelected = null
            }"
            v-if="attachmentSelected">
              <i class="fa fa-times text-sm fa-fw mx-1"></i>
              <span class="text-sm mx-1">{{ $refs['attachment'].files[0].name }}</span>
            </div>

            <div class="flex py-2 px-2 border rounded w-fit items-center cursor-pointer" @click="$refs['attachment'].click()" v-if="!attachmentSelected">
              <i class="fa fa-upload text-sm fa-fw mx-1"></i>
              <span class="text-sm mx-1">Tambahkan File</span>
            </div>

            <div class="text-xs text-red-500" v-if="errors.attachments">{{ errors.attachments[0] }}</div>
          </div>

          <div class="mt-3">
            <label class="text-sm" for="">Catatan:</label>
            <textarea v-model="note" rows="5"class="py-2 px-3 border rounded focus:border-primary outline-none w-full" placeholder="Ketik disini..."></textarea>
            <div class="text-xs text-red-500" v-if="errors.note">{{ errors.note[0] }}</div>
          </div>

          <div class="mt">
            <button @click="send" class="py-2 mt-2 px-3 w-full bg-primary/90 active:bg-primary rounded text-white">
              <Loading height="6" v-if="loading" />
              <span v-if="!loading">Kirim</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <ProjectListMin />
      <!-- <div class="col-span-1">
      </div> -->
    </div>

  </main>
</template>

<script setup lang="ts">
import ProjectListMin from '../base/ProjectListMin.vue';
import Loading from '../utils/Loading.vue';

</script>

<script lang="ts">
export default {
  data() {
    return {
      searchStudent: '',
      searchResult: [],
      loading: false,
      loadingSearch: false,
      studentSelecteds: [],
      attachmentSelected: false,
      note: '',
      attachments: [],
      errors: {
        note: [],
        student_ids: [],
        attachments: [],
      }
    }
  },
  methods: {
    getStudents() {
      let company_id = this.$store.state.user.college.id
      this.searchResult = []
      if (this.searchStudent) {
        this.loadingSearch = true;
        let searchBy = `nim=${this.searchStudent}`;
        if (isNaN(this.searchStudent)) {
          searchBy = `name=${this.searchStudent}`;
        }
        this.axios.get(`/user/student/${company_id}?${searchBy}&limit=2`)
        .then(({data: res}) => {
          this.searchResult = res.data;
          this.loadingSearch = false;
        })
      }
    },
    addStudent(student) {
      this.studentSelecteds.push(student);
      this.searchStudent = ''
    },
    deleteStudent(index) {
      this.studentSelecteds.splice(index, 1);
    },
    send() {
      this.$swal.fire({
        title: 'Apakah anda sudah yakin?',
        text: 'Anda tidak dapat membatalkan atau mengubah proposal setelah terkirim hinga ditolak.',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal"
      }).then(({isConfirmed}) => {

        if (isConfirmed) {

          this.loading = true;
    
          let fd = new FormData();
    
          let student_ids = []
          for (let i = 0; i < this.studentSelecteds.length; i++) {
            fd.append('student_ids[]', this.studentSelecteds[i].id);
            student_ids.push(this.studentSelecteds[i].id)
          }
    
          for (let i = 0; i < this.attachments.length; i++) {
            fd.append('attachment_'+i, this.attachments[i]);
          }
    
          fd.append('note', this.note);
    
          fd.append('lecture_id', this.$store.state.user.id);
    
          let project_id = this.$route.params.id
    
          this.axios.post(`/project/${project_id}/proposal`, fd)
          .then(({data: res}) => {
            this.loading = false;
            this.$router.back()
          })
          .catch(({response: {
            data: err,
            status
          }}) => {
            console.log(err)
            this.loading = false;
            this.errors = {
              note: [],
              student_ids: [],
              attachments: [],
            }
            if (status == 400) {
              for (const key in err.data) {
                const v = err.data[key];
                this.errors[key] = v;
              }
            }
          });
        }
      })
    },
    onSelectAttachment({target}) {
      for (let i=0; i<target.files.length; i++) {
        this.attachments.push(target.files[i])
      }
    }
  },
  mounted() {
    this.$refs['searchStudent'].oninput = this.getStudents;
  }
}
</script>