// function toggleTimeSlot(checkboxId) {
//     var checkbox = document.getElementById(checkboxId);
//     var label = checkbox.nextElementSibling;
//     if (checkbox.checked) {
//       label.style.backgroundColor = 'lightblue';
//     } else {
//       label.style.backgroundColor = 'lightgray';
//     }
//   }

  window.onload = function() {
    var table = document.getElementById("scheduleTable");
    var startHour = 10;
    var endHour = 20;
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    
    
    for (var hour = startHour; hour <= endHour; hour++) {
      var row = document.createElement("tr");
      
      var timeCell = document.createElement("td");
      timeCell.textContent = hour + ":00";
      row.appendChild(timeCell);
      
      for (var i = 0; i < days.length; i++) {
        var dayCell = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "toggle";
        checkbox.id = "toggle" + days[i] + hour;
        checkbox.onchange = function() {
          toggleTimeSlot(this.id);
        };
        var label = document.createElement("label");
        label.htmlFor = "toggle" + days[i] + hour;
        dayCell.className = "time-slot";
        dayCell.appendChild(checkbox);
        dayCell.appendChild(label);
        row.appendChild(dayCell);
      }
      
      table.appendChild(row);
      
    }
  };