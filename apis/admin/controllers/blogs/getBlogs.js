const models = {
  blogs: require("../../../blogs/models/blogs"),
};
async function getIndividualData(model, id) {
  try {
    const data = await model.findById(id);
    return data;
  } catch (error) {
    console.error(
      `Error fetching individual data from ${model.modelName}: ${error}`
    );
    throw new Error(`Error fetching individual data from ${model.modelName}`);
  }
}

async function getBlogs(req, res) {
  try {
    const data = await models.blogs.find({}).exec();
    res.send(data);
  } catch (error) {
    console.error(`Error fetching data  ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getIndiBlogs(req, res) {
  const id = req.params.id;
  try {
    const data = await getIndividualData(models.blogs, id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching individual blogs data",
    });
  }
}

module.exports = {
  getBlogs,
  getIndiBlogs,
};
