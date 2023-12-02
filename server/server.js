const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
});

const Post = mongoose.model("Post", postSchema);

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.post("/posts", async (req, res) => {
  const { title, description, author } = req.body;

  try {
    const newPost = new Post({ title, description, author });
    await newPost.save();
    res.json({ message: "Пост додано успішно", post: newPost });
  } catch (error) {
    console.error("Помилка додавання поста:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Пост не знайдено" });
    }

    res.json({ message: "Пост успішно видалено" });
  } catch (error) {
    console.error("Помилка видалення поста:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});