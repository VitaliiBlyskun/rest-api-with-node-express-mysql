const express = require('express');

const { validateBody } = require('../../middlewares');

const { sqlAuthRouter } = require('../../controllers/auth');

// const { registerSchema, loginSchema } = require('../../schemas');
const schemas = require('../../schemas');

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), sqlAuthRouter.register);

router.post("/login", validateBody(schemas.loginSchema), sqlAuthRouter.login)


module.exports = router; 