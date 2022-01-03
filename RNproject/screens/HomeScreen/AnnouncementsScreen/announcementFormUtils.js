exports.checkForm = function(announcement) {
  if (announcement === undefined || announcement === null) return false;

  if (!(typeof announcement === 'string' || announcement instanceof String)) return false;

  if (announcement === "") return false;

  return true;
}