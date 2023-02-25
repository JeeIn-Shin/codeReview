"use strict";
/*
totalPage : 총 게시글 수
page_num : 한 페이지 당 출력되는 게시글 갯수
block_num : 한번에 출력될 수 있는 최대 블록 수
total_block : 블록의 총 수
current_block : 현재 블록 위치
data: 게시글 데이터를 담고 있는 객체 배열
post_data_print(block) : 게시글 데이터 출력하기 / 매개변수 : 선택 블럭 
block_print(front_block) : 블럭 출력하기 / 매개변수 : 가장 앞에 오는 블럭
*/

// 게시글 데이터를 담고 있는 객체 배열
let data = new Array();
//    총 게시글 수
let totalPage;

//  한 페이지 당 출력되는 게시글 갯수
let page_num = 8;
//   한번에 출력될 수 있는 최대 블록 수
// ex ) [1][2][3][4][5] -> 블록
let block_num = 10;

// 현재 블록 위치를 알려준다
let current_block = 1;
// 첫 째 블록
const first_block = 1;

// 관리자인지 판단하기
let isAdmin = true;
//let isAdmin = false;

let date = new Date(); // ex) 2021-10-07 15:30:00
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let YearMonthDate = year + "-" + month + "-" + day; // ex) 2021-10-07

/*
        게시글 데이터를 담고 있는 객체 배열
        번호 : data[게시글 번호].notice_num
        제목 : data[게시글 번호].title
        작성자 : data[게시글 번호].writer
        작성일 : data[게시글 번호].date_created
        조회수 : data[게시글 번호].Lookkup_num
        첨부파일 개수 :data[게시글 번호].attachment
        */

// 게시글 데이터 출력하기
// 매개변수 : 선택 블럭
function post_data_print(block) {
  // 초기화
  const post_list = document.querySelector(
    ".post-grid.row.grid-container.gutter-30"
  );
  post_list.innerHTML = "";
  // 출력 첫 페이지 번호
  let start = data.length - page_num * (block - 1);

  for (let i = start; i >= 1 && i > start - page_num; i--) {
    // 게시글 데이터 가져와서 게시글 요소 생성 및 추가
    // 번호, 제목, 작성자, 작성일, 조회수, 첨부파일, 수정, 삭제
    let post_data = post_get_data(i);

    createImagePostElement(post_data, i); //이미지의 경우
  }
}

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
function block_print(front_block) {
  // 블록의 총 수를 계산한다.
  let total_block =
    data.length % page_num == 0
      ? data.length / page_num
      : data.length / page_num + 1;

  /*
            1. 이전, 다음 블럭 속성 처리
            2. 기존 블럭 모두 삭제
            3. 범위 안의 블럭 생성 및 추가
            */
  current_block = front_block;

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

  // 블럭을 추가할 공간
  let block_box = document.querySelector(".block");
  // 기존 블럭 모두 삭제
  block_box.replaceChildren();

  console.log("remove");

  //front_block부터 total_block 또는 block_num까지 생성 및 추가
  for (
    let i = front_block;
    i <= total_block && i < front_block + block_num;
    i++
  ) {
    console.log("add element");

    // 버튼을 생성한다.
    let button = document.createElement("button");
    button.textContent = i;
    // 버튼에 속성 page-item, page-link를 추가한다.
    button.classList.add("page-item", "page-link");
    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    button.addEventListener("click", function (event) {
      //focus 이동
      window.scrollTo(0, 100);
      post_data_print(i);
    });
    // 블럭에 추가한다.
    block_box.appendChild(button);
  }

  //관리자만 글쓰기 기능을 이용하게 하기
  const writebutton = document.getElementById("write");
  if (isAdmin === true) {
    writebutton.style.display = "inline-block";
    writebutton.onclick = function () {
      localStorage.setItem("post_num", data.length);
    };
  } else {
    writebutton.style.display = "none";
  }
}

function before() {
  block_print(current_block - block_num);
  console.log("이전");
}

function next() {
  block_print(current_block + block_num);
  console.log("다음");
}

function first() {
  block_print(first_block);
  console.log("처음");
}

function last() {
  // 블록의 총 수를 계산한다.
  let total_block =
    data.length % page_num == 0
      ? data.length / page_num
      : data.length / page_num + 1;
  // 마지막 블록 그룹에서 첫 째 블록
  let last_block = total_block - ((total_block - 1) % 10);
  block_print(last_block);
  console.log("마지막");
}

async function getData() {
  const response = await fetch("http://localhost:3000/notice");
  data = await response.json();
}

function post_get_data(i) {
  let title;
  let writer;
  let data_created;
  let Lookup_num;
  let attachment_num;
  //let content;
  let post_data = [
    //data[i - 1].notice_num,
    (title = data[i - 1].title),
    (writer = data[i - 1].writer),
    (data_created = data[i - 1].date_created),
    (Lookup_num = data[i - 1].Lookkup_num),
    (attachment_num = data[i - 1].attachment_num),
    //(content = data[i - 1].content),
  ];
  return post_data;
}

//post_delete
function post_delete(i) {
  fetch("http://localhost:3000/notice")
    .then((response) => response.json())
    .then((customers) => {
      const select_post = customers[i - 1];
      return fetch(`http://localhost:3000/notice/${select_post.id}`, {
        method: "DELETE",
      });
    })
    .then((response) => response.json())
    .then((json) => alert("삭제되었습니다."))
    .then((json) => console.log(json));
}

function createImagePostElement(post_data, i) {
  const parentDiv = document.querySelector(
    //".container.clearfix.notice_board"
    ".post-grid.row.grid-container.gutter-30"
  );

  // div 항목 생성
  const entryDiv = document.createElement("div");
  entryDiv.classList.add("entry", "col-lg-3", "col-md-4", "col-sm-6", "col-12");

  // 게시글 내용을 담고 있는 div 생성
  const gridInnerDiv = document.createElement("div");
  gridInnerDiv.classList.add("grid-inner");

  // 게시글 이미지 생성
  const entryImageDiv = document.createElement("div");
  entryImageDiv.classList.add("entry-image");
  const imageAnchor = document.createElement("a");
  imageAnchor.href = "images/blog/full/17.jpg"; // 이미지 경로
  imageAnchor.setAttribute("data-lightbox", "image");
  const image = document.createElement("img");
  image.src = "images/blog/grid/17.jpg"; // 이미지 경로
  image.alt = "Standard Post with Image"; // 이미지 설명
  imageAnchor.appendChild(image);
  entryImageDiv.appendChild(imageAnchor);

  // 게시글 제목을 담고 있는 div 생성
  const entryTitleDiv = document.createElement("div");
  entryTitleDiv.classList.add("entry-title");
  const heading = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = "공지사항.html"; // 게시글 링크
  titleAnchor.textContent = post_data[0]; // 게시글 제목
  titleAnchor.onclick = function () {
    localStorage.setItem("post_num", i);
  };
  heading.appendChild(titleAnchor);
  entryTitleDiv.appendChild(heading);

  // 게시글 작성자, 작성일, 조회수를 담고 있는 div 생성
  const entryMetaDiv = document.createElement("div");
  entryMetaDiv.classList.add("entry-meta");

  const metaList = document.createElement("ul");

  const authorListItem = document.createElement("li");
  const authorIcon = document.createElement("i");
  authorIcon.className = "icon-user";
  authorIcon.textContent = " " + post_data[1]; // 게시글 작성자

  authorListItem.appendChild(authorIcon);

  const dateListItem = document.createElement("li");
  const dateIcon = document.createElement("i");
  dateIcon.className = "icon-calendar3";
  dateIcon.textContent = " " + post_data[2]; // 게시글 작성일
  dateListItem.appendChild(dateIcon);

  const LookupListItem = document.createElement("li");
  const LookupIcon = document.createElement("i");
  LookupIcon.className = "icon-eye";
  LookupIcon.textContent = " " + post_data[3]; // 조회수
  LookupListItem.appendChild(LookupIcon);

  //첨부파일 개수
  const attachmentListItem = document.createElement("li");
  const attachmentIcon = document.createElement("i");
  attachmentIcon.className = "icon-file";
  attachmentIcon.textContent = " " + post_data[4]; // 첨부파일 개수
  attachmentListItem.appendChild(attachmentIcon);

  metaList.appendChild(authorListItem);
  metaList.appendChild(dateListItem);
  metaList.appendChild(LookupListItem);
  metaList.appendChild(attachmentListItem);
  entryMetaDiv.appendChild(metaList);

  const entryContentDiv = document.createElement("div");
  entryContentDiv.classList.add("entry-content");

  // 게시글 수정, 삭제 버튼 생성
  const entryButtonDiv = document.createElement("div");
  entryButtonDiv.classList.add("entry-button");

  const modifyaAnchor = document.createElement("a");
  modifyaAnchor.href = "공지사항수정.html";
  modifyaAnchor.classList.add("btn", "btn-primary");
  modifyaAnchor.textContent = "수정";
  modifyaAnchor.onclick = function () {
    localStorage.setItem("post_num", i);
  };

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.id = "delete";
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", function () {
    if (confirm(post_data[0] + "정말 삭제하시겠습니까?")) {
      post_delete(i);
    } else {
      alert("취소되었습니다.");
    }
  });

  entryButtonDiv.appendChild(modifyaAnchor);
  entryButtonDiv.appendChild(deleteButton);

  parentDiv.appendChild(entryDiv);
  entryDiv.appendChild(gridInnerDiv);
  gridInnerDiv.appendChild(entryImageDiv);
  gridInnerDiv.appendChild(entryTitleDiv);
  gridInnerDiv.appendChild(entryMetaDiv);
  gridInnerDiv.appendChild(entryContentDiv);
  gridInnerDiv.appendChild(entryButtonDiv);
}

// 화면 로드 시 실행되는 이벤트
/*async function init() {
  await getData();
  totalPage = data.length;
  console.log("totalPage : ", totalPage);
  // 게시글 데이터 출력하기
  post_data_print(1);
  // 블럭 출력하기
  block_print(1);
}

window.onload = init;*/

window.onload = function () {
  getData().then(() => {
    // 게시글 데이터 출력하기
    post_data_print(1);

    // 블럭 출력하기
    block_print(1);

    //검색 내용이 들어갈 때만 검색이 되게 합니다.
    const searchbtn = document.getElementById("searchbtn");

    searchbtn.addEventListener("click", function (searchevent) {
      const scontent = document.getElementById("scontent");

      if (scontent.value == "") {
        alert("내용을 입력해주세요.");
        scontent.focus();
        searchevent.preventDefault();
      } else {
      }
    });
  });
};
