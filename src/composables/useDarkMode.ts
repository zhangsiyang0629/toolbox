import { ref, watch } from 'vue'

const isDark = ref(false)

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('toolbox_dark')
  if (stored !== null) {
    isDark.value = stored === 'true'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  apply()
}

function apply() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

watch(isDark, (val) => {
  localStorage.setItem('toolbox_dark', String(val))
  apply()
})

export function useDarkMode() {
  function toggle() { isDark.value = !isDark.value }
  return { isDark, toggle }
}
