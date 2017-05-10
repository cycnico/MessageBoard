const express = require('express');

const router = express.Router();

const data = [
  {
    Username: 'cycnico',
    Time: '2017/5/10 11:54:39',
    Content: 'Test comment',
    Replys: [],
    Id: 0,
    ReplyUser: '',
    ReplyInput: '',
  },
];

function mygetTime() {
  const Today = new Date();
  let str1 = `${Today.getFullYear()}/${Today.getMonth() + 1}`;

  let day = Today.getDate();
  let myhour = Today.getHours() + 8; // 修正時區誤差
  let myminute = Today.getMinutes();
  let mysecond = Today.getSeconds();
  if (myhour >= 24) {
    myhour -= 24;
    day += 1;
  }
  str1 = `${str1}/${day}`;
  if (myhour < 10) myhour = `0${myhour}`;
  if (myminute < 10) myminute = `0${myminute}`;
  if (mysecond < 10) mysecond = `0${mysecond}`;

  const str2 = `${myhour}:${myminute}:${mysecond}`;
  return `${str1} ${str2}`;
}

router.get('/', (req, res) => {
  res.json(data);
});

router.post('/comments', (req, res) => {
  const NumOfComments = data.length;
  const newTime = mygetTime();
  const newComment = {
    Username: req.body.Username,
    Content: req.body.Content,
    Time: newTime,
    Id: NumOfComments,
    Replys: [],
    ReplyUser: '',
    ReplyInput: '',
  };
  data.push(newComment);
  res.send(data);
});

router.put('/comments', (req, res) => {
  const newTime = mygetTime();
  const CommentId = req.body.CommentId;
  const newReply = {
    Username: req.body.Username,
    Content: req.body.Content,
    Time: newTime,
    Id: data[CommentId].Replys.length,
  };
  data[CommentId].Replys.push(newReply);
  res.send(data);
});

module.exports = router;
