module.exports = {
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  },
  isNotLoggedIn: (req, res, next) => {
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/dashboard');
  }
}
