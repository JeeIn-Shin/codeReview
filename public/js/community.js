"use strict";

document.cookie =
  "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c; max-age=3600; path=/";
//위는 테스트용 토큰을 담은 테스트용 쿠키를 브라우저에 생성하는 것으로서 실제 환경에서 사용되는 것은 아님.
//실제 쿠키는 로그인 시 전 페이지에 저장되도록 하고 리프레쉬 토큰을 이용하여 만료시간을 연장시키는 방식을 구현하는 것은 내 역할이 아님.
//토큰이 만료되었을 경우 댓글을 게시하지 못하도록 함.
function getCookie(name) {
  // 쿠키를 받아오는 함수
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

let token = getCookie("token"); //"token"을 받아오는 실제 이름으로 수정
console.log("token: ", token);
//토큰이 없으면
if (!token) {
  alert("로그인이 필요합니다.");
  location.href = "/login"; // 경로 수정
}
let decoded = parseJwt(token);
console.log("decoded: ", decoded);

function parseJwt(token) {
  //토큰을 받아서 payload를 반환하는 함수
  if (!token) {
    return null;
  } else {
    const base64Url = token.split(".")[1];
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

const username = localStorage.getItem("username") || "Erhard";
//id가 comments-user인 span의 value를 username으로 바꾼다.
const commentsUser = document.getElementById("comments-user");
commentsUser.innerHTML = username;

const commentsNumber = document.getElementById("comments-number");
const author = decoded.name; //정의된 payload의 것으로 수정

//  한 페이지 당 출력되는 댓글 갯수
let page_num = 5;

//   한번에 출력될 수 있는 최대 블록 수
let block_num = 10;

// 첫 째 블록
const first_block = 1;

// 현재 블록박스에서 첫번째 블록
let current_block = localStorage.getItem("current_block") || 1;
//number 타입으로 변환
current_block = Number(current_block);
console.log("current_block 값: ", current_block);
localStorage.setItem("current_block", current_block);

//선책한 블록
let select_block = localStorage.getItem("select_block") || 1;
select_block = Number(select_block);
console.log("select_block 값: ", select_block);
localStorage.setItem("select_block", select_block);

let data;
let totalPage = localStorage.getItem("totalPage");
getDataByUsername(username)
  .then((result) => {
    data = result;
    totalPage = data.length;
    console.log("data: ", data);
    commentsNumber.innerHTML = data.length;

    post_data_print(select_block);
    block_print(current_block);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function post_data_print(block) {
  // 초기화
  const commentol = document.getElementById("commentol");
  commentol.innerHTML = "";

  let start = totalPage - page_num * (block - 1);

  for (let i = start; i >= 1 && i > start - page_num; i--) {
    createCommentList(data, i);
  }
}

function block_print(front_block) {
  current_block = front_block;
  // 블록의 총 수를 계산한다.
  let total_block =
    totalPage % page_num == 0 ? totalPage / page_num : totalPage / page_num + 1;

  /*
              1. 이전, 다음 블럭 속성 처리
              2. 기존 블럭 모두 삭제
              3. 범위 안의 블럭 생성 및 추가
              */

  // 블럭을 추가할 공간
  let block_box = document.querySelector(".block");
  // 기존 블럭 모두 삭제
  block_box.replaceChildren();

  //front_block부터 total_block 또는 block_num까지 생성 및 추가
  console.log("front_block : ", front_block);
  console.log("total_block : ", total_block);
  console.log("block_num : ", block_num);
  for (
    let i = front_block;
    i <= total_block && i < front_block + block_num;
    i++
  ) {
    // 버튼을 생성한다.
    let button = document.createElement("button");
    button.textContent = i;
    // 버튼에 속성 page-item, page-link를 추가한다.getItem
    button.classList.add("page-item", "page-link");
    //select_block과 같은 버튼은 active 클래스를 추가하고 disabled 속성을 true로 설정한다.
    if (i == select_block) {
      button.classList.add("active");
      button.disabled = true;
    }

    button.addEventListener("click", function (event) {
      post_data_print(i);

      localStorage.setItem("current_block", current_block);
      console.log("current_block 설정 : ", current_block);
      localStorage.setItem("select_block", i);

      select_block = localStorage.getItem("select_block");
      console.log("selct_block 설정 : ", select_block);

      event.target.disabled = true;

      event.target.classList.add("active");

      let buttons = document.querySelectorAll(".page-link");
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j] != event.target) {
          buttons[j].disabled = false;
          buttons[j].classList.remove("active");
        }
      }
    });

    if (i == select_block) {
      button.disabled = true;
      button.classList.add("active");
    }

    // 블럭에 추가한다.
    block_box.appendChild(button);
  }

  // 이전으로 갈 블럭이 없으면
  if (front_block <= 1) {
    document.querySelector(".first_move").style.visibility = "hidden";
    document.querySelector(".before_move").style.visibility = "hidden";
  } else {
    document.querySelector(".first_move").style.visibility = "visible";
    document.querySelector(".before_move").style.visibility = "visible";
  }

  // 다음으로 갈 블럭이 없으면
  if (front_block + block_num >= total_block) {
    document.querySelector(".last_move").style.visibility = "hidden";
    document.querySelector(".next_move").style.visibility = "hidden";
  } else {
    document.querySelector(".last_move").style.visibility = "visible";
    document.querySelector(".next_move").style.visibility = "visible";
  }
}

function before() {
  console.clear();
  block_print(current_block - block_num);
  console.log("이전");
}

function next() {
  console.clear();
  block_print(current_block + block_num);
  console.log("다음");
}

function first() {
  console.clear();
  block_print(first_block);
  console.log("처음");
}

function last() {
  console.clear();
  // 블록의 총 수를 계산한다.
  let total_block =
    totalPage % page_num == 0 ? totalPage / page_num : totalPage / page_num + 1;
  // 마지막 블록 그룹에서 첫 째 블록
  let last_block = total_block - ((total_block - 1) % 10);

  block_print(last_block);
  console.log("마지막");
}

// author input과 password input, comment textarea, submit button을 가져온다.
const commentTextarea = document.getElementById("comment");
const submitButton = document.getElementById("submit-button");

// submit button을 클릭하면 실행되는 함수를 만든다.
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (commentTextarea.value === "") {
    alert("댓글을 입력해주세요.");
    commentTextarea.focus();
  } else {
    token = getCookie("token");
    decoded = parseJwt(token);
    if (!token) {
      alert("로그인이 필요합니다.");
      location.href = "/login"; // 경로 수정
    } else {
      data = {
        username: username,
        author: author,
        comment: commentTextarea.value,
      };
      postData(data);
    }
  }
});

function getDataByUsername(username) {
  const url = `http://localhost:8080/community`;
  return fetch("http://localhost:3000/community", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      // 데이터를 필터링하여 username이 일치하는 데이터만 반환
      return data.filter((item) => item.username === username);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function postData(data) {
  const url = `http://localhost:8080/community/post?type=create`;
  fetch("http://localhost:3000/community", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createCommentList(data) {
  const ol = document.getElementById("commentol");

  data.forEach(({ comment, date, author }) => {
    const li = document.createElement("li");
    li.className =
      "comment byuser comment-author-_smcl_admin even thread-odd thread-alt depth-1";
    li.id = `li-comment-${Math.floor(Math.random() * 100000)}`;

    const commentWrap = document.createElement("div");
    commentWrap.id = li.id.replace("li-", "");
    commentWrap.className = "comment-wrap clearfix";

    const commentMeta = document.createElement("div");
    commentMeta.className = "comment-meta";

    const commentAuthor = document.createElement("div");
    commentAuthor.className = "comment-author vcard";

    const commentAvatar = document.createElement("span");
    commentAvatar.className = "comment-avatar clearfix";

    const avatar = document.createElement("img");
    avatar.alt = "Image";
    avatar.src =
      "https://1.gravatar.com/avatar/30110f1f3a4238c619bcceb10f4c4484?s=60&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D60&amp;r=G";
    avatar.className = "avatar avatar-60 photo";
    avatar.height = "60";
    avatar.width = "60";

    commentAvatar.appendChild(avatar);
    commentAuthor.appendChild(commentAvatar);
    commentMeta.appendChild(commentAuthor);

    const commentContent = document.createElement("div");
    commentContent.className = "comment-content clearfix";

    const commentDetails = document.createElement("div");
    commentDetails.className = "comment-author";
    commentDetails.innerHTML = `<span class='author-name text-black'>${author}</span><span><span class="comment-date" title="Permalink to this comment">${date}</span></span>`;

    const commentText = document.createElement("p");
    commentText.innerText = comment;

    commentContent.appendChild(commentDetails);
    commentContent.appendChild(commentText);
    commentWrap.appendChild(commentMeta);
    commentWrap.appendChild(commentContent);

    const clearDiv = document.createElement("div");
    clearDiv.className = "clear";

    commentWrap.appendChild(clearDiv);
    li.appendChild(commentWrap);
    ol.appendChild(li);
  });
}

function createCommentList(data, i) {
  const ol = document.getElementById("commentol");

  const li = document.createElement("li");
  li.className =
    "comment byuser comment-author-_smcl_admin even thread-odd thread-alt depth-1";
  li.id = `li-comment-${Math.floor(Math.random() * 100000)}`;

  const commentWrap = document.createElement("div");
  commentWrap.id = li.id.replace("li-", "");
  commentWrap.className = "comment-wrap clearfix";

  const commentMeta = document.createElement("div");
  commentMeta.className = "comment-meta";

  const commentAuthor = document.createElement("div");
  commentAuthor.className = "comment-author vcard";

  const commentAvatar = document.createElement("span");
  commentAvatar.className = "comment-avatar clearfix";

  const avatar = document.createElement("img");
  avatar.alt = "Image";
  avatar.src =
    "https://1.gravatar.com/avatar/30110f1f3a4238c619bcceb10f4c4484?s=60&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D60&amp;r=G"; //프로필 이미지 설정이 있을 시 이 부분 수정
  avatar.className = "avatar avatar-60 photo";
  avatar.height = "60";
  avatar.width = "60";

  commentAvatar.appendChild(avatar);
  commentAuthor.appendChild(commentAvatar);
  commentMeta.appendChild(commentAuthor);

  const commentContent = document.createElement("div");
  commentContent.className = "comment-content clearfix";

  const commentDetails = document.createElement("div");
  commentDetails.className = "comment-author";
  commentDetails.innerHTML = `<span class='author-name text-black'>${
    data[i - 1].author
  }</span><span><span class="comment-date" title="Permalink to this comment">${
    data[i - 1].date
  }</span></span>`;

  const commentText = document.createElement("p");
  commentText.innerText = data[i - 1].comment;

  commentContent.appendChild(commentDetails);
  commentContent.appendChild(commentText);
  commentWrap.appendChild(commentMeta);
  commentWrap.appendChild(commentContent);

  const clearDiv = document.createElement("div");
  clearDiv.className = "clear";

  commentWrap.appendChild(clearDiv);
  li.appendChild(commentWrap);
  ol.appendChild(li);
}
