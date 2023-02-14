
//프로필 사진 업로드 함수
const fileInput = document.getElementById("fileUpload");

const handleFiles = (e) => {
  const selectedFile = [...fileInput.files];
  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile[0]);

  fileReader.onload = function () {
    document.getElementById("previewImg").src = fileReader.result;
  };
};

fileInput.addEventListener("change", handleFiles);
//


//이메일 검사
const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;




//패스워드 유효성 검사
const pwCheck = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;




//패스워드 체크 검증
function passCheck2 () {
  let pw = document.getElementById("joinps").value;
  let pwch = document.getElementById("checkps").value;

  if (pw != pwch) {
    document.getElementById("pwCheckError").innerHTML("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
    return false;
  }
}

 


//이름 검증
const nameCheck = /^[a-z0-9_-]{2,20}$/;