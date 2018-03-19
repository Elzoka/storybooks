const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../helpers/auth');
const Story = require('../models/Story');
const mongoose = require('mongoose');

// Stories index
router.get('/', (req, res) => {
  Story.find({status: 'public'})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {stories});
    })
});

// Show single Story
router.get('/show/:id', (req, res) => {
  Story.findById(req.params.id)
    .populate('user')
    .populate("comments.commentUser")
    .then(story => {
      res.render('stories/show', {story});
    });
});
// Add Story Form
router.get('/add', isLoggedIn,(req, res) => {
  res.render('stories/add');
});

// process Add Story
router.post('/', (req, res) => {
  const allowComments = Boolean(req.body.allowComments);
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: mongoose.Types.ObjectId(req.user.id)
  }
  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story._id}`);
    })
});

// edit story form
router.get('/edit/:id', isLoggedIn,(req, res) => {
  Story.findById(req.params.id)
    .then(story => {
      res.render('stories/edit', {story});
    });
});

// process edit form
router.put('/:id', (req, res) => {
  const allowComments = Boolean(req.body.allowComments);
  const updatedStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
  }
  Story.findByIdAndUpdate(req.params.id, updatedStory)
    .then(story => {
      res.redirect(`/dashboard`);
    })
});

// delete route
router.delete('/:id', (req, res) => {
  Story.remove({_id: req.params.id})
    .then(() => {
      res.redirect('/dashboard');
    });
});

// add comment
  router.post('/comment/:id', (req, res) => {
    Story.findById(req.params.id)
      .then(story => {
        const newComment = {
          commentBody: req.body.commentBody,
          commentUser: req.user.id
        }
        story.comments.unshift(newComment);

        story.save()
          .then(story => {
            res.redirect(`/stories/show/${story.id}`);
          });
      });
  });

module.exports = router;
