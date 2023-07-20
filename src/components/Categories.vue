<template>
  <div>
    <div class="relative mb-2">
      <input type="text" placeholder="Cari proyek..." class="pl-4 pr-12 py-2 shadow rounded outline-none focus:shadow-lg w-full bg-white" v-model="title" @keyup.enter="getProject">
      <div class="absolute right-4 top-2 text-gray-400">
        <i class="fa fa-magnifying-glass"></i>
      </div>
    </div>
    <div class="py-2 hidden md:block">
      Kategori Proyek
    </div>
    <div class="flex gap-2 justify-center md:block">
      <router-link :to="{name: 'Home', state:{}}" class="cursor-pointer bg-white shadow flex items-center w-full rounded mb-2 hover-comp hover-comp justify-center lg:justify-start" @click="getByCategory('')">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <i class="fa fa-list"></i>
        </div>
        <div class="hidden lg:block">Semua</div>
      </router-link>
      <router-link :to="{name: 'Home', state:{filter:{title, category: 'situs-web'}}}" class="cursor-pointer bg-white shadow flex items-center w-full rounded mb-2 hover-comp hover-comp justify-center lg:justify-start" @click="getByCategory('situs-web')">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <i class="fa fa-code"></i>
        </div>
        <div class="hidden lg:block">Website</div>
      </router-link>
      <router-link :to="{name: 'Home', state:{filter:{title, category: 'aplikasi-seluler'}}}" class="cursor-pointer bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start" @click="getByCategory('aplikasi-seluler')">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <i class="fa fa-mobile"></i>
        </div>
        <div class="hidden lg:block">Aplikasi Seluler</div>
      </router-link>
      <router-link :to="{name: 'Home', state:{filter:{title, category: 'pengembangan-permainan'}}}" class="cursor-pointer bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start" @click="getByCategory('pengembangan-permainan')">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <i class="fa fa-gamepad"></i>
        </div>
        <div class="hidden lg:block">Pengembang Permainan</div>
      </router-link>
      <router-link :to="{name: 'Home', state:{filter:{title, category: 'desain-grafis'}}}" class="cursor-pointer bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start" @click="getByCategory('desain-grafis')">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <i class="fa fa-paint-brush"></i>
        </div>
        <div class="hidden lg:block">Desain Grafis</div>
      </router-link>
      <router-link :to="{name: 'Home', state:{filter:{title, category: 'editor'}}}" class="cursor-pointer bg-white shadow flex items-center w-full rounded mb-2 hover-comp justify-center lg:justify-start" @click="getByCategory('editor')">
        <div class="w-14 h-12 flex items-center justify-center text-2xl text-primary">
          <i class="fa fa-file-video"></i>
        </div>
        <div class="hidden lg:block">Pengeditan Video</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      category: '',
    }
  },
  methods: {
    getProject() {
      if (this.$route.name == 'Home') {
        this.$emit('get_project', {
          title: this.title,
          category: this.category,
          take: 10,
          offset: 0,
        })
      }
    },
    getByCategory(name) {
      this.category = name;
      this.getProject();
    }
  }
}
</script>