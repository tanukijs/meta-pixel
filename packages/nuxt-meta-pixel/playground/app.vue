<script setup lang="ts">
const { $fbq } = useNuxtApp()
$fbq('track', 'CompleteRegistration')
$fbq('trackSingle', YOUR_PIXEL_ID, 'CompleteRegistration')
</script>

<template>
  <NuxtPage />
</template>
