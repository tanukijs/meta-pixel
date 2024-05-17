<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1 id="first">
      posts/{{ route.params.slug }}
    </h1>
    <ul>
      <li>
        <NuxtLink :to="{name: 'index'}">
          Go to index
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{name: 'posts-slug', params: {slug: 'meta-pixel'}}">
          Go to meta-pixel
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{name: 'posts-slug', params: {slug: 'nuxt-meta-pixel'}}">
          Go to nuxt-meta-pixel
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>