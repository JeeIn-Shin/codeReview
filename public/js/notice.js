"use strict";

// 게시글 제목을 얻어온다.
const post_id = localStorage.getItem("post_id");
console.log("post_id: ", post_id);
// 데이터를 가져온다.
let data = getSelectData(post_id).then((data) => {
  displayNotice(data);
});

let putbtn = document.getElementById("put");
let deletebtn = document.getElementById("delete");

// 관리자인지 판단하기
let isAdmin = localStorage.getItem("isAdmin") || false;
console.log("isAdmin: ", isAdmin);
//selct_block, cuurent_block을 얻어온다.
const select_block = localStorage.getItem("select_block");
const current_block = localStorage.getItem("current_block");
console.log("select_block: ", select_block);
console.log("current_block: ", current_block);

//관리자면 id가 put, delete인 버튼을 보여준다.
if (isAdmin) {
  putbtn.style.display = "inline-block";
  putbtn.addEventListener("click", function () {
    localStorage.setItem("post_mode", "modify");
    localStorage.setItem("post_id", post_id);
  });

  deletebtn.style.display = "inline-block";

  deletebtn.addEventListener("click", function () {
    let result = confirm("삭제하시겠습니까?");
    if (result) {
      deleteDataById(post_id);
    } else {
      alert("취소되었습니다.");
    }
  });
}

console.log("data: ", data);

async function getSelectData(post_id) {
  console.log("post_id: ", post_id);
  try {
    // http://localhost:8080/notice/?idx=
    const url = `http://localhost:8080/notice?idx=${post_id}`; // Include the parameter value in the URL

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

function displayNotice(data) {
  let noticetitle = document.getElementById("noticetitle");
  noticetitle.textContent = data[0].TITLE;
  console.log("data.title: ", data[0].TITLE);

  let noticewriter = document.getElementById("noticewriter");
  noticewriter.textContent = " " + data[0].WRITER;
  console.log("data.writer: ", data[0].WRITER);
  //

  let noticedate = document.getElementById("noticedate");
  noticedate.textContent = " " + data[0].DATE;
  console.log("data.date: ", data[0].DATE);

  let noticedetails = document.getElementById("noticedetails");
  noticedetails.innerHTML = data[0].DETAILS;
  console.log("data.details: ", data[0].DETAILS);
}

function deleteDataById(post_id) {
  try {
    const url = `http://localhost:8080/notice`;
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((notice) => {
        const post = notice.find((n) => n.ID_PK == post_id);
        return fetch(`http://localhost:8080/notice/?idx=${post.ID_PK}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then((response) => response.json())
      .then((json) => alert("삭제되었습니다."))
      .then(
        (json) =>
          //notce-board로 이동
          (window.location.href = "notice-board.html")
      );
  } catch (error) {
    console.log("error: ", error);
  }
}
