<template>
  <div>
    <h1 id="first">
      index page
    </h1>
    <ul>
      <li>
        <NuxtLink :to="{hash: '#second'}">
          Go to second title
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{name: 'about'}">
          Go to about
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{name: 'posts-slug', params: {slug: 'meta-pixel'}}">
          Go to posts
        </NuxtLink>
      </li>
    </ul>

    <h2 id="second">
      second title
    </h2>
    <ul>
      <li>
        <NuxtLink :to="{hash: '#first'}">
          Go to first title
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>