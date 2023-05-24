var monData = []
var tueData = []
var wedData = []
var thursData = []
var friData = []

var strMon = monData.join(",");
var strTue = tueData.join(",");
var strWed = wedData.join(",");
var strThurs = thursData.join(",");
var strFri = friData.join(",");

function getWeekDates(startDate) {
  const daysOfWeek = ['월', '화', '수', '목', '금'];
  const dates = [];

  // 주어진 시작 날짜로 Date 객체 생성
  const currentDate = new Date(startDate);

  // 주어진 날짜가 월요일이 아니면 월요일까지 이동
  while (currentDate.getDay() !== 1) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // 월요일부터 금요일까지의 날짜를 배열에 추가
  for (let i = 0; i < 5; i++) {
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
    const dayOfWeek = daysOfWeek[i];
    dates.push(`${dayOfWeek} ${formattedDate}`);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

window.onload = function() {
  var table = document.getElementById("scheduleTable");
  var startHour = 10;
  var endHour = 20;
  var days = ["월", "화", "수", "목", "금"];
  var days2 = ["mon", "tue", "wed", "thurs", "fri"];
  var time = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  // 오늘 날짜를 기준으로 월요일부터 금요일까지의 날짜를 얻음
  var today = new Date();
  var weekDates = getWeekDates(today);

  var fragment = document.createDocumentFragment(); // DocumentFragment 생성

  // 제목 행 생성
  var headerRow = document.createElement("tr");
  var timeLabel = document.createElement("td");
  timeLabel.textContent = "Time"; // 날짜 표시
  headerRow.appendChild(timeLabel);
  fragment.appendChild(headerRow);

  for (var i = 0; i < days.length; i++) {
    var dayCell = document.createElement("td");
    dayCell.textContent = weekDates[i]; // 날짜 표시
    headerRow.appendChild(dayCell);
  }

  fragment.appendChild(headerRow); // DocumentFragment에 추가

  // 시간대 행 생성
  for (var hour = startHour; hour <= endHour; hour++) {
    var row = document.createElement("tr");

    var timeCell = document.createElement("td");
    timeCell.textContent = hour + ":00";
    row.appendChild(timeCell);

    for (var i = 0; i < days.length; i++) {
      var dayCell = document.createElement("td");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = days2[i];
      checkbox.id = days2[i] + time[hour-10];
      checkbox.value = time[hour-10];
      checkbox.addEventListener("change", function() {
        if (this.checked) {
          if (this.name == "mon")
          {
            monData.push(parseInt(this.value));
          }
          else if (this.name == "tue")
          {
            tueData.push(parseInt(this.value));
          }
          else if (this.name == "wed")
          {
            wedData.push(parseInt(this.value));
          }
          else if (this.name == "thurs")
          {
            thursData.push(parseInt(this.value));
          }
          else if (this.name == "fri")
          {
            friData.push(parseInt(this.value));
          }
        } 
        else 
        {
          if (this.name == "mon")
          {
            monData = monData.filter((element) => element !== parseInt(this.value));
          }
          else if (this.name == "tue")
          {
            tueData = tueData.filter((element) => element !== parseInt(this.value));
          }
          else if (this.name == "wed")
          {
            wedData = wedData.filter((element) => element !== parseInt(this.value));
          }
          else if (this.name == "thurs")
          {
            thursData = thursData.filter((element) => element !== parseInt(this.value));
          }
          else if (this.name == "fri")
          {
            friData = friData.filter((element) => element !== parseInt(this.value));
          }
        }

        monData.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
        tueData.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
        wedData.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
        thursData.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
        friData.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
        
        strMon = monData.join(",");
        strTue = tueData.join(",");
        strWed = wedData.join(",");
        strThurs = thursData.join(",");
        strFri = friData.join(",");

      });

      var label = document.createElement("label");
      label.htmlFor = days2[i] + time[hour-10];
      dayCell.className = "time-slot";
      dayCell.appendChild(checkbox);
      dayCell.appendChild(label);
      row.appendChild(dayCell);
    }

    fragment.appendChild(row); // DocumentFragment에 추가
  }

  table.appendChild(fragment); // DocumentFragment를 테이블에 추가
};

function toggleRadio()
{
  var posit = document.getElementById("position1");
  var lang1 = document.getElementById("language1");
  var lang2 = document.getElementById("language2");
  var lang3 = document.getElementById("language3");
  var lang4 = document.getElementById("language4");
  var lang5 = document.getElementById("language5");
  var lang6 = document.getElementById("language6");
  var lang7 = document.getElementById("language7");
  var lang8 = document.getElementById("language8");
  var lang9 = document.getElementById("language9");
  var lang10 = document.getElementById("language10");
  var lang11 = document.getElementById("language11");

  if (posit.checked) 
  {
    lang1.disabled = true; 
    lang2.disabled = true; 
    lang3.disabled = true; 
    lang4.disabled = true; 
    lang5.disabled = true; 
    lang6.disabled = true; 
    lang7.disabled = true; 
    lang8.disabled = true; 
    lang9.disabled = true; 
    lang10.disabled = true; 
    lang11.disabled = true; 
  }
  else 
  {
    lang1.disabled = false; 
    lang2.disabled = false; 
    lang3.disabled = false; 
    lang4.disabled = false; 
    lang5.disabled = false; 
    lang6.disabled = false; 
    lang7.disabled = false; 
    lang8.disabled = false; 
    lang9.disabled = false; 
    lang10.disabled = false; 
    lang11.disabled = false; 
  }
}

const form = document.getElementById('matchingform');
function getCookieValue(cookieName) 
{      
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === cookieName) {
        return cookie[1];
        }
    }
    return '';
}

form.addEventListener('submit', function(event) {
event.preventDefault(); // 기본 동작인 폼 제출 방지
$.ajax({
    url: form.action,
    type: form.method,
    headers: {
    Authorization: 'Bearer ' + getCookieValue('accessToken')
    },
    data: {
      position: form.position.value,
      mon: strMon,
      tue: strTue,
      wed: strWed,
      thurs: strThurs,
      fri: strFri,
      language: form.language.value
    }
});
});