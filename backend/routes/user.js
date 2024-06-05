const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const router = express.Router();
router.use(express.json());

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const userId = user._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({ message: "User created", token: token });
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ message: "User signed in", token: token });

    return;
  }

  res.status(411).json({ error: "Invalid username or password" });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({ message: "User updated" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  const users = await User.find({
    $or: [{ firstname: filter }, { lastname: filter }],
  });
  res.json({
    user: users.map((user) => ({
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    })),
  });
});

module.exports = router;
