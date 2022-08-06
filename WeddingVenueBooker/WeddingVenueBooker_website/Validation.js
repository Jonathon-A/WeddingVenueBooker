$(document).ready(function () {
  const StartDateInput = $("#StartDate")[0];
  const EndDateInput = $("#EndDate")[0];

  StartDateInput.addEventListener("input", function (event) {
    const startDateEntered = new Date(StartDateInput.value);
    const EndDateEntered = new Date(EndDateInput.value);
    const Today = new Date();

    //Checks if start date is in the future
    if (startDateEntered < Today) {
      StartDateInput.setCustomValidity("Date must be in the future");
      StartDateInput.reportValidity();
    } //Checks if start date is before end date
    else if (EndDateEntered && startDateEntered > EndDateEntered) {
      StartDateInput.setCustomValidity("Must be before the end date");
      StartDateInput.reportValidity();
    } //Checks if end date is more than a year after start date
    else if (Over1YearDateRange(startDateEntered, EndDateEntered)) {
      StartDateInput.setCustomValidity("Maximum date range of 1 year");
      StartDateInput.reportValidity();
    } //Valid if all checks passed
    else {
      StartDateInput.setCustomValidity("");
      EndDateInput.setCustomValidity("");
    }
  });

  EndDateInput.addEventListener("input", function (event) {
    const startDateEntered = new Date(StartDateInput.value);
    const EndDateEntered = new Date(EndDateInput.value);
    const Today = new Date();

    //Checks if end date is in the future
    if (EndDateEntered < Today) {
      EndDateInput.setCustomValidity("Date must be in the future");
      EndDateInput.reportValidity();
    } //Checks if end date is after start date
    else if (startDateEntered && startDateEntered > EndDateEntered) {
      EndDateInput.setCustomValidity("Must be after the start date");
      EndDateInput.reportValidity();
    } //Checks if end date is more than a year after start date
    else if (Over1YearDateRange(startDateEntered, EndDateEntered)) {
      EndDateInput.setCustomValidity("Maximum date range of 1 year");
      EndDateInput.reportValidity();
    } //Valid if all checks passed
    else {
      StartDateInput.setCustomValidity("");
      EndDateInput.setCustomValidity("");
    }
  });

  //Changes Catering grade selection text colour to black (from grey) when option is selected
  $("#select").change(function (event) {
    event.target.setAttribute("style", "color: black");
  });

  //Changes input text colour to black (from grey) when option is selected
  $("input").on("change", function (event) {
    event.target.setAttribute("style", "color: black");
  });

  //Coverts data to milliseconds in UTC time
  function toUTC(date) {
    const Millis = new Date(date);
    Millis.setMinutes(Millis.getMinutes() - Millis.getTimezoneOffset());
    return Millis;
  }

  //Returns true if the difference between the dates is more than 1 year
  function Over1YearDateRange(startDate, endDate) {
    const YearMillis = 3.154e10;
    return Math.abs(toUTC(endDate) - toUTC(startDate)) >= YearMillis;
  }
});
