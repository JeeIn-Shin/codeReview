"use strict";
/*
totalPage : 총 게시글 수
page_num : 한 페이지 당 출력되는 게시글 갯수
block_num : 한번에 출력될 수 있는 최대 블록 수 n개 1세트
total_block : 블록의 총 수
first_block : 첫 째 블록
current_block : // 현재 n세트에서 첫번째 블록
data: 게시글 데이터를 담고 있는 객체 배열
post_data_print(select_block) : 게시글 데이터 출력하기 / 매개변수 : 선택 블럭 
block_print(front_block) : 블럭 출력하기 / 매개변수 : 가장 앞에 오는 블럭
*/
console.clear();
// 이동을 감지하는 변수
let isMove = false;
console.log("isMove : ", isMove);
let post_title;
// 관리자인지 판단하기
let isAdmin = localStorage.getItem("isAdmin") || true;
localStorage.setItem("isAdmin", isAdmin);
console.log("isAdmin : ", isAdmin);
//  한 페이지 당 출력되는 게시글 갯수
let page_num = 8;
console.log("page_num : ", page_num);

//   한번에 출력될 수 있는 최대 블록 수
// ex ) [1][2][3][4][5] -> 블록
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

//number 타입으로 변환

let data;
let totalPage = localStorage.getItem("totalPage");

getData()
  .then((data) => {
    totalPage = data.length;
    localStorage.setItem("totalPage", totalPage);
    console.log("getTotalPage : ", totalPage);
    console.log("getData : ", data);
  })
  .then(() => {
    // 게시글 데이터 출력하기
    post_data_print(select_block);
    // 페이지네이션 블록 출력하기
    block_print(current_block);
  });

/*else {
  console.log("getBlocktotalPage : ", totalPage);
  getBlockData(totalPage, page_num, select_block)
    .then((data) => {
      console.log("getBlockData : ", data);
    })
    .then(() => {
      // 게시글 데이터 출력하기
      post_data_print(select_block);
      // 페이지네이션 블록 출력하기
      block_print(current_block);
    });
}*/

//검색 내용이 들어갈 때만 검색이 되게 합니다.
const searchbtn = document.getElementById("searchbtn");
const scombox1 = document.getElementById("scombox1");

//option value 값이 들어갈 변수
let optionValue = "title";

//검색 조건을 선택하면 option value 값이 들어간다.
scombox1.addEventListener("change", function () {
  optionValue = scombox1.value;
  console.log("optionValue : ", optionValue);
});

searchbtn.addEventListener("click", function (searchevent) {
  const scontent = document.getElementById("scontent");

  if (scontent.value == "") {
    searchevent.preventDefault();
    alert("내용을 입력해주세요.");
    scontent.focus();
  } else {
    searchevent.preventDefault();
    console.clear();
    console.log("검색어 : ", scontent.value);
    console.log("검색조건 : ", optionValue);
    //optionValue(title, details)에 따라서 검색이 되게 합니다.
    if (optionValue == "title") {
      getDataByTitle(scontent.value)
        .then((data) => {
          //데이터가 없을 때
          if (data == "") {
            alert("검색 결과가 없습니다.");
            //새로고침
            location.reload();
          }
          console.log("getDataByTitle : ", data);
          totalPage = data.length;
          console.log("totalPage : ", totalPage);
          localStorage.setItem("totalPage", totalPage);
          localStorage.setItem("current_block", 1);
          localStorage.setItem("select_block", 1);
          console.log("getTotalPage : ", totalPage);
        })
        .then(() => {
          // 게시글 데이터 출력하기
          post_data_print(select_block);
          // 페이지네이션 블록 출력하기
          block_print(current_block);
        });
    } else if (optionValue == "details") {
      getDataByDetails(scontent.value)
        .then((data) => {
          //데이터가 없을 때
          if (data == "") {
            alert("검색 결과가 없습니다.");
            //새로고침
            location.reload();
          }
          console.log("getDataByDetails : ", data);
          totalPage = data.length;
          localStorage.setItem("totalPage", totalPage);
          localStorage.setItem("current_block", 1);
          localStorage.setItem("select_block", 1);
          console.log("getTotalPage : ", totalPage);
        })
        .then(() => {
          // 게시글 데이터 출력하기
          post_data_print(select_block);
          // 페이지네이션 블록 출력하기
          block_print(current_block);
        });
    }
  }
});

/*
        게시글 데이터를 담고 있는 객체 배열
         제목 : data[게시글 번호].TITLE
        작성자 : data[게시글 번호].WRITER
        작성일 : data[게시글 번호].DATE
        내용 : data[게시글 번호].DETAILS
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
  let start = totalPage - page_num * (block - 1);

  for (let i = start; i >= 1 && i > start - page_num; i--) {
    // 게시글 데이터 가져와서 게시글 요소 생성 및 추가
    // 번호, 제목, 작성자, 작성일, 조회수, 첨부파일, 수정, 삭제
    createPostElement(data, i);
  }
}

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
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

    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    button.addEventListener("click", function (event) {
      console.clear();
      //focus 이동
      window.scrollTo(0, 100);

      //data = getData().then((data) => {
      //console.log("getBlockData : ", data);
      post_data_print(i);
      //});
      // 현재 블록을 저장한다.
      localStorage.setItem("current_block", current_block);
      console.log("current_block 설정 : ", current_block);
      localStorage.setItem("select_block", i);

      select_block = localStorage.getItem("select_block");
      console.log("selct_block 설정 : ", select_block);
      // 누른 버튼은 못누르게 한다.
      event.target.disabled = true;
      //누른 버튼은 계속 눌린 상태로 보이게 한다.
      event.target.classList.add("active");
      //누른 버튼을 제외한 나머지 버튼은 누를 수 있게 한다.
      let buttons = document.querySelectorAll(".page-link");
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j] != event.target) {
          buttons[j].disabled = false;
          buttons[j].classList.remove("active");
        }
      }
    });
    //select_block의 버튼은 누를 수 없게 한다.
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

  //관리자만 글쓰기 기능을 이용하게 하기
  const writebutton = document.getElementById("write");
  console.log("isAdmin? : ", isAdmin);
  if (isAdmin) {
    console.log("isAdmin?? : ", isAdmin);
    writebutton.style.display = "inline-block";
    writebutton.onclick = function () {
      localStorage.setItem("select_block", select_block);
      localStorage.setItem("post_mode", "write");
      isMove = true;
    };
  } else {
    console.log("isAdmin??? : ", isAdmin);
    writebutton.style.display = "none";
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

async function getData() {
  try {
    const paramVar = "example_param_value";
    const url = `http://localhost:8080/notice?param=${paramVar}`;

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

//누른 블록의 데이터만 서버에서 가져오기
/*async function getBlockData(totalPage, page_num, block) {
  let start = totalPage - page_num * (block - 1);
  let end = start - page_num;
  console.log("start: ", start);
  console.log("end: ", end);
  try {
    const response = await fetch(
      `http://localhost:8080/notice?start=${start}&end=${end}`,
      {
        method: "GET",
        mode: "cors",
        body: "param=" + paramVar,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //data를 리턴한다.
    data = await response.json();
    alert(`데이터를 가져왔습니다. (블록 ${block})`);
    return data;
  } catch (error) {
    alert("데이터를 가져오지 못했습니다.");
  }
}*/

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
        const post = notice.find((n) => n.ID_PK === post_title);
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
      .then((json) => location.reload());
  } catch (error) {
    alert("삭제를 실패했습니다.");
  }
}

function getDataByTitle(title) {
  try {
    const paramVar = "example_param_value";
    const url = `http://localhost:8080/notice?param=${paramVar}`;
    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((notice) => {
        const titleLowerCase = title.toLowerCase();
        data = notice.filter((n) =>
          n.TITLE.toLowerCase().includes(titleLowerCase)
        );
        return data; // add this line to return the filtered posts
      });
  } catch (error) {
    alert("검색을 실패했습니다.");
  }
}

function getDataByDetails(details) {
  try {
    const paramVar = "example_param_value";
    const url = `http://localhost:8080/notice?param=${paramVar}`;
    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((notice) => {
        const detailsLowerCase = details.toLowerCase();
        data = notice.filter((n) =>
          n.DETAILS.toLowerCase().includes(detailsLowerCase)
        );
        return data; // add this line to return the filtered posts
      });
  } catch (error) {
    alert("검색을 실패했습니다.");
  }
}

function createPostElement(data, i) {
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
  /*const entryImageDiv = document.createElement("div");
  entryImageDiv.classList.add("entry-image");
  const imageAnchor = document.createElement("a");
  imageAnchor.href = "../../public/image/blog/full/1.jpg"; // 이미지 경로
  imageAnchor.setAttribute("data-lightbox", "image");
  const image = document.createElement("img");
  image.src = "../../public/image/blog/grid/1.jpg"; // 이미지 경로
  image.alt = "Standard Post with Image"; // 이미지 설명
  imageAnchor.appendChild(image);
  entryImageDiv.appendChild(imageAnchor);*/

  // 게시글 제목을 담고 있는 div 생성
  const entryTitleDiv = document.createElement("div");
  entryTitleDiv.classList.add("entry-title");
  const heading = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.target = "_blank";
  titleAnchor.href = "notice.html"; // 게시글 링크
  titleAnchor.textContent = data[i - 1].TITLE; // 게시글 제목
  titleAnchor.onclick = function () {
    isMove = true;
    localStorage.setItem("post_title", data[i - 1].ID_PK);
    localStorage.setItem("select_block", select_block);
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
  authorIcon.textContent = " " + data[i - 1].WRITER; // 게시글 작성자

  authorListItem.appendChild(authorIcon);

  const dateListItem = document.createElement("li");
  const dateIcon = document.createElement("i");
  dateIcon.className = "icon-calendar3";
  dateIcon.textContent = " " + data[i - 1].DATE; // 게시글 작성일
  dateListItem.appendChild(dateIcon);

  metaList.appendChild(authorListItem);
  metaList.appendChild(dateListItem);
  entryMetaDiv.appendChild(metaList);

  const entryContentDiv = document.createElement("div");
  entryContentDiv.classList.add("entry-content");
  //100자 정도가 들어가게 크기를 정하고 100자 아니어도 그 크기로 나옴
  entryContentDiv.style.width = "300px";
  entryContentDiv.style.height = "100px";

  const contentParagraph = document.createElement("p");
  contentParagraph.innerHTML = data[i - 1].DETAILS; // 게시글 내용
  //css 미적용
  contentParagraph.textContent = contentParagraph.textContent;
  //3줄만
  contentParagraph.style.webkitLineClamp = "3";
  contentParagraph.style.display = "-webkit-box";
  contentParagraph.style.webkitBoxOrient = "vertical";
  contentParagraph.style.overflow = "hidden";
  contentParagraph.style.textOverflow = "ellipsis";

  entryContentDiv.appendChild(contentParagraph);

  const readMoreDiv = document.createElement("div");
  readMoreDiv.classList.add("read-more");

  const readMoreAnchor = document.createElement("a");
  readMoreAnchor.target = "_blank";
  readMoreAnchor.href = "notice.html";
  readMoreAnchor.classList.add("more-link");
  readMoreAnchor.textContent = "Read More";
  readMoreAnchor.onclick = function () {
    isMove = true;
    localStorage.setItem("select_block", select_block);
    localStorage.setItem("post_title", data[i - 1].ID_PK);
  };

  readMoreDiv.appendChild(readMoreAnchor);

  //br
  const br = document.createElement("br");

  const entryButtonDiv = document.createElement("div");
  entryButtonDiv.classList.add("entry-button");
  //관리자일 때만 게시글 수정, 삭제 버튼 생성
  if (isAdmin) {
    const modifyaAnchor = document.createElement("a");
    modifyaAnchor.target = "_blank";
    modifyaAnchor.href = "notice-write.html";
    modifyaAnchor.classList.add("btn", "btn-primary");
    modifyaAnchor.textContent = "수정";
    modifyaAnchor.onclick = function () {
      localStorage.setItem("select_block", select_block);
      localStorage.setItem("post_mode", "modify");
      localStorage.setItem("post_title", data[i - 1].ID_PK);
      isMove = true;
    };

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.id = "delete";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function () {
      if (
        confirm(
          data[i - 1].ID_PK +
            "번 " +
            data[i - 1].TITLE +
            " 정말 삭제하시겠습니까?"
        )
      ) {
        isMove = true;
        deleteDataByTitle(data[i - 1].ID_PK);
      } else {
        alert("취소되었습니다.");
      }
    });

    entryButtonDiv.appendChild(modifyaAnchor);
    entryButtonDiv.appendChild(deleteButton);
  }

  parentDiv.appendChild(entryDiv);
  entryDiv.appendChild(gridInnerDiv);
  //gridInnerDiv.appendChild(entryImageDiv);
  gridInnerDiv.appendChild(entryTitleDiv);
  gridInnerDiv.appendChild(entryMetaDiv);
  gridInnerDiv.appendChild(entryContentDiv);
  gridInnerDiv.appendChild(readMoreDiv);
  gridInnerDiv.appendChild(br);
  gridInnerDiv.appendChild(entryButtonDiv);
}

window.onunload = function (event) {
  if (!isMove) {
    //localStorage.clear();
  }
};
