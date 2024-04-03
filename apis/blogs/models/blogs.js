const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true, default: "2 min" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
