<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const BASE_URL = 'https://romandy-toolbox.netlify.app'

watch(
  () => route.path,
  (path) => {
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', `${BASE_URL}${path === '/' ? '' : path}`)
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen flex flex-col" :style="{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
