"use strict";

let post_mode = localStorage.getItem("post_mode");
console.log("post_mode: ", post_mode);

let post_title;
let data;

let writer = document.getElementById("writer");
let title = document.getElementById("title");
let content = document.getElementById("content");
let writebtn = document.getElementById("writebtn");

let date = new Date(); //ex) 2021-10-07 15:30:00
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let YearMonthDate = year + "-" + month + "-" + day; //ex) 2021-10-07

if (post_mode === "write") {
  document.querySelector("h1").textContent = "공지사항 글쓰기";
  document.getElementById("date").textContent = YearMonthDate;

  writebtn.addEventListener("click", function (submitevent) {
    if (writer.value == "") {
      alert("작성자를 입력해주세요.");
      writer.focus();
      submitevent.preventDefault();
    } else if (title.value == "") {
      alert("제목을 입력해주세요.");
      title.focus();
      submitevent.preventDefault();
    } else if (content.value == "") {
      alert("내용을 입력해주세요.");
      content.focus();
      submitevent.preventDefault();
    } else if (div.innerHTML == "") {
      mdevent.preventDefault();
      alert("내용을 입력해주세요.");
      div.focus();
    } else {
      submitevent.preventDefault();

      // 게시글 데이터를 담고 있는 객체 배열을 만들어 서버애 전송한다.
      let data = {
        title: title.value,
        writer: userName.value,
        date: YearMonthDate,
        details: content.value,
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
    content.value = data[0].details;
    document.getElementById("date").textContent = data[0].date;
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
    alert("데이터를 가져오는데 실패했습니다.");
  }
}
