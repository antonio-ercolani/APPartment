var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function(username, email, password, repeatPassword, setError) {
  if (setError === undefined || setError === null) return false;
  if (username === '' || email === '' || password === '' || repeatPassword === "")  {
    setError('Please complete all fields to continue');
    return false;
  } else if (!re.test(email)){   
    setError('Please insert a valid email');
    return false;
  } else if (password != repeatPassword) {
    setError('Those passwords didn\'t match, try again');
    return false;
  } else if (password.length < 6) {
    setError('Your password must lenght at least 6 characters');
    return false;
  } else return true;
}