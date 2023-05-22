

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


function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordch = document.getElementById("passwordch").value;

    if (password === passwordch) {
        showMessage("비밀번호가 일치합니다.", false);
    } else {
        showMessage("비밀번호가 일치하지 않습니다.", true);
    }
}

    function showMessage(message, isError) {
        var messageElement = document.getElementById("message");
        messageElement.innerHTML = message;

        if (isError) {
            messageElement.classList.add("error");
        } else {
            messageElement.classList.remove("error");
        }
    }

    