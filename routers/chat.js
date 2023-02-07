const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const CHAT = require('../models/chat');

// 실은 매칭하는 그 단계에서 채팅방 까지 다 구성되어야하는거 아닌가? 그렇다면..
// 채팅 페이지에서는
// 채팅방 목록,
// 채팅방 내용
// 이렇게가 필요하겠네?

// 채팅방 목록
// http://localhost:8080/direct
ROUTER.get('/', async(req, res) => {

    //로그인 정보
    let testId;

    await CHAT.getChatRoomsList(testId, (err, data))
    try {
        //이렇게만 보내주면 될까? 더 가공할 필요는?
        //괜찮을거 같은데
        res.json(data)
    }
    catch(err) {
        console.error(err);
    }
})

//특정 채팅방 대화 기록
ROUTER.get('/:roomID', async(req, res) => {
    //로그인 정보
    let testId;

    //문제가 있음
    //사용자가 url을 강제로 조작해서 다른 곳으로 넘어갈려고 한다면?
    //1. 본인이 현재 속해있는 채팅방인지 ==> 해당 채팅방으로 이동
    //2. 유효하지 않은 접근이라면 ==> 채팅방 목록 페이지로 이동
    // --- 해당 방법은 인스타, 트위터를 참고함 ---
    //그 외 고려해야할 부분은?

    let SpecificChatRoomInfo = CHAT.getSpecificChatRoomInfo(req.params.roomID);

    //SpecificChatRoomInfo가 내가 생각한 값이 담기는지 확인해봐야함
    //실제로 잘 담긴다면
    //그걸 토대로, USER_TB 이랑 비교해서 받아온 CHAT_USER_ID이랑 동일한 사람 찾아서
    // 닉네임, 메세지 내용, date, time을 클라이언트에 보내줘야함


    //여기서 이제 문제는 USER_TB과 CHAT_USER_TB의 ID가 전혀 일치하지 않는건데
    //일단 DB를 좀 수정해줘야겠음
})

module.exports = ROUTER;