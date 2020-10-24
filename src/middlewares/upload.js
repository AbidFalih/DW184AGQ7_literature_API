var multer = require("multer");

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
      file.fieldname === "thumbnail"
        ? cb(null, "src/uploads/images")
        : cb(null, "src/uploads/literatures");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var literatureUpload = multer({
    storage: storage,
  }).fields([{ name: "thumbnail" }, { name: "attache" }]);

  return (req, res, next) => {
    literatureUpload(req, res, function (err) {
      return next();
    });
  };
};
