<script setup lang="ts">
defineProps<{ position?: string }>()
</script>

<template>
  <div
    class="ad-banner flex items-center justify-center rounded my-3 overflow-hidden"
    :style="{ backgroundColor: 'var(--bg-secondary)', minHeight: '90px', border: '1px dashed var(--border-color)' }"
  >
    <span class="text-xs" :style="{ color: 'var(--text-secondary)' }">
      广告位{{ position ? ' (' + position + ')' : '' }}
    </span>
  </div>
</template>
