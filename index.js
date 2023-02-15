import express from "express";
import mongoose from "mongoose";
import Profile from "./userDetail.js";
import cors from "cors";
import bycrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

const mongourl =
  "mongodb+srv://Vignesh:fNKwJWynI5Yu4Veg@cluster0.bbf1qbc.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connnected");
  })
  .catch((e) => console.log(e));

const db = mongoose.connection;

app.get("/", (req, res) => {
  console.log("hello");
});

app.post("/Signup", async (req, res) => {
  const { username, password } = req.body;
  const data = {
    username: username,
    password: password,
  };

  const encryptedPassword = await bycrypt.hash(password, 10);
  try {
    const check = await Profile.create({
      username,
      password: encryptedPassword,
    });
    console.log(check);
    if (check) {
      return res.json("exist");
    } else {
      res.json("notexist");
      await UserInfo.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
    console.log(e);
  }
  console.log(1, 2, 3, Profile);
});

app.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  const passwordmatch = await bycrypt.compare(password, encryptedPassword);
  console.log(passwordmatch);
  try {
    const check = await Profile.findOne({
      username,
    });

    console.log(check);
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.listen(5000, () => {
  console.log("hi");
});

app.listen(port, () => console.log(`Listening to localhost: ${port}`));
