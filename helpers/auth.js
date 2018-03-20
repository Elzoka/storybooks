const Story = require('../models/Story');
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
  },
  checkOwnership: (req, res, next) => {
    Story.findById(req.params.id)
      .then(story => {
        if(req.isAuthenticated() && req.user.id === story.user.toString()){
          next();
        }else{
          res.redirect('back');
        }
      })
  }
}
