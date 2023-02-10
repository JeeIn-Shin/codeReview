const submitbtn = document.getElementById('submit');
                
submitbtn.addEventListener('click', function(event){
  const userName = document.getElementById('userName');
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  /* 현재 년원일시분초 얻어오기
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1; 
  let day = date.getDate();
  let YearMonthDate = year + '-' + month + '-' + day;
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let msecond = date.getMilliseconds();
  let fullDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + msecond;*/

  //let addList = '';

  if (userName.value == "") {
    alert('작성자를 입력해주세요.');
    userName.focus();
    event.preventDefault();
  } else if (title.value == "") {
    alert('제목을 입력해주세요.');
    title.focus()
    event.preventDefault();
  } else if (content.value == "") {
    alert('내용을 입력해주세요.');
    content.focus();
    event.preventDefault();
  } else {

  } })