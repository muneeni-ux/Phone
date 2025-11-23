// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const parser = require("../middleware/cloudinaryUpload");  // Middleware for Cloudinary image upload
const cloudinary = require("../config/cloudinary");

// Create Product (Admin)
router.post("/", parser.single("image"), async (req, res) => {
  try {
    // If the file is uploaded, Cloudinary will attach the file data to req.file
    let productData = req.body;

    if (req.file) {
      productData.image = req.file.path;   // Image URL returned by Cloudinary
      productData.imagePublicId = req.file.filename; // Store the public ID from Cloudinary
    }

    // Create and save the product with the uploaded image data
    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products with Filters
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      category,
      subCategory,
      maxPrice,
      tag,
      collection,
      sort,
      limit,  // Add 'limit' parameter
    } = req.query;

    let query = {
      name: { $regex: search, $options: "i" },
    };

    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (tag) query.tag = tag;
    if (collection) query.collection = collection;
    if (maxPrice) query.price = { $lte: parseFloat(maxPrice) };

    // Apply filtering
    let products = await Product.find(query);

    // Apply sorting
    if (sort === "price-low") products.sort((a, b) => a.price - b.price);
    if (sort === "price-high") products.sort((a, b) => b.price - a.price);
    if (sort === "newest") products.sort((a, b) => b.dateAdded - a.dateAdded);
    if (sort === "rated") products.sort((a, b) => b.rating - a.rating);

    // Apply limit if provided
    if (limit) {
      const limitValue = parseInt(limit);
      products = products.slice(0, limitValue);  // Slice the array to the limit
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Get All Products with Filters
// router.get("/", async (req, res) => {
//   try {
//     const {
//       search = "",
//       category,
//       maxPrice,
//       tag,
//       collection,
//       sort,
//     } = req.query;

//     let query = {
//       name: { $regex: search, $options: "i" },
//     };

//     if (category) query.category = category;
//     if (tag) query.tag = tag;
//     if (collection) query.collection = collection;
//     if (maxPrice) query.price = { $lte: parseFloat(maxPrice) };

//     let products = await Product.find(query);

//     if (sort === "price-low") products.sort((a, b) => a.price - b.price);
//     if (sort === "price-high") products.sort((a, b) => b.price - a.price);
//     if (sort === "newest") products.sort((a, b) => b.dateAdded - a.dateAdded);
//     if (sort === "rated") products.sort((a, b) => b.rating - a.rating);

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// routes/productRoutes.js
router.get('/search', async (req, res) => {
  const query = req.query.query || '';
  try {
    const results = await Product.find({
      name: { $regex: query, $options: 'i' },
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching products' });
  }
});


// Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a Product
router.post("/like/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    res.json({
      success: true,
      likes: product.likes,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a Product (Admin)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Product (Admin)
router.delete("/:id", async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If the product has an associated image, delete it from Cloudinary
    if (product.imagePublicId) {
      // Delete the image from Cloudinary using the public_id
      await cloudinary.uploader.destroy(product.imagePublicId, (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
        }
        console.log("Cloudinary Image Deletion Result:", result);
      });
    }

    // Delete the product from the database
    await product.delete();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// // Delete a Product (Admin)
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: "Not found" });
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


module.exports = router;

