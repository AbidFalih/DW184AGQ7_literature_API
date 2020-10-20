const { User } = require("../../models");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { showError } = require("./_showError");
require("dotenv").config();

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      user,
    });
  } catch (err) {
    showError(err);
  }
};

exports.register = async (req, res) => {
  try {
    //validate
    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      gender: Joi.bool(),
      phone: Joi.string().min(8).required(),
      address: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });

    //saving
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //10->saltRound

    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = await jwt.sign({ id: user.id }, process.env.JWT_KEY);

    const user2 = await User.findOne({ where: { email } });
    const isAdmin = user2.isAdmin;
    //send
    res.send({
      message: "Success registering a user",
      data: { email, token, isAdmin },
    });
  } catch (err) {
    showError(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).send({ message: "Invalid Login (email)" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).send({ message: "Invalid Login (pass)" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

    const isAdmin = user.isAdmin;
    res.send({
      message: "Login Success!",
      data: {
        email,
        token,
        isAdmin,
      },
    });
  } catch (err) {
    showError(err);
  }
};
