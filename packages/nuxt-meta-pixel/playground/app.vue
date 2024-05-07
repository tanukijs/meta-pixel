<script setup lang="ts">
const { $fbq } = useNuxtApp()
onMounted(() => console.log($fbq))
</script>

<template>
  <div>
    Nuxt module playground!
  </div>
</template>
