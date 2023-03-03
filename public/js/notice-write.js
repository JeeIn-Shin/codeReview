"use strict";

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
let writebtn = document.getElementById("writebtn");

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
      // json-server에 데이터를 전송한다.
      fetch("http://localhost:3000/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.title) {
            alert("게시글이 등록되었습니다.");
            location.href = "index.html";
          } else {
            alert("게시글 등록에 실패했습니다.");
          }
        });
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
        //find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
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
    .then((json) => alert("수정되었습니다."))
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}

//창을 닫을 때,
