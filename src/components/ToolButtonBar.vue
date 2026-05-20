<script setup lang="ts">
const emit = defineEmits(['convert', 'copy', 'clear'])
function click(t: 'convert' | 'copy' | 'clear') { emit(t) }
</script>

<template>
  <div style="display: flex; justify-content: center; gap: 12px; padding: 12px 0;">
    <button @click="click('convert')" class="btn-act"> 转换 </button>
    <button @click="click('copy')" class="btn-act"> 复制 </button>
    <button @click="click('clear')" class="btn-act"> 清空 </button>
  </div>
</template>

<style scoped>
.btn-act {
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}
.btn-act:first-child {
  background-color: #3b82f6;
  color: white;
}
.btn-act:not(:first-child) {
  background-color: #e5e7eb;
  color: #1a1a2e;
}
.btn-act:hover {
  opacity: 0.85;
}
</style>
