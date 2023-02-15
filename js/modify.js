let data = new Array();
let totalPage = 1000;

let date = new Date(); // ex) 2021-10-07 15:30:00
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let YearMonthDate = year + "-" + month + "-" + day;

for (let i = 1; i <= totalPage; i++) {
  data[i] = {
    notice_num: i,
    title: "제목" + i,
    writer: "작성자" + i,
    date_created: YearMonthDate,
    Lookkup_num: i,
    attachment_num: 0,
    content: `<p style = "text-align: center;">수정 헤야할 사항+참고사항</p>
    <p><br></p>
    <p>1. 좌, 중, 우 선택 강조</p>
    <p>2. 굵게, 기울임, 밑줄, 취소선 버튼은 다시 누르면 취소되게 하기 </p>
    <p style="color: rgb(255, 0, 0);">3. color 기능?</p>
    <p style="font-size: 30px;">4. font size 기능</p>
    <p style="font-family: '맑은 고딕', 'Malgun Gothic', '돋움', 'Dotum', sans-serif;">5. 글꼴 기능</p>
    <p>6. tab키로 들여쓰기</p>
    <p>7. 마지막줄 직접 입력하면 문제 없는데 받아온 마지막줄을 하다보면 버튼들 작동이 안됨</p>
    <p><strong>미리보기 지금 겉보기에 차이는 없는데 링크 씌우면 편집할 때는 못누르고 미리보기 때 누를 수 있는 차이가 있다.</strong></p>`,
  };
}
const html_title = document.querySelector("title");
html_title.textContent = data[1].title + " 수정";
// h1 선택
const h1 = document.querySelector("h1");
h1.textContent = data[1].title + " 수정";

const adminName = document.getElementById("adminName");
adminName.textContent = data[1].writer;

const modifybtn = document.getElementById("modify");
const title = document.getElementById("title");
title.value = data[1].title;
const content_before = document.getElementById("content_before");
const content = document.getElementById("content");
content.value = data[1].content;

title.focus();

modifybtn.addEventListener("click", function (mdevent) {
  if (title.value == "") {
    mdevent.preventDefault();
    alert("제목을 입력해주세요.");
    title.focus();
  } else if (content.value == "") {
    mdevent.preventDefault();
    alert("내용을 입력해주세요.");
    content.focus();
  } // div에 내용이 없으면
  else if (div.innerHTML == "") {
    mdevent.preventDefault();
    alert("내용을 입력해주세요.");
    div.focus();
  } else {
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
div.innerHTML = data[1].content;
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
