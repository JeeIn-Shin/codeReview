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

//검색 내용이 들어갈 때만 검색이 되게 합니다.
const searchbtn = document.getElementById("search");

searchbtn.addEventListener("click", function (searchevent) {
  const scontent = document.getElementById("scontent");

  if (scontent.value == "") {
    alert("내용을 입력해주세요.");
    scontent.focus();
    searchevent.preventDefault();
  } else {
  }
});

//    총 게시글 수
let totalPage = 1000;
//  한 페이지 당 출력되는 게시글 갯수
let page_num = 20;
//   한번에 출력될 수 있는 최대 블록 수
// ex ) [1][2][3][4][5] -> 블록
let block_num = 10;
// 블록의 총 수를 계산한다.
let total_block = totalPage % 20 == 0 ? totalPage / 20 : totalPage / 20 + 1;
// 현재 블록 위치를 알려준다
let current_block = 1;
// 첫 째 블록
const first_block = 1;
// 마지막 블록 그룹에서 첫 째 블록
let last_block = total_block - ((total_block - 1) % 10);
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
let data = new Array();

//    게시글 데이터를 담고 있는 객체를 1000개 추가한다.
for (let i = 1; i <= totalPage; i++) {
  data[i] = {
    notice_num: i,
    title: "제목" + i,
    writer: "작성자" + i,
    date_created: YearMonthDate,
    Lookkup_num: i,
    attachment_num: undefined,
    Modify: "수정",
    Delete: "삭제",
  };
}
// 게시글 데이터 출력하기
// 매개변수 : 선택 블럭
function post_data_print(block) {
  // 초기화
  // 게시글 title 제외하고 모두 제거
  let post_list = document.querySelectorAll(".data_row");
  post_list.forEach(function (item) {
    item.remove();
  });

  // 게시글 출력 공간
  let notice_board = document.querySelector(".notice_board");
  // 출력 첫 페이지 번호
  let start = totalPage - page_num * (block - 1);
  for (let i = start; i >= 1 && i > start - page_num; i--) {
    // 게시글 데이터 가져와서 게시글 요소 생성 및 추가
    // 번호, 제목, 작성자, 작성일, 조회수, 첨부파일, 수정, 삭제
    // data[i].notice_num data[i].title data[i].writer data[i].date_created data[i].Lookkup_num data[i].attachment_num data[i].Modify data[i].Delete

    let post = document.createElement("ul");
    post.className = "board_row";
    post.className = "data_row";

    let classname = [
      "w70",
      "w500",
      "w120",
      "w100",
      "w100",
      "w100",
      "w100",
      "w100",
    ];

    let post_data = [
      data[i].notice_num,
      data[i].title,
      data[i].writer,
      data[i].date_created,
      data[i].Lookkup_num,
      data[i].attachment_num,
      data[i].Modify,
      data[i].Delete,
    ];

    if (isAdmin === false) {
      //관리자가 아닐 때
      //수정, 삭제 숨기기
      const listmodify = document.getElementById("modify");
      listmodify.style.display = "none";
      const listdelete = document.getElementById("delete");
      listdelete.style.display = "none";
      //게시글 생성
      for (let j = 0; j < classname.length - 2; j++) {
        let li = document.createElement("li");
        li.className = classname[j];
        if (j == 1) {
          let a = document.createElement("a");
          a.setAttribute("href", "공지사항.html");
          a.setAttribute("target", "_parent");
          a.textContent = post_data[j];
          li.appendChild(a);
        } else {
          li.textContent = post_data[j];
        }

        post.appendChild(li);
      }
    } else {
      //관리자가 맞을 때
      const boardRow = document.querySelector(".board_row");
      boardRow.style.width = "1200px";
      //게시글 생성
      for (let j = 0; j < classname.length; j++) {
        let li = document.createElement("li");
        li.className = classname[j];

        if (j == 1) {
          //제목을 눌렀을 때 공지사항.html
          let a = document.createElement("a");
          a.setAttribute("href", "공지사항.html");
          a.setAttribute("target", "_parent");
          a.textContent = post_data[j];
          li.appendChild(a);
        }
        //수정 버튼을 눌렀을 때 공지사항수정.html
        else if (j == 6) {
          let a = document.createElement("a");
          let btn = document.createElement("button");
          a.setAttribute("href", "공지사항수정.html");
          a.setAttribute("target", "_parent");
          btn.textContent = post_data[j];
          a.appendChild(btn);
          //a.textContent = post_data[j];
          li.appendChild(a);
        }
        //삭제 버튼을 눌렀을 때 공지사항삭제.html
        else if (j == 7) {
          let a = document.createElement("a");
          let btn = document.createElement("button");

          btn.textContent = post_data[j];
          a.appendChild(btn);
          li.appendChild(a);
          //삭제 버튼을 눌렀을 때 삭제 확인창 띄우기
          btn.addEventListener("click", function () {
            if (confirm("정말 삭제하시겠습니까?")) {
              alert("삭제되었습니다.");
              //서버로 삭제한 게시글의 번호를 보내주기
              a.setAttribute("href", "공지사항삭제.html");
              a.setAttribute("target", "_parent");
            } else {
              alert("취소되었습니다.");
            }
          });
        } else {
          li.textContent = post_data[j];
        }

        post.appendChild(li);
      }
    }

    // 게시글 추가
    notice_board.appendChild(post);
  }
}

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
function block_print(front_block) {
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
    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    button.addEventListener("click", function (event) {
      post_data_print(i);
    });
    // 블럭에 추가한다.
    block_box.appendChild(button);
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
  block_print(last_block);
  console.log("마지막");
}
// 화면 로드 시 실행되는 이벤트
window.onload = function () {
  // 게시글 데이터 출력하기
  post_data_print(1);

  // 블럭 출력하기
  block_print(1);
};

//관리자만 글쓰기 기능을 이용하게 하기
const writebutton = document.getElementById("write");
if (isAdmin === true) {
  writebutton.style.display = "inline-block";
} else {
  writebutton.style.display = "none";
}
