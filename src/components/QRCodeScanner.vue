<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'vue-router';

const qrCodeContainerId = 'qr-code-reader';
const qrCodeMessage = ref('掃描行動條碼！加入更多板塊吧～');
const router = useRouter();

let html5QrcodeScanner: Html5QrcodeScanner | null = null;

const onScanSuccess = (decodedText: string, decodedResult: any) => {
  console.log(`QR Code 掃描成功：${decodedText}`);
  qrCodeMessage.value = `掃描結果：${decodedText}`;
 
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear();
    router.push({ name: 'scan-result', params: { data: decodedText } });
  }
};

const onScanFailure = (error: string) => {
  console.warn(`QR Code 掃描失敗：${error}`);
};

onMounted(() => {
  html5QrcodeScanner = new Html5QrcodeScanner(
    qrCodeContainerId,
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    },
    /* verbose= */ false
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});

// onUnmounted(() => {
//   if (html5QrcodeScanner) {
//     html5QrcodeScanner.clear()
//       .then(() => {
//         console.log("QR Code 掃描器已停止並清理。");
//       })
//       .catch((error) => {
//         console.error("停止 QR Code 掃描器時出錯：", error);
//       });
//   }
// });
</script>

<template>
    <div id="qr-code-scanner-page">
        <p>{{ qrCodeMessage }}</p>
        <div :id="qrCodeContainerId" style="width: 100%; height: 70%; margin: 20px auto;"></div>
    </div>
</template>

<style scoped>
#qr-code-scanner-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vh;
  padding-top: 60px;
  background-color: #f0f0f0;
  color: #333;
}

p {
  margin-bottom: 30px;
  font-size: 1.1em;
}

/* 可以為掃描框添加一些樣式 */
#qr-code-reader {
  border: 2px solid #007bff;
  border-radius: 8px;
  overflow: hidden; /* 確保內容不會溢出邊框 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 針對 html5-qrcode 內部生成的一些元素可能需要微調 */
.html5-qrcode-button {
    /* 掃描器內部的按鈕樣式 */
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
}
.html5-qrcode-button:hover {
    background-color: #0056b3;
}
</style>