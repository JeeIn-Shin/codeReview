const submitbtn = document.getElementById("submit");

submitbtn.addEventListener("click", function (submitevent) {
  const userName = document.getElementById("userName");
  const title = document.getElementById("title");
  const content = document.getElementById("content");

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
  } else {
  }
});
