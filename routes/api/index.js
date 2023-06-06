const usersRouter = require('./users');

const sqlUsersRouter = require('./SQL_users');
const sqlAuthRouter = require('./SQL_auth');

module.exports = {
    usersRouter,
    sqlUsersRouter,
    sqlAuthRouter
}