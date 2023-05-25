"use strict";

function getCookie(name) {
  // 쿠키를 받아오는 함수
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

let accessToken = getCookie("accessToken"); //accessToken
console.log("accessToken: ", accessToken);

let decoded = parseJwt(accessToken);
console.log("decoded: ", decoded);

function parseJwt(accessToken) {
  //토큰을 받아서 payload를 반환하는 함수
  if (!accessToken) {
    return null;
  } else {
    const base64Url = accessToken.split(".")[1];
    console.log("base64Url: ", base64Url);
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    console.log("base64: ", base64);
    let jsonPayload;

    if (typeof window === "undefined") {
      // Node.js 환경
      jsonPayload = Buffer.from(base64, "base64").toString("utf8");
      console.log("jsonPayload: ", jsonPayload);
    } else {
      // 브라우저 환경
      jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      console.log("jsonPayload: ", jsonPayload);
    }

    return JSON.parse(jsonPayload);
  }
}
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
if (isAdmin === "true") {
  putbtn.style.display = "inline-block";
  putbtn.addEventListener("mouseover", function (e) {
    localStorage.setItem("post_mode", "modify");
    localStorage.setItem("post_id", post_id);
  });

  deletebtn.style.display = "inline-block";

  deletebtn.addEventListener("click", function (e) {
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
        Authorization: `Bearer ${accessToken}`,
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
        Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
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
    alert("삭제에 실패하였습니다.");
    console.log("error: ", error);
  }
}