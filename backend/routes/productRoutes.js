const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");


const router = express.Router();

router.get("/", getAllProducts); // Public
router.get("/:id", getProductById); // Public
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
