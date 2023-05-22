              // function showForm() {
              //     var passwordInput = document.getElementById("passwordInput");
              //     var password = passwordInput.value;

              //     // 현재 비밀번호가 일치할 경우 개인정보 수정 폼 표시
              //     if (password === "11") {
              //     var passwordContainer = document.getElementById("passwordContainer");
              //     passwordContainer.style.display = "none";
              //     var formContainer = document.getElementById("formContainer");
              //     formContainer.style.display = "block";
              //     } else {
              //     alert("현재 비밀번호가 일치하지 않습니다.");
              //     }
              // }

              
  
  
  
  function validateForm() {
    
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword = document.getElementById("confirmNewPassword").value;


    if (newPassword !== confirmNewPassword) {
      var errorMessage = document.getElementById("errorMessage");
      errorMessage.textContent = "새 비밀번호가 일치하지 않습니다.";
      return false;
    }

    // 추가적인 유효성 검사 로직을 작성할 수 있습니다.

    alert("개인정보가 수정되었습니다.");
    return true;
  }

  

function select(e)  //이미지 버튼 클릭시 색상 변경 저장 함수
{
    var btns = document.querySelectorAll(".button");
    btns.forEach(function (btn, i) {
        if (e.currentTarget == btn) 
        {
            btn.classList.add("active");
            $('input[name=profileImgNumber]').attr('value',(i+1).toString());
        } 
        else 
        {
            btn.classList.remove("active");
        }
    });
    console.log(e.currentTarget);
}


