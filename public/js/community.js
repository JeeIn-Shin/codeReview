"use strict";
const username = localStorage.getItem("username") || "Erhard";
//id가 comments-user인 span의 value를 username으로 바꾼다.
const commentsUser = document.getElementById("comments-user");
commentsUser.innerHTML = username;

const commentsNumber = document.getElementById("comments-number");
const author = localStorage.getItem("author") || "Erhard";

let data;
getDataByUsername(username).then((result) => {
  data = result;
  commentsNumber.innerHTML = data.length;
  createCommentList(data);
});

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
    data = {
      username: username,
      author: author,
      comment: commentTextarea.value,
    };
    postData(data);
  }
});

function getDataByUsername(username) {
  const paramVar = "example_param_value";
  const url = `http://localhost:8080/community?param=${paramVar}`;
  return fetch("http://localhost:3000/community", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
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
    },
    body: JSON.stringify(Data),
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
