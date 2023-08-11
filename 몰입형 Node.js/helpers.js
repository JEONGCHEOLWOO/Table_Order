const express = require('express'); // express 임포트
const mongoose = require('mongoose'); // 몽구스 연결
const path = require('path')
const Cloud = require('@google-cloud/storage') // 구글 클라우드 연결
const { Storage } = Cloud
const app = express() // app 생성 => 서버 생성
const port = 4000 // 서버 포트 번호

const storage = new Storage({ // 스토리지 객체 생성
  keyFilename: path.join(__dirname, '../order-394811-e26517080cfe.json'),
  projectId: 'order-394811',
})

const test_torderBucket = storage.bucket('test_torder')

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async (_, {file}) => {
      const { createReadstream, filename } = await file;

      await new Promise(res =>
        createReadstream()
          .pipe(
            test_torderBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on("finish", res)  
      )

      files.push(filename)

      return true
    }

  }

}

app.get('/', function (req, res) { // 서버에 접속요청이 오면 'hello world!!'를 출력
    res.send('hello world!!');
  });

mongoose
  .connect( // 몽구스 연결
    'mongodb+srv://tony.9m16o0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected')) // 몽구스 연결 시 출력
  .catch((error) => {
    console.log(error);
  });
 
app.listen(port, () => console.log(`Connected to MongoDB`)); // 서버 연결 시 출력