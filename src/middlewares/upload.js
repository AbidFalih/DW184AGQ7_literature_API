var multer = require("multer");
require("dotenv").config();

exports.uploadImage = (fileName) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = {
        message: "Please chosee image file!",
      };
      return cb(new Error("Please chosee image file!"), false);
    }
    cb(null, true);
  };

  const maxSize = 2 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: { fileSize: maxSize },
  }).single(fileName);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !err)
        return res.status(400).send({
          message: "Please select image to upload",
        });

      if (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max size is 2Mb",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};

exports.uploadLiterature = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      file.fieldname == "thumb"
        ? cb(null, "src/uploads/images")
        : cb(null, "src/uploads/literatures");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var literatureUpload = multer({
    storage: storage,
  }).fields([{ name: "thumb" }, { name: "attache" }]);

  return (req, res, next) => {
    literatureUpload(req, res, function (err) {
      return next();
    });
  };
};

const { cloudinary } = require("../../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

exports.uploadCloudinary = () => {
  console.log("hai");

  var parser = multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        return {
          folder: "assetsLiterature",
          public_id: Date.now() + "-" + file.originalname,
        };
      },
    }),
  }).fields([{ name: "thumb" }, { name: "attache" }]);

  console.log("Sampai tengah");

  return (req, res, next) => {
    parser(req, res, (err) => {
      if (err) return res.send(err);
      return next();
    });
  };
};
