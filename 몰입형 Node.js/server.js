const express = require('express'); // express 임포트

const port = 4000 // 서버 포트 번호
const app = express() // app 생성 => 서버 생성

app.use(express.json());

app.get('/', function (req, res) { // 서버에 접속요청이 오면 'Connected to server'를 출력
  res.json({msg: 'Hello World'});
  // res.send('Hello World')
  console.log('Connected to server')
});  

// 서버 실행
app.listen(port, () => {
  console.log(`Connected to server on port ${port}`);
});


