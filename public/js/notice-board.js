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
let page_num = 8;
let data = getData();
console.log("data : ", data);

//검색 내용이 들어갈 때만 검색이 되게 합니다.
const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener("click", function (searchevent) {
  const scontent = document.getElementById("scontent");

  if (scontent.value == "") {
    searchevent.preventDefault();
    alert("내용을 입력해주세요.");
    scontent.focus();
  } else {
  }
});

//  한 페이지 당 출력되는 게시글 갯수

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
  // 출력 첫 게시글 번호
  let start = data.length - page_num * (block - 1);

  for (let i = start; i >= 1 && i > start - page_num; i--) {
    // 게시글 데이터 가져와서 게시글 요소 생성 및 추가
    // 번호, 제목, 작성자, 작성일, 조회수, 첨부파일, 수정, 삭제
    let post_data = post_get_data(i);

    createPostElement(post_data, i);
    //createImagePostElement(post_data, i); //이미지의 경우
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
      localStorage.setItem("post_mode", "write");
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
  try {
    const response = await fetch("http://localhost:3000/notice");

    //data를 리턴한다.
    data = await response.json();
    alert("데이터를 가져왔습니다.");
    return data;
  } catch (error) {
    alert("데이터를 가져오지 못했습니다.");
  }
}

//fetch를 이용하여 page_num개의 데이터를 가져오는 함수
async function getPageData(page_num) {
  const response = await fetch(
    `http://localhost:3000/notice?_limit=${page_num}&_sort=id&_order=desc`
  );
  //data를 리턴한다.
  data = await response.json();
  return data;
}

function post_get_data(i) {
  let title;
  let writer;
  let date;
  let details;
  //let Lookup_num;
  //let attachment_num;
  //let content;
  let post_data = [
    //data[i - 1].notice_num,
    (title = data[i - 1].title),
    (writer = data[i - 1].writer),
    (date = data[i - 1].date),
    (details = data[i - 1].details),
  ];
  return post_data;
}

function deleteDataByTitle(post_title) {
  try {
    fetch("http://localhost:3000/notice")
      .then((response) => response.json())
      .then((notice) => {
        const post = notice.find((n) => n.title === post_title);
        console.log("post: ", post);
        console.log("post.title: ", post.title);
        return fetch(`http://localhost:3000/notice/${post.id}`, {
          method: "DELETE",
        });
      })
      .then((response) => response.json())
      .then((json) => alert("삭제되었습니다."))
      .then((json) => console.log(json));
  } catch (error) {
    alert("삭제를 실패했습니다.");
  }
}

function createPostElement(post_data, i) {
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
  imageAnchor.href = "../../public/image/blog/full/1.jpg"; // 이미지 경로
  imageAnchor.setAttribute("data-lightbox", "image");
  const image = document.createElement("img");
  image.src = "../../public/image/blog/grid/1.jpg"; // 이미지 경로
  image.alt = "Standard Post with Image"; // 이미지 설명
  imageAnchor.appendChild(image);
  entryImageDiv.appendChild(imageAnchor);

  // 게시글 제목을 담고 있는 div 생성
  const entryTitleDiv = document.createElement("div");
  entryTitleDiv.classList.add("entry-title");
  const heading = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = "notice.html"; // 게시글 링크
  titleAnchor.textContent = post_data[0]; // 게시글 제목
  titleAnchor.onclick = function () {
    localStorage.setItem("post_title", post_data[0]);
  };
  heading.appendChild(titleAnchor);
  entryTitleDiv.appendChild(heading);

  // 게시글 작성자, 작성일을 담고 있는 div 생성
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

  metaList.appendChild(authorListItem);
  metaList.appendChild(dateListItem);
  entryMetaDiv.appendChild(metaList);

  const entryContentDiv = document.createElement("div");
  entryContentDiv.classList.add("entry-content");
  const contentParagraph = document.createElement("p");
  contentParagraph.textContent = post_data[3]; // 게시글 내용

  entryContentDiv.appendChild(contentParagraph);

  const readMoreAnchor = document.createElement("a");
  readMoreAnchor.href = "notice.html";
  readMoreAnchor.classList.add("more-link");
  readMoreAnchor.textContent = "Read More";
  readMoreAnchor.onclick = function () {
    localStorage.setItem("post_title", post_data[0]);
  };

  entryContentDiv.appendChild(readMoreAnchor);

  //br
  const br = document.createElement("br");

  // 게시글 수정, 삭제 버튼 생성
  const entryButtonDiv = document.createElement("div");
  entryButtonDiv.classList.add("entry-button");

  const modifyaAnchor = document.createElement("a");
  modifyaAnchor.href = "notice-write.html";
  modifyaAnchor.classList.add("btn", "btn-primary");
  modifyaAnchor.textContent = "수정";
  modifyaAnchor.onclick = function () {
    localStorage.setItem("post_mode", "modify");
    localStorage.setItem("post_title", post_data[0]);
  };

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.id = "delete";
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", function () {
    if (confirm(post_data[0] + " 정말 삭제하시겠습니까?")) {
      deleteDataByTitle(post_data[0]);
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
  gridInnerDiv.appendChild(br);
  gridInnerDiv.appendChild(entryButtonDiv);
}

window.onload = function () {
  // 게시글 데이터 출력하기
  post_data_print(1);

  // 블럭 출력하기
  block_print(1);
};
