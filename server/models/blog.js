const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    pictureUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Blogs = mongoose.model('Blog', blogSchema);

module.exports = Blogs;
