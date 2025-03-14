const express = require("express");
const multer = require("multer");
const Tree = require("../models/tree");

const router = express.Router();

// Cấu hình Multer để lưu trữ ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Lấy danh sách cây
router.get("/", async (req, res) => {
    try {
        const trees = await Tree.find();
        res.json(trees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Thêm cây mới
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { treename, description } = req.body;
        if (!treename || !description) {
            return res.status(400).json({ error: "Tree name and description are required" });
        }

        const newTree = new Tree({
            treename,
            description,
            image: req.file ? `/uploads/${req.file.filename}` : ""
        });

        await newTree.save();
        res.status(201).json(newTree);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Xóa tất cả cây (reset)
router.delete("/reset", async (req, res) => {
    try {
        await Tree.deleteMany({});
        res.json({ message: "All trees deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
