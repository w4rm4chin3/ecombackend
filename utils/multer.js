const multer = require("multer");
const path = require("path");
const fs = require("fs");
module.exports.upload = function upload(prefix) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `./uploads`;
      fs.mkdirSync(path, { recursive: true });
      return cb(null, path);
    },
    filename: function (req, file, cb) {
      const regEx = /\.[a-zA-Z]{3,4}$/;
      // Extension
      const ext = file.originalname.match(regEx);
      // 0 to -extension length. (remove extension from name)
      const name = file.originalname.slice(0, -ext[0].length);
      let filename = `${name}-${Date.now()}${ext}`;

      // remove spaces
      const space = /\s/gi;
      filename = filename.replace(space, "-");

      // add prefix
      if (prefix) {
        filename = `${prefix}/${filename}`;
      }

      // Add filename to req, so that it can be passed through middlewares.
      req._image = filename;
      cb(null, filename);
    },
  });
  return multer({ storage: storage });
};