function select(e) {
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