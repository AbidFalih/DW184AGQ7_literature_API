const { showError } = require("./_showError");
const { Collection, User, Literature } = require("../../models");

// exports.readDetailCollectionsUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const collectionsUser = await User.findOne({
//       where: { id },
//       include: {
//         model: Literature,
//         as: "userLiteratures",
//         through: {
//           model: Collection,
//           as: "collection",
//           attributes: { exclude: ["createdAt", "updatedAt"] },
//         },
//         attributes: {
//           exclude: ["UserId", "createdAt", "updatedAt"],
//         },
//       },
//       attributes: ["id"],
//     });

//     res.send({
//       message: "Successfully get User-Literatures through Collection",
//       collectionsUser,
//     });
//   } catch (err) {
//     showError(err);
//   }
// };

exports.readDetailCollectionsUser = async (req, res) => {
  try {
    const { id } = req.params;
    const collectionsUser = await Collection.findAll({
      where: { userId: id },
      include: {
        model: Literature,
        as: "literature",
        attributes: {
          exclude: ["UserId", "createdAt", "updatedAt"],
        },
      },
      attributes: ["id", "userId"],
    });

    res.send({
      message: `Successfully get Literatures based on User id ${id}`,
      collectionsUser,
    });
  } catch (err) {
    showError(err);
  }
};

exports.readCollections = async (_, res) => {
  try {
    const collections = await Collection.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send({
      message: "Successfully get all collections",
      collections,
    });
  } catch (err) {
    showError(err);
  }
};

exports.readOneCollection = async (req, res) => {
  try {
    const { userId, literatureId } = req.params;
    const selectedLiterature = await Collection.findOne({
      where: {
        userId,
        literatureId,
      },
    });

    res.send({
      message: `Successfully get collection that has userId ${userId} and literatureId ${literatureId}`,
      selectedLiterature,
    });
  } catch (err) {
    showError(err);
  }
};

exports.createCollection = async (req, res) => {
  try {
    const collectionCreated = await Collection.create(req.body);

    res.send({
      message: "Successfully created new collection",
      collectionCreated,
    });
  } catch (err) {
    showError(err);
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { userId, literatureId } = req.params;
    await Collection.destroy({
      where: {
        userId,
        literatureId,
      },
    });

    res.send({
      message: `Successfully delete collection from userId ${userId} for literature with id ${literatureId}`,
    });
  } catch (err) {
    showError(err);
  }
};
