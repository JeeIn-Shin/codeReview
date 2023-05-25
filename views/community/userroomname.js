"use strict";
//id가 username인 a 태그를 선택하면 localStorage에 username을 저장한다.
function getCookie(name) {
  // 쿠키를 받아오는 함수
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
let accessToken = getCookie("accessToken");
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
let username = document.getElementById("username");
username.addEventListener("mouseover", function () {
  localStorage.setItem("reviewrname", username.innerText);
  localStorage.setItem("reviewrfk", 123);
  console.log("username: " + localStorage.getItem("reviewrname") + " 저장됨");
});

fetch("http://localhost:8080/guestbook", {
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error:", error);
  });

/* fetch("http://localhost:8080/reviews", {
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error:", error);
  }); */

let body = JSON.stringify({
  comment: "테스트.",
  //revieweeFk: decoded.nickname,
});

fetch("http://localhost:8080/guestbook/?reviewer=123", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
  body: body,
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error:", error);
  });
