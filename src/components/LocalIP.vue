<template>
    <div>
      <h1>取得本地 IP 位址</h1>
      <p v-if="ipAddress">本地 IP：{{ ipAddress }}</p>
      <p v-else>正在獲取本地 IP...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const ipAddress = ref(null);
  
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      if (RTCPeerConnection) {
        const rtc = new RTCPeerConnection();
        rtc.createDataChannel(''); // 創建一個可以傳送任意數據的數據通道
        rtc.createOffer((offerDesc) => { // 創建並儲存一個 SDP 數據
          rtc.setLocalDescription(offerDesc);
        }, (e) => { console.log(e); });
  
        rtc.onicecandidate = (evt) => { // 監聽 candidate 事件
          if (evt.candidate) {
            console.log('evt:', evt.candidate);
            const ip_rule = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
            const ip_addr = ip_rule.exec(evt.candidate.candidate)[1];
            console.log('ip_addr:', ip_addr); // 打印獲取的 IP 位址
            ipAddress.value = ip_addr; // 將 IP 位址賦值給變數
          }
        };
      } else {
        console.log("沒有找到 RTCPeerConnection");
      }
    } else {
      console.log("不是瀏覽器環境");
    }
  });
  </script>
  
  <style scoped>
  /* 這裡可以加入你的樣式 */
  </style>
  