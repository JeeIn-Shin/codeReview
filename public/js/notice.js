"use strict";

// 게시글 제목을 얻어온다.
const post_title = localStorage.getItem("post_title");
console.log("post_title: ", post_title);

// 데이터를 가져온다.
let data = getSelectData(post_title).then((data) => {
  displayNotice(data);
});

console.log("data: ", data);

//post_tile을 이용하여 데이터를 가져오는 함수
async function getSelectData(post_title) {
  try {
    const response = await fetch(
      `http://localhost:3000/notice?title=${post_title}`
    );
    data = await response.json();
    return data;
  } catch (err) {
    alert("데이터를 가져오는데 실패했습니다.");
  }
}

function displayNotice(data) {
  let noticetitle = document.getElementById("noticetitle");
  noticetitle.textContent = data[0].title;
  console.log("data.title: ", data[0].title);

  let noticewriter = document.getElementById("noticewriter");
  noticewriter.textContent = data[0].writer;
  console.log("data.writer: ", data[0].writer);

  let noticedate = document.getElementById("noticedate");
  noticedate.textContent = data[0].date;
  console.log("data.date: ", data[0].date);

  let noticedetails = document.getElementById("noticedetails");
  noticedetails.innerHTML = data[0].details;
  console.log("data.details: ", data[0].details);
}

function set_page() {
  //선택한 블록을 얻어온다.
  const select_block = localStorage.getItem("select_block");
  console.log("select_block: ", select_block);
  const current_block = localStorage.getItem("current_block");
  console.log("current_block: ", current_block);
}
