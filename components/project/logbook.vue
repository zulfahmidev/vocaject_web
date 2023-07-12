<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div :class="{'hidden lg:block':selected}">
      <div class="bg-white rounded shadow p-3 hover-comp cursor-pointer h-fit" @click="selected=!selected">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gray-200">
            <!-- Image -->
          </div>
          <div class="flex flex-col">
            <div class="font-bold">Zulfahmi</div>
            <div class="text-sm text-secondary">Mahasiswa</div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'hidden':!selected}" class="lg:block lg:col-span-2">

      <div class="bg-white my-2 rounded p-1 shadow lg:hidden">
        <div class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 cursor-pointer" @click="selected=!selected">
          <Icon name="fa6-solid:arrow-left" class="mr-2" />
          Kembali
        </div>
      </div>
      <div class="bg-white rounded p-4 shadow">
        <div class="text-sm text-primary font-black">Selasa</div>
        <div class="text-sm font-black">07 Juli 2023</div>
        <div class="py-2 text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, possimus. Tempore, eligendi perspiciatis facere, non accusantium consectetur numquam ipsam consequuntur molestias, dolorem assumenda? Quia mollitia officiis exercitationem. Earum pariatur temporibus, quasi saepe commodi dolor nemo eos totam tempora voluptas quam enim quia repellendus quis, repellat reiciendis cum voluptate. Eaque iusto aliquam ducimus quia pariatur qui facere, ex accusantium placeat minus corrupti sit deserunt aliquid esse reiciendis nesciunt consequuntur repellendus tempore at iste, alias numquam adipisci eos sunt. Recusandae, odio! Molestias laborum reprehenderit voluptatem beatae ex at ipsam provident? Consequatur assumenda atque modi recusandae laudantium totam eos dignissimos officia magnam ipsum?</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: false
    }
  },
}
</script>