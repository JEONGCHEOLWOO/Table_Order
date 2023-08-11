// express는 프레임워크
// express 사용법1
const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')  // 클라이언트에 문자열로 응답을 보냄 // http 모듈에서는 res.write()를 씀
    // res.sendFile('/uploads/' + uid + '/' + file);    // 인자로 넣은 경로의 파일을 클라이언트에 전송 
    // res.end('Hello World')   // 인자로 넣은 응답을 마지막으로 보내고 응답을 종료
    // res.json({ user: 'tj' });    // 클라이언트에 json 형태의 응답을 보냄
});

app.listen(4000, () => {
    console.log('Connected sever');
});

//------------------------------------------------------------------------------------
//express 사용법2
const express = require('express');

const app1 = express();
app1.set('port', process.env.PORT || 4000); // 포트 지정 (process.env 객체에 기본 포트 번호가 있다면 해당 포트를, 없으면 4000포트로 지정)

app1.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // 패키지 내에서 index.html파일을 서버에 보냄 (http 모듈을 사용할 땐 writeHeader를 사용)
});

app1.listen(app1.get('port'), () => {
    console.log(app1.get('port'), 'port Connected to server')
});

//------------------------------------------------------------------------------------
// http 모듈 사용
// 0 ~ 1023: 이미 사용되고 있는 포트이므로 사용 불가
// 1024 ~ 49151: 벤더가 할당 받아 사용하는 포트
// 49152 ~ 65535: 주로 시스템에서 사용

// http 상태 코드(요청 코드)
// 200: 요청 성공
// 204: 요청은 성공했으나 제공할 내용 없음
// 304: 요청을 처리하기 위한 추가적인 자료 필요(204와 동일)
// 400: 클라이언트 서버 오류
// 401: 요청을 위한 권환 요구
// 403: 요청이 서버에 의해 거부됨
// 404: 요청한 URL을 찾을 수 없음
// 500: 서버에 오류가 발생하여 응답이 불가능

const http = require('http');

http.createServer((req, res) => { // 서버를 만드는 함수
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); // 응답에 대한 정보를 기록하는 함수
    res.write('hello', () => {
        console.log('Write completed, do more writes now.');
    });
    res.write('<h1>Node.js로 서버 만들기</h1>')
})

    .listen(4000, () => {
        console.log('Connected to server on port 4000')
    })

//------------------------------------------------------------------------------------
// 미들웨어 (app.use()를 사용)
// 요청과 응답 사이에 express자체에 있는 기능 이외에 추가적인 기능을 넣을 수 있는 중간 단계 역활
// app.use() 와 app.set() 차이점은 app.set()는 전역으로 사용됨
// 자주 사용하는 미들웨어 express.static(), router, morgan, express.json(), express.urlencoded()
const express = require('express');
const app2 = express()

app2.get('/', (req, res, next) => {
    res.send('Hello World');
    next(); // 다음 미들웨어로 가는 역할
});

const myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

app.use(myLogger)

app2.listen(4000, () => {
    console.log('Connected sever');
});