"use strict";

const Chat = (function () {
  // 나중에 유저 정보에서 이름 받아오기
  const myName = "blue";

  // WebSocket 서버 주소
  const url = "ws://127.0.0.1:8082/";
  // const url = "http://localhost:5500";
  let socket = null;

  function init() {
    // WebSocket 연결
    console.log("init 실행");
    socket = new WebSocket(url);

    socket.addEventListener("open", function () {
      console.log("연결 확인");
    });
    // 메시지 수신 시 이벤트
    socket.addEventListener("message", function (e) {
      console.log("수신 작동");
      const data = JSON.parse(e.data);
      receiveMessage(data.senderName, data.message);
    });
    // 메세지 전송
    $("#chatting textarea").on("keydown", function (e) {
      console.log("인식");
      if (e.keyCode == 13 && !e.shiftKey) {
        console.log("엔터 성공");
        e.preventDefault();
        const message = $(this).val();
        // 입력창 clear
        clearInput();
        // 메시지 전송
        sendMessage(message);
      }
    });
  }
  // 메시지 전송
  function sendMessage(message) {
    console.log("전송 작동");
    const data = {
      // 여기에 기타 다른 정보도 담아서 보내야함
      // 메세지 보낸 시간이나 첨부파일도 될려나?
      senderName: myName,
      message: message,
    };
    receiveMessage(data.senderName, data.message);
    // 웹 소켓이 제대로 연결되야 밑에 코드가 오류가 안남
    // 그러면서 메세지 초기화도 잘됨, 주석
    socket.send(JSON.stringify(data));
  }
  // 메시지 수신
  function receiveMessage(senderName, message) {
    console.log("수신 작동");
    let chatLi = $(".chatFormat").clone();
    chatLi.removeClass("chatFormat");

    chatLi.addClass(senderName === myName ? "self" : "");
    chatLi.find(".message-content span").text(message);
    $(".container-chat").append(chatLi);
  }
  function clearInput() {
    console.log("지우기 작동");
    $(".chat-footer > textarea").val("");
  }
  return {
    init: init,
  };
})();

$(function () {
  Chat.init();
});
