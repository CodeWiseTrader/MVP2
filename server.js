const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let voices = [
  { id: 1, title: "Voice #1", name: "Voice_NAME_1", likes: 0, dislikes: 0 },
  { id: 2, title: "Voice #2", name: "Voice_NAME_2", likes: 0, dislikes: 0 },
];

app.get("/voices", (req, res) => {
  res.json(voices);
});

app.post("/vote/:id/:type", (req, res) => {
  const { id, type } = req.params;
  const voice = voices.find((v) => v.id == id);
  if (!voice) {
    return res.status(404).json({ message: "Voice not found" });
  }

  if (type === "like") {
    voice.likes++;
  } else if (type === "dislike") {
    voice.dislikes++;
  } else {
    return res.status(400).json({ message: "Invalid vote type" });
  }

  res.status(200).json({ message: "Vote recorded successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
