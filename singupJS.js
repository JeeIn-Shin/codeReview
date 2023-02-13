
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


//비밀번호 조건 함수
function check_pw() {
    let pw = document.getElementById('pw').value;
    let checkpw = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
}