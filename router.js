const express = require("express");
const Pusher = require("pusher");
const moment = require('moment');
const router = express.Router();


const RESPONSE_CONNECT_BACKEND = "RESPONSE_CONNECT_BACKEND"
const USER_ADD_TASK_FRONTEND = "USER_ADD_TASK_FRONTEND"
const USER_ADD_TASK_BACKEND = "USER_ADD_TASK_BACKEND"
const USER_COMMENT_TASK_FRONTEND = "USER_COMMENT_TASK_FRONTEND"
const USER_COMMENT_TASK_BACKEND = "USER_COMMENT_TASK_BACKEND"
const TESTING_MSG_FROM_SERVER = "TESTING_MSG_FROM_SERVER"

const pusher = new Pusher({
  appId: "1657333",
  key: "98a67df244ec61f15662",
  secret: "b3f68017af0f07ba7f5c",
  cluster: "mt1",
  useTLS: true
});


// pusher.trigger("exacta-daily-socket-server", USER_ADD_TASK_FRONTEND, {
//   message: "hello world"
// });

let all_user_connect = []

router.get("/", (req, res) => {



  res.status(200).json({
    all: ""
  })
});

router.post("/init", async (req, res) => {
  const body = req.body;
  console.log('body')
  console.log(body)

  const socketId = body.socket_id;

  const user = {
    id: `${body.id_user}`,
    user_info: {
      name: body.full_name,
    },
    watchlist: ['another_id_1', 'another_id_2']
  };
  const authResponse = pusher.authenticateUser(socketId, user);
  console.log('authResponse')
  console.log(authResponse)



  res.status(200).json(authResponse);

});

router.post("/", async (req, res) => {
  const body = req.body;
  console.log('body')
  console.log(body)

  // getUserSocketPusher()

  // pusher.trigger("exacta-daily-socket-server", USER_COMMENT_TASK_BACKEND, body);
  
  pusher.sendToUser("exacta-daily-socket-server", USER_COMMENT_TASK_BACKEND, body);

  res.status(200).json({ status: "success" })
});

const getUserSocketPusher = async () => {
  try {
    const resUser = await pusher.get({ path: "/channels/presence-channel-name/users" });
    if (resUser.status === 200) {
      const bodyResUser = await resUser.json();
      const users = bodyResUser.users;

      console.log('users')
      console.log(users)

      return users;
    }
  } catch (error) {
    console.log("catch=>error")
    console.log(error)

    return error;
  }
}

module.exports = router;
