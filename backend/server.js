import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Issue } from "./models/Issue.js"; // ✅ Import Issue schema
import twitterService from "./services/twitterService.js"; // ✅ Import Twitter service

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
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/civic-issues";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ========================== ROUTES ==========================

// 📌 Submit New Issue
app.post("/api/issues", upload.single("image"), async (req, res) => {
  try {
    const newIssue = new Issue({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      issue_resolved: false,
    });

    await newIssue.save();
    
    // 🐦 Automatically post to Twitter with Jharkhand authority tags
    try {
      const imagePath = req.file ? path.join(uploadDir, req.file.filename) : null;
      const twitterResult = await twitterService.postIssueToTwitter(newIssue, imagePath);
      
      if (twitterResult.success) {
        console.log("✅ Issue posted to Twitter successfully!");
        console.log("🔗 Tweet URL:", twitterResult.tweetUrl);
      } else {
        console.log("⚠️ Twitter posting failed:", twitterResult.message);
      }
    } catch (twitterError) {
      console.error("❌ Twitter automation error:", twitterError);
      // Don't fail the entire request if Twitter posting fails
    }

    res.json({ 
      success: true, 
      message: "✅ Issue submitted successfully and posted to Twitter!" 
    });
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

// 📌 Mark Issue as Resolved (Admin Portal will trigger this)
app.patch("/api/issues/:id/resolve", async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { issue_resolved: true },
      { new: true }
    );
    if (!updatedIssue) {
      return res.status(404).json({ success: false, message: "❌ Issue not found" });
    }
    res.json({ success: true, message: "✅ Issue marked as resolved", updatedIssue });
  } catch (error) {
    console.error("❌ Error resolving issue:", error);
    res.status(500).json({ success: false, message: "❌ Failed to update issue" });
  }
});

// 📌 Fetch Only Resolved Issues
app.get("/api/issues/resolved", async (req, res) => {
  try {
    const issues = await Issue.find({ issue_resolved: true }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("❌ Error fetching resolved issues:", error);
    res.status(500).json({ success: false, message: "❌ Failed to fetch resolved issues" });
  }
});

// 📌 Fetch Only Unresolved Issues
app.get("/api/issues/unresolved", async (req, res) => {
  try {
    const issues = await Issue.find({ issue_resolved: false }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("❌ Error fetching unresolved issues:", error);
    res.status(500).json({ success: false, message: "❌ Failed to fetch unresolved issues" });
  }
});

// 📌 Test Twitter Connection
app.get("/api/twitter/test", async (req, res) => {
  try {
    const result = await twitterService.testConnection();
    if (result.success) {
      res.json({ 
        success: true, 
        message: "✅ Twitter connection successful!", 
        username: result.username 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "❌ Twitter connection failed", 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "❌ Twitter test failed", 
      error: error.message 
    });
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
