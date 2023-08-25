const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const moment = require('moment');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const { saveMessageToDB, checkingSidToDB, pullJadwalDriverPengiriman } = require('./config/services');


app.use(cors());

const router = require("./router");
app.use(router);

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// const io = socketio(server);

app.use((req, res, next) => {
  // req.setHeader('Access-Control-Allow-Origin', '*');
  // req.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // req.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next()
})


const RESPONSE_CONNECT_BACKEND = "RESPONSE_CONNECT_BACKEND"
const USER_ADD_TASK_FRONTEND = "USER_ADD_TASK_FRONTEND"
const USER_ADD_TASK_BACKEND = "USER_ADD_TASK_BACKEND"
const USER_COMMENT_TASK_FRONTEND = "USER_COMMENT_TASK_FRONTEND"
const USER_COMMENT_TASK_BACKEND = "USER_COMMENT_TASK_BACKEND"
const TESTING_MSG_FROM_SERVER = "TESTING_MSG_FROM_SERVER"

let user_socket = []

// io
//   // .use((socket, next) => {
//   //   const token = socket.handshake.headers['token'];
//   //   const sidsplit = socket.handshake.headers['sid'].split('-');
//   //   const sid = socket.handshake.headers['sid'];

//   //   if (token !== undefined && sid !== undefined) {
//   //     jwt.verify(token, `1d34l1v3r1${sidsplit[3]}`, (err, decoded) => {
//   //       next();
//   //     });
//   //   } else {
//   //     console.log("Autentikasi error! => socketID " + socket.id);
//   //     next();
//   //   }

//   //   console.log(`USER LOGIN=>${socket.id}`)
//   //   console.log(token)
//   //   console.log(sid)

//   //   next()
//   // })
//   .use((socket, next) => {
//     try {
//       let user = {};
//       user.id_user = socket.handshake.query.id_user
//       user.full_name = socket.handshake.query.full_name

//       let user_socket_new = [...user_socket]

//       let user_is_ready = false
//       for (let i = 0; i < user_socket_new.length; i++) {
//         if (user_socket_new[i].user.id_user === user.id_user) {
//           user_is_ready = true;
//           break
//         }
//       }
//       if (user_is_ready === false) {
//         user_socket_new.push({
//           id: socket.id,
//           user
//         })
//         user_socket = user_socket_new;
//         next()
//         return
//       }

//       for (let i = 0; i < user_socket_new.length; i++) {
//         if (user_socket_new[i].user.id_user === user.id_user) {
//           user_socket_new[i].id = socket.id;
//           break
//         }
//       }
//       user_socket = user_socket_new;
//       next()

//     } catch (error) {
//       console.log("TRY CATCH ERROR")
//       console.log(error)
//     }
//   })
//   .on("connection", socket => {
//     let user_connected = null
//     for (let i = 0; i < user_socket.length; i++) {
//       if (user_socket[i].id === socket.id) {
//         user_connected = user_socket[i]
//         break;
//       }
//     }

//     console.log(`USER CONNECTED=>${socket.id}`)
//     console.log(user_connected)

//     socket.emit(RESPONSE_CONNECT_BACKEND, user_connected)

//     socket.on(USER_COMMENT_TASK_FRONTEND, (msg) => {
//       console.log('USER_COMMENT_TASK')
//       console.log(msg)

//       // comment baris ini jgn lupa
//       socket.emit(USER_COMMENT_TASK_BACKEND, msg)
//       return
//       // comment baris ini jgn lupa

//       msg.to.forEach(m => {
//         let user_is_ready = false
//         let user_is_too = null
//         for (let i = 0; i < user_socket.length; i++) {
//           if (parseInt(user_socket[i].user.id_user) === parseInt(m)) {
//             user_is_ready = true
//             user_is_too = user_socket[i];
//             break
//           }
//         }
//         if (user_is_ready === true) {
//           socket.to(user_is_too.id).emit(USER_COMMENT_TASK_BACKEND, msg)
//         }
//       });
//     });

//     socket.on(USER_ADD_TASK_FRONTEND, (msg) => {
//       console.log('USER_ADD_TASK_FRONTEND')
//       console.log(msg)

//       // comment baris ini jgn lupa
//       socket.emit(USER_ADD_TASK_BACKEND, msg)
//       return
//       // comment baris ini jgn lupa

//       msg.to.forEach(m => {
//         let user_is_ready = false
//         let user_is_too = null
//         for (let i = 0; i < user_socket.length; i++) {
//           if (parseInt(user_socket[i].user.id_user) === parseInt(m)) {
//             user_is_ready = true
//             user_is_too = user_socket[i];
//             break
//           }
//         }
//         if (user_is_ready === true) {
//           socket.to(user_is_too.id).emit(USER_ADD_TASK_BACKEND, msg)
//         }
//       });
//     });


//     // setTimeout(() => {
//     //   socket.emit(TESTING_MSG_FROM_SERVER, user_connected)
//     // }, 10000);
//   });


server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started...`)
);


// 085645284197
