"use strict";

// 게시글 제목을 얻어온다.
const post_title = localStorage.getItem("post_title");
console.log("post_title: ", post_title);

// 데이터를 가져온다.
let data = getSelectData(post_title);
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
  let ddata = data;
  let noticetitle = document.getElementById("noticetitle");
  noticetitle.textContent = ddata[0].title;
  console.log("data.title: ", ddata[0].title);

  let noticewriter = document.getElementById("noticewriter");
  noticewriter.textContent = ddata[0].writer;
  console.log("data.writer: ", ddata[0].writer);

  let noticedate = document.getElementById("noticedate");
  noticedate.textContent = ddata[0].date;
  console.log("data.date: ", ddata[0].date);

  let noticedetails = document.getElementById("noticedetails");
  noticedetails.innerHTML = ddata[0].details;
  console.log("data.details: ", ddata[0].details);
}

window.onload = function () {
  displayNotice(data);
};
