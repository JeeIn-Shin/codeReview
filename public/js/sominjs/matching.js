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

window.onload = function () {
  var table = document.getElementById('scheduleTable');
  var startHour = 10;
  var endHour = 20;
  var days = ['월', '화', '수', '목', '금'];

  // 오늘 날짜를 기준으로 월요일부터 금요일까지의 날짜를 얻음
  var today = new Date();
  var weekDates = getWeekDates(today);

  var fragment = document.createDocumentFragment(); // DocumentFragment 생성

  // 제목 행 생성
  var headerRow = document.createElement('tr');
  var timeLabel = document.createElement('td');
  timeLabel.textContent = 'Time'; // 날짜 표시
  headerRow.appendChild(timeLabel);
  fragment.appendChild(headerRow);

  for (var i = 0; i < days.length; i++) {
    var dayCell = document.createElement('td');
    dayCell.textContent = weekDates[i]; // 날짜 표시
    headerRow.appendChild(dayCell);
  }

  fragment.appendChild(headerRow); // DocumentFragment에 추가

  // 시간대 행 생성
  for (var hour = startHour; hour <= endHour; hour++) {
    var row = document.createElement('tr');

    var timeCell = document.createElement('td');
    timeCell.textContent = hour + ':00';
    row.appendChild(timeCell);

    for (var i = 0; i < days.length; i++) {
      var dayCell = document.createElement('td');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'toggle';
      checkbox.id = 'toggle' + days[i] + hour;

      var label = document.createElement('label');
      label.htmlFor = 'toggle' + days[i] + hour;
      dayCell.className = 'time-slot';
      dayCell.appendChild(checkbox);
      dayCell.appendChild(label);
      row.appendChild(dayCell);
    }

    fragment.appendChild(row); // DocumentFragment에 추가
  }

  table.appendChild(fragment); // DocumentFragment를 테이블에 추가
};
