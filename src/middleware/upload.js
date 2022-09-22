const multer = require("multer");
const mkdirp = require("mkdirp");
const moment = require("moment");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const basePath = "public/tmp";
    mkdirp.sync(basePath);
    cb(null, basePath);
  },
  filename: function (req, file, cb) {
    const ext =
      MIME_TYPE_MAP[file.mimetype] === undefined
        ? "jpg"
        : MIME_TYPE_MAP[file.mimetype];
    const filename = moment().unix() + "." + ext;
    cb(null, filename);
  },
});

module.exports = multer({ storage });
