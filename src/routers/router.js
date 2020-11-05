const express = require("express");

const router = express.Router();

const { register, login, checkAuth } = require("../controllers/auth");

const {
  readUser,
  deleteUser,
  detailUser,
  editUser,
  updateProfilePhoto,
} = require("../controllers/user");

const {
  readLiterature,
  readLiteratureSearch,
  detailLiterature,
  createLiterature,
  updateLiterature,
  deleteLiterature,
  getLiteratureByUserId,
} = require("../controllers/literature");

const {
  readDetailCollectionsUser,
  readCollections,
  readOneCollection,
  createCollection,
  deleteCollection,
} = require("../controllers/collection");

const { auth } = require("../middlewares/middleware");
const {
  // uploadImage,
  // uploadLiterature,
  // uploadCloudinary,
} = require("../middlewares/upload");

const { cloudUpload } = require("../middlewares/cloudinaryUpload");

router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, checkAuth);
// router.get("/auth", auth);

router.get("/users", readUser);
router.get("/user/:id", detailUser);
router.patch("/user/:id", auth, editUser);
router.delete("/user/:id", auth, deleteUser);
// router.patch("/update-photo", uploadImage("thumb"), auth, updateProfilePhoto);
router.patch("/update-photo", auth, cloudUpload("thumb"), updateProfilePhoto);

router.get("/literatures", readLiterature);
router.get("/literature", readLiteratureSearch);
router.get("/literature/:id", detailLiterature);
router.get("/detailUserLiterature/:id", getLiteratureByUserId);
// router.post("/literature", uploadCloudinary(), auth, createLiterature);
// router.post("/literature", uploadLiterature(), auth, createLiterature);
router.post("/literature", auth, cloudUpload("file"), createLiterature);
router.patch("/literature/:id", auth, updateLiterature);
router.delete("/literature/:id", auth, deleteLiterature);

router.get("/collection/:id", readDetailCollectionsUser);
router.get("/collections", readCollections);
router.get("/collection/:userId/:literatureId", readOneCollection);
router.post("/collection", auth, createCollection);
router.delete("/collection/:userId/:literatureId", auth, deleteCollection);

module.exports = router;
