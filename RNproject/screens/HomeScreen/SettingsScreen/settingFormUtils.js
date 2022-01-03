var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function(email, password, repeatPassword) {
  if ( email === '' || password === '' || repeatPassword === "" || email === undefined || password === undefined || repeatPassword === undefined) {
    return false;
  } else if (!re.test(email)){   
    return false;
  } else if (password !== repeatPassword) {
    return false;
  } else if (password.length < 6) {
    return false;
  } else return true;
}