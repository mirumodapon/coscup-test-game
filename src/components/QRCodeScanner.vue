<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const qrcodeRegionId = 'html5qr-code-full-region'

const props = defineProps<{
  qrCodeSuccessCallback: (decodedText: string) => void
}>()

const cameraId = ref<string | null>(null)
const qrScanner = ref<Html5Qrcode | null>(null)

const config = {
  fps: 10,
  qrbox: { width: 200, height: 200 },
  aspectRatio: 1,
}

onMounted(async () => {
  try {
    const devices = await Html5Qrcode.getCameras()
    if (devices && devices.length > 0) {
      cameraId.value = devices[0].id
    }
  } catch (error) {
    console.log('permission denied')
  }
})

watch(cameraId, async (newCameraId) => {
  if (newCameraId) {
    qrScanner.value = new Html5Qrcode(qrcodeRegionId)
    try {
      await qrScanner.value.clear()
      await qrScanner.value.start(
        { facingMode: 'environment' },
        config,
        props.qrCodeSuccessCallback,
        () => {}
      )
    } catch (error) {
      console.error('Failed to start QR Scanner:', error)
    }
  }
})
</script>

<template>
  <div>
    <div
      v-if="cameraId"
      :id="qrcodeRegionId"
      style="width: 300px; height: 300px;"
    ></div>
    <div v-else>
      相機初始化中或權限未開啟...
    </div>
  </div>
</template>