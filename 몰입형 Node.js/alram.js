const axios = require('axios');

// 카카오톡 비즈메시지 API 설정
const BASE_URL = 'https://kapi.kakao.com/v2/bm';
const API_KEY = 'bd819843c3fbb6c17ac8a97c5f9b4210'; // 실제 API 키로 대체해야 함

// 알림톡 템플릿 ID
const TEMPLATE_ID = '96951'; // 실제 템플릿 ID로 대체해야 함

// 알림톡 전송 함수
export async function sendNotification(userId, messageParams) {
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const data = {
    template_id: TEMPLATE_ID,
    receiver_uuids: `[${userId}]`,
    messages: JSON.stringify([
      {
        message: messageParams,
      },
    ]),
  };

  try {
    const response = await axios.post(`${BASE_URL}/send/multi`, new URLSearchParams(data).toString(), { headers });
    console.log('Notification sent:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// // 사용 예시
// const userId = 'ringud1'; // 실제 사용자 ID로 대체해야 함
// const messageParams = {
//   name: '홍길동'
// };

// sendNotification(userId, messageParams);