const { Literature, User } = require("../../models");
const { showError } = require("./_showError");

exports.readLiterature = async (_, res) => {
  try {
    const literatures = await Literature.findAll({
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["userId", "UserId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Successfully get all literatures",
      literatures,
    });
  } catch (err) {
    showError(err);
  }
};

exports.detailLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    const literature = await Literature.findOne({
      where: { id },
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["userId", "UserId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: `Successfully get literature with id ${id}`,
      literature,
    });
  } catch (err) {
    showError(err);
  }
};

exports.createLiterature = async (req, res) => {
  const { id } = req.user;
  try {
    const { title, publication_date, pages, isbn, author } = req.body;
    const thumb = req.files["thumb"][0].filename;
    const attache = req.files["attache"][0].filename;
    // const coba = req.files;

    const addLiterature = await Literature.create({
      title,
      publication_date,
      pages,
      isbn,
      author,
      userId: id,
      thumb,
      attache,
    });

    const detailLiterature = await Literature.findOne({
      where: { id: addLiterature.id },
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["userId", "UserId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Successfully added a literature",
      addLiterature: detailLiterature,
      // coba,
      // thumb,
    });
  } catch (err) {
    showError(err);
  }
};

exports.updateLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    await Literature.update(req.body, {
      where: { id },
    });

    const updatedLiterature = await Literature.findOne({
      where: { id },
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["userId", "UserId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: `Successfully update a literature with id ${id}`,
      updatedLiterature,
    });
  } catch (err) {
    showError(err);
  }
};

exports.deleteLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    await Literature.destroy({ where: { id } });

    res.send({
      message: `Successfully delete literature with id ${id}`,
      literatureId: id,
    });
  } catch (err) {
    showError(err);
  }
};
