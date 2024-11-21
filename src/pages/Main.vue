<template>
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="item in router.options.routes[0].children" :key="item.path" :icon="item.meta.icon"
      :url="`#/${item.path}`">
      {{ item.meta.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const active = ref(0)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const data = router.options.routes[0]
  active.value = data.children.findIndex(item => '/' + item.path === route.path)
})



</script>