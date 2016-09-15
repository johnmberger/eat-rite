function passwordValidation (req, res, next) {
  let msg;
  if (req.body.password !== req.body.confirm_password) {
    console.log('no match');
    const renderObject = {};
    renderObject.alertMessage = 'Your passwords do not match.';
    res.render('newUser', renderObject);
  } else {
    console.log('match');
    next();
  }
}

module.exports = {
  passwordValidation
};
