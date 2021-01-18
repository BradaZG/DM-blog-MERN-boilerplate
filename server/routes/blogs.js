const express = require('express');
const Router = express.Router();

const Blogs = require('../models/blog');

Router.route('/').get((req, res) => {
  Blogs.find()
    .then((response) => {
      res.status(200).json({ response, success: true });
    })
    .catch((error) => {
      res.status(400).json({ error, success: false });
    });
});

Router.route('/add').post((req, res) => {
  const { title, body, author, pictureUrl } = req.body;

  const newBlog = new Blogs({
    title,
    body,
    author,
    pictureUrl,
  });

  newBlog
    .save()
    .then((response) => {
      res.status(200).json({ response, success: true });
    })
    .catch((error) => {
      res.status(400).json({ error, success: false });
    });
});

Router.route('/:id').get((req, res) => {
  const idSearch = req.params.id;
  Blogs.findById(idSearch)
    .then((response) => {
      res.status(200).json({ response, success: true });
    })
    .catch((error) => {
      res.status(400).json({ error, success: false });
    });
});

Router.route('/update/:id').post((req, res) => {
  const idSearch = req.params.id;
  Blogs.findById(idSearch)
    .then((blog) => {
      const { title, body, author, pictureUrl } = req.body;

      blog.title = title;
      blog.body = body;
      blog.author = author;
      blog.pictureUrl = pictureUrl;

      blog
        .save()
        .then((response) => {
          res.status(200).json({ response, success: true });
        })
        .catch((error) => {
          res.status(400).json({ error, success: false });
        });
    })
    .catch((error) => {
      res.status(400).json({ error, success: false });
    });
});

Router.route('/delete/:id').delete((req, res) => {
  const idSearch = req.params.id;
  Blogs.findByIdAndDelete(idSearch)
    .then((response) => {
      res.status(200).json({ response, success: true });
    })
    .catch((error) => {
      res.status(400).json({ error, success: false });
    });
});

module.exports = Router;
