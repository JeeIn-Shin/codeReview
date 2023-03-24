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
let isAdmin = localStorage.getItem("isAdmin") || false;
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

async function getSelectData(post_title) {
  console.log("post_title: ", post_title);
  try {
    // http://localhost:8080/notice/?idx=
    const url = `http://localhost:8080/notice?idx=${post_title}`; // Include the parameter value in the URL

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    //data를 리턴한다.
    data = await response.json();
    alert("데이터를 가져왔습니다.");
    return data;
  } catch (error) {
    alert("데이터를 가져오지 못했습니다.");
  }
}
//post_tile을 이용하여 데이터를 가져오는 함수
/*async function getSelectData(post_title) {
  try {
    const response = await fetch(
      `http://localhost:8080/notice?title=${post_title}`
    );
    data = await response.json();
    return data;
  } catch (err) {
    console.log("err: ", err);
    alert("데이터를 가져오는데 실패했습니다.");
  }
}*/

function displayNotice(data) {
  let noticetitle = document.getElementById("noticetitle");
  noticetitle.textContent = data[0].TITLE;
  console.log("data.title: ", data[0].TITLE);

  let noticewriter = document.getElementById("noticewriter");
  noticewriter.textContent = data[0].WRITER;
  console.log("data.writer: ", data[0].WRITER);

  let noticedate = document.getElementById("noticedate");
  noticedate.textContent = data[0].DATE;
  console.log("data.date: ", data[0].DATE);

  let noticedetails = document.getElementById("noticedetails");
  noticedetails.innerHTML = data[0].DETAILS;
  console.log("data.details: ", data[0].DETAILS);
}

function deleteDataByTitle(post_title) {
  try {
    const paramVar = "example_param_value";
    const url = `http://localhost:8080/notice?param=${paramVar}`;
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((notice) => {
        console.log("exnotice: ", notice);
        console.log("notice_ID: ", notice.ID_PK);
        console.log("expost_title: ", post_title);
        const post = notice.find((n) => n.ID_PK == post_title);
        console.log("expost: ", post);
        console.log("post.title: ", post.ID_PK);
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
    alert("삭제를 실패했습니다.");
  }
}

//창을 닫을 때 localStorage를 초기화한다.
window.onunload = function (event) {
  if (!isMove) {
    //localStorage.clear();
  }
};
