// 채팅리스트 가져오는 기본 틀
async function getChatRooms() {
  try {
    // 엔드 포인트 바꾸기
    const response = await fetch("/api/chat-rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("목록 가져오기 실패");
      throw new Error("채팅방 목록 가져오기 실패");
    }

    const chatRooms = await response.json();
    return chatRooms;
  } catch (error) {
    console.error(error);
  }
}
// 채팅방 목록을 가져와서 리스트 생성하는 함수
function loadChatRooms() {
  $.ajax({
    type: "GET",
    // 채팅방 목록을 가져오는 API 엔드포인트, 바꿔야함
    url: "/chatrooms",

    success: function (data) {
      let chatroomList = $("#chatContactTab");
      // 기존 채팅방 목록 삭제
      chatroomList.empty();

      data.forEach(function (chatroom) {
        // 채팅방 리스트에 새로운 채팅방 항목 추가
        const roomId = chatroom.id;

        // 채팅 리스트용 li 태그 생성
        const listItem = $("<li>").addClass("contacts-item friends");
        // li에 들어갈 a 태그 생성, 클릭시 이동할 링크
        const link = $("<a>")
          .addClass("contacts-link")
          // 경로 수정하기
          .attr("href", "/chat/" + roomId);
        // 프사 구역 생성
        const avatar = $("<div>").addClass("avatar avatar-online");
        // 프사 이지미 넣기, 경로 부분 수정 해야함
        const avatarImage = $("<img>")
          .attr("src", "./../../public/images/media/avatar/2.png")
          .attr("alt", "");
        // 간단 정보 구역 생성
        const content = $("<div>").addClass("contacts-content");
        // 정보 구역, 대화 대상자 이름 보일 구역
        const info = $("<div>").addClass("contacts-info");
        // 이름이 적히는 구역
        const name = $("<h6>")
          .addClass("chat-name text-truncate")
          .text(chatroom.name);
        // 메세지 송수신 시간 구역, 나중에 기능 구연해 봐야함
        const time = $("<div>").addClass("chat-time");
        // 마지막 대화를 보여줄 구역, 없어도 되지 안을까?
        const texts = $("<div>").addClass("contacts-texts");
        // 마지막 메세지 내용을 동적으로 추가하려면 이 부분을 수정해야 함.
        const message = $("<p>").addClass("text-truncate").text("I'm sorry");

        // 요소들 조립
        avatar.append(avatarImage);
        info.append(name, time);
        texts.append(message);
        content.append(info, texts);
        link.append(avatar, content);

        // 생성한 요소를 chatroomList에 추가
        chatroomList.append(listItem);
      });

      //   채팅 리스트 삭제 기본 틀, 틀만 잡힘, 수정 많이 해야됨
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const roomId = button.dataset.roomId;
          try {
            // 엔드 포인트 바꾸기
            const response = await fetch(`/api/rooms/${roomId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            console.log(data);
            // 삭제에 성공하면 새로고침
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        });
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}
