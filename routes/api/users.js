const express = require("express");
const router = express.Router();

const { usersController } = require("../../controllers");

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas');

router.get("/", usersController.getUserList);

router.get("/:id", usersController.getUserById);

router.post("/", validateBody(schemas.userComesSchema), usersController.addUser);

router.put("/:id", validateBody(schemas.userComesSchema), usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema),usersController.updateFavouriteStatusUser);

module.exports = router;
