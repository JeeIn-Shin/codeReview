

function select(e) { //이미지 버튼 클릭시 색상 변경 저장 함수
    var btns = document.querySelectorAll(".button");
    btns.forEach(function (btn, i) {
        if (e.currentTarget == btn) 
        {
            btn.classList.add("active");
        } 
        else 
        {
        btn.classList.remove("active");
        }
    });
    console.log(e.currentTarget);
  }