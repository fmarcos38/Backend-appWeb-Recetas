const multer = require("multer");
const path = require("path"); 
// multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  filefilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new error("file type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});