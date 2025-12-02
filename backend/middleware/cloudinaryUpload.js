// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Pak_Fashions",
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

// const parser = multer({ storage });

// module.exports = parser;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Green_World",
    // Accept any format, but convert to webp (better compression)
    format: async () => "webp",  
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif", "bmp", "tiff", "svg", "heif", "heic"],
    transformation: [{ quality: "auto", fetch_format: "auto" }], // auto-optimize
  },
});

const parser = multer({ storage });

module.exports = parser;
