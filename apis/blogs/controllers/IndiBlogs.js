const models = {
  Blogs: require("../models/blogs"),
};

async function indiBlogs(req, res) {
  try {
    const blog = await models.Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = indiBlogs;
