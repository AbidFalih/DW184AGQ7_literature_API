const { User } = require("../../models");
const { showError } = require("./_showError");

exports.readUser = async (_, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send({
      message: "Success retrieve data users",
      data: { users },
    });
  } catch (err) {
    showError(err);
  }
};

exports.detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });

    res.send({
      message: "Success retrieve a user",
      user,
    });
  } catch (err) {
    showError(err);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(req.body, {
      where: { id },
    });

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });

    res.send({
      message: "Successfully update a user",
      user,
    });
  } catch (err) {
    showError(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    res.send({
      message: `Successfully deleted user with id ${id}`,
      data: { id },
    });
  } catch (err) {
    showError(err);
  }
};

exports.updateProfilePhoto = async (req, res) => {
  try {
    const { id } = req.user;
    await User.update(
      {
        thumb: req.file.filename,
      },
      { where: { id } }
    );

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });

    res.send({
      message: "Successfully update user's profile photo",
      user,
    });
  } catch (err) {
    showError(err);
  }
};
