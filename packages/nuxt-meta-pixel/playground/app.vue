<script setup lang="ts">
const { $fbq } = useNuxtApp()
onMounted(() => console.log($fbq))
</script>

<template>
  <NuxtPage />
</template>
