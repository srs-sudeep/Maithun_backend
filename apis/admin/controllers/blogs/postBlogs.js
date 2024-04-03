const models = {
  Blogs: require("../../../blogs/models/blogs"),
};

async function postBlogs(req, res) {
  const { tag, author, time, title, description, content, image } = req.body;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const newBlog = new models.Blogs({
    tag,
    author,
    date: formattedDate,
    time, // You can set the default time here or calculate based on content length
    title,
    description,
    content,
    image,
  });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
}

module.exports = postBlogs;
