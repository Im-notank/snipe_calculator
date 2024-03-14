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

    var cell2 = $('<td>').append('<input type="time" name="incoming" step="1">'); // Set step to 1 to allow seconds input
    var cell3 = $('<td>').append('<input type="number" name="seconds" min="0" max="600">');
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

      // Create a valid date string using today's date and the input time
      var today = new Date();
      var todayString = today.toISOString().slice(0, 10);
      var incomingDateTimeString = todayString + 'T' + incomingTimeString;

      // Create Date objects in the local time zone
      var incomingTimeLocal = new Date(incomingDateTimeString);

      // Calculate send time
      var sendTime = new Date(incomingTimeLocal.getTime() - numberOfSeconds * 1000);

      // Calculate return time
      var returnTime = new Date(sendTime.getTime() + numberOfSeconds * 500);

      // Format send time and return time in 24-hour format
      var formattedSendTime = isValidDate(sendTime) ? sendTime.toISOString().substr(11, 8) : "00:00:00";
      var formattedReturnTime = isValidDate(returnTime) ? returnTime.toISOString().substr(11, 8) : "00:00:00";

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
