<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import AdBanner from '@/components/AdBanner.vue'

const { t } = useLocale()
usePageMeta(t('tools.qrcode.title'), t('seo.qrcode'))

type Mode = 'text' | 'url' | 'vcard' | 'wifi' | 'sms' | 'phone' | 'email' | 'wechat' | 'qq' | 'password' | 'decode'

const mode = ref<Mode>('text')
const qrDataUrl = ref('')
const decodeResult = ref('')
const decodeError = ref('')

const modes: { id: Mode; labelKey: string }[] = [
  { id: 'text', labelKey: 'tools.qrcode.text' },
  { id: 'url', labelKey: 'tools.qrcode.url' },
  { id: 'vcard', labelKey: 'tools.qrcode.vcard' },
  { id: 'wifi', labelKey: 'tools.qrcode.wifi' },
  { id: 'sms', labelKey: 'tools.qrcode.sms' },
  { id: 'phone', labelKey: 'tools.qrcode.phone' },
  { id: 'email', labelKey: 'tools.qrcode.email' },
  { id: 'wechat', labelKey: 'tools.qrcode.wechat' },
  { id: 'qq', labelKey: 'tools.qrcode.qq' },
  { id: 'password', labelKey: 'tools.qrcode.password' },
  { id: 'decode', labelKey: 'tools.qrcode.decode' },
]

// Common options
const fgColor = ref('#000000')
const bgColor = ref('#FFFFFF')
const ecLevel = ref<'L' | 'M' | 'Q' | 'H'>('M')

// Text
const textContent = ref('')

// URL
const urlContent = ref('https://')

// vCard
const vFirstName = ref('')
const vLastName = ref('')
const vPhone = ref('')
const vEmail = ref('')
const vOrg = ref('')
const vTitle = ref('')

// WiFi
const wifiSsid = ref('')
const wifiPwd = ref('')
const wifiEncryption = ref<'WPA' | 'WEP' | 'nopass'>('WPA')

// SMS
const smsPhone = ref('')
const smsBody = ref('')

// Phone
const phoneNumber = ref('')

// Email
const emailAddr = ref('')
const emailSubject = ref('')
const emailBody = ref('')

// WeChat
const wechatId = ref('')

// QQ
const qqNumber = ref('')

// Password
const passwordContent = ref('')

const qrContent = computed(() => {
  switch (mode.value) {
    case 'text': return textContent.value
    case 'url': return urlContent.value
    case 'vcard': {
      const parts = ['BEGIN:VCARD', 'VERSION:3.0']
      if (vFirstName.value || vLastName.value)
        parts.push(`FN:${vFirstName.value} ${vLastName.value}`.trim())
      if (vPhone.value) parts.push(`TEL:${vPhone.value}`)
      if (vEmail.value) parts.push(`EMAIL:${vEmail.value}`)
      if (vOrg.value) parts.push(`ORG:${vOrg.value}`)
      if (vTitle.value) parts.push(`TITLE:${vTitle.value}`)
      parts.push('END:VCARD')
      return parts.join('\n')
    }
    case 'wifi': {
      let s = `WIFI:T:${wifiEncryption.value};`
      if (wifiSsid.value) s += `S:${wifiSsid.value};`
      if (wifiEncryption.value !== 'nopass' && wifiPwd.value) s += `P:${wifiPwd.value};`
      s += ';'
      return s
    }
    case 'sms': return `smsto:${smsPhone.value}:${smsBody.value}`
    case 'phone': return `tel:${phoneNumber.value}`
    case 'email': return `mailto:${emailAddr.value}?subject=${encodeURIComponent(emailSubject.value)}&body=${encodeURIComponent(emailBody.value)}`
    case 'wechat': return wechatId.value ? `weixin://dl/chat?${wechatId.value}` : ''
    case 'qq': return qqNumber.value ? `mqqwpa://im/chat?chat_type=wpa&uin=${qqNumber.value}` : ''
    case 'password': return passwordContent.value
    default: return ''
  }
})

watch([qrContent, fgColor, bgColor, ecLevel], async () => {
  await nextTick()
  generateQR()
}, { immediate: false })

async function generateQR() {
  const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement
  if (!canvas) return
  const content = qrContent.value
  if (!content) { qrDataUrl.value = ''; return }

  try {
    await QRCode.toCanvas(canvas, content, {
      width: 300,
      margin: 2,
      color: { dark: fgColor.value, light: bgColor.value },
      errorCorrectionLevel: ecLevel.value,
    })
    qrDataUrl.value = canvas.toDataURL('image/png')
  } catch { /* ignore */ }
}

function download() {
  if (!qrDataUrl.value) return
  const a = document.createElement('a')
  a.href = qrDataUrl.value
  a.download = 'qrcode.png'
  a.click()
}

// Decode
const fileInput = ref<HTMLInputElement>()

function onFileSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  decodeError.value = ''
  decodeResult.value = ''
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      decodeResult.value = code.data
    } else {
      decodeError.value = t('tools.qrcode.decodeFail')
    }
  }
  img.onerror = () => { decodeError.value = t('tools.qrcode.decodeFail') }
  img.src = URL.createObjectURL(file)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <AdBanner position="header" />
    <h1 class="text-2xl font-bold mb-6">{{ t('tools.qrcode.title') }}</h1>

    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="m in modes" :key="m.id"
        @click="mode = m.id"
        class="px-3 py-1.5 rounded text-sm transition-all duration-200 border"
        :style="mode === m.id
          ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
      >
        {{ t(m.labelKey) }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <template v-if="mode === 'text'">
          <label class="block text-sm font-medium">{{ t('tools.qrcode.textContent') }}</label>
          <textarea v-model="textContent" rows="4"
            class="w-full px-3 py-2 rounded border text-sm font-mono resize-y"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"></textarea>
        </template>

        <template v-else-if="mode === 'url'">
          <label class="block text-sm font-medium">{{ t('tools.qrcode.urlContent') }}</label>
          <input v-model="urlContent" type="url"
            class="w-full px-3 py-2 rounded border text-sm"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </template>

        <template v-else-if="mode === 'vcard'">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.vFirstName') }}</label>
              <input v-model="vFirstName" class="w-full px-3 py-2 rounded border text-sm"
                :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
            </div>
            <div>
              <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.vLastName') }}</label>
              <input v-model="vLastName" class="w-full px-3 py-2 rounded border text-sm"
                :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.vPhone') }}</label>
            <input v-model="vPhone" type="tel" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.vEmail') }}</label>
            <input v-model="vEmail" type="email" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.vOrg') }}</label>
            <input v-model="vOrg" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.vTitle') }}</label>
            <input v-model="vTitle" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
        </template>

        <template v-else-if="mode === 'wifi'">
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.wifiSsid') }}</label>
            <input v-model="wifiSsid" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.wifiPwd') }}</label>
            <input v-model="wifiPwd" type="password" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.wifiEncryption') }}</label>
            <select v-model="wifiEncryption" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">{{ t('tools.qrcode.wifiNone') }}</option>
            </select>
          </div>
        </template>

        <template v-else-if="mode === 'sms'">
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.smsPhone') }}</label>
            <input v-model="smsPhone" type="tel" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.smsBody') }}</label>
            <textarea v-model="smsBody" rows="3"
              class="w-full px-3 py-2 rounded border text-sm font-mono resize-y"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"></textarea>
          </div>
        </template>

        <template v-else-if="mode === 'phone'">
          <label class="block text-sm font-medium">{{ t('tools.qrcode.phoneNumber') }}</label>
          <input v-model="phoneNumber" type="tel" class="w-full px-3 py-2 rounded border text-sm"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </template>

        <template v-else-if="mode === 'email'">
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.emailAddr') }}</label>
            <input v-model="emailAddr" type="email" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.emailSubject') }}</label>
            <input v-model="emailSubject" class="w-full px-3 py-2 rounded border text-sm"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">{{ t('tools.qrcode.emailBody') }}</label>
            <textarea v-model="emailBody" rows="3"
              class="w-full px-3 py-2 rounded border text-sm font-mono resize-y"
              :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"></textarea>
          </div>
        </template>

        <template v-else-if="mode === 'wechat'">
          <label class="block text-sm font-medium">{{ t('tools.qrcode.wechatId') }}</label>
          <input v-model="wechatId" class="w-full px-3 py-2 rounded border text-sm"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </template>

        <template v-else-if="mode === 'qq'">
          <label class="block text-sm font-medium">{{ t('tools.qrcode.qqNumber') }}</label>
          <input v-model="qqNumber" type="number" class="w-full px-3 py-2 rounded border text-sm"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </template>

        <template v-else-if="mode === 'password'">
          <label class="block text-sm font-medium">{{ t('tools.qrcode.passwordContent') }}</label>
          <textarea v-model="passwordContent" rows="4"
            class="w-full px-3 py-2 rounded border text-sm font-mono resize-y"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"></textarea>
        </template>

        <template v-else-if="mode === 'decode'">
          <div class="p-6 rounded-xl border text-center"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
            <input ref="fileInput" type="file" accept="image/*" @change="onFileSelected"
              class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium"
              :style="{ color: 'var(--text-primary)' }">
            <div v-if="decodeResult" class="mt-4 p-4 rounded border"
              :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }">
              <div class="text-xs font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.qrcode.decodeResult') }}</div>
              <p class="text-sm font-mono break-all" :style="{ color: 'var(--text-primary)' }">{{ decodeResult }}</p>
            </div>
            <div v-if="decodeError" class="mt-4 text-sm" style="color:rgb(239,68,68)">{{ decodeError }}</div>
          </div>
        </template>

        <!-- Beautification options (shown for all generation modes) -->
        <template v-if="mode !== 'decode'">
          <div class="pt-4 border-t" :style="{ borderColor: 'var(--border-color)' }">
            <div class="text-sm font-medium mb-2">{{ t('tools.qrcode.beautify') }}</div>
            <div class="flex flex-wrap gap-4">
              <div>
                <label class="block text-xs mb-1">{{ t('tools.qrcode.fgColor') }}</label>
                <input v-model="fgColor" type="color" class="w-10 h-10 rounded cursor-pointer border-0 p-0">
              </div>
              <div>
                <label class="block text-xs mb-1">{{ t('tools.qrcode.bgColor') }}</label>
                <input v-model="bgColor" type="color" class="w-10 h-10 rounded cursor-pointer border-0 p-0">
              </div>
              <div>
                <label class="block text-xs mb-1">{{ t('tools.qrcode.ecLevel') }}</label>
                <select v-model="ecLevel" class="px-2 py-1.5 rounded border text-xs"
                  :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
                  <option value="L">L (7%)</option>
                  <option value="M">M (15%)</option>
                  <option value="Q">Q (25%)</option>
                  <option value="H">H (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="flex flex-col items-center">
        <template v-if="mode !== 'decode'">
          <div class="p-4 rounded-xl border"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
            <canvas id="qr-canvas" width="300" height="300" class="rounded"></canvas>
          </div>
          <div v-if="qrDataUrl" class="flex gap-2 mt-4">
            <button @click="download"
              class="px-4 py-2 rounded text-sm font-medium transition-colors"
              :style="{ backgroundColor: 'var(--accent)', color: '#fff' }">
              {{ t('tools.qrcode.download') }}
            </button>
          </div>
          <div v-if="qrContent" class="mt-4 w-full">
            <div class="text-xs font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.qrcode.contentPreview') }}</div>
            <p class="text-xs font-mono p-3 rounded border break-all"
              :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
              {{ qrContent }}
            </p>
          </div>
        </template>
      </div>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
