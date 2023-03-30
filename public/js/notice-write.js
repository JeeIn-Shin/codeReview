"use strict";

let post_mode = localStorage.getItem("post_mode");
console.log("post_mode: ", post_mode);

let current_block = localStorage.getItem("current_block");
console.log("current_block: ", current_block);
let select_block = localStorage.getItem("select_block");
console.log("select_block: ", select_block);

let post_id;
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
        details: details.value,
      };
      console.log(data);
      postData(data);
    }
  });
}

if (post_mode === "modify") {
  document.querySelector("h1").textContent = "공지사항 수정";
  post_id = localStorage.getItem("post_id");
  console.log("post_id: ", post_id);
  data = getSelectData(post_id).then((data) => {
    console.log("data: ", data);
    title.value = data[0].TITLE;
    details.value = data[0].DETAILS;
    date.textContent = data[0].DATE;
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
        details: details.value,
      };
      putData(data);
    }
  });
}

async function getSelectData(post_id) {
  console.log("post_id(get): ", post_id);
  try {
    const url = `http://localhost:8080/notice?idx=${post_id}`;

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    //data를 리턴한다.
    data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

function postData(Data) {
  const url = `http://localhost:8080/notice/post?type=create`;
  console.log("noticeData: ", Data);
  console.log("noticeData.TITLE: ", Data.title);
  console.log("noticeData.DETAILS: ", Data.details);
  fetch(
    url,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    }
    //console.log(body)
  )
    .then((response) => response.json())
    .then((notice) => {
      //onbeforeunload를 막는다.
      window.onbeforeunload = null;
      localStorage.setItem("post_id", notice.insertId);
      location.href = "notice.html";
    })
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}

function putData(Data) {
  const url = `http://localhost:8080/notice/post?idx=${post_id}`;
  console.log("noticeData: ", Data);
  console.log("noticeData.TITLE: ", Data.title);
  console.log("noticeData.DETAILS: ", Data.details);
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("PUT request failed");
      }
    })
    .then((notice) => {
      window.onbeforeunload = null;
      location.href = "notice.html";
    })
    .catch((err) => console.error(err));
}

window.onbeforeunload = function (event) {
  return "정말 떠나시겠습니까?";
};
