const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.json());

const ADMIN_KEY = 'dd2abe88f31178ca95d65370aebd6205';
const JS_KEY = 'a90bdbcafa0d2640b4cf25be50f9f32f';

// 결제 준비
app.post('/prepare', async (req, res) => {
  try {
    const response = await axios.post(
      'https://kapi.kakao.com/v1/payment/ready',
      {
        cid: 'TC0ONETIME', // 가맹점 코드
        partner_order_id: 'order_id_123', // 가맹점 주문번호
        partner_user_id: 'user_id_123', // 가맹점 회원 ID
        item_name: '초코파이', // 상품명
        quantity: 1, // 수량
        total_amount: 2200, // 상품 총액
        tax_free_amount: 200, // 비과세 금액
        approval_url: 'http://localhost:3000/success', // 결제 성공시 리다이렉트 URL
        cancel_url: 'http://localhost:3000/cancel', // 결제 취소시 리다이렉트 URL
        fail_url: 'http://localhost:3000/fail' // 결제 실패시 리다이렉트 URL
      },
      {
        headers: {
          Authorization: `KakaoAK ${ADMIN_KEY}`,
          'Contenttype': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '결제 준비 실패' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
