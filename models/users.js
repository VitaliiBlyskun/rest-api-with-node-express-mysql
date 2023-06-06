const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const usersPath = path.join(__dirname, "contacts.json");

const listUsers = async () => {
  try {
    const data = await fs.readFile(usersPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getUserById = async (id) => {
  const users = await listUsers();
  const result = users.find((user) => user.id === id);
  return result || null;
};

const addUser = async (body) => {
  const users = await listUsers();
  const newUser = {
    id: nanoid(),
    ...body,
  };
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return newUser;
};

const removeUser = async (id) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = users.splice(index, 1);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return result;
};

const updateUser = async (id, body) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id, ...body };
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return users[index];
};

const updateFavouriteUser = async (id, body) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id, ...body };
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return users[index];
};

module.exports = {
  listUsers,
  getUserById,
  removeUser,
  addUser,
  updateUser,
  updateFavouriteUser
};
