// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     brand: {
//       type: String,
//       enum: [
//         "Oppo",
//         "Samsung",
//         "Tecno",
//         "Infinix",
//         "Redmi",
//         "Accessories",
//         "Audio",
//         "Chargers",
//         "Cables",
//         "Wearables",
//         "Cases",
//       ],
//       required: true,
//     },

//     series: { type: String, default: "N/A" },

//     storage: {
//       type: String,
//       enum: ["64GB", "128GB", "256GB", "512GB", "1TB", "N/A"],
//       default: "N/A",
//     },

//     ram: {
//       type: String,
//       enum: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "N/A"],
//       default: "N/A",
//     },

//     description: { type: String, required: true },

//     price: { type: Number, required: true },

//     rating: { type: Number, default: 4.5 },

//     image: { type: String, required: true }, // Cloudinary URL
//     imagePublicId: { type: String }, // Cloudinary public ID

//     inStock: { type: Boolean, default: true },

//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);


const mongoose = require("mongoose");

const specsSchema = new mongoose.Schema(
  {
    display: { type: String, default: null },
    processor: { type: String, default: null },
    ram: { type: String, enum: ["2GB","3GB","4GB","6GB","8GB","12GB","16GB","N/A"], default: "N/A" },
    storage: { type: String, enum: ["64GB","128GB","256GB","512GB","1TB","N/A"], default: "N/A" },
    camera: { type: String, default: null },
    battery: { type: String, default: null },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    brand: {
      type: String,
      enum: [
        "Oppo",
        "Samsung",
        "Tecno",
        "Infinix",
        "Redmi",
        "Accessories",
        "Audio",
        "Chargers",
        "Cables",
        "Wearables",
        "Cases",
      ],
      required: true,
    },

    // top-level category label (used in UI)
    category: { type: String, default: "Products" },

    // optional sub-category (e.g. "Smartphones", "Wearables")
    subCategory: { type: String, default: "N/A" },

    series: { type: String, default: "N/A" },

    // top-level storage & ram for quick filtering (keeps backward compatibility)
    storage: {
      type: String,
      enum: ["64GB", "128GB", "256GB", "512GB", "1TB", "N/A"],
      default: "N/A",
    },

    ram: {
      type: String,
      enum: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "N/A"],
      default: "N/A",
    },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    oldPrice: { type: Number, default: null },

    rating: { type: Number, default: 4.5 },

    // gallery: array of image URLs (Cloudinary secure urls)
    gallery: { type: [String], default: [] },

    // single image kept for compatibility
    image: { type: String, default: null },
    imagePublicId: { type: String, default: null },

    // If multiple images are uploaded to cloudinary, keep their public ids to allow deletion
    galleryPublicIds: { type: [String], default: [] },

    likes: { type: Number, default: 0 },

    inStock: { type: Boolean, default: true },

    // nested specs for the frontend (used by product details)
    specs: { type: specsSchema, default: () => ({}) },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
