<template>
  <div class="h-14">
    <div class="bg-white shadow-sm fixed left-0 top-0 right-0 z-10">
      <div class="container mx-auto h-14 flex items-center justify-between px-3 md:px-0">
        <nuxt-link to="/">
          <img src="/logo_with_text.png" alt="vocaject logo" class="h-12">
        </nuxt-link>
        <nuxt-link to="/auth/login" class="px-3 py-2 bg-primary hover:bg-secondary rounded text-white">Login</nuxt-link>
        <div class="flex items-center gap-4" v-if="logined">
          <div class="">Zulfahmi</div>
          <div class="w-10 h-10 rounded-full bg-gray-200">
            <!-- Image -->
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
      logined: false
    }
  },
}
</script>