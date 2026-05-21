<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()
</script>

<template>
  <footer class="py-6 text-center text-sm" :style="{ color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }">
    <p>&copy; {{ new Date().getFullYear() }} ToolBox. {{ t('footer.copyright') }}</p>
  </footer>
</template>
