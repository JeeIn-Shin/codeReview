const express = require('express');
const router = express.Router();
const chat = require('../models/chat');
const { checkTokens } = require('../middleware/auth');
require('express-session');

// 실은 매칭하는 그 단계에서 채팅방 까지 다 구성되어야하는거 아닌가? 그렇다면..
// 채팅 페이지에서는
// 채팅방 목록,
// 채팅방 내용
// 이렇게가 필요하겠네?

// 채팅방 목록
// http://localhost:8080/direct
router.get('/', checkTokens, async(req, res) => {

    //로그인 정보
    let AT =  req.headers.authorization.split('Bearer ')[1];
    let user = jwt.decode(AT, process.env.secret);
    
    await chat.getChatRoomsList(user.id)
    .catch((err) => res.status(404).json({ message : "Forbidden" }))
    .then((list) => res.json(list));
})

// http://localhost:8080/direct/{roomId}
router.get('/:roomId', isLoggedIn, async(req, res) => {
    //문제가 있음
    //사용자가 url을 강제로 조작해서 다른 곳으로 넘어갈려고 한다면?
    //1. 본인이 현재 속해있는 채팅방인지 ==> 해당 채팅방으로 이동
    //2. 유효하지 않은 접근이라면 ==> 채팅방 목록 페이지로 이동
    // --- 해당 방법은 인스타, 트위터를 참고함 ---
    //그 외 고려해야할 부분은?

    await chat.getSpecificChatRoomInfo(req.params.roomId)
    .catch((err) => handleResponse(res, 400, { }))
    .try((chat) => res.redirect)
})


module.exports = router;