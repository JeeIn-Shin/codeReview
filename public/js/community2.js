"use strict";
//COMMENT, DATE, REVIEWEE_FK, REVIEWER_FK 이거 DATA 받는거 대문자인 부분들 안되면 소문자로..
function getCookie(name) {
  // 쿠키를 받아오는 함수
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//let accessToken = getCookie('accessToken'); //accessToken
console.log("accessToken: ", accessToken);

//let decoded = parseJwt(accessToken);
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
//let data;

const username = localStorage.getItem("reviewrname"); // "여기 reviewr 넘겨주기" 쿠키로 넘길거면 getCookie("reviewrname") 이렇게 하면 될듯
const usernamefk = localStorage.getItem("reviewrfk"); //reviewerfk 넘겨주기 쿠키로 넘길거면 getCookie("reviewrfk") 이렇게 하면 될듯

//id가 comments-user인 span의 value를 username으로 바꾼다.
const commentsUser = document.getElementById("comments-user");
commentsUser.innerHTML = username;

const commentsNumber = document.getElementById("comments-number");

//실행될 때 액세스 토큰이 없으면 로그인 페이지로 이동
window.onload = function () {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    location.href = "http://localhost:8080/views/login/login.html"; //경로 수정
  }
};

// author input과 password input, comment textarea, submit button을 가져온다.
const commentTextarea = document.getElementById("comment");
const submitButton = document.getElementById("submit-button");

// submit button을 클릭하면 실행되는 함수를 만든다.
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.onbeforeunload = null;
  if (commentTextarea.value === "") {
    alert("댓글을 입력해주세요.");
    commentTextarea.focus();
  } else {
    accessToken = getCookie("accessToken");
    decoded = parseJwt(accessToken);
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      location.href = "http://localhost:8080/views/login/login.html"; //경로 수정
    } else {
      data = {
        COMMENT: commentTextarea.value,
      };
      postData(data);
    }
  }
});

function postData(data) {
  const url = `http://localhost:8080/guestbook/?reviewer=${usernamefk}`;
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      alert("댓글 작성에 실패했습니다.");
      console.error("Error:", error);
    });
}
