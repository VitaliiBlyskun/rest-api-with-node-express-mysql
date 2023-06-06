const { controllerWrapper }= require('../../utils');

const getUserList = require('./getUserList');
const getUserById = require('./getUserById');
const addUser = require('./addUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const updateFavouriteStatusUser = require('./updateFavouriteStatusUser');

module.exports = {
    getUserList: controllerWrapper(getUserList),
    getUserById: controllerWrapper(getUserById),
    addUser: controllerWrapper(addUser),
    updateUser: controllerWrapper(updateUser),
    deleteUser: controllerWrapper(deleteUser),
    updateFavouriteStatusUser: controllerWrapper(updateFavouriteStatusUser)
}

