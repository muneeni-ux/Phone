// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const parser = require("../middleware/cloudinaryUpload");  // Middleware for Cloudinary image upload
// const cloudinary = require("../config/cloudinary");

// // Create Product (Admin)
// router.post("/", parser.single("image"), async (req, res) => {
//   try {
//     // If the file is uploaded, Cloudinary will attach the file data to req.file
//     let productData = req.body;

//     if (req.file) {
//       productData.image = req.file.path;   // Image URL returned by Cloudinary
//       productData.imagePublicId = req.file.filename; // Store the public ID from Cloudinary
//     }

//     // Create and save the product with the uploaded image data
//     const product = new Product(productData);
//     await product.save();

//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get All Products with Filters
// // router.get("/", async (req, res) => {
// //   try {
// //     const {
// //       search = "",
// //       category,
// //       subCategory,
// //       maxPrice,
// //       tag,
// //       collection,
// //       sort,
// //       limit,  // Add 'limit' parameter
// //     } = req.query;

// //     let query = {
// //       name: { $regex: search, $options: "i" },
// //     };

// //     if (category) query.category = category;
// //     if (subCategory) query.subCategory = subCategory;
// //     if (tag) query.tag = tag;
// //     if (collection) query.collection = collection;
// //     if (maxPrice) query.price = { $lte: parseFloat(maxPrice) };

// //     // Apply filtering
// //     let products = await Product.find(query);

// //     // Apply sorting
// //     if (sort === "price-low") products.sort((a, b) => a.price - b.price);
// //     if (sort === "price-high") products.sort((a, b) => b.price - a.price);
// //     if (sort === "newest") products.sort((a, b) => b.dateAdded - a.dateAdded);
// //     if (sort === "rated") products.sort((a, b) => b.rating - a.rating);

// //     // Apply limit if provided
// //     if (limit) {
// //       const limitValue = parseInt(limit);
// //       products = products.slice(0, limitValue);  // Slice the array to the limit
// //     }

// //     res.json(products);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
// router.get("/brand/:brand", async (req, res) => {
//   try {
//     const products = await Product.find({
//       brand: new RegExp("^" + req.params.brand + "$", "i"),
//     });

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to load products" });
//   }
// });


// // routes/productRoutes.js
// router.get('/search', async (req, res) => {
//   const query = req.query.query || '';
//   try {
//     const results = await Product.find({
//       name: { $regex: query, $options: 'i' },
//     });
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: 'Error searching products' });
//   }
// });


// // Get Single Product
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: "Product not found" });
//   }
// });

// router.post("/filter", async (req, res) => {
//   const { brand, deviceTypes, series, storage, search } = req.body;

//   let query = {};

//   if (brand) query.brand = brand;
//   if (deviceTypes?.length) query.subCategory = { $in: deviceTypes };
//   if (series?.length) query.series = { $in: series };
//   if (storage?.length) query.storage = { $in: storage };
//   if (search)
//     query.name = { $regex: search, $options: "i" };

//   try {
//     const products = await Product.find(query);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to filter products" });
//   }
// });


// // Like a Product
// router.post("/like/:id", async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );
//     if (!product) return res.status(404).json({ success: false, error: "Product not found" });

//     res.json({
//       success: true,
//       likes: product.likes,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // Update a Product (Admin)
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ error: "Not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete a Product (Admin)
// router.delete("/:id", async (req, res) => {
//   try {
//     // Find the product by ID
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // If the product has an associated image, delete it from Cloudinary
//     if (product.imagePublicId) {
//       // Delete the image from Cloudinary using the public_id
//       await cloudinary.uploader.destroy(product.imagePublicId, (error, result) => {
//         if (error) {
//           return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
//         }
//         console.log("Cloudinary Image Deletion Result:", result);
//       });
//     }

//     // Delete the product from the database
//     await product.delete();

//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // // Delete a Product (Admin)
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const deleted = await Product.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ error: "Not found" });
// //     res.json({ message: "Product deleted" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });


// module.exports = router;



const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const parser = require("../middleware/cloudinaryUpload"); // your middleware
const cloudinary = require("../config/cloudinary");

/*
  NOTE:
  - This route file assumes your cloudinary middleware returns:
      req.file  (single upload)
      req.files (array uploads) where each file has .path and .filename (public id)
    Adjust names if your middleware uses other properties.
*/

/* ---------- Create Product (Admin) ---------- */
/* Accepts:
   - multipart/form-data with possible fields:
     - image (single)
     - gallery (multiple)
     - other product fields in req.body (specs can be JSON string)
   - or application/json where gallery can be an array in body
*/
router.post("/", parser.any(), async (req, res) => {
  try {
    // Start with body data
    let productData = { ...req.body };

    // If specs was sent as stringified JSON, parse it
    if (productData.specs && typeof productData.specs === "string") {
      try {
        productData.specs = JSON.parse(productData.specs);
      } catch (err) {
        // leave as-is (or set empty)
        productData.specs = {};
      }
    }

    // Normalize numbers (price, oldPrice)
    if (productData.price) productData.price = Number(productData.price);
    if (productData.oldPrice) productData.oldPrice = Number(productData.oldPrice);

    // Handle file uploads (parser.any() populates req.files)
    // Many middlewares attach files to req.files as array
    if (req.files && req.files.length > 0) {
      // Distinguish by fieldname
      const galleryUrls = [];
      const galleryPublicIds = [];
      for (const f of req.files) {
        // f.path = uploaded url; f.filename or f.public_id = public id depending on middleware
        if (f.fieldname === "gallery" || f.fieldname === "images") {
          if (f.path) galleryUrls.push(f.path);
          if (f.filename) galleryPublicIds.push(f.filename);
        } else if (f.fieldname === "image") {
          // single thumbnail image
          productData.image = f.path || productData.image;
          if (f.filename) productData.imagePublicId = f.filename;
        } else {
          // fallback: treat everything as gallery
          if (f.path) galleryUrls.push(f.path);
          if (f.filename) galleryPublicIds.push(f.filename);
        }
      }

      if (galleryUrls.length) productData.gallery = galleryUrls;
      if (galleryPublicIds.length) productData.galleryPublicIds = galleryPublicIds;
    } else if (req.file) {
      // if middleware uses req.file for single
      productData.image = req.file.path || productData.image;
      if (req.file.filename) productData.imagePublicId = req.file.filename;
    }

    // If gallery provided as JSON string in body (application/json), ensure array
    if (productData.gallery && typeof productData.gallery === "string") {
      try {
        productData.gallery = JSON.parse(productData.gallery);
      } catch (err) {
        // maybe comma-separated
        productData.gallery = productData.gallery.split(",").map((s) => s.trim());
      }
    }

    // Ensure likes is numeric
    if (!productData.likes) productData.likes = 0;
    else productData.likes = Number(productData.likes);

    // Create product
    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

/* ---------- GET All Products (supports ?brand=...) ---------- */
router.get("/", async (req, res) => {
  try {
    const { search = "", brand, category, limit } = req.query;
    const q = {
      name: { $regex: search || "", $options: "i" },
    };
    if (brand) q.brand = new RegExp("^" + brand + "$", "i");
    if (category) q.category = category;

    let products = await Product.find(q).sort({ createdAt: -1 });

    // optional limit
    if (limit) products = products.slice(0, Number(limit));

    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ---------- Get By Brand (old style) ---------- */
router.get("/brand/:brand", async (req, res) => {
  try {
    const products = await Product.find({
      brand: new RegExp("^" + req.params.brand + "$", "i"),
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error("GET BRAND ERROR:", err);
    res.status(500).json({ error: "Failed to load products" });
  }
});

/* ---------- Search endpoint ---------- */
router.get("/search", async (req, res) => {
  const query = req.query.query || "";
  try {
    const results = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(50);
    res.json(results);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ message: "Error searching products" });
  }
});

/* ---------- Get single product ---------- */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ error: "Product not found" });
  }
});

/* ---------- Filter (POST) ---------- */
router.post("/filter", async (req, res) => {
  const { brand, deviceTypes, series, storage, ram, search } = req.body;

  let query = {};
  if (brand) query.brand = brand;
  if (deviceTypes?.length) query.subCategory = { $in: deviceTypes };
  if (series?.length) query.series = { $in: series };
  if (storage?.length) query.storage = { $in: storage };
  if (ram?.length) query.ram = { $in: ram };
  if (search) query.name = { $regex: search, $options: "i" };

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("FILTER ERROR:", err);
    res.status(500).json({ error: "Failed to filter products" });
  }
});

/* ---------- Like a Product (fixed) ---------- */
router.post("/like/:id", async (req, res) => {
  try {
    // Ensure likes field exists; $inc will create the field if it doesn't exist
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true, useFindAndModify: false }
    );

    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    // Make sure likes is a number
    const likes = Number(product.likes || 0);

    res.json({
      success: true,
      likes,
    });
  } catch (err) {
    console.error("LIKE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ---------- Update Product (Admin) ---------- */
router.put("/:id", parser.any(), async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (updateData.specs && typeof updateData.specs === "string") {
      try {
        updateData.specs = JSON.parse(updateData.specs);
      } catch {
        updateData.specs = {};
      }
    }

    // Handle files if present (similar to create)
    if (req.files && req.files.length > 0) {
      const galleryUrls = (updateData.gallery && Array.isArray(updateData.gallery)) ? updateData.gallery.slice() : [];
      const galleryPublicIds = (updateData.galleryPublicIds && Array.isArray(updateData.galleryPublicIds)) ? updateData.galleryPublicIds.slice() : [];

      for (const f of req.files) {
        if (f.fieldname === "gallery" || f.fieldname === "images") {
          if (f.path) galleryUrls.push(f.path);
          if (f.filename) galleryPublicIds.push(f.filename);
        } else if (f.fieldname === "image") {
          updateData.image = f.path || updateData.image;
          if (f.filename) updateData.imagePublicId = f.filename;
        } else {
          if (f.path) galleryUrls.push(f.path);
          if (f.filename) galleryPublicIds.push(f.filename);
        }
      }

      if (galleryUrls.length) updateData.gallery = galleryUrls;
      if (galleryPublicIds.length) updateData.galleryPublicIds = galleryPublicIds;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

/* ---------- Delete Product (Admin) ---------- */
router.delete("/:id", async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete any images from Cloudinary if public ids exist
    // galleryPublicIds is an array; imagePublicId is single
    const publicIds = [
      ...(product.galleryPublicIds || []),
      ...(product.imagePublicId ? [product.imagePublicId] : []),
    ];

    for (const pid of publicIds) {
      try {
        await cloudinary.uploader.destroy(pid);
      } catch (err) {
        // log and continue
        console.error("Cloudinary delete error for", pid, err);
      }
    }

    await product.delete();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
