const express = require("express");
const router = express.Router();

const { getUserList, getUserById, addUser, updateUser, deleteUser  } = require("../../controllers/users/SQL_operations");

const { validateBody, authenticate } = require('../../middlewares');

const schemas = require('../../schemas');

router.get("/", authenticate, getUserList);
// router.get("/", getUserList);

router.get("/:id", authenticate, getUserById);

router.post("/", authenticate, validateBody(schemas.userComesSchema), addUser);

router.put("/:id", authenticate, validateBody(schemas.userComesSchema), updateUser);

router.delete("/:id", authenticate, deleteUser);


module.exports = router;