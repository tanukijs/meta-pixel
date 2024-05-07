<script setup lang="ts">
const { $fbq } = useNuxtApp()
const YOUR_PIXEL_ID = ''

$fbq('track', 'CompleteRegistration')
$fbq('trackSingle', YOUR_PIXEL_ID, 'CompleteRegistration')
$fbq('track', 'AddToCart')
</script>

<template>
  <NuxtPage />
</template>
