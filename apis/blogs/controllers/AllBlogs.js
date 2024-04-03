const models = {
  Blogs: require("../models/blogs"),
};

// Endpoint to get the items in the user's cart
async function allBlogs(req, res) {
  try {
    const blogs = await models.Blogs.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = allBlogs;
