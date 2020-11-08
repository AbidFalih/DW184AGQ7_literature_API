//import express module
const express = require("express");

const cors = require("cors");

//use express in app var
const app = express();

const router = require("./src/routers/router"); //import router

app.use(express.json()); //body parser JSON
app.use(cors()); //cors
//create static folder for handle uploaded item
app.use("/src/uploads/images", express.static("src/uploads/images"));
app.use("/src/uploads/literatures", express.static("src/uploads/literatures"));

app.use("/api/v1/", router); //grouping
app.get("/", (req, res) => {
  res.send(
    "<p>Backend server has been successfully activated,<br> you can now login to the Literature web application, please go to <a href='http://ma-literature.netlify.com'>this link</a> :D </p>"
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
