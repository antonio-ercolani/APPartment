exports.checkMissingValuesPayment = function(description, amount) {
  if (description === undefined || description === null || description === "") return false;
  if (amount === undefined || amount === null || amount === "") return false;

  return true;
}

exports.checkMissingValuesPayOff = function(description, amount, selectedMember) {
  if (description === undefined || description === null || description === "") return false;
  if (amount === undefined || amount === null || amount === "") return false;
  if (selectedMember !== "select") return false;

  return true;
}

exports.checkAmountCorrectness = function(amount) {
  return (!isNaN(amount)) && (parseInt(amount, 10) > 0)
}