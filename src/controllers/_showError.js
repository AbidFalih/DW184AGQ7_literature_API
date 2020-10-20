exports.showError = (err) => {
  console.log(err);

  res.status(500).send({
    message: "Server ERROR",
  });
};
