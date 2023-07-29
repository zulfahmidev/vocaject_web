<template>
  <div class="h-14">
    <div class="bg-white shadow-sm fixed left-0 top-0 right-0 z-10">
      <div class="container mx-auto h-14 flex items-center justify-between px-5 md:px-0">
        <router-link :to="{name: 'Home'}">
          <img src="/logo_with_text.png" alt="vocaject logo" class="h-12">
        </router-link>
        <router-link :to="{name: 'Login'}" v-if="!isLogged" class="px-3 py-2 bg-primary hover:bg-secondary rounded text-white">
          Login
        </router-link>
        <div class="relative inline-block text-left" v-if="isLogged">
          <div class="flex items-center gap-4 cursor-pointer" @click="showProfileMenu = !showProfileMenu">
            <div class="capitalize hidden lg:block">{{ user?.name }}</div>
            <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img :src="user?.picture" alt="" class="w-full">
            </div>
          </div>
          <div class="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" v-if="showProfileMenu">
            <div class="py-1" role="none">
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              <div class="text-gray-700 block border-b px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                <div class="text-primary font-bold text-base capitalize">{{ user?.name }}</div>
                <div class="text-slate-500 capitalize">{{ user?.role }}</div>
              </div>
              <router-link :to="{name: 'Profile', params: {id: user?.id}}" class="text-gray-400 hover:bg-slate-50 px-4 flex items-center py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1" @click="showProfileMenu=false">
                <i class="fa fa-user fa-fw"></i> 
                <div class="ml-3 text-slate-800">Akun Saya</div>
              </router-link>
              <router-link :to="{name: 'EditProfile', params: {id: user?.id}}" class="text-gray-400 hover:bg-slate-50 px-4 flex items-center py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1" @click="showProfileMenu=false">
                <i class="fa fa-user-cog fa-fw"></i> 
                <div class="ml-3 text-slate-800">Edit Profile</div>
              </router-link>
              <div class="text-gray-400 hover:bg-slate-50 px-4 flex items-center cursor-pointer py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1" @click="logout">
                <i class="fa fa-sign-out-alt fa-fw"></i> 
                <div class="ml-3 text-slate-800">Keluar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showProfileMenu: false,
    }
  },
  computed: {
    isLogged() {
      return this.$store.state.logged;
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    logout() {
      this.axios.post('/auth/logout')
      .then(() => {
        this.showProfileMenu = false;
        this.$store.commit('setLogout');
      })
    }
  },
  mounted() {
  }
}
</script>