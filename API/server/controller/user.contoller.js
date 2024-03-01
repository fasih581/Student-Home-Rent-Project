const asyncHandler = require("express-async-handler");
const user = require("../model/user.modal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

const userModal = require("../model/user.modal");

// POST: Signup user
exports.signupPost = asyncHandler(async (req, res) => {
  try {
    // get all data from body
    const { name, email, phone, password } = req.body;

    // all the data should exists
    if (!name || !email || !phone || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    // check is user already exists
    const existingUser = await userModal.findOne({ email, phone });

    if (existingUser) {
      res.status(401).send("user already exists with email and phone");
      return res
        .status(400)
        .json({ error: "user already exists with email and phone" });
    }

    // encrypt the password
    const myEncPassword = await bcrypt.hash(password, 10);

    // save the user in DB
    const user = await userModal.create({
      name,
      email,
      password: myEncPassword,
      phone,
    });

    // generate a token for user and send it
    const token = jwt.sign(
      { id: user._id, email },
      "heloooo", //process.env.jwtSecret
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

// POST: Login user
exports.loginPost = asyncHandler(async (req, res) => {
  try {
    // Get all data from frontend
    const { name, email, password } = req.body;

    // validation
    if (!(email && password && name)) {
      res.status(400).send("send all data");
    }

    // find user in DB
    const user = await userModal.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(401).send("User not found");
    }

    // assignment - if user is not there, then what ?

    // match the password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id },
        "heloooo", //process.env.jwtSecret
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
      user.password = undefined;

      // send a token user cookie
      // cookie section
      // const options = {
      //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      //   httpOnly: true,
      //   withCredentials: true,
      // };
      // res.status(200).cookie("token", token, options).json({
      //   success: true,
      //   token,
      //   user,
      // });

      res.cookie("userToken", token, {
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
        withCredentials: true,
      });

      res.status(200).json({ userId: user._id });
    } else {
      res.status(401);
      console.log("email and password is not valid!");
    }
  } catch (error) {
    console.log(error);
  }
});
