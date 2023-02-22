//localStorage에 저장된 마지막 공지사항의 번호를 가져와 1을 더한다.
let post_num = localStorage.getItem("post_num");
post_num = Number(post_num) + 1;

//html에 공지사항의 개수를 출력한다.
let notice_num_html = document.createElement("h2");
notice_num_html.textContent =
  "지금 쓰는 공지사항은 " + post_num + "번째 공지사항입니다.";
document.querySelector("h1").appendChild(notice_num_html);

const userName = document.getElementById("userName");
const title = document.getElementById("title");
const content = document.getElementById("content");
const submitbtn = document.getElementById("submit");

submitbtn.addEventListener("click", function (submitevent) {
  if (userName.value == "") {
    alert("작성자를 입력해주세요.");
    userName.focus();
    submitevent.preventDefault();
  } else if (title.value == "") {
    alert("제목을 입력해주세요.");
    title.focus();
    submitevent.preventDefault();
  } else if (content.value == "") {
    alert("내용을 입력해주세요.");
    content.focus();
    submitevent.preventDefault();
  } else if (div.innerHTML == "") {
    mdevent.preventDefault();
    alert("내용을 입력해주세요.");
    div.focus();
  } else {
    submitevent.preventDefault();
    let date = new Date(); //ex) 2021-10-07 15:30:00
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let YearMonthDate = year + "-" + month + "-" + day; //ex) 2021-10-07

    // 게시글 데이터를 담고 있는 객체 배열을 만들어 서버애 전송한다.
    let data = {
      notice_num: post_num,
      title: title.value,
      writer: userName.value,
      date_created: YearMonthDate,
      Lookkup_num: 0,
      attachment_num: 0,
      content: content.value,
    };
    // json-server에 데이터를 전송한다.
    fetch("http://localhost:3000/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.title) {
          alert("게시글이 등록되었습니다.");
          location.href = "index.html";
        } else {
          alert("게시글 등록에 실패했습니다.");
        }
      });
  }
});

const edit_btn = document.getElementById("edit_btn");
const tarea_btn = document.getElementById("tarea_btn");
// edit_btn을 누르지 못하게 한다.
edit_btn.disabled = true;
// tarea_btm을 누르면  id가 content인 textarea를 나타나게 한다.

tarea_btn.addEventListener("click", function () {
  content.value = div.innerHTML;
  content_before.style.display = "none";
  content.style.display = "block";
  //div를 숨긴다.
  div.style.display = "none";
  //prevoew를 숨긴다.
  preview.style.display = "none";
  //edit_btn을 누를 수 있게 한다.
  edit_btn.disabled = false;
  // preview_btn을 누를 수 있게 한다.
  preview_btn.disabled = false;
  //tarea_btn을 누를 수 없게 한다.
  tarea_btn.disabled = true;
});

//편집창 만들기
const div = document.createElement("div");
div.id = "edit";
div.className = "container3";
div.innerHTML = `<p><br></p> `;

//div에 수정가능한 속성을 추가한다.
div.setAttribute("contenteditable", "true");
content_before.insertAdjacentElement("afterend", div);

//edit_btm을 누르면 textarea를 숨기고 div를 나타나게 한다.
edit_btn.addEventListener("click", function () {
  content_before.style.display = "block";
  content.style.display = "none";
  preview.style.display = "none";
  //textarea에 있는 내용을 div에 넣는다.
  div.innerHTML = content.value;
  //div를 보여준다.
  div.style.display = "block";
  //edit_btn을 누를 수 없게 한다.
  edit_btn.disabled = true;
  //tarea_btn을 누를 수 있게 한다.
  tarea_btn.disabled = false;
  //preview_btn을 누를 수 있게 한다.
  preview_btn.disabled = false;
});

const left_btn = document.getElementById("left_btn");
const center_btn = document.getElementById("center_btn");
const right_btn = document.getElementById("right_btn");
const bold_btn = document.getElementById("bold_btn");
const italic_btn = document.getElementById("italic_btn");
const underline_btn = document.getElementById("underline_btn");
const strike_btn = document.getElementById("strike_btn");
const link_btn = document.getElementById("link_btn");
const preview_btn = document.getElementById("preview_btn");

left_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();

  if (node.parentNode.id == "edit") {
    node.style.textAlign = "left";
  } else {
    //편집창에 커서를 놓는다.
    div.focus();
  }
});
center_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    node.style.textAlign = "center";
  } else {
    div.focus();
  }
});
right_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    node.style.textAlign = "right";
  } else {
    div.focus();
  }
});
bold_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    node.style.fontWeight = "bold";
  } else {
    div.focus();
  }
});
italic_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    node.style.fontStyle = "italic";
  } else {
    div.focus();
  }
});
underline_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    node.style.textDecoration = "underline";
  } else {
    div.focus();
  }
});
strike_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    node.style.textDecoration = "line-through";
  } else {
    div.focus();
  }
});

link_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  let node = getSelectedNode();
  if (node.parentNode.id == "edit") {
    let link = prompt("링크를 입력하세요.");
    node.innerHTML = `<a href="${link}">${node.innerHTML}</a>`;
  } else {
    div.focus();
  }
});

const content_next = document.getElementById("content_next");
const preview = document.createElement("div");
preview.className = "container3";
preview.style.display = "none";
//content_next 앞에 preview를 추가한다.
content_next.insertAdjacentElement("beforebegin", preview);

//preview_btn을 누르면  편집창을 숨기고 편집 내용을 미리보기로 나타나게 한다.
preview_btn.addEventListener("click", function (mdevent) {
  mdevent.preventDefault();
  //미리보기에 편집창의 내용을 넣는다.
  preview.innerHTML = div.innerHTML;
  //편집창을 숨긴다.
  div.style.display = "none";
  //textarea를 숨긴다.
  content.style.display = "none";
  //미리보기를 보여준다.
  preview.style.display = "block";
  //edit_btn을 누를 수 있게 한다.
  edit_btn.disabled = false;
  //tarea_btn을 누를 수 있게 한다.
  tarea_btn.disabled = false;
  //preview_btn을 누를 수 없게 한다.
  preview_btn.disabled = true;
});

//커서를 통해 노드를 선택한다.
function getSelectedNode() {
  let selection = window.getSelection();
  let node = selection.anchorNode;
  if (node.nodeName == "#text") {
    node = node.parentNode;
  }
  return node;
}

/* 현재 년원일시분초 얻어오기
  let date = new Date(); ex) 2021-10-07 15:30:00
  let year = date.getFullYear(); 
  let month = date.getMonth() + 1;  
  let day = date.getDate();  
  let YearMonthDate = year + '-' + month + '-' + day; ex) 2021-10-07
  let hour = date.getHours(); 
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let msecond = date.getMilliseconds();
  let fullDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + msecond;*/

//let addList = '';
