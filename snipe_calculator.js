$(document).ready(function() {
    var contentContainerTable = $("#contentContainer");
    var newTable = $('<table>').addClass("content-border").css("width", "100%");

    var colNames = ["Incoming time", "Number of seconds", "Send time", "Return Time"];
    var colNameRow = $('<tr>');
    for (var i = 0; i < colNames.length; i++) {
      $('<th>').text(colNames[i]).appendTo(colNameRow);
    }
    newTable.append(colNameRow);

    var inputRow = $('<tr>');

    var cell1 = $('<th>').text("Train").attr("rowspan", "2");
    colNameRow.prepend(cell1);

    var cell2 = $('<td>').append('<input type="time" name="incoming" step="1">').attr("placeholder", "00:00:00 AM"); // Set step to 1 to allow seconds input
    var cell3 = $('<td>').append('<input type="number" name="seconds" min="0" max="300" step="2" value="0">');
    var cell4 = $('<td>').append('<span></span>');
    var cell5 = $('<td>').append('<span></span>');

    inputRow.append(cell2, cell3, cell4, cell5);
    newTable.append(inputRow);

    // Add .content-border-cell class to cells
    newTable.find('td, th').addClass('content-border-cell');

    // Add style
    var style = $('<style>').text('\
      .content-border { \
        border: 1px solid black; \
        border-collapse: collapse; \
        width: 100%; \
      } \
      .content-border-cell { \
        background-color: #f4e4bc; \
        padding: 5px; \
      } \
    ');
    $('head').append(style);

    contentContainerTable.append(newTable);

    // Function to calculate send time and return time
    function calculateTimes() {
      var incomingTimeString = $('input[name="incoming"]').val();
      var numberOfSeconds = parseInt($('input[name="seconds"]').val());

      // Round the number of seconds to the nearest even number
      if (numberOfSeconds % 2 !== 0) {
        numberOfSeconds += 1;
      }

      // Create a valid date string using today's date
      var today = new Date();
      var todayString = today.toISOString().slice(0, 10);

      // Combine today's date with the time from the input field
      var incomingDateTimeString = todayString + 'T' + incomingTimeString;

      // Create Date objects
      var incomingTime = new Date(incomingDateTimeString);
      var sendTime = new Date(incomingTime.getTime() - numberOfSeconds * 1000);
      var returnTime = new Date(sendTime.getTime() + numberOfSeconds * 500);

      // Format send time and return time in 24-hour format
      var formattedSendTime = isValidDate(sendTime) ? sendTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'}) : "00:00:00 AM";
      var formattedReturnTime = isValidDate(returnTime) ? returnTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'}) : "00:00:00 AM";

      // Update display in the table
      cell4.find('span').text(formattedSendTime);
      cell5.find('span').text(formattedReturnTime);
    }

    // Call calculateTimes function when inputs change
    $('input[name="incoming"], input[name="seconds"]').on('input', calculateTimes);

    // Initial calculation
    calculateTimes();

    // Function to check if a date is valid
    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }
});
