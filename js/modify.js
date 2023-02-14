const modifybtn = document.getElementById("modify");

modifybtn.addEventListener("click", function (mdevent) {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  if (title.value == "") {
    alert("제목을 입력해주세요.");
    title.focus();
    mdevent.preventDefault();
  } else if (content.value == "") {
    alert("내용을 입력해주세요.");
    content.focus();
    mdevent.preventDefault();
  } else {
  }
});
