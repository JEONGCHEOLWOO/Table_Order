const mongoose = require('mongoose'); // 몽구스 임포트 -> DB

var database;

export function connectedDB(){
  var databaseUrl = 'mogodb://localhost:27017/local'

  MongoClient.connect(databaseUrl, function(err, db) {
    
    if (err) throw err;
    
    console.log('connected DB: ' + databaseUrl);

    database = db;
  });

}

//------------------------------------------------------------------------------------------------------------------------------

// mongoose
//   .connect( // 몽구스 연결
//     'mongodb+srv://tony.9m16o0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   )
//   .then(() => console.log('MongoDB conected')) // 몽구스 연결 시 출력
//   .catch((error) => {
//     console.log(error);
//   });

//------------------------------------------------------------------------------------------------------------------------------
// // Using Node.js `require()`
// const mongoose = require('mongoose');

// // Using ES6 imports
// import mongoose from 'mongoose';

// await mongoose.connect('mongodb://127.0.0.1/my_database');

//------------------------------------------------------------------------------------------------------------------------------
// import { createRequire } from 'https://deno.land/std@0.177.0/node/module.ts';
// const require = createRequire(import.meta.url);

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));