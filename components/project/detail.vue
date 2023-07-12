<template>
  <div class="col-span-2">
    <div class="bg-white shadow rounded p-3">
      <NuxtLink to="/" class="flex items-center p-2 rounded hover:bg-slate-100 active:bg-slate-200 w-fit cursor-pointer">
        <Icon name="fa6-solid:arrow-left" />
        <div class="ml-4">Kembali</div>
      </NuxtLink>
      <div class="p-3">
        <div class="block lg:flex justify-between">
          <div class="w-full">
            <div class="text-2xl font-black">Vocaject Project</div>
            <div class="text-lg text-primary capitalize">Aplikasi seluler</div>
          </div>
          <div class="flex flex-col justify-center border-t mt-2 pt-2 lg:border-none lg:mt-0 lg:pt-2">
            <div class="font-black">Anggaran:</div>
            <div class="">{{ curFormat(140000000) }}</div>
          </div>
        </div>
        <div class="text-sm text-justify py-3 border-y my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ullam magni unde, eos quidem est ipsam mollitia similique tempore minima iste, eaque recusandae, fugit explicabo perspiciatis facere quo ipsa ad fuga harum rerum itaque. Quia officia vel numquam quasi tenetur amet iure aliquid temporibus cumque error dolores vitae consectetur doloremque ea corporis quam doloribus aliquam totam, quaerat consequuntur enim eligendi atque. Hic voluptate ipsa repellat animi, veniam sed perferendis quod recusandae rem, voluptatibus non et fuga a libero odio maxime magni reiciendis quam. Eaque, magnam nemo fugiat a facilis at recusandae laborum ipsum odio optio reprehenderit, vitae eveniet vero, eius aut debitis quam doloribus obcaecati autem ratione libero perspiciatis rerum minus. Vero nesciunt archit.</div>
        <div class="flex">
          <NuxtLink to="/" class="flex">
            <div class="w-24 mr-0 rounded overflow-hidden">
              <img src="/sample.png" :alt="company_name">
            </div>
            <div class="pl-4 flex flex-col justify-center">
              <div class="font-bold capitalize text-lg hover:underline cursor-pointer">Google Indonesia</div>
              <div class="text-primary capitalize">Jakarta Pusat</div>
              <div class="text-xs">
                <Icon name="fa6-regular:envelope" class="mr-1" />
                google.indonesia@gmail.com
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="border-t my-2 pt-3">
          <div class="font-black text-center">Progress Kerja</div>
          <div class="text-sm text-center text-slate-600">5 Task Selasai dari 10 Task</div>
          <div class="h-6 rounded-full w-full bg-slate-200 mt-2 p-1">
            <div class="h-4 rounded-full bg-primary" style="width: 50%;">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex py-3 gap-4">
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=0">
        <Icon name="fa6-solid:comment-dots" class="text-3xl text-primary" />
        <div class="font-black text-xl hidden lg:block">Chat Group</div>
      </div>
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=1">
        <Icon name="fa6-solid:clipboard-list" class="text-3xl text-primary" />
        <div class="font-black text-xl hidden lg:block">Todolist</div>
      </div>
      <div class="bg-white p-4 rounded shadow w-full flex items-center gap-2 justify-center hover-comp cursor-pointer" @click="tab=2">
        <Icon name="fa6-solid:book" class="text-3xl text-primary" />
        <div class="font-black text-xl hidden lg:block">Log Book</div>
      </div>
    </div>
    <ProjectChat v-if="tab==0" />
    <ProjectTodolist v-if="tab==1" />
    <ProjectLogbook v-if="tab==2" />
  </div>
</template>

<script>
export default {
  props: {
    picture: String,
    title: String,
    company_name: String,
    budget: Number,
    category: String,
  },
  data() {
    return {
      tab: 0,
    }
  },
  methods: {
    curFormat(number) {
      let n = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
      return n.format(number);
    }
  }
}
</script>