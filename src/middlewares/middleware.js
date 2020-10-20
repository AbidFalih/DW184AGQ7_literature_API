const jwt = require("jsonwebtoken");
const { showError } = require("../controllers/_showError");
require("dotenv").config();

exports.auth = (req, res, next) => {
  let header, token;

  //check user sent token / not
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({ message: "Access denied!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    // res.send({
    //   verified,
    // });
    next();
  } catch (err) {
    showError(err);
  }
};
