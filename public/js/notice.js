"use strict";
// 게시글 제목을 얻어온다.
const post_title = localStorage.getItem("post_title");
console.log("post_title: ", post_title);
// 데이터를 가져온다.
let data = getSelectData(post_title).then((data) => {
  displayNotice(data);
});

let isMove = false;
console.log("isMove : ", isMove);

let putbtn = document.getElementById("put");
let deletebtn = document.getElementById("delete");
let backbtn = document.getElementById("back");
backbtn.addEventListener("click", function () {
  isMove = true;
});

// 관리자인지 판단하기
let isAdmin = localStorage.getItem("isAdmin") || true;
//selct_block, cuurent_block을 얻어온다.
const select_block = localStorage.getItem("select_block");
const current_block = localStorage.getItem("current_block");
console.log("select_block: ", select_block);
console.log("current_block: ", current_block);

//관리자면 id가 put, delete인 버튼을 보여준다.
if (isAdmin) {
  putbtn.style.display = "inline-block";
  putbtn.addEventListener("click", function () {
    isMove = true;
    localStorage.setItem("post_mode", "modify");
    localStorage.setItem("post_title", post_title);
  });

  deletebtn.style.display = "inline-block";

  deletebtn.addEventListener("click", function () {
    let result = confirm("삭제하시겠습니까?");
    if (result) {
      isMove = true;
      deleteDataByTitle(post_title);
    } else {
      //취소되었다고 알린다.
      alert("취소되었습니다.");
    }
  });
}

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
    console.log("err: ", err);
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

function deleteDataByTitle(post_title) {
  try {
    fetch("http://localhost:3000/notice")
      .then((response) => response.json())
      .then((notice) => {
        const post = notice.find((n) => n.title === post_title);
        console.log("post: ", post);
        console.log("post.title: ", post.title);
        return fetch(`http://localhost:3000/notice/${post.id}`, {
          method: "DELETE",
        });
      })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => (location.href = "notice-board.html"));
  } catch (error) {
    console.log("error: ", error);
    alert("삭제를 실패했습니다.");
  }
}

//isMove가 false일 때만 떠날 때 localStorage를 비워줌
window.onbeforeunload = function () {
  if (!isMove) {
    localStorage.clear();
  }
};
