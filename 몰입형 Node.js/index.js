import mongoose from 'mongoose';
const express = require('express'); // express 임포트
const {format} = require('util');
const morgan = require('morgan');
const Multer = require('multer'); // multer 임포트 -> 이미지 업로드를 도와주는 놈
const mongoose = require('mongoose'); // 몽구스 임포트 -> DB
const path = require('path') // path 임포트
const { Storage } = require('@google-cloud/storage') // 구글 클라우드 임포트



const port = 4000 // 서버 포트 번호
const app = express() // app 생성 => 서버 생성

app.set('views', path.join(__dirname, 'views')) // 폴더 경로 지정
app.set('view engine', 'pug');

// This middleware is available in Express v4.16.0 onwards
app.use(morgan('dev'))
app.use(express.json());
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const storage = new Storage({ // 스토리지 연결 및 test_torder 버킷에 접근할수 있는 객체 생성
  keyFilename: path.join(__dirname, '../몰입형 Node.js/order-394811-e26517080cfe.json'),
  projectId: "order-394811"
})

const bucket = storage.bucket('test_torder')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// 구글 클라우드 스토리지에 파일 업로드
app.post('/upload', multer.single('file'), (req, res, next) => { 
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.end(req.file.buffer);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mongoDB DataBaseName: OrderDB, collectionName: post
mongoose
  .connect( // 몽구스 연결
    'mongodb+srv://tony.9m16o0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(() => { // 몽구스 연결 시 출력
    console.log('MongoDB conected')

    var db = mongoose.connection;
    var collection = db.collection(bodylist);
    collection.insert(board)

    // DB = mongoose.DB('OrderDB');
    // var data = {bodyslist};

    // DB.collection('post').insertOne(data,() => {
    //   console.log('inserted data')
    //   DB.close();
    // }) 
    db.close();
  }) 
  .catch((error) => {
    console.log(error);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) { // 서버에 접속요청이 오면 'hello world!!'를 출력
  res.send('hello world!!');
});

var bodylist = [];

// app.get('/add', (req, res)=> {
//   res.send('bodylist txt');
// })

app.post('/add', (req, res) => {
  const board = {
    "user" : req.body.user,
    "title" : req.body.title,
    "name" : req.body.name
}


  bodylist.push(board);
  console.log(bodylist);
  // res.redirect('/add');
  res.status(200).send('Goooooooooood')
})


// // Display a form for uploading files.
app.get('/upload', (req, res) => {
  res.render('form.pug');
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// 서버 실행
app.listen(port, () => {
  console.log(`Connected to server on port ${port}`);
});

///////////////////////////////////////////////////////////////////////////////////////////
