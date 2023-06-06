// const { HttpError } = require("../../utils");

const { db } = require('../../config');

// Отримання списку користувачів
const getUserList = async (request, response) => {
  console.log("request",  request.authToken)
  await db.query("SELECT * FROM users", (error, users) => {
    if (error) {
      console.error("Помилка запиту до бази даних:", error);
      return response.status(500).json({ error: "Помилка сервера" });
    }
    response.status(200).json({
      status: "get success",
      code: 200,
      data: {
        result: users,
      },
    });
  });
};

// Отримання користувача за ID
const getUserById = async (request, response) => {
  const { id } = request.params;
  await db.query("SELECT * FROM users WHERE id = ?", [id], (error, users) => {
    if (error) {
      console.error("Помилка запиту до бази даних:", error);
      return response.status(500).json({ error: "Помилка сервера" });
    } else {
      if (users.length === 0) {
        response.status(404).json({
          status: "Not Found",
          code: 404,
          message: "User not found",
        });
      } else {
        response.status(200).json({
          status: "get by id success",
          code: 200,
          data: {
            result: users[0],
          },
        });
      }
    }
  });
};


// Додавання користувача
const addUser = async (request, response) => {
  const { name, email, phone } = request.body;
  await db.query("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)", [name, email, phone], (error, result) => {
    if (error) {
      console.error("Помилка запиту до бази даних:", error);
      return response.status(500).json({ error: "Помилка сервера" });
    }
    const insertedId = result.insertId;
    response.status(201).json({
      status: "post success",
      code: 201,
      data: {
        result: { id: insertedId, name, email, phone },
      },
    });
  });
};

// Оновлення користувача за ID
const updateUser = async (request, response) => {
  const { id } = request.params;
  const { name, email, phone } = request.body;
  db.query("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?", [name, email, phone, id], (error, result) => {
    if (error) {
      console.error("Помилка запиту до бази даних:", error);
      return response.status(500).json({ error: "Помилка сервера" });
    }
    if (result.affectedRows === 0) {
      return response.status(404).json({ error: "Користувача з вказаним ID не знайдено" });
    }
    response.status(200).json({
      status: "put success",
      code: 200,
      data: {
        result: { id, name, email, phone },
      },
    });
  });
};


// Видалення користувача за ID
const deleteUser = async (request, response) => {
  const { id } = request.params;
  await db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Помилка запиту до бази даних:", error);
      return response.status(500).json({ error: "Помилка сервера" });
    }
    if (result.affectedRows === 0) {
            return response.status(404).json({ error: "Користувача з вказаним ID не знайдено" });
    }
    response.status(200).json({
      status: "delete success",
      code: 200,
      data: {
        result: { id },
      },
    });
  });
};

module.exports = {
  getUserList,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
