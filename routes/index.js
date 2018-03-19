const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const {isLoggedIn, isNotLoggedIn} = require('../helpers/auth');

router.get("/", isNotLoggedIn,(req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', isLoggedIn,(req, res) => {
  Story.find({user: req.user.id})
    .then(stories => {
      res.render("index/dashboard", {stories});
    })
});

router.get('/about', (req, res) => {
  res.render("index/about");
})

module.exports = router;
