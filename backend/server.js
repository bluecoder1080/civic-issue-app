import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Set up __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB Connection (Updated)
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/civic-issues";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Multer Setup for Image Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Mongoose Schema
const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", IssueSchema);

// Routes

// 📌 Submit New Issue
app.post("/api/issues", upload.single("image"), async (req, res) => {
  try {
    const newIssue = new Issue({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newIssue.save();
    res.json({ success: true, message: "✅ Issue submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting issue:", error);
    res.status(500).json({ success: false, message: "❌ Failed to submit issue" });
  }
});

// 📌 Fetch All Issues
app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("❌ Error fetching issues:", error);
    res.status(500).json({ success: false, message: "❌ Failed to fetch issues" });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Civic Issue App API is running...");
});

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
