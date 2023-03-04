"use strict";
let isMove = false;
console.log("isMove : ", isMove);

let post_mode = localStorage.getItem("post_mode");
console.log("post_mode: ", post_mode);

let current_block = localStorage.getItem("current_block");
console.log("current_block: ", current_block);
let select_block = localStorage.getItem("select_block");
console.log("select_block: ", select_block);

let post_title;
let data;

let date = document.getElementById("date");
let writer = document.getElementById("writer");
let title = document.getElementById("title");
let details = document.getElementById("wysiwyg-editor");
let backbtn = document.getElementById("back");
let writebtn = document.getElementById("writebtn");
backbtn.addEventListener("click", function () {
  isMove = true;
});

let createDate = new Date(); //현재 date ex) 2023-03-03 15:30:00
let year = createDate.getFullYear();
let month = createDate.getMonth() + 1;
let day = createDate.getDate();
let YearMonthDate = year + "-" + month + "-" + day; //ex) 2021-10-07

if (post_mode === "write") {
  document.querySelector("h1").textContent = "공지사항 글쓰기";
  date.textContent = YearMonthDate;

  writebtn.addEventListener("click", function (submitevent) {
    if (writer.value == "") {
      alert("작성자를 입력해주세요.");
      writer.focus();
      submitevent.preventDefault();
    } else if (title.value == "") {
      alert("제목을 입력해주세요.");
      title.focus();
      submitevent.preventDefault();
    } else if (details.value == "") {
      alert("내용을 입력해주세요.");
      details.focus();
      submitevent.preventDefault();
    } else {
      submitevent.preventDefault();

      // 게시글 데이터를 담고 있는 객체 배열을 만들어 서버애 전송한다.
      let data = {
        title: title.value,
        writer: writer.value,
        date: YearMonthDate,
        details: details.value,
      };
      postData(data);
    }
  });
}

if (post_mode === "modify") {
  document.querySelector("h1").textContent = "공지사항 수정";
  post_title = localStorage.getItem("post_title");
  console.log("post_title: ", post_title);
  data = getSelectData(post_title).then((data) => {
    console.log("data: ", data);
    writer.value = data[0].writer;
    writer.disabled = true;
    title.value = data[0].title;
    details.value = data[0].details;
    date.textContent = data[0].date;
  });
  //게시 버튼이 수정 버튼으로 바뀌고, 수정 버튼을 누르면 데이터를 수정한다.
  writebtn.textContent = "수정";
  writebtn.addEventListener("click", function (submitevent) {
    if (title.value == "") {
      alert("제목을 입력해주세요.");
      title.focus();
      submitevent.preventDefault();
    } else if (details.value == "") {
      alert("내용을 입력해주세요.");
      details.focus();
      submitevent.preventDefault();
    } else {
      submitevent.preventDefault();
      let data = {
        title: title.value,
        writer: writer.value,
        date: date.value,
        details: details.value,
      };
      putData(data);
    }
  });
}

//post_tile을 이용하여 데이터를 가져오는 함수
async function getSelectData(post_title) {
  console.log("post_title: ", post_title);
  try {
    const response = await fetch(
      `http://localhost:3000/notice?title=${post_title}`
    );
    data = await response.json();
    alert("데이터를 가져왔습니다.");
    return data;
  } catch (err) {
    console.log(err);
    alert("데이터를 가져오는데 실패했습니다.");
  }
}

function postData(noticeData) {
  fetch("http://localhost:3000/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(noticeData),
  })
    .then((response) => response.json())
    .then((notice) => {
      isMove = true;
      //onbeforeunload를 막는다.
      window.onbeforeunload = null;
      localStorage.setItem("post_title", notice.title);
      location.href = "notice.html";
    })
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}

function putData(noticeData) {
  noticeData = {
    title: title.value,
    writer: writer.value,
    date: date.value,
    details: details.value,
  };
  fetch("http://localhost:3000/notice")
    .then((response) => response.json())
    .then((notice) => {
      const select_notice = notice.find((notice) => {
        return notice.title === post_title;
      });
      return fetch(`http://localhost:3000/notice/${select_notice.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(noticeData),
      });
    })
    .then((response) => response.json())
    .then((notice) => {
      //onbeforeunload를 막는다.
      isMove = true;
      window.onbeforeunload = null;
      localStorage.setItem("post_title", notice.title);
      location.href = "notice.html";
    })
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}

// 떠날 때 정말 떠나는지 확인한다.
window.onbeforeunload = function (event) {
  if (!isMove) {
    localStorage.clear();
  }
  return "정말 떠나시겠습니까?";
};
