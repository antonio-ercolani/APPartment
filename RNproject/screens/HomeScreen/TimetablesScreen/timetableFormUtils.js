exports.checkFormTimetable = function(startDate, endDate, period, description) {

  if (startDate === undefined || endDate === undefined || period === undefined || 
    description === undefined) { 
      return [false, 'Please complete all the fields']
    }
  if (period <= 0 || period > 30) { 
    return [false, 'Please insert a valid period']
  }
  if (description.length > 50) {
    return [false, 'Please insert a description of less that 50 characters']
  }

  var stDate = new Date();
  stDate.setTime(Date.parse(startDate));
  var eDate = new Date();
  eDate.setTime(Date.parse(endDate));
  if (eDate <= stDate) {
    return [false, 'The ending date cannot precede the starting date']
  }
  return [true, '']
}

exports.checkFormSingleEvent = function(description, selectedDate) {
  if (description === undefined || selectedDate === undefined) return false;
  if (description !== "" && selectedDate !== "") return false;

  return true;
}